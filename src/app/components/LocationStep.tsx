import { useState } from 'react';
import { MapPin, Store, ArrowRight, ArrowLeft, Search, Loader2, MapPinned, ExternalLink } from 'lucide-react';
import { UserPreferences } from '../App';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface LocationStepProps {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface StoreData {
  id: string;
  name: string;
  distance: string;
  address: string;
  rating?: number;
  isOpen?: boolean;
}

export function LocationStep({ preferences, updatePreferences, onNext, onBack }: LocationStepProps) {
  const [location, setLocation] = useState(preferences.location);
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const fetchNearbyStores = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/nearby-stores`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ latitude, longitude }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch nearby stores');
      }

      if (data.stores && data.stores.length > 0) {
        const sortedStores = [...data.stores].sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' miles', ''));
          const distanceB = parseFloat(b.distance.replace(' miles', ''));
          return distanceA - distanceB;
        });
        setStores(sortedStores);
      } else {
        setError('No grocery stores found nearby. Please try a different location.');
        setStores([]);
      }
    } catch (err: any) {
      console.error('Error fetching nearby stores:', err);
      setError(err.message || 'Failed to fetch nearby stores. Please try again.');
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByAddress = async () => {
    if (!manualAddress.trim()) {
      setError('Please enter an address');
      return;
    }

    setSearchingAddress(true);
    setError(null);

    try {
      const geocodeResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/geocode-address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ address: manualAddress }),
        }
      );

      const geocodeData = await geocodeResponse.json();

      if (!geocodeResponse.ok) {
        throw new Error(geocodeData.error || 'Could not find this address');
      }

      const { latitude, longitude, formattedAddress } = geocodeData;
      setLocation(formattedAddress);
      updatePreferences({ location: formattedAddress });
      setUserCoordinates({ lat: latitude, lng: longitude });
      
      await fetchNearbyStores(latitude, longitude);
    } catch (err: any) {
      console.error('Error searching by address:', err);
      setError(err.message || 'Could not find this address. Please try again.');
    } finally {
      setSearchingAddress(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        updatePreferences({ location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` });
        setGettingLocation(false);
        await fetchNearbyStores(latitude, longitude);
        setUserCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        setGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSelectStore = (store: StoreData) => {
    const isSelected = preferences.selectedStores.some(s => s.id === store.id);
    
    if (isSelected) {
      const updatedStores = preferences.selectedStores.filter(s => s.id !== store.id);
      updatePreferences({ 
        selectedStores: updatedStores,
        selectedStore: updatedStores.length > 0 ? updatedStores[0] : null
      });
    } else {
      const updatedStores = [...preferences.selectedStores, store];
      updatePreferences({ 
        selectedStores: updatedStores,
        selectedStore: store
      });
    }
  };

  const isStoreSelected = (storeId: string) => {
    return preferences.selectedStores.some(s => s.id === storeId);
  };

  const canProceed = preferences.selectedStores.length > 0;

  const fetchAddressSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/autocomplete-address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ input: query }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to fetch suggestions:', data.error);
        setAddressSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      if (data.predictions && data.predictions.length > 0) {
        setAddressSuggestions(data.predictions);
        setShowSuggestions(true);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (err: any) {
      console.error('Error fetching address suggestions:', err);
      setAddressSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion: any) => {
    setManualAddress(suggestion.description);
    setShowSuggestions(false);
    setSearchingAddress(true);
    setError(null);

    try {
      const geocodeResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/geocode-address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ address: suggestion.description }),
        }
      );

      const geocodeData = await geocodeResponse.json();

      if (!geocodeResponse.ok) {
        throw new Error(geocodeData.error || 'Could not find this address');
      }

      const { latitude, longitude, formattedAddress } = geocodeData;
      setLocation(formattedAddress);
      updatePreferences({ location: formattedAddress });
      setUserCoordinates({ lat: latitude, lng: longitude });
      
      await fetchNearbyStores(latitude, longitude);
    } catch (err: any) {
      console.error('Error searching by address:', err);
      setError(err.message || 'Could not find this address. Please try again.');
    } finally {
      setSearchingAddress(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F13] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-[#142A1D] rounded-3xl p-6 border border-[#1E4029]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#22C55E]/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Where do you shop? <span className="text-[#6B7280] text-sm font-normal">(optional)</span></h2>
              <p className="text-[#6B7280] text-sm">Pick a nearby store for directions and your shopping list — this won't change your meal plan.</p>
            </div>
          </div>

          {/* Use Current Location Button */}
          <button
            onClick={getCurrentLocation}
            disabled={gettingLocation || loading}
            className="w-full bg-[#22C55E] text-[#052E16] px-6 py-4 rounded-xl font-semibold hover:bg-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4"
          >
            {gettingLocation ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Getting your location...
              </>
            ) : (
              <>
                <MapPinned className="w-5 h-5" />
                Use My Current Location
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2D5A3D]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#142A1D] text-[#6B7280] text-sm">OR</span>
            </div>
          </div>

          {/* Manual Address Input */}
          <div className="mb-6 relative">
            <label className="block text-sm text-[#9CA3AF] mb-2">
              Enter your address manually
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => {
                    setManualAddress(e.target.value);
                    fetchAddressSuggestions(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setShowSuggestions(false);
                      searchByAddress();
                    }
                  }}
                  onFocus={() => {
                    if (addressSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  placeholder="e.g., 123 High Street, London"
                  disabled={searchingAddress || loading}
                  className="w-full px-4 py-3 bg-[#0A1F13] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:border-[#22C55E] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-[#1A3626] border border-[#2D5A3D] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {loadingSuggestions ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-[#22C55E]" />
                      </div>
                    ) : (
                      addressSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.placeId}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-[#22C55E]/10 transition-colors border-b border-[#2D5A3D] last:border-b-0"
                        >
                          <div className="text-sm text-white">{suggestion.mainText}</div>
                          {suggestion.secondaryText && (
                            <div className="text-xs text-[#6B7280] mt-1">{suggestion.secondaryText}</div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={searchByAddress}
                disabled={searchingAddress || loading || !manualAddress.trim()}
                className="bg-[#22C55E] text-[#052E16] px-4 py-3 rounded-xl hover:bg-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {searchingAddress ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Current Location Display */}
          {location && (
            <div className="mb-4 text-sm text-[#9CA3AF] bg-[#0A1F13] p-3 rounded-xl border border-[#2D5A3D]">
              <span className="text-[#22C55E] font-medium">📍 Location:</span> {location}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
              <span className="ml-3 text-[#9CA3AF]">Finding nearby stores...</span>
            </div>
          )}

          {/* Store List */}
          {!loading && stores.length > 0 && (
            <div className="space-y-4 mb-6">
              {/* Map */}
              {userCoordinates && (
                <div className="bg-[#0A1F13] rounded-2xl p-3 border border-[#2D5A3D]">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-white text-sm font-medium">Your Location</span>
                  </div>
                  
                  <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-[#1A3626]">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${userCoordinates.lng - 0.02},${userCoordinates.lat - 0.02},${userCoordinates.lng + 0.02},${userCoordinates.lat + 0.02}&layer=mapnik&marker=${userCoordinates.lat},${userCoordinates.lng}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      className="rounded-xl"
                    />
                  </div>
                  
                  {preferences.selectedStores.length > 0 && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${userCoordinates.lat},${userCoordinates.lng}&destination=${encodeURIComponent(preferences.selectedStores[0]?.address || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-medium text-[#22C55E] hover:text-[#4ADE80] py-2 bg-[#22C55E]/10 rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Get Directions to {preferences.selectedStores[0].name}
                    </a>
                  )}
                </div>
              )}

              {/* Store Header */}
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#22C55E]" />
                <h3 className="text-white font-medium">Nearby Shops</h3>
                <span className="text-[#6B7280] text-sm">({stores.length} found)</span>
              </div>

              {/* Store List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {stores.map((store, index) => {
                  const selected = isStoreSelected(store.id);
                  
                  return (
                    <button
                      key={store.id}
                      onClick={() => handleSelectStore(store)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected
                          ? 'border-[#22C55E] bg-[#22C55E]/10'
                          : 'border-[#2D5A3D] bg-[#0A1F13] hover:border-[#22C55E]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Radio Circle */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selected 
                            ? 'border-[#22C55E] bg-[#22C55E]' 
                            : 'border-[#4B5563]'
                        }`}>
                          {selected && (
                            <div className="w-2 h-2 bg-[#052E16] rounded-full"></div>
                          )}
                        </div>
                        
                        {/* Store Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-white font-medium">{store.name}</span>
                            
                            {index === 0 && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E] text-[#052E16] font-semibold uppercase">
                                Nearest
                              </span>
                            )}
                            
                            {store.isOpen !== undefined && store.isOpen !== null && (
                              <span className={`text-[10px] px-2 py-0.5 rounded font-medium uppercase ${
                                store.isOpen 
                                  ? 'bg-[#22C55E]/20 text-[#22C55E]' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {store.isOpen ? 'Open' : 'Closed'}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm text-[#6B7280] mb-2 line-clamp-1">{store.address}</div>
                          
                          <div className="flex items-center gap-3 text-xs">
                            {store.rating && (
                              <span className="text-[#9CA3AF]">
                                ⭐ {store.rating.toFixed(1)}
                              </span>
                            )}
                            <span className="text-[#22C55E] font-medium">
                              📍 {store.distance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Selected Count */}
              {preferences.selectedStores.length > 0 && (
                <div className="p-3 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl">
                  <p className="text-sm text-[#22C55E]">
                    ✓ <strong>{preferences.selectedStores.length}</strong> shop{preferences.selectedStores.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 border border-[#2D5A3D] text-white rounded-xl hover:bg-[#22C55E]/10 hover:border-[#22C55E] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 bg-[#22C55E] text-[#052E16] px-6 py-3 rounded-xl font-semibold hover:bg-[#4ADE80] transition-all"
            >
              {canProceed ? 'Next' : 'Skip for now'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
