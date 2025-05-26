
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InteractiveMap = ({ sites, center, onSiteSelect, selectedSite, activeFilters }) => {
  const mapContainer = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
      setShowTokenInput(false);
    }
  }, []);

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
    }
  };

  const getSiteColor = (site) => {
    switch (site.type) {
      case 'gold': return '#FFD700';
      case 'copper': return '#B87333';
      case 'iron': return '#A0522D';
      case 'coal': return '#2F4F4F';
      case 'diamond': return '#E6E6FA';
      default: return '#FFA500';
    }
  };

  const getSiteIcon = (site) => {
    switch (site.type) {
      case 'geological': return Mountain;
      case 'seismic': return AlertTriangle;
      default: return MapPin;
    }
  };

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center bg-stone-900 rounded-lg">
        <div className="text-center p-8 max-w-md">
          <MapPin className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-stone-100 mb-2">Mapbox Token Required</h3>
          <p className="text-stone-400 mb-6 text-sm">
            To display interactive maps, please enter your free Mapbox public token.
            Get one at{' '}
            <a
              href="https://mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="pk.ey..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-600 rounded text-stone-100 placeholder-stone-500"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-medium py-2 px-4 rounded transition-colors"
            >
              Add Token & Load Map
            </button>
          </form>
          <p className="text-xs text-stone-500 mt-4">
            Token is stored locally and never shared
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-stone-900 rounded-lg overflow-hidden">
      {/* Simple map visualization for demo */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="text-stone-700">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Site markers */}
        <div className="absolute inset-0 p-4">
          {sites.map((site, index) => {
            const Icon = getSiteIcon(site);
            const x = (site.longitude + 180) * (100 / 360);
            const y = (90 - site.latitude) * (100 / 180);
            
            return (
              <div
                key={site.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                style={{
                  left: `${Math.max(5, Math.min(95, x))}%`,
                  top: `${Math.max(5, Math.min(95, y))}%`,
                }}
                onClick={() => onSiteSelect(site)}
              >
                <div className={`relative ${selectedSite?.id === site.id ? 'scale-125' : ''}`}>
                  <Icon
                    className="h-6 w-6 drop-shadow-lg"
                    style={{ color: getSiteColor(site) }}
                  />
                  {site.status === 'active' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                
                {selectedSite?.id === site.id && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-stone-800 border border-stone-600 rounded-lg p-3 min-w-48 shadow-xl">
                      <h4 className="font-semibold text-stone-100 text-sm">{site.name}</h4>
                      <p className="text-stone-400 text-xs">{site.type}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            site.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-stone-500/20 text-stone-400'
                          }`}
                        >
                          {site.status}
                        </Badge>
                        <span className="text-xs text-stone-500">
                          {site.distance}km
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map overlay info */}
        <div className="absolute top-4 left-4">
          <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 rounded-lg p-3">
            <h4 className="text-stone-100 font-semibold text-sm mb-2">Map Layers</h4>
            <div className="space-y-1">
              {activeFilters.map(filter => (
                <div key={filter} className="flex items-center text-xs text-stone-300">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    filter === 'mining' ? 'bg-amber-500' :
                    filter === 'geological' ? 'bg-green-500' :
                    filter === 'seismic' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center coordinates */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 rounded-lg p-2">
            <span className="text-xs text-stone-400">
              {center[1].toFixed(2)}°, {center[0].toFixed(2)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
