
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Gauge, Thermometer, Activity, AlertTriangle } from 'lucide-react';

const SiteDetailsPanel = ({ site }) => {
  if (!site) {
    return (
      <Card className="bg-stone-800/50 border-stone-700 h-full">
        <CardContent className="p-6 text-center h-full flex items-center justify-center">
          <div>
            <MapPin className="h-12 w-12 text-stone-600 mx-auto mb-4" />
            <p className="text-stone-400">Select a site to view details</p>
            <p className="text-stone-500 text-sm mt-2">Click on any marker or site from the list</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-stone-800/50 border-stone-700 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-stone-100 flex items-center justify-between">
          <span className="truncate">{site.name}</span>
          <Badge
            variant="secondary"
            className={`${
              site.status === 'active'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-stone-500/20 text-stone-400'
            }`}
          >
            {site.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-y-auto">
        {/* Basic Info */}
        <div>
          <h4 className="text-sm font-semibold text-stone-300 mb-2">Basic Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-400">Type:</span>
              <span className="text-stone-200 capitalize">{site.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Category:</span>
              <span className="text-stone-200 capitalize">{site.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Distance:</span>
              <span className="text-stone-200">{site.distance}km</span>
            </div>
          </div>
        </div>

        <Separator className="border-stone-600" />

        {/* Location */}
        <div>
          <h4 className="text-sm font-semibold text-stone-300 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-amber-500" />
            Location
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-400">Latitude:</span>
              <span className="text-stone-200">{site.latitude.toFixed(6)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Longitude:</span>
              <span className="text-stone-200">{site.longitude.toFixed(6)}°</span>
            </div>
            {site.elevation && (
              <div className="flex justify-between">
                <span className="text-stone-400">Elevation:</span>
                <span className="text-stone-200">{site.elevation}m</span>
              </div>
            )}
          </div>
        </div>

        {site.depth && (
          <>
            <Separator className="border-stone-600" />
            <div>
              <h4 className="text-sm font-semibold text-stone-300 mb-2 flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-blue-500" />
                Mining Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">Depth:</span>
                  <span className="text-stone-200">{site.depth}m</span>
                </div>
                {site.production && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Production:</span>
                    <span className="text-stone-200">{site.production}</span>
                  </div>
                )}
                {site.reserves && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Reserves:</span>
                    <span className="text-stone-200">{site.reserves}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {site.environmental && (
          <>
            <Separator className="border-stone-600" />
            <div>
              <h4 className="text-sm font-semibold text-stone-300 mb-2 flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-green-500" />
                Environmental
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">Temperature:</span>
                  <span className="text-stone-200">{site.environmental.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Humidity:</span>
                  <span className="text-stone-200">{site.environmental.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Air Quality:</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      site.environmental.airQuality === 'Good'
                        ? 'bg-green-500/20 text-green-400'
                        : site.environmental.airQuality === 'Moderate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {site.environmental.airQuality}
                  </Badge>
                </div>
              </div>
            </div>
          </>
        )}

        {site.geological && (
          <>
            <Separator className="border-stone-600" />
            <div>
              <h4 className="text-sm font-semibold text-stone-300 mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-purple-500" />
                Geological Data
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">Rock Type:</span>
                  <span className="text-stone-200">{site.geological.rockType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Formation:</span>
                  <span className="text-stone-200">{site.geological.formation}</span>
                </div>
                {site.geological.seismicRisk && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Seismic Risk:</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        site.geological.seismicRisk === 'Low'
                          ? 'bg-green-500/20 text-green-400'
                          : site.geological.seismicRisk === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {site.geological.seismicRisk}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {site.lastUpdated && (
          <>
            <Separator className="border-stone-600" />
            <div className="flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Last updated
              </div>
              <span>{new Date(site.lastUpdated).toLocaleString()}</span>
            </div>
          </>
        )}

        {site.alerts && site.alerts.length > 0 && (
          <>
            <Separator className="border-stone-600" />
            <div>
              <h4 className="text-sm font-semibold text-stone-300 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Alerts
              </h4>
              <div className="space-y-2">
                {site.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400"
                  >
                    {alert.message}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SiteDetailsPanel;
