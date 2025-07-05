import React, { useState } from 'react';
import { Calendar, Target, Dumbbell, Zap, Timer } from 'lucide-react';
import { Macrocycle, Workout } from '../types';

interface DashboardProps {
  macrocycle: Macrocycle | null;
  recentWorkouts: Workout[];
  onUpdateWorkout: (workout: Workout) => void;
}

export function Dashboard({ macrocycle, recentWorkouts, onUpdateWorkout }: DashboardProps) {
  const currentMesocycle = macrocycle && macrocycle.currentMesocycle != null ? macrocycle.mesocycles[macrocycle.currentMesocycle] : undefined;
  const currentWeek = currentMesocycle?.weeks.find(w => w.week === macrocycle?.currentWeek);
  
  const completedWorkoutsThisWeek = recentWorkouts.filter(w => {
    const workoutDate = new Date(w.date);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return workoutDate >= weekStart && w.completed;
  }).length;

  // Calculate hypertrophy-specific metrics
  const weeklyVolume = recentWorkouts
    .filter(w => {
      const workoutDate = new Date(w.date);
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      return workoutDate >= weekStart && w.completed;
    })
    .reduce((total, workout) => {
      return total + workout.exercises.reduce((workoutTotal, exercise) => {
        return workoutTotal + exercise.sets.reduce((exerciseTotal, set) => {
          return exerciseTotal + (set.completed ? set.reps * set.weight : 0);
        }, 0);
      }, 0);
    }, 0);

  const getIntensityZoneDisplay = (zone: string) => {
    switch (zone) {
      case 'hypertrophy':
        return { text: 'Hypertrophy Zone', color: 'text-emerald-600', bg: 'bg-emerald-100' };
      case 'metabolic':
        return { text: 'Metabolic Focus', color: 'text-orange-600', bg: 'bg-orange-100' };
      case 'specialization':
        return { text: 'Growth Specialization', color: 'text-purple-600', bg: 'bg-purple-100' };
      case 'recovery':
        return { text: 'Recovery Phase', color: 'text-blue-600', bg: 'bg-blue-100' };
      default:
        return { text: 'Training Phase', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const intensityDisplay = currentWeek ? getIntensityZoneDisplay(currentWeek.intensityZone) : null;

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editDate, setEditDate] = useState<string>("");

  const openWorkoutModal = (workout: Workout) => {
    setSelectedWorkout(workout);
    setEditDate(workout.date);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
    setEditDate("");
  };
  const handleSaveDate = () => {
    if (selectedWorkout && editDate) {
      onUpdateWorkout({ ...selectedWorkout, date: editDate });
      closeModal();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Hypertrophy Training Dashboard</h1>
        <p className="text-emerald-100">Track your muscle building progress with science-based periodization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Phase</p>
              <p className="text-xl font-bold text-gray-900">
                {currentMesocycle?.name || 'No Active Cycle'}
              </p>
              {intensityDisplay && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${intensityDisplay.bg} ${intensityDisplay.color}`}>
                  {intensityDisplay.text}
                </span>
              )}
            </div>
            <Calendar className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Training Week</p>
              <p className="text-2xl font-bold text-gray-900">
                Week {macrocycle?.currentWeek || 0}
              </p>
              <p className="text-sm text-gray-500">
                {currentWeek?.isDeload ? 'Deload Week' : `${((currentWeek?.volumeMultiplier || 1) * 100).toFixed(0)}% Volume`}
              </p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(weeklyVolume / 1000)}k
              </p>
              <p className="text-sm text-gray-500">lbs total</p>
            </div>
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{completedWorkoutsThisWeek}</p>
              <p className="text-sm text-gray-500">this week</p>
            </div>
            <Dumbbell className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {macrocycle && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Hypertrophy Macrocycle: {macrocycle.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Primary Goal</h3>
              <p className="text-sm text-gray-600">{macrocycle.goal}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Timeline</h3>
              <p className="text-sm text-gray-600">
                {new Date(macrocycle.startDate).toLocaleDateString()} - {new Date(macrocycle.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Mesocycle Progression</h3>
            <div className="space-y-3">
              {macrocycle.mesocycles.map((mesocycle, index) => {
                const isActive = index === macrocycle.currentMesocycle;
                const isCompleted = index < macrocycle.currentMesocycle;
                
                return (
                  <div key={mesocycle.id} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-emerald-500' :
                      isActive ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {mesocycle.name}
                      </p>
                      <p className="text-xs text-gray-500">{mesocycle.focus}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {mesocycle.weeks.length} weeks
                    </div>
                    {isActive && (
                      <div className="flex items-center space-x-1">
                        <Timer className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-blue-600">Active</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {recentWorkouts.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Training Sessions</h2>
          <div className="space-y-3">
            {recentWorkouts.slice(0, 5).map((workout) => (
              <button
                key={workout.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 w-full text-left hover:bg-gray-50 focus:outline-none"
                onClick={() => openWorkoutModal(workout)}
              >
                <div>
                  <p className="font-medium text-gray-700">{workout.name}</p>
                  <p className="text-sm text-gray-500">{workout.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {workout.volumeLoad && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {Math.round(workout.volumeLoad / 1000)}k lbs
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    workout.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {workout.completed ? 'Completed' : 'In Progress'}
                  </span>
                  {workout.duration && (
                    <span className="text-sm text-gray-500">{workout.duration}min</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          {/* Workout Log Modal */}
          {showModal && selectedWorkout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-semibold mb-2">{selectedWorkout.name}</h3>
                <div className="flex items-center mb-4 space-x-2">
                  <label htmlFor="edit-date" className="text-sm text-gray-500">Date:</label>
                  <input
                    id="edit-date"
                    type="date"
                    className="border rounded px-2 py-1 text-sm"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                  />
                  <button
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    onClick={handleSaveDate}
                  >
                    Save
                  </button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedWorkout.exercises.map((exercise, idx) => (
                    <div key={exercise.exerciseId + idx} className="border-b pb-2 mb-2">
                      <p className="font-medium text-gray-800">{exercise.exerciseId}</p>
                      {exercise.notes && <p className="text-xs text-gray-500 mb-1">Notes: {exercise.notes}</p>}
                      <table className="w-full text-xs text-left mt-1">
                        <thead>
                          <tr className="text-gray-500">
                            <th className="pr-2">Set</th>
                            <th className="pr-2">Reps</th>
                            <th className="pr-2">Weight</th>
                            <th className="pr-2">RPE</th>
                            <th className="pr-2">Done</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exercise.sets.map((set, setIdx) => (
                            <tr key={setIdx}>
                              <td className="pr-2">{setIdx + 1}</td>
                              <td className="pr-2">{set.reps}</td>
                              <td className="pr-2">{set.weight}</td>
                              <td className="pr-2">{set.rpe ?? '-'}</td>
                              <td className="pr-2">{set.completed ? '✔️' : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}