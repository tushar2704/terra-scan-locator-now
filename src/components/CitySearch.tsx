
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CitySearch = ({ onCitySearch, onRecommendationSelect }) => {
  const [cityName, setCityName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { toast } = useToast();

  const searchCity = async () => {
    if (!cityName.trim()) {
      toast({
        title: "Enter City Name",
        description: "Please enter a city name to search for mining opportunities.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate city geocoding and mining potential analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRecommendations = generateMiningRecommendations(cityName);
      setRecommendations(mockRecommendations);
      
      if (mockRecommendations.length > 0) {
        // Center map on the first recommendation
        onCitySearch(mockRecommendations[0].coordinates, cityName);
        
        toast({
          title: "Mining Sites Found",
          description: `Found ${mockRecommendations.length} potential mining opportunities near ${cityName}.`,
        });
      } else {
        toast({
          title: "No Sites Found",
          description: `No suitable mining sites found near ${cityName}. Try a different location.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search for mining sites. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const generateMiningRecommendations = (city) => {
    const baseLat = 40 + Math.random() * 20;
    const baseLng = -100 + Math.random() * 40;
    
    const mineralTypes = ['gold', 'copper', 'iron', 'coal', 'silver', 'diamond'];
    const recommendations = [];
    
    for (let i = 0; i < 6; i++) {
      const mineral = mineralTypes[i % mineralTypes.length];
      recommendations.push({
        id: `rec-${i}`,
        name: `${mineral.charAt(0).toUpperCase() + mineral.slice(1)} Prospect ${i + 1}`,
        mineral,
        coordinates: [
          baseLng + (Math.random() - 0.5) * 2,
          baseLat + (Math.random() - 0.5) * 2
        ],
        distance: Math.floor(Math.random() * 50) + 5,
        potential: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        confidence: Math.floor(Math.random() * 30) + 70,
        geologicalFactor: ['Favorable rock formations', 'Historical mining activity', 'Mineral-rich soil samples', 'Geological surveys indicate potential'][Math.floor(Math.random() * 4)],
        estimatedValue: `$${Math.floor(Math.random() * 50) + 10}M`,
        accessRating: ['Easy', 'Moderate', 'Difficult'][Math.floor(Math.random() * 3)]
      });
    }
    
    return recommendations.sort((a, b) => b.confidence - a.confidence);
  };

  const getPotentialColor = (potential) => {
    switch (potential) {
      case 'High': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getMineralColor = (mineral) => {
    switch (mineral) {
      case 'gold': return 'text-yellow-500';
      case 'copper': return 'text-orange-500';
      case 'iron': return 'text-red-500';
      case 'coal': return 'text-gray-500';
      case 'silver': return 'text-slate-300';
      case 'diamond': return 'text-purple-300';
      default: return 'text-amber-500';
    }
  };

  return (
    <Card className="bg-stone-800/50 border-stone-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-stone-100 flex items-center">
          <Search className="h-5 w-5 mr-2 text-amber-500" />
          Mining Opportunity Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter city name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchCity()}
            className="bg-stone-900 border-stone-600 text-stone-100 placeholder-stone-400"
            disabled={isSearching}
          />
          <Button
            onClick={searchCity}
            disabled={isSearching}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isSearching ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h4 className="text-stone-200 font-semibold text-sm">Recommended Sites:</h4>
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onRecommendationSelect(rec)}
                className="p-3 rounded-lg border border-stone-600 bg-stone-900/50 cursor-pointer hover:bg-stone-700/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className={`h-4 w-4 ${getMineralColor(rec.mineral)}`} />
                    <h5 className="font-semibold text-stone-100 text-sm">{rec.name}</h5>
                  </div>
                  <Badge variant="secondary" className={getPotentialColor(rec.potential)}>
                    {rec.potential}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Distance:</span>
                    <span className="text-stone-300">{rec.distance}km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Confidence:</span>
                    <span className="text-stone-300">{rec.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Est. Value:</span>
                    <span className="text-green-400">{rec.estimatedValue}</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-stone-500">{rec.geologicalFactor}</p>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs border-stone-600 text-stone-400">
                    Access: {rec.accessRating}
                  </Badge>
                  <div className="flex items-center text-xs text-stone-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    AI Recommended
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CitySearch;
