
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Zap, AlertTriangle } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const StatsDashboard = ({ sites, selectedSite, searchedCity }) => {
  const activeSites = sites.filter(s => s.status === 'active').length;
  const potentialSites = sites.filter(s => s.status === 'potential').length;
  const highPotentialSites = sites.filter(s => s.potential === 'High').length;
  
  const mineralTypes = [...new Set(sites.map(s => s.type))];
  const mostCommonMineral = mineralTypes.reduce((prev, current) => {
    const prevCount = sites.filter(s => s.type === prev).length;
    const currentCount = sites.filter(s => s.type === current).length;
    return currentCount > prevCount ? current : prev;
  }, mineralTypes[0] || 'None');

  const averageConfidence = sites.length > 0 
    ? Math.round(sites.reduce((sum, site) => sum + (site.confidence || 0), 0) / sites.length)
    : 0;

  const stats: StatItem[] = [
    {
      title: 'Total Sites',
      value: sites.length.toString(),
      icon: MapPin,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Active Mines',
      value: activeSites.toString(),
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'High Potential',
      value: highPotentialSites.toString(),
      icon: TrendingUp,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20'
    },
    {
      title: 'Avg Confidence',
      value: `${averageConfidence}%`,
      icon: AlertTriangle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <Card className="bg-stone-800/50 border-stone-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-stone-100 text-lg">Analytics Dashboard</CardTitle>
        {searchedCity && (
          <p className="text-stone-400 text-sm">Showing data for: {searchedCity}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="p-3 rounded-lg bg-stone-900/50 border border-stone-600">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <Badge variant="secondary" className={`${stat.bgColor} ${stat.color} text-xs`}>
                  {stat.value}
                </Badge>
              </div>
              <p className="text-stone-300 text-xs font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-stone-200 font-semibold text-sm">Quick Insights</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-400">Most Common:</span>
              <span className="text-stone-300 capitalize">{mostCommonMineral}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Mineral Types:</span>
              <span className="text-stone-300">{mineralTypes.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Success Rate:</span>
              <span className="text-green-400">
                {sites.length > 0 ? Math.round((activeSites / sites.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        {selectedSite && (
          <div className="pt-3 border-t border-stone-600">
            <h4 className="text-stone-200 font-semibold text-sm mb-2">Selected Site</h4>
            <div className="p-2 rounded bg-stone-900/50">
              <p className="text-stone-100 text-sm font-medium">{selectedSite.name}</p>
              <p className="text-stone-400 text-xs">{selectedSite.type} • {selectedSite.status}</p>
              {selectedSite.confidence && (
                <div className="flex items-center mt-1">
                  <div className="w-full bg-stone-700 rounded-full h-1.5 mr-2">
                    <div 
                      className="bg-amber-500 h-1.5 rounded-full" 
                      style={{ width: `${selectedSite.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-400">{selectedSite.confidence}%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsDashboard;
