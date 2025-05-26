
import { useQuery } from '@tanstack/react-query';

const generateMockSites = (center, filters) => {
  const sites = [];
  const [centerLng, centerLat] = center;
  
  // Generate sites based on active filters
  if (filters.includes('mining')) {
    const miningTypes = ['gold', 'copper', 'iron', 'coal', 'diamond', 'silver', 'platinum'];
    for (let i = 0; i < 25; i++) {
      const type = miningTypes[Math.floor(Math.random() * miningTypes.length)];
      sites.push({
        id: `mining-${i}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Mine ${i + 1}`,
        type,
        category: 'mining',
        latitude: centerLat + (Math.random() - 0.5) * 20,
        longitude: centerLng + (Math.random() - 0.5) * 40,
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
    for (let i = 0; i < 15; i++) {
      sites.push({
        id: `geological-${i}`,
        name: `Geological Formation ${i + 1}`,
        type: 'geological',
        category: 'geological',
        latitude: centerLat + (Math.random() - 0.5) * 20,
        longitude: centerLng + (Math.random() - 0.5) * 40,
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
    for (let i = 0; i < 8; i++) {
      sites.push({
        id: `seismic-${i}`,
        name: `Seismic Station ${i + 1}`,
        type: 'seismic',
        category: 'seismic',
        latitude: centerLat + (Math.random() - 0.5) * 15,
        longitude: centerLng + (Math.random() - 0.5) * 30,
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

export const useMiningSites = (center, filters) => {
  return useQuery({
    queryKey: ['mining-sites', center, filters],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch from multiple APIs:
      // 1. OpenStreetMap/Overpass API for mining sites
      // 2. USGS API for geological data
      // 3. OpenWeatherMap for environmental data
      // 4. Various geological survey APIs
      
      return generateMockSites(center, filters);
    },
    refetchInterval: 30000, // Refetch every 30 seconds for "real-time" data
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};
