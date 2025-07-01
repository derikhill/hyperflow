import { TrendingUp, Calendar, Dumbbell, Target } from 'lucide-react';
import { Workout, Macrocycle, Exercise } from '../types';
import { exerciseDatabase } from '../data/exercises';

interface AnalyticsProps {
  workouts: Workout[];
  macrocycle: Macrocycle | null;
}

export function Analytics({ workouts, macrocycle }: AnalyticsProps) {
  console.log('Analytics workouts prop:', workouts);
  const completedWorkouts = workouts.filter(w => w.completed);
  console.log('Completed workouts:', completedWorkouts);
  
  // Calculate weekly volume
  const getWeeklyVolume = () => {
    const weeklyData: { [week: string]: number } = {};
    
    completedWorkouts.forEach(workout => {
      const date = new Date(workout.date);
      const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
      
      let totalVolume = 0;
      workout.exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
          if (set.completed) {
            totalVolume += set.reps * set.weight;
          }
        });
      });
      
      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + totalVolume;
    });
    
    return Object.entries(weeklyData).slice(-8).map(([week, volume]) => ({
      week,
      volume
    }));
  };

  // Calculate muscle group frequency
  const getMuscleGroupFrequency = () => {
    const muscleGroupCount: { [muscle: string]: number } = {};
    
    completedWorkouts.forEach(workout => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      
      if (new Date(workout.date) >= weekStart) {
        workout.exercises.forEach(exercise => {
          const exerciseInfo = exerciseDatabase.find(e => e.id === exercise.exerciseId);
          if (exerciseInfo) {
            exerciseInfo.primaryMuscles.forEach(muscle => {
              muscleGroupCount[muscle] = (muscleGroupCount[muscle] || 0) + 1;
            });
          }
        });
      }
    });
    
    return Object.entries(muscleGroupCount).map(([muscle, frequency]) => ({
      muscle,
      frequency
    }));
  };

  // Calculate progress metrics
  const getProgressMetrics = () => {
    const currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 14);
    
    const currentWeekWorkouts = completedWorkouts.filter(w => 
      new Date(w.date) >= currentWeekStart
    );
    
    const lastWeekWorkouts = completedWorkouts.filter(w => 
      new Date(w.date) >= lastWeekStart && new Date(w.date) < currentWeekStart
    );
    
    const calculateTotalVolume = (workouts: Workout[]) => {
      return workouts.reduce((total, workout) => {
        return total + workout.exercises.reduce((workoutTotal, exercise) => {
          return workoutTotal + exercise.sets.reduce((exerciseTotal, set) => {
            return exerciseTotal + (set.completed ? set.reps * set.weight : 0);
          }, 0);
        }, 0);
      }, 0);
    };
    
    const currentVolume = calculateTotalVolume(currentWeekWorkouts);
    const lastVolume = calculateTotalVolume(lastWeekWorkouts);
    const volumeChange = lastVolume > 0 ? ((currentVolume - lastVolume) / lastVolume) * 100 : 0;
    
    return {
      currentWeekWorkouts: currentWeekWorkouts.length,
      lastWeekWorkouts: lastWeekWorkouts.length,
      currentVolume,
      lastVolume,
      volumeChange
    };
  };

  const weeklyVolume = getWeeklyVolume();
  console.log('Weekly volume:', weeklyVolume);
  const muscleGroupFrequency = getMuscleGroupFrequency();
  const progressMetrics = getProgressMetrics();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Training Analytics</h1>
        <p className="text-purple-100">Track your progress and optimize your training</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{progressMetrics.currentWeekWorkouts}</p>
              <p className="text-sm text-gray-500">Workouts</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(progressMetrics.currentVolume / 1000)}k
              </p>
              <p className={`text-sm ${
                progressMetrics.volumeChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {progressMetrics.volumeChange >= 0 ? '+' : ''}{progressMetrics.volumeChange.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{completedWorkouts.length}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <Dumbbell className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  completedWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / 
                  (completedWorkouts.length || 1)
                )}
              </p>
              <p className="text-sm text-gray-500">Minutes</p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Weekly Volume Chart */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Weekly Training Volume</h2>
        <div className="space-y-4">
          {weeklyVolume.length > 0 ? (
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between space-x-2">
                {weeklyVolume.map((data, index) => {
                  const maxVolume = Math.max(...weeklyVolume.map(d => d.volume));
                  const height = (data.volume / maxVolume) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                        style={{ height: `${height}%`, minHeight: '8px' }}
                        title={`${data.week}: ${Math.round(data.volume / 1000)}k lbs`}
                      />
                      <p className="text-xs text-gray-500 mt-2">{data.week}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Complete some workouts to see your volume progression</p>
            </div>
          )}
        </div>
      </div>

      {/* Muscle Group Frequency */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Weekly Muscle Group Frequency</h2>
        <div className="space-y-3">
          {muscleGroupFrequency.length > 0 ? (
            muscleGroupFrequency.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{data.muscle}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${Math.min(data.frequency / 3 * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{data.frequency}x</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Complete workouts this week to see muscle group frequency</p>
            </div>
          )}
        </div>
      </div>

      {/* Macrocycle Progress */}
      {macrocycle && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Macrocycle Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{macrocycle.name}</span>
              <span className="text-sm text-gray-500">
                Week {macrocycle.currentWeek} of {macrocycle.mesocycles.reduce((total, m) => total + m.weeks.length, 0)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{
                  width: `${(macrocycle.currentWeek / macrocycle.mesocycles.reduce((total, m) => total + m.weeks.length, 0)) * 100}%`
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {macrocycle.mesocycles.map((mesocycle, index) => (
                <div
                  key={mesocycle.id}
                  className={`p-3 rounded-lg border ${
                    index === macrocycle.currentMesocycle
                      ? 'border-blue-500 bg-blue-50'
                      : index < macrocycle.currentMesocycle
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <h4 className="font-medium text-gray-800">{mesocycle.name}</h4>
                  <p className="text-sm text-gray-600">{mesocycle.focus}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {mesocycle.weeks.length} weeks
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}