import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ sites, center, onSiteSelect, selectedSite, activeFilters, onMapMove }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainer.current).setView([center[1], center[0]], 4);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add map move/zoom event listeners
      mapRef.current.on('moveend', () => {
        if (onMapMove && mapRef.current) {
          const mapCenter = mapRef.current.getCenter();
          const bounds = mapRef.current.getBounds();
          const zoom = mapRef.current.getZoom();
          
          onMapMove({
            center: [mapCenter.lng, mapCenter.lat],
            bounds: {
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest()
            },
            zoom
          });
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onMapMove]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = {};

    // Add new markers
    sites.forEach((site) => {
      const getSiteColor = (site) => {
        switch (site.type) {
          case 'gold': return '#FFD700';
          case 'copper': return '#B87333';
          case 'iron': return '#A0522D';
          case 'coal': return '#2F4F4F';
          case 'diamond': return '#E6E6FA';
          case 'geological': return '#22C55E';
          case 'seismic': return '#EF4444';
          default: return '#FFA500';
        }
      };

      const getSiteSymbol = (site) => {
        switch (site.category) {
          case 'geological': return '⛰️';
          case 'seismic': return '⚡';
          default: return '⛏️';
        }
      };

      // Create custom icon
      const customIcon = L.divIcon({
        html: `<div style="
          background-color: ${getSiteColor(site)};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ${selectedSite?.id === site.id ? 'transform: scale(1.5); z-index: 1000;' : ''}
        ">${getSiteSymbol(site)}</div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([site.latitude, site.longitude], {
        icon: customIcon,
      }).addTo(mapRef.current);

      // Add popup
      const popupContent = `
        <div class="p-2">
          <h4 class="font-semibold text-sm">${site.name}</h4>
          <p class="text-xs text-gray-600">${site.type}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs px-2 py-1 rounded ${
              site.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }">${site.status}</span>
            <span class="text-xs text-gray-500">${site.distance}km</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click event
      marker.on('click', () => {
        onSiteSelect(site);
      });

      markersRef.current[site.id] = marker;
    });
  }, [sites, selectedSite, onSiteSelect]);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView([center[1], center[0]], mapRef.current.getZoom());
    }
  }, [center]);

  return (
    <div className="h-full relative bg-stone-900 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map overlay info */}
      <div className="absolute top-4 left-4 z-[1000]">
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
      <div className="absolute bottom-4 right-4 z-[1000]">
        <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 rounded-lg p-2">
          <span className="text-xs text-stone-400">
            {center[1].toFixed(2)}°, {center[0].toFixed(2)}°
          </span>
        </div>
      </div>

      {/* Powered by OpenStreetMap */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-stone-800/90 backdrop-blur-sm border border-stone-600 rounded-lg p-2">
          <span className="text-xs text-stone-400">
            Powered by OpenStreetMap
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
