
import { useQuery } from '@tanstack/react-query';

const generateMockSites = (center, filters, bounds = null) => {
  const sites = [];
  let [centerLng, centerLat] = center;
  
  // If bounds are provided, use them to generate sites within the visible area
  let latRange = 20;
  let lngRange = 40;
  
  if (bounds) {
    latRange = bounds.north - bounds.south;
    lngRange = bounds.east - bounds.west;
    centerLat = (bounds.north + bounds.south) / 2;
    centerLng = (bounds.east + bounds.west) / 2;
  }
  
  // Generate sites based on active filters
  if (filters.includes('mining')) {
    const miningTypes = ['gold', 'copper', 'iron', 'coal', 'diamond', 'silver', 'platinum'];
    const numSites = bounds ? Math.min(50, Math.max(15, Math.floor(latRange * lngRange * 0.5))) : 25;
    
    for (let i = 0; i < numSites; i++) {
      const type = miningTypes[Math.floor(Math.random() * miningTypes.length)];
      sites.push({
        id: `mining-${i}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Mine ${i + 1}`,
        type,
        category: 'mining',
        latitude: centerLat + (Math.random() - 0.5) * latRange,
        longitude: centerLng + (Math.random() - 0.5) * lngRange,
        status: Math.random() > 0.3 ? 'active' : 'inactive',
        distance: Math.floor(Math.random() * 500) + 10,
        depth: Math.floor(Math.random() * 800) + 50,
        production: `${Math.floor(Math.random() * 1000) + 100} tons/day`,
        reserves: `${Math.floor(Math.random() * 10000) + 1000} tons`,
        elevation: Math.floor(Math.random() * 2000) + 100,
        environmental: {
          temperature: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 60) + 20,
          airQuality: ['Good', 'Moderate', 'Poor'][Math.floor(Math.random() * 3)]
        },
        geological: {
          rockType: ['Igneous', 'Sedimentary', 'Metamorphic'][Math.floor(Math.random() * 3)],
          formation: ['Precambrian', 'Paleozoic', 'Mesozoic', 'Cenozoic'][Math.floor(Math.random() * 4)],
          seismicRisk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
        },
        lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        alerts: Math.random() > 0.8 ? [
          { message: 'Equipment maintenance scheduled', severity: 'info' },
          { message: 'Weather alert: Heavy rainfall expected', severity: 'warning' }
        ] : []
      });
    }
  }

  if (filters.includes('geological')) {
    const numSites = bounds ? Math.min(30, Math.max(8, Math.floor(latRange * lngRange * 0.3))) : 15;
    
    for (let i = 0; i < numSites; i++) {
      sites.push({
        id: `geological-${i}`,
        name: `Geological Formation ${i + 1}`,
        type: 'geological',
        category: 'geological',
        latitude: centerLat + (Math.random() - 0.5) * latRange,
        longitude: centerLng + (Math.random() - 0.5) * lngRange,
        status: 'active',
        distance: Math.floor(Math.random() * 300) + 5,
        elevation: Math.floor(Math.random() * 3000) + 200,
        geological: {
          rockType: ['Granite', 'Limestone', 'Sandstone', 'Shale'][Math.floor(Math.random() * 4)],
          formation: ['Precambrian', 'Paleozoic', 'Mesozoic'][Math.floor(Math.random() * 3)],
          seismicRisk: ['Low', 'Medium'][Math.floor(Math.random() * 2)]
        },
        lastUpdated: new Date(Date.now() - Math.random() * 43200000).toISOString()
      });
    }
  }

  if (filters.includes('seismic')) {
    const numSites = bounds ? Math.min(15, Math.max(3, Math.floor(latRange * lngRange * 0.2))) : 8;
    
    for (let i = 0; i < numSites; i++) {
      sites.push({
        id: `seismic-${i}`,
        name: `Seismic Station ${i + 1}`,
        type: 'seismic',
        category: 'seismic',
        latitude: centerLat + (Math.random() - 0.5) * latRange * 0.8,
        longitude: centerLng + (Math.random() - 0.5) * lngRange * 0.8,
        status: 'active',
        distance: Math.floor(Math.random() * 200) + 10,
        magnitude: (Math.random() * 3 + 1).toFixed(1),
        depth: Math.floor(Math.random() * 50) + 5,
        geological: {
          seismicRisk: ['Medium', 'High'][Math.floor(Math.random() * 2)]
        },
        lastUpdated: new Date(Date.now() - Math.random() * 21600000).toISOString(),
        alerts: Math.random() > 0.6 ? [
          { message: 'Minor seismic activity detected', severity: 'warning' }
        ] : []
      });
    }
  }

  return sites;
};

export const useMiningSites = (center, filters, bounds = null) => {
  return useQuery({
    queryKey: ['mining-sites', center, filters, bounds],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would fetch from multiple APIs based on viewport bounds:
      // 1. OpenStreetMap/Overpass API for mining sites within bounds
      // 2. USGS API for geological data within bounds
      // 3. OpenWeatherMap for environmental data within bounds
      // 4. Various geological survey APIs within bounds
      
      return generateMockSites(center, filters, bounds);
    },
    refetchInterval: 30000, // Refetch every 30 seconds for "real-time" data
    staleTime: 5000, // Consider data stale after 5 seconds for more responsive updates
  });
};
