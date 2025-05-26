
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Key, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const ApiKeyManager = ({ onClose }) => {
  const [apiKeys, setApiKeys] = useState({
    mapbox: '',
    openweather: '',
    usgs: 'free', // USGS is free
    overpass: 'free' // OpenStreetMap is free
  });

  const [saved, setSaved] = useState({});

  useEffect(() => {
    // Load existing keys from localStorage
    const savedKeys = {
      mapbox: localStorage.getItem('mapbox_token') || '',
      openweather: localStorage.getItem('openweather_key') || '',
      usgs: 'free',
      overpass: 'free'
    };
    setApiKeys(savedKeys);
    setSaved({
      mapbox: !!savedKeys.mapbox,
      openweather: !!savedKeys.openweather,
      usgs: true,
      overpass: true
    });
  }, []);

  const handleSave = (service, key) => {
    if (service === 'mapbox') {
      localStorage.setItem('mapbox_token', key);
    } else if (service === 'openweather') {
      localStorage.setItem('openweather_key', key);
    }
    
    setSaved(prev => ({ ...prev, [service]: !!key }));
  };

  const apiServices = [
    {
      id: 'mapbox',
      name: 'Mapbox',
      description: 'Interactive maps and geocoding',
      url: 'https://mapbox.com',
      required: true,
      placeholder: 'pk.ey...',
      isFree: false
    },
    {
      id: 'openweather',
      name: 'OpenWeatherMap',
      description: 'Weather data for mining sites',
      url: 'https://openweathermap.org/api',
      required: false,
      placeholder: 'Enter API key...',
      isFree: true
    },
    {
      id: 'usgs',
      name: 'USGS Earthquake API',
      description: 'Real-time geological and seismic data',
      url: 'https://earthquake.usgs.gov/fdsnws/event/1/',
      required: false,
      isFree: true,
      isBuiltIn: true
    },
    {
      id: 'overpass',
      name: 'OpenStreetMap/Overpass',
      description: 'Mining sites and geological features',
      url: 'https://overpass-api.de/',
      required: false,
      isFree: true,
      isBuiltIn: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-stone-800 border-stone-700 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-stone-100 flex items-center">
            <Key className="h-5 w-5 mr-2 text-amber-500" />
            API Configuration
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-sm text-stone-400">
            Configure API keys for enhanced features. All keys are stored locally and never shared.
          </div>

          {apiServices.map(service => (
            <div key={service.id} className="border border-stone-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-stone-100">{service.name}</h3>
                    {service.isFree && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                        Free
                      </Badge>
                    )}
                    {service.required && (
                      <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 text-xs">
                        Required
                      </Badge>
                    )}
                    {service.isBuiltIn && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                        Built-in
                      </Badge>
                    )}
                  </div>
                  <p className="text-stone-400 text-sm mt-1">{service.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {saved[service.id] ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : service.required ? (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  ) : null}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(service.url, '_blank')}
                    className="text-stone-400 hover:text-stone-200 p-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {!service.isBuiltIn && (
                <div className="space-y-2">
                  <Label htmlFor={service.id} className="text-stone-300 text-sm">
                    API Key
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id={service.id}
                      type="password"
                      placeholder={service.placeholder}
                      value={apiKeys[service.id]}
                      onChange={(e) => setApiKeys(prev => ({
                        ...prev,
                        [service.id]: e.target.value
                      }))}
                      className="bg-stone-900 border-stone-600 text-stone-100 placeholder-stone-500"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSave(service.id, apiKeys[service.id])}
                      disabled={!apiKeys[service.id] || saved[service.id]}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-900"
                    >
                      {saved[service.id] ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                  
                  {service.id === 'mapbox' && (
                    <p className="text-xs text-stone-500">
                      Free tier includes 50,000 map loads per month
                    </p>
                  )}
                  
                  {service.id === 'openweather' && (
                    <p className="text-xs text-stone-500">
                      Free tier includes 1,000 API calls per day
                    </p>
                  )}
                </div>
              )}

              {service.isBuiltIn && (
                <div className="bg-stone-900/50 rounded p-2 text-sm text-stone-400">
                  ✓ This service is integrated and ready to use with no configuration required
                </div>
              )}
            </div>
          ))}

          <div className="text-xs text-stone-500 space-y-1">
            <p>• All API keys are stored locally in your browser</p>
            <p>• TerraScan never sends your keys to external servers</p>
            <p>• Free APIs provide comprehensive geological data</p>
            <p>• Optional paid APIs enhance map visualization</p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="bg-stone-700 hover:bg-stone-600 text-stone-100"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyManager;
