import React, { useState } from 'react';
import { Plus, Save, Clock, CheckCircle, X } from 'lucide-react';
import { Workout, WorkoutExercise, WorkoutSet, Exercise } from '../types';
import { exerciseDatabase } from '../data/exercises';

interface WorkoutLoggerProps {
  workout: Workout | null;
  onSave: (workout: Workout) => void;
  onClose: () => void;
}

export function WorkoutLogger({ workout, onSave, onClose }: WorkoutLoggerProps) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout>(
    workout || {
      id: `workout-${Date.now()}`,
      name: 'New Workout',
      date: new Date().toISOString().split('T')[0],
      exercises: [],
      completed: false
    }
  );
  
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [exerciseFilter, setExerciseFilter] = useState('');
  const [startTime] = useState(Date.now());

  const addExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      sets: [{ reps: 0, weight: 0, completed: false }],
      notes: ''
    };
    
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
    setShowExerciseList(false);
    setExerciseFilter('');
  };

  const updateExercise = (exerciseIndex: number, updatedExercise: WorkoutExercise) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => i === exerciseIndex ? updatedExercise : ex)
    }));
  };

  const addSet = (exerciseIndex: number) => {
    const exercise = currentWorkout.exercises[exerciseIndex];
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: WorkoutSet = {
      reps: lastSet?.reps || 0,
      weight: lastSet?.weight || 0,
      completed: false
    };
    
    updateExercise(exerciseIndex, {
      ...exercise,
      sets: [...exercise.sets, newSet]
    });
  };

  const updateSet = (exerciseIndex: number, setIndex: number, updatedSet: WorkoutSet) => {
    const exercise = currentWorkout.exercises[exerciseIndex];
    updateExercise(exerciseIndex, {
      ...exercise,
      sets: exercise.sets.map((set, i) => i === setIndex ? updatedSet : set)
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const exercise = currentWorkout.exercises[exerciseIndex];
    if (exercise.sets.length > 1) {
      updateExercise(exerciseIndex, {
        ...exercise,
        sets: exercise.sets.filter((_, i) => i !== setIndex)
      });
    }
  };

  const removeExercise = (exerciseIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== exerciseIndex)
    }));
  };

  const handleSave = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    const workoutToSave = {
      ...currentWorkout,
      duration,
      completed: true
    };
    onSave(workoutToSave);
  };

  const filteredExercises = exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(exerciseFilter.toLowerCase()) ||
    exercise.category.toLowerCase().includes(exerciseFilter.toLowerCase()) ||
    exercise.primaryMuscles.some(muscle => 
      muscle.toLowerCase().includes(exerciseFilter.toLowerCase())
    )
  );

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="text"
                  value={currentWorkout.name}
                  onChange={(e) => setCurrentWorkout(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  <Clock className="inline w-4 h-4 mr-1" />
                  {Math.round((Date.now() - startTime) / 60000)} minutes
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Finish Workout</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-6">
            {currentWorkout.exercises.map((exercise, exerciseIndex) => {
              const exerciseInfo = exerciseDatabase.find(e => e.id === exercise.exerciseId);
              return (
                <div key={exerciseIndex} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exerciseInfo?.name || 'Unknown Exercise'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {exerciseInfo?.primaryMuscles.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeExercise(exerciseIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600 px-2">
                      <div className="col-span-2">Set</div>
                      <div className="col-span-3">Weight</div>
                      <div className="col-span-3">Reps</div>
                      <div className="col-span-2">RPE</div>
                      <div className="col-span-2">Done</div>
                    </div>
                    
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-2 text-center font-medium text-gray-700">
                          {setIndex + 1}
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            value={set.weight || ''}
                            onChange={(e) => updateSet(exerciseIndex, setIndex, {
                              ...set,
                              weight: parseFloat(e.target.value) || 0
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            value={set.reps || ''}
                            onChange={(e) => updateSet(exerciseIndex, setIndex, {
                              ...set,
                              reps: parseInt(e.target.value) || 0
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={set.rpe || ''}
                            onChange={(e) => updateSet(exerciseIndex, setIndex, {
                              ...set,
                              rpe: parseFloat(e.target.value) || undefined
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="1"
                            max="10"
                            step="0.5"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button
                            onClick={() => updateSet(exerciseIndex, setIndex, {
                              ...set,
                              completed: !set.completed
                            })}
                            className={`p-1 rounded-full ${
                              set.completed 
                                ? 'text-emerald-600 bg-emerald-100' 
                                : 'text-gray-400 hover:text-emerald-600'
                            }`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {exercise.sets.length > 1 && (
                            <button
                              onClick={() => removeSet(exerciseIndex, setIndex)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addSet(exerciseIndex)}
                    className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Set</span>
                  </button>

                  <div className="mt-4">
                    <textarea
                      value={exercise.notes || ''}
                      onChange={(e) => updateExercise(exerciseIndex, {
                        ...exercise,
                        notes: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Notes for this exercise..."
                      rows={2}
                    />
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setShowExerciseList(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Exercise</span>
            </button>
            <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Finish Workout</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                ></button>
              </div>
          </div>
        </div>

        {/* Exercise Selection Modal */}
        {showExerciseList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Exercise</h3>
                <button
                  onClick={() => setShowExerciseList(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <input
                type="text"
                value={exerciseFilter}
                onChange={(e) => setExerciseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search exercises..."
              />

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => addExercise(exercise)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="font-medium text-gray-900">{exercise.name}</div>
                    <div className="text-sm text-gray-500">
                      {exercise.primaryMuscles.join(', ')} • {exercise.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}