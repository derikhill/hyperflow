import React from 'react';
import { Home, Calendar, Dumbbell, BarChart3, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'programs', name: 'Programs', icon: Calendar },
    { id: 'workout', name: 'Workout', icon: Dumbbell },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 py-4">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">HyperFlow</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-3 px-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium mt-1">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}