import React, { useState } from 'react';
import { Play, Calendar, Target, Users, TrendingUp, Filter } from 'lucide-react';
import { TrainingProgram, Macrocycle } from '../types';
import { trainingPrograms } from '../data/programs';
import { exerciseDatabase } from '../data/exercises';
import { getMacrocycleTemplate } from '../data/macrocycleTemplates';

interface ProgramManagerProps {
  activeProgram: TrainingProgram | null;
  onSelectProgram: (program: TrainingProgram) => void;
  macrocycle?: Macrocycle | null;
}

export function ProgramManager({ activeProgram, onSelectProgram, macrocycle }: ProgramManagerProps) {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  // Filter programs based on macrocycle compatibility
  const getFilteredPrograms = () => {
    if (!macrocycle) return trainingPrograms;
    
    return trainingPrograms.filter(program => 
      program.compatibleMacrocycles.includes(macrocycle.type)
    );
  };

  // Calculate adjusted sets based on current macrocycle week
  const getAdjustedSets = (baseSets: number): number => {
    if (!macrocycle) return baseSets;
    
    const currentMesocycle = macrocycle.mesocycles[macrocycle.currentMesocycle];
    const currentWeek = currentMesocycle?.weeks.find(w => w.week === macrocycle.currentWeek);
    
    if (!currentWeek) return baseSets;
    
    // Apply volume multiplier and round to nearest whole number
    const adjustedSets = Math.round(baseSets * currentWeek.volumeMultiplier);
    
    // Ensure minimum of 1 set, maximum reasonable limit
    return Math.max(1, Math.min(adjustedSets, baseSets + 3));
  };

  // Get current week info for display
  const getCurrentWeekInfo = () => {
    if (!macrocycle) return null;
    
    const currentMesocycle = macrocycle.mesocycles[macrocycle.currentMesocycle];
    const currentWeek = currentMesocycle?.weeks.find(w => w.week === macrocycle.currentWeek);
    
    return currentWeek ? {
      volumeMultiplier: currentWeek.volumeMultiplier,
      intensityZone: currentWeek.intensityZone,
      isDeload: currentWeek.isDeload,
      mesocycleName: currentMesocycle.name
    } : null;
  };

  const getProgramDescription = (program: TrainingProgram) => {
    switch (program.type) {
      case 'upper_lower':
        return 'Split training between upper and lower body sessions for balanced development';
      case 'push_pull_legs':
        return 'Divide workouts by movement patterns for optimal recovery and frequency';
      case 'full_body':
        return 'Train all major muscle groups in each session for maximum frequency';
      case 'bro_split':
        return 'Classic bodybuilding split focusing on specific muscle groups';
      default:
        return 'Customized training split for specific goals';
    }
  };

  const getProgramFrequencyText = (frequency: number) => {
    if (frequency <= 3) return 'Beginner friendly';
    if (frequency <= 4) return 'Intermediate level';
    if (frequency <= 5) return 'Advanced level';
    return 'Elite level';
  };

  const getIntensityZoneColor = (zone: string, isDeload: boolean) => {
    if (isDeload) return 'bg-blue-100 text-blue-700';
    
    switch (zone) {
      case 'hypertrophy':
        return 'bg-emerald-100 text-emerald-700';
      case 'metabolic':
        return 'bg-orange-100 text-orange-700';
      case 'specialization':
        return 'bg-purple-100 text-purple-700';
      case 'strength':
        return 'bg-red-100 text-red-700';
      case 'power':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getMacrocycleTypeDisplay = (type: string) => {
    switch (type) {
      case 'pure_hypertrophy':
        return 'Pure Hypertrophy';
      case 'powerbuilding':
        return 'Powerbuilding';
      case 'strength_focus':
        return 'Strength Focus';
      case 'athletic_performance':
        return 'Athletic Performance';
      case 'body_recomposition':
        return 'Body Recomposition';
      default:
        return 'Training';
    }
  };

  const currentWeekInfo = getCurrentWeekInfo();
  const filteredPrograms = getFilteredPrograms();
  const macrocycleTemplate = macrocycle ? getMacrocycleTemplate(macrocycle.type) : null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Training Programs</h1>
        <p className="text-emerald-100">
          {macrocycle 
            ? `${getMacrocycleTypeDisplay(macrocycle.type)} programs designed for your goals`
            : 'High-frequency programs designed for maximum results'
          }
        </p>
      </div>

      {/* Macrocycle Info */}
      {macrocycle && macrocycleTemplate && (
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Macrocycle: {macrocycle.name}</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {getMacrocycleTypeDisplay(macrocycle.type)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Week {macrocycle.currentWeek}</p>
                <p className="text-xs text-gray-500">{currentWeekInfo?.mesocycleName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {currentWeekInfo?.isDeload ? 'Deload' : `${(currentWeekInfo?.volumeMultiplier || 1) * 100}% Volume`}
                </p>
                <p className="text-xs text-gray-500">Current adjustment</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-700 capitalize">
                  {currentWeekInfo?.isDeload ? 'Recovery' : currentWeekInfo?.intensityZone}
                </p>
                <p className="text-xs text-gray-500">Focus zone</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">{filteredPrograms.length} Programs</p>
                <p className="text-xs text-gray-500">Compatible</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Showing compatible programs:</strong> Programs filtered to match your {getMacrocycleTypeDisplay(macrocycle.type)} goals. 
              Volume will auto-adjust to {(currentWeekInfo?.volumeMultiplier || 1) * 100}% for Week {macrocycle.currentWeek}.
            </p>
          </div>
        </div>
      )}

      {/* Current Week Volume Adjustment Info */}
      {macrocycle && currentWeekInfo && (
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Week Volume Adjustment</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              getIntensityZoneColor(currentWeekInfo.intensityZone, currentWeekInfo.isDeload)
            }`}>
              Week {macrocycle.currentWeek}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-700">Volume Multiplier</p>
                <p className="text-sm text-gray-600">
                  {currentWeekInfo.isDeload ? 'Deload Week' : `${(currentWeekInfo.volumeMultiplier * 100).toFixed(0)}% of base volume`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-700">Focus Zone</p>
                <p className="text-sm text-gray-600 capitalize">
                  {currentWeekInfo.isDeload ? 'Recovery' : currentWeekInfo.intensityZone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-700">Mesocycle</p>
                <p className="text-sm text-gray-600">{currentWeekInfo.mesocycleName}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>Auto-Adjustment Active:</strong> Program sets will be automatically adjusted to {(currentWeekInfo.volumeMultiplier * 100).toFixed(0)}% 
              of base volume for optimal {getMacrocycleTypeDisplay(macrocycle.type).toLowerCase()} progression.
            </p>
          </div>
        </div>
      )}

      {activeProgram && (
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Program</h2>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Current
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">{activeProgram.name}</h3>
              <p className="text-sm text-gray-500">{getProgramDescription(activeProgram)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{activeProgram.frequency} days/week</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{activeProgram.sessions.length} sessions</span>
            </div>
          </div>
        </div>
      )}

      {/* No Compatible Programs Warning */}
      {macrocycle && filteredPrograms.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Filter className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">No Compatible Programs Found</h3>
              <p className="text-sm text-yellow-700 mt-1">
                No programs are currently compatible with your {getMacrocycleTypeDisplay(macrocycle.type)} macrocycle. 
                Consider creating a new macrocycle or contact support for additional program options.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className={`bg-white rounded-lg p-6 shadow-md cursor-pointer transition-all hover:shadow-lg ${
              activeProgram?.id === program.id ? 'ring-2 ring-emerald-500' : ''
            }`}
            onClick={() => setSelectedProgram(program)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                  {program.frequency}x/week
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium capitalize">
                  {program.primaryGoal}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{getProgramDescription(program)}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Training Days:</span>
                <span className="font-medium">
                  {program.id === 'classic-physique-4day' ? '4-on, 1-off (rolling)' : `${program.frequency} per week`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Difficulty:</span>
                <span className="font-medium">
                  {program.id === 'classic-physique-4day' ? 'Intermediate/Advanced (rolling split)' : getProgramFrequencyText(program.frequency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sessions:</span>
                <span className="font-medium">{program.sessions.length}</span>
              </div>
              {macrocycle && currentWeekInfo && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Volume Adjustment:</span>
                  <span className="font-medium text-purple-600">
                    {(currentWeekInfo.volumeMultiplier * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProgram(program);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
              {activeProgram?.id !== program.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProgram(program);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm flex items-center space-x-1"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Program</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProgram.name}</h2>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Frequency</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedProgram.frequency}</p>
                <p className="text-sm text-gray-500">
                  {selectedProgram.id === 'classic-physique-4day' ? '4-on, 1-off (rolling)' : 'days per week'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">Sessions</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedProgram.sessions.length}</p>
                <p className="text-sm text-gray-500">unique workouts</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Goal</span>
                </div>
                <p className="text-lg font-bold text-gray-900 capitalize">{selectedProgram.primaryGoal}</p>
              </div>
            </div>

            {/* Volume Adjustment Notice */}
            {macrocycle && currentWeekInfo && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Current Week Adjustments</h4>
                <p className="text-sm text-purple-700">
                  Sets shown below are automatically adjusted to <strong>{(currentWeekInfo.volumeMultiplier * 100).toFixed(0)}%</strong> 
                  of base volume for Week {macrocycle.currentWeek} ({currentWeekInfo.mesocycleName}).
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Program Sessions</h3>
              {selectedProgram.sessions.map((session, sessionIndex) => (
                <div key={sessionIndex} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">{session.name}</h4>
                  <div className="space-y-2">
                    {session.exercises.map((exercise, exerciseIndex) => {
                      const exerciseInfo = exerciseDatabase.find(e => e.id === exercise.exerciseId);
                      const adjustedSets = getAdjustedSets(exercise.sets);
                      const isAdjusted = adjustedSets !== exercise.sets;
                      
                      return (
                        <div key={exerciseIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-700">
                              {exerciseInfo?.name || 'Unknown Exercise'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {exerciseInfo?.primaryMuscles.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">
                              <span className={isAdjusted ? 'text-purple-600 font-bold' : ''}>
                                {adjustedSets} sets
                              </span>
                              {isAdjusted && (
                                <span className="text-xs text-gray-500 ml-1">
                                  (was {exercise.sets})
                                </span>
                              )}
                              <span> × {exercise.repRange} reps</span>
                            </p>
                            <p className="text-xs text-gray-500">RPE {exercise.rpe}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              {activeProgram?.id !== selectedProgram.id && (
                <button
                  onClick={() => {
                    onSelectProgram(selectedProgram);
                    setSelectedProgram(null);
                  }}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start This Program</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}