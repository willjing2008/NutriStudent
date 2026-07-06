import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GraduationCap, Search, Plus, Loader2, ArrowRight, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { authedPost } from '../utils/apiClient';

interface SchoolSelectionStepProps {
  userId: string;
  onComplete: () => void;
}

interface School {
  id: string;
  name: string;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;
// Anon-key headers, used only for the genuinely public schools/search endpoint.
// Authenticated calls go through authedPost (session JWT).
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

export function SchoolSelectionStep({ userId, onComplete }: SchoolSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [addingSchool, setAddingSchool] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const searchSchools = useCallback(async (query: string) => {
    setSearching(true);
    try {
      const res = await fetch(`${API_BASE}/schools/search?q=${encodeURIComponent(query)}`, {
        headers: HEADERS,
      });
      const data = await res.json();
      setSchools(data.schools || []);
    } catch {
      setSchools([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    searchSchools('');
  }, [searchSchools]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchSchools(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, searchSchools]);

  const handleAddSchool = async () => {
    if (!newSchoolName.trim()) return;
    setAddingSchool(true);
    setError(null);
    try {
      const data = await authedPost<{ school: School }>('schools', { name: newSchoolName.trim() });
      setSelectedSchool(data.school);
      setNewSchoolName('');
      setShowAddSchool(false);
      searchSchools(searchQuery);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingSchool(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedSchool) return;
    setLoading(true);
    setError(null);
    try {
      await authedPost<{ success?: boolean }>('schools/select', {
        userId,
        schoolId: selectedSchool.id,
        schoolName: selectedSchool.name,
      });
      onComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F13] flex flex-col px-6 py-8">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#22C55E]/20 mb-5">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Select Your School</h1>
          <p className="text-[#9CA3AF]">
            Find your university or college to connect with your campus community
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Toggle between search and add */}
        <div className="flex items-center justify-end mb-3">
          <button
            onClick={() => setShowAddSchool(!showAddSchool)}
            className="flex items-center gap-1.5 text-sm text-[#22C55E] hover:text-[#4ADE80] transition-colors"
          >
            {showAddSchool ? (
              <>
                <Search className="w-4 h-4" />
                Search instead
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add new school
              </>
            )}
          </button>
        </div>

        {showAddSchool ? (
          /* Add new school view */
          <div className="mb-6">
            <p className="text-[#9CA3AF] text-sm mb-3">Can't find your school? Add it here.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                placeholder="Enter school name"
                className="flex-1 px-4 py-3.5 bg-[#142A1D] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSchool()}
                autoFocus
              />
              <button
                onClick={handleAddSchool}
                disabled={!newSchoolName.trim() || addingSchool}
                className="px-5 py-3.5 bg-[#22C55E] text-[#052E16] font-medium rounded-xl hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingSchool ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add'}
              </button>
            </div>
          </div>
        ) : (
          /* Search & select view */
          <>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your school..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#142A1D] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
              />
              {searching && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22C55E] animate-spin" />
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-6 max-h-[40vh]">
              {schools.length === 0 && !searching && (
                <p className="text-center text-[#6B7280] text-sm py-4">
                  {searchQuery ? 'No schools found' : 'No schools yet'}
                </p>
              )}
              {schools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchool(school)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    selectedSchool?.id === school.id
                      ? 'bg-[#22C55E]/10 border-[#22C55E] text-white'
                      : 'bg-[#142A1D] border-[#2D5A3D] text-[#D1D5DB] hover:border-[#22C55E]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[#22C55E] shrink-0" />
                    <span className="font-medium">{school.name}</span>
                  </div>
                  {selectedSchool?.id === school.id && (
                    <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedSchool || loading}
          className="w-full py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
