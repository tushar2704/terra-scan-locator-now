
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, Settings, Zap, Mountain, Pickaxe } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import MiningSiteList from '@/components/MiningSiteList';
import ApiKeyManager from '@/components/ApiKeyManager';
import SiteDetailsPanel from '@/components/SiteDetailsPanel';
import { useMiningSites } from '@/hooks/useMiningSites';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);
  const [showApiManager, setShowApiManager] = useState(false);
  const [mapCenter, setMapCenter] = useState([0, 20]);
  const [activeFilters, setActiveFilters] = useState(['mining', 'geological']);
  
  const { data: miningSites, isLoading, error } = useMiningSites(mapCenter, activeFilters);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Data Loading Error",
        description: "Some geological data may be unavailable. Check your connection.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const filteredSites = miningSites?.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSiteSelect = (site) => {
    setSelectedSite(site);
    setMapCenter([site.longitude, site.latitude]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-900 to-amber-900">
      {/* Header */}
      <header className="border-b border-stone-700 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Mountain className="h-8 w-8 text-amber-500" />
                <Pickaxe className="absolute -bottom-1 -right-1 h-4 w-4 text-stone-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TerraScan</h1>
                <p className="text-sm text-stone-400">Real-Time Mining Site Locator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">Live Data</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiManager(true)}
                className="border-stone-600 text-stone-300 hover:bg-stone-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                API Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <Card className="bg-stone-800/50 border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-stone-100 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-amber-500" />
                  Search Sites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search mining sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-stone-900 border-stone-600 text-stone-100 placeholder-stone-400"
                />
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="bg-stone-800/50 border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-stone-100">Data Layers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { id: 'mining', label: 'Mining Sites', color: 'bg-amber-500' },
                    { id: 'geological', label: 'Geological Features', color: 'bg-green-500' },
                    { id: 'seismic', label: 'Seismic Activity', color: 'bg-red-500' },
                    { id: 'weather', label: 'Weather Data', color: 'bg-blue-500' }
                  ].map(filter => (
                    <div key={filter.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={filter.id}
                        checked={activeFilters.includes(filter.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setActiveFilters([...activeFilters, filter.id]);
                          } else {
                            setActiveFilters(activeFilters.filter(f => f !== filter.id));
                          }
                        }}
                        className="rounded border-stone-600"
                      />
                      <label htmlFor={filter.id} className="text-stone-300 text-sm flex items-center">
                        <div className={`w-3 h-3 rounded-full ${filter.color} mr-2`} />
                        {filter.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-stone-800/50 border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-stone-100">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Total Sites</span>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
                      {filteredSites.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Active Mines</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {filteredSites.filter(s => s.status === 'active').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Data Sources</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      4
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-stone-800/50 border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-stone-100 flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                    Global Mining Map
                  </span>
                  {isLoading && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      Loading...
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <InteractiveMap
                  sites={filteredSites}
                  center={mapCenter}
                  onSiteSelect={handleSiteSelect}
                  selectedSite={selectedSite}
                  activeFilters={activeFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="sites" className="h-full">
              <TabsList className="grid w-full grid-cols-2 bg-stone-800 border-stone-700">
                <TabsTrigger value="sites" className="text-stone-300 data-[state=active]:bg-stone-700">
                  Sites
                </TabsTrigger>
                <TabsTrigger value="details" className="text-stone-300 data-[state=active]:bg-stone-700">
                  Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sites" className="mt-4 h-full">
                <MiningSiteList
                  sites={filteredSites}
                  onSiteSelect={handleSiteSelect}
                  selectedSite={selectedSite}
                />
              </TabsContent>
              
              <TabsContent value="details" className="mt-4 h-full">
                <SiteDetailsPanel site={selectedSite} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* API Key Manager Modal */}
      {showApiManager && (
        <ApiKeyManager onClose={() => setShowApiManager(false)} />
      )}
    </div>
  );
};

export default Index;
