import { X, Calendar, ShoppingCart, Loader2, Trash2, Eye, ChefHat } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface SavedPlan {
  planId: string;
  planName: string;
  savedAt: string;
  totalCost: number;
  mealCount: number;
}

interface SavedPlansModalProps {
  userId: string;
  onClose: () => void;
  onLoadPlan: (planId: string) => void;
}

export function SavedPlansModal({ userId, onClose, onLoadPlan }: SavedPlansModalProps) {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedPlans();
  }, [userId]);

  const fetchSavedPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/get-meal-plans`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load saved plans');
      }

      setPlans(data.plans || []);
    } catch (err: any) {
      console.error('Error fetching saved plans:', err);
      setError(err.message || 'Failed to load saved plans');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this meal plan?')) {
      return;
    }

    setDeletingPlanId(planId);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/delete-meal-plan-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId, planId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete plan');
      }

      // Remove from local state
      setPlans(plans.filter(p => p.planId !== planId));

      console.log('✅ Plan deleted successfully');
    } catch (err: any) {
      console.error('Error deleting plan:', err);
      alert(err.message || 'Failed to delete plan');
    } finally {
      setDeletingPlanId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="w-7 h-7" />
            <div>
              <h2 className="text-2xl font-bold">My Saved Meal Plans</h2>
              <p className="text-sm text-white/90">
                {plans.length === 0 ? 'No saved plans yet' : `${plans.length} ${plans.length === 1 ? 'plan' : 'plans'} saved`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading your saved plans...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchSavedPlans}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Plans Yet</h3>
              <p className="text-gray-600 mb-6">
                Create and save your first meal plan to see it here!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.planId}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all shadow-md hover:shadow-lg overflow-hidden"
                >
                  {/* Plan Header */}
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b-2 border-purple-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.planName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(plan.savedAt)}</span>
                    </div>
                  </div>

                  {/* Plan Stats */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="text-xs text-green-700 mb-1">Total Cost</div>
                        <div className="font-bold text-green-900 text-xl">£{plan.totalCost.toFixed(2)}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-xs text-blue-700 mb-1">Meals</div>
                        <div className="font-bold text-blue-900 text-xl">{plan.mealCount}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onLoadPlan(plan.planId)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View Plan
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.planId)}
                        disabled={deletingPlanId === plan.planId}
                        className={`px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-center ${
                          deletingPlanId === plan.planId
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200'
                        }`}
                      >
                        {deletingPlanId === plan.planId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && plans.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> You can save up to 10 meal plans. Older plans are automatically removed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
