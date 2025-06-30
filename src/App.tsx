import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { MacrocycleSetup } from './components/MacrocycleSetup';
import { ProgramManager } from './components/ProgramManager';
import { WorkoutLogger } from './components/WorkoutLogger';
import { Analytics } from './components/Analytics';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Macrocycle, Workout, TrainingProgram } from './types';
import { trainingPrograms } from './data/programs';
import { Plus, Play } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [macrocycle, setMacrocycle] = useLocalStorage<Macrocycle | null>('macrocycle', null);
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', []);
  const [activeProgram, setActiveProgram] = useLocalStorage<TrainingProgram | null>('activeProgram', null);
  
  const [showMacrocycleSetup, setShowMacrocycleSetup] = useState(false);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

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

  const handleCreateMacrocycle = (newMacrocycle: Macrocycle) => {
    setMacrocycle(newMacrocycle);
    setShowMacrocycleSetup(false);
  };

  const handleSaveWorkout = (workout: Workout) => {
    const updatedWorkouts = workouts.some(w => w.id === workout.id)
      ? workouts.map(w => w.id === workout.id ? workout : w)
      : [...workouts, workout];
    
    setWorkouts(updatedWorkouts);
    setShowWorkoutLogger(false);
    setCurrentWorkout(null);
  };

  const handleSelectProgram = (program: TrainingProgram) => {
    setActiveProgram(program);
  };

  const startWorkout = (sessionName?: string) => {
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: sessionName || 'New Workout',
      date: new Date().toISOString().split('T')[0],
      exercises: [],
      completed: false
    };
    
    setCurrentWorkout(newWorkout);
    setShowWorkoutLogger(true);
  };

  const startProgramWorkout = (sessionIndex: number) => {
    if (!activeProgram) return;
    
    const session = activeProgram.sessions[sessionIndex];
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: session.name,
      date: new Date().toISOString().split('T')[0],
      exercises: session.exercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        sets: Array(getAdjustedSets(exercise.sets)).fill(null).map(() => ({
          reps: parseInt(exercise.repRange.split('-')[0]) || 8,
          weight: 0,
          rpe: exercise.rpe,
          completed: false
        })),
        notes: exercise.notes || ''
      })),
      completed: false
    };
    
    setCurrentWorkout(newWorkout);
    setShowWorkoutLogger(true);
  };

  const recentWorkouts = workouts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const completedWorkouts = workouts.filter(w => w.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <Dashboard
              macrocycle={macrocycle}
              recentWorkouts={recentWorkouts}
              totalWorkouts={completedWorkouts.length}
            />
            
            {!macrocycle && (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to start your hypertrophy journey?
                </h2>
                <p className="text-gray-600 mb-6">
                  Create your first macrocycle to begin structured training with progressive overload
                </p>
                <button
                  onClick={() => setShowMacrocycleSetup(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Macrocycle</span>
                </button>
              </div>
            )}

            {macrocycle && !activeProgram && (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Training Program
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose a high-frequency program that matches your training goals and schedule
                </p>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Browse Programs</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'programs' && (
          <ProgramManager
            activeProgram={activeProgram}
            onSelectProgram={handleSelectProgram}
            macrocycle={macrocycle}
          />
        )}
        
        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Workout Hub</h1>
              <p className="text-orange-100">Log your training sessions and track your progress</p>
            </div>

            {activeProgram ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeProgram.sessions.map((session, index) => {
                  // Calculate total adjusted sets for this session
                  const totalAdjustedSets = session.exercises.reduce((total, exercise) => 
                    total + getAdjustedSets(exercise.sets), 0
                  );
                  const totalBaseSets = session.exercises.reduce((total, exercise) => 
                    total + exercise.sets, 0
                  );
                  const isAdjusted = totalAdjustedSets !== totalBaseSets;
                  
                  return (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.name}</h3>
                      <div className="space-y-1 mb-4">
                        <p className="text-gray-600 text-sm">
                          {session.exercises.length} exercises
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className={isAdjusted ? 'text-purple-600 font-medium' : ''}>
                            {totalAdjustedSets} total sets
                          </span>
                          {isAdjusted && (
                            <span className="text-xs text-gray-500 ml-1">
                              (adjusted from {totalBaseSets})
                            </span>
                          )}
                        </p>
                        {macrocycle && (
                          <p className="text-xs text-purple-600">
                            Week {macrocycle.currentWeek} volume adjustment active
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => startProgramWorkout(index)}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Workout</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Active Program
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a training program to access structured workouts
                </p>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Choose Program</span>
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Start</h2>
                <button
                  onClick={() => startWorkout()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Custom Workout</span>
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Start a custom workout session or follow your program structure
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <Analytics
            workouts={workouts}
            macrocycle={macrocycle}
          />
        )}
      </main>

      {showMacrocycleSetup && (
        <MacrocycleSetup
          onCreateMacrocycle={handleCreateMacrocycle}
          onClose={() => setShowMacrocycleSetup(false)}
        />
      )}

      {showWorkoutLogger && (
        <WorkoutLogger
          workout={currentWorkout}
          onSave={handleSaveWorkout}
          onClose={() => {
            setShowWorkoutLogger(false);
            setCurrentWorkout(null);
          }}
        />
      )}
    </div>
  );
}

export default App;