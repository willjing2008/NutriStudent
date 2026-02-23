import React, { useState } from 'react';
import { ImageIcon, CheckCircle, AlertCircle, Info, Download } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

/**
 * Component to show image storage system status and provide manual controls
 */
export function ImageStorageInfo() {
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<'unknown' | 'working' | 'error'>('unknown');
  const [message, setMessage] = useState<string>('');

  const checkEndpoint = async () => {
    setIsChecking(true);
    setStatus('unknown');
    setMessage('Checking image storage endpoints...');

    try {
      // Test the health endpoint first
      const healthResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/health`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!healthResponse.ok) {
        setStatus('error');
        setMessage(`Server not responding (${healthResponse.status}). The backend may need to be redeployed.`);
        setIsChecking(false);
        return;
      }

      // Try to check for a test recipe image
      const imageResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/recipe-image/one-pot-chicken-rice`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (imageResponse.ok) {
        const data = await imageResponse.json();
        if (data.success) {
          setStatus('working');
          setMessage('✅ Image storage system is working! Images are being stored permanently.');
        } else {
          setStatus('working');
          setMessage('⚠️ Endpoints are working, but no images stored yet. Use Admin Dashboard to generate images.');
        }
      } else if (imageResponse.status === 404) {
        setStatus('working');
        setMessage('⚠️ Endpoints are working, but no images stored yet. Use Admin Dashboard to generate images.');
      } else {
        setStatus('error');
        setMessage(`Endpoint error (${imageResponse.status}). Check server logs for details.`);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(`❌ Cannot connect to image storage endpoints. Error: ${error.message}. Images will use temporary URLs.`);
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'working':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'error':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'working':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-gray-900 font-semibold">Image Storage System</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This system stores recipe images permanently in Supabase Storage for faster loading and better reliability.
        </p>

        <button
          onClick={checkEndpoint}
          disabled={isChecking}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
        >
          {isChecking ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Checking...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Check System Status
            </>
          )}
        </button>

        {message && (
          <div className={`p-4 rounded-lg border-2 ${getStatusColor()}`}>
            <div className="flex items-start gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">How it works:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5">•</span>
              <span><strong>First load:</strong> Images are sourced from Unsplash and stored in Supabase Storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5">•</span>
              <span><strong>Subsequent loads:</strong> Images are served instantly from storage (10x faster)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5">•</span>
              <span><strong>Fallback:</strong> If storage endpoints aren't available, temporary URLs are used</span>
            </li>
          </ul>
        </div>

        {status === 'error' && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Troubleshooting:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">1.</span>
                <span>The backend server endpoints may need to be redeployed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">2.</span>
                <span>Check that Supabase credentials are configured correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">3.</span>
                <span>Images will still work using temporary URLs as a fallback</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}