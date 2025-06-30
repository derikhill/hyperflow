import React, { useState } from 'react';
import { Plus, Calendar, Target, TrendingUp, Zap, Users, ArrowRight } from 'lucide-react';
import { Macrocycle, Mesocycle, MesocycleWeek, MacrocycleType } from '../types';
import { macrocycleTemplates, getMacrocycleTemplate } from '../data/macrocycleTemplates';

interface MacrocycleSetupProps {
  onCreateMacrocycle: (macrocycle: Macrocycle) => void;
  onClose: () => void;
}

export function MacrocycleSetup({ onCreateMacrocycle, onClose }: MacrocycleSetupProps) {
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [selectedType, setSelectedType] = useState<MacrocycleType | null>(null);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleTypeSelection = (type: MacrocycleType) => {
    setSelectedType(type);
    const template = getMacrocycleTemplate(type);
    if (template) {
      setName(template.name);
      setGoal(template.primaryGoal);
    }
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !goal || !startDate || !selectedType) return;

    const template = getMacrocycleTemplate(selectedType);
    if (!template) return;

    const start = new Date(startDate);
    let currentDate = new Date(start);
    
    // Calculate dates for each mesocycle
    const mesocyclesWithDates = template.mesocycles.map(mesocycle => {
      const mesocycleStart = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + (mesocycle.weeks.length * 7));
      const mesocycleEnd = new Date(currentDate);
      mesocycleEnd.setDate(mesocycleEnd.getDate() - 1);
      
      return {
        ...mesocycle,
        id: `mesocycle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        startDate: mesocycleStart.toISOString().split('T')[0],
        endDate: mesocycleEnd.toISOString().split('T')[0]
      };
    });

    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() - 1);

    const macrocycle: Macrocycle = {
      id: `macrocycle-${Date.now()}`,
      name,
      type: selectedType,
      goal,
      startDate,
      endDate: endDate.toISOString().split('T')[0],
      mesocycles: mesocyclesWithDates,
      currentMesocycle: 0,
      currentWeek: 1,
      primaryFocus: template.primaryGoal === 'hypertrophy' ? 'hypertrophy' : 
                   template.primaryGoal === 'strength' ? 'strength' :
                   template.primaryGoal === 'power' ? 'athletic' :
                   template.primaryGoal === 'endurance' ? 'recomposition' : 'mixed'
    };

    onCreateMacrocycle(macrocycle);
  };

  const getTypeIcon = (type: MacrocycleType) => {
    switch (type) {
      case 'pure_hypertrophy':
        return <TrendingUp className="w-8 h-8 text-emerald-600" />;
      case 'powerbuilding':
        return <Zap className="w-8 h-8 text-purple-600" />;
      case 'strength_focus':
        return <Target className="w-8 h-8 text-red-600" />;
      case 'athletic_performance':
        return <Users className="w-8 h-8 text-blue-600" />;
      case 'body_recomposition':
        return <Calendar className="w-8 h-8 text-orange-600" />;
      default:
        return <TrendingUp className="w-8 h-8 text-gray-600" />;
    }
  };

  const getTypeColor = (type: MacrocycleType) => {
    switch (type) {
      case 'pure_hypertrophy':
        return 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50';
      case 'powerbuilding':
        return 'border-purple-200 hover:border-purple-400 hover:bg-purple-50';
      case 'strength_focus':
        return 'border-red-200 hover:border-red-400 hover:bg-red-50';
      case 'athletic_performance':
        return 'border-blue-200 hover:border-blue-400 hover:bg-blue-50';
      case 'body_recomposition':
        return 'border-orange-200 hover:border-orange-400 hover:bg-orange-50';
      default:
        return 'border-gray-200 hover:border-gray-400 hover:bg-gray-50';
    }
  };

  const getIntensityZoneDescription = (zone: string) => {
    switch (zone) {
      case 'hypertrophy':
        return 'RPE 6-8, 8-15 reps, focus on muscle tension';
      case 'metabolic':
        return 'RPE 7-9, 10-20 reps, shorter rest, pump focus';
      case 'specialization':
        return 'RPE 8-9, advanced techniques, maximum volume';
      case 'strength':
        return 'RPE 7-9, 3-6 reps, heavy compound movements';
      case 'power':
        return 'RPE 6-8, 1-5 reps, explosive movements';
      case 'recovery':
        return 'RPE 4-6, light weights, movement quality';
      default:
        return '';
    }
  };

  const getIntensityColor = (zone: string, isDeload: boolean) => {
    if (isDeload) return 'bg-blue-100 text-blue-800';
    
    switch (zone) {
      case 'hypertrophy':
        return 'bg-emerald-100 text-emerald-800';
      case 'metabolic':
        return 'bg-orange-100 text-orange-800';
      case 'specialization':
        return 'bg-purple-100 text-purple-800';
      case 'strength':
        return 'bg-red-100 text-red-800';
      case 'power':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (step === 'type') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Training Focus</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Personalized Training Approach</h3>
            <p className="text-sm text-blue-700">
              Select the macrocycle type that best matches your primary training goals. Each type includes 
              scientifically-designed periodization with compatible training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macrocycleTemplates.map((template) => (
              <div
                key={template.type}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${getTypeColor(template.type)}`}
                onClick={() => handleTypeSelection(template.type)}
              >
                <div className="flex items-center justify-between mb-4">
                  {getTypeIcon(template.type)}
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Primary Goal:</span>
                    <span className="font-medium">{template.primaryGoal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{template.duration} weeks</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-medium">{template.frequencyRecommendation} days/week</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Volume:</span>
                    <span className="font-medium capitalize">{template.volumeEmphasis}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <strong>Target Audience:</strong> {template.targetAudience}
                </div>

                <div className="text-xs text-gray-500">
                  <strong>Compatible Programs:</strong> {template.compatiblePrograms.length} available
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedTemplate = selectedType ? getMacrocycleTemplate(selectedType) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setStep('type')}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Setup {selectedTemplate?.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {selectedTemplate && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              {getTypeIcon(selectedType!)}
              <div>
                <h3 className="font-semibold text-gray-800">{selectedTemplate.name}</h3>
                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium ml-2">{selectedTemplate.duration} weeks</span>
              </div>
              <div>
                <span className="text-gray-500">Volume:</span>
                <span className="font-medium ml-2 capitalize">{selectedTemplate.volumeEmphasis}</span>
              </div>
              <div>
                <span className="text-gray-500">Intensity:</span>
                <span className="font-medium ml-2 capitalize">{selectedTemplate.intensityEmphasis}</span>
              </div>
              <div>
                <span className="text-gray-500">Frequency:</span>
                <span className="font-medium ml-2">{selectedTemplate.frequencyRecommendation} days/week</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Macrocycle Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Spring 2024 Mass Building Phase"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Training Goal
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your specific goals for this training cycle..."
              required
            />
          </div>

          {selectedTemplate && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mesocycle Structure</h3>
              <div className="space-y-6">
                {selectedTemplate.mesocycles.map((mesocycle, mesocycleIndex) => (
                  <div key={mesocycleIndex} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-800">{mesocycle.name}</h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {mesocycle.weeks.length} weeks
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{mesocycle.focus}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {mesocycle.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={`p-3 rounded-lg text-center text-sm border-2 ${
                          week.isDeload 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="font-semibold text-gray-800 mb-1">Week {week.week}</div>
                          <div className={`text-xs px-2 py-1 rounded-full mb-2 ${
                            getIntensityColor(week.intensityZone, week.isDeload)
                          }`}>
                            {week.isDeload ? 'Recovery' : week.intensityZone}
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            {week.isDeload ? 'Deload' : `${(week.volumeMultiplier * 100).toFixed(0)}% volume`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getIntensityZoneDescription(week.intensityZone)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Training Principles:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedTemplate?.type === 'pure_hypertrophy' && (
                <>
                  <li>• <strong>Progressive Volume Overload:</strong> Systematic increase in training volume</li>
                  <li>• <strong>Metabolic Stress:</strong> Higher rep ranges and shorter rest periods</li>
                  <li>• <strong>Mechanical Tension:</strong> Focus on controlled reps and time under tension</li>
                  <li>• <strong>Recovery Optimization:</strong> Strategic deload weeks to prevent overreaching</li>
                </>
              )}
              {selectedTemplate?.type === 'powerbuilding' && (
                <>
                  <li>• <strong>Strength-Size Balance:</strong> Combine heavy lifting with volume work</li>
                  <li>• <strong>Block Periodization:</strong> Alternate between strength and hypertrophy phases</li>
                  <li>• <strong>Compound Focus:</strong> Emphasize big lifts with accessory support</li>
                  <li>• <strong>Progressive Overload:</strong> Increase both strength and muscle mass</li>
                </>
              )}
              {selectedTemplate?.type === 'strength_focus' && (
                <>
                  <li>• <strong>Specificity:</strong> Focus on squat, bench, and deadlift</li>
                  <li>• <strong>Intensity Progression:</strong> Gradual increase in training loads</li>
                  <li>• <strong>Technical Mastery:</strong> Perfect movement patterns under load</li>
                  <li>• <strong>Accessory Support:</strong> Build supporting muscle groups</li>
                </>
              )}
              {selectedTemplate?.type === 'athletic_performance' && (
                <>
                  <li>• <strong>Power Development:</strong> Convert strength to explosive power</li>
                  <li>• <strong>Movement Quality:</strong> Athletic movement patterns</li>
                  <li>• <strong>Periodized Approach:</strong> Build through strength to power</li>
                  <li>• <strong>Sport Specificity:</strong> Transfer to athletic performance</li>
                </>
              )}
              {selectedTemplate?.type === 'body_recomposition' && (
                <>
                  <li>• <strong>Metabolic Focus:</strong> High energy expenditure training</li>
                  <li>• <strong>Muscle Preservation:</strong> Maintain muscle during fat loss</li>
                  <li>• <strong>Training Density:</strong> More work in less time</li>
                  <li>• <strong>Recovery Balance:</strong> Manage stress during caloric deficit</li>
                </>
              )}
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setStep('type')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create {selectedTemplate?.name}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}