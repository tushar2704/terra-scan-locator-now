
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, Zap, Thermometer } from 'lucide-react';

const MiningSiteList = ({ sites, onSiteSelect, selectedSite }) => {
  const getSiteIcon = (type) => {
    switch (type) {
      case 'geological': return Mountain;
      case 'seismic': return Zap;
      case 'weather': return Thermometer;
      default: return MapPin;
    }
  };

  const getSiteColor = (type) => {
    switch (type) {
      case 'gold': return 'text-yellow-500';
      case 'copper': return 'text-orange-500';
      case 'iron': return 'text-red-500';
      case 'coal': return 'text-gray-500';
      case 'diamond': return 'text-purple-300';
      default: return 'text-amber-500';
    }
  };

  if (!sites || sites.length === 0) {
    return (
      <Card className="bg-stone-800/50 border-stone-700 h-full">
        <CardContent className="p-6 text-center">
          <Mountain className="h-12 w-12 text-stone-600 mx-auto mb-4" />
          <p className="text-stone-400">No mining sites found in this area.</p>
          <p className="text-stone-500 text-sm mt-2">Try adjusting your filters or search area.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-stone-800/50 border-stone-700 h-full">
      <CardContent className="p-4 h-full overflow-hidden">
        <div className="space-y-3 h-full overflow-y-auto">
          {sites.map((site) => {
            const Icon = getSiteIcon(site.category);
            const isSelected = selectedSite?.id === site.id;
            
            return (
              <div
                key={site.id}
                onClick={() => onSiteSelect(site)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-stone-700/50 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-stone-600 bg-stone-900/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon className={`h-5 w-5 mt-0.5 ${getSiteColor(site.type)}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-stone-100 text-sm truncate">
                        {site.name}
                      </h4>
                      <p className="text-stone-400 text-xs">{site.type}</p>
                      <div className="flex items-center space-x-2 mt-2">
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
                        <span className="text-xs text-stone-500">{site.distance}km</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {site.depth && (
                  <div className="mt-2 text-xs text-stone-500">
                    Depth: {site.depth}m
                  </div>
                )}
                
                {site.production && (
                  <div className="mt-1 text-xs text-stone-500">
                    Production: {site.production}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiningSiteList;
