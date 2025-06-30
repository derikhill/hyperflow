import { supabase } from './supabase';
import { Workout, WorkoutExercise, Macrocycle } from '../types';

export interface TrainingRecommendation {
  type: 'weight_increase' | 'rep_increase' | 'deload' | 'exercise_swap' | 'volume_adjustment';
  exerciseId?: string;
  currentWeight?: number;
  recommendedWeight?: number;
  currentReps?: number;
  recommendedReps?: number;
  reason: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

export interface PerformanceMetrics {
  exerciseId: string;
  avgRpe: number;
  volumeProgression: number;
  strengthProgression: number;
  consistencyScore: number;
  fatigueIndicator: number;
}

class AITrainingService {
  // Store workout data for AI analysis
  async storeWorkoutData(workout: Workout, userId: string) {
    try {
      // Store main workout record
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .insert({
          id: workout.id,
          user_id: userId,
          name: workout.name,
          date: workout.date,
          duration: workout.duration,
          completed: workout.completed,
          notes: workout.notes
        });

      if (workoutError) throw workoutError;

      // Store exercise data with performance metrics
      for (const exercise of workout.exercises) {
        const { error: exerciseError } = await supabase
          .from('workout_exercises')
          .insert({
            workout_id: workout.id,
            exercise_id: exercise.exerciseId,
            notes: exercise.notes
          });

        if (exerciseError) throw exerciseError;

        // Store individual sets with detailed metrics
        for (let i = 0; i < exercise.sets.length; i++) {
          const set = exercise.sets[i];
          const { error: setError } = await supabase
            .from('workout_sets')
            .insert({
              workout_id: workout.id,
              exercise_id: exercise.exerciseId,
              set_number: i + 1,
              reps: set.reps,
              weight: set.weight,
              rpe: set.rpe,
              completed: set.completed,
              timestamp: new Date().toISOString()
            });

          if (setError) throw setError;
        }
      }

      // Trigger AI analysis after storing data
      await this.analyzePerformanceAndGenerateRecommendations(userId);
      
    } catch (error) {
      console.error('Error storing workout data:', error);
      throw error;
    }
  }

  // Analyze performance patterns and generate AI recommendations
  async analyzePerformanceAndGenerateRecommendations(userId: string): Promise<TrainingRecommendation[]> {
    try {
      // Get recent workout data for analysis
      const { data: recentWorkouts, error } = await supabase
        .from('workout_sets')
        .select(`
          *,
          workouts!inner(user_id, date, completed),
          exercises(name, category, primary_muscles)
        `)
        .eq('workouts.user_id', userId)
        .eq('workouts.completed', true)
        .gte('workouts.date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('workouts.date', { ascending: false });

      if (error) throw error;

      const recommendations: TrainingRecommendation[] = [];
      const exerciseMetrics = this.calculatePerformanceMetrics(recentWorkouts);

      // Generate recommendations based on performance patterns
      for (const [exerciseId, metrics] of Object.entries(exerciseMetrics)) {
        recommendations.push(...this.generateExerciseRecommendations(exerciseId, metrics));
      }

      // Store recommendations in database
      await this.storeRecommendations(userId, recommendations);

      return recommendations;
    } catch (error) {
      console.error('Error analyzing performance:', error);
      return [];
    }
  }

  // Calculate detailed performance metrics for each exercise
  private calculatePerformanceMetrics(workoutData: any[]): Record<string, PerformanceMetrics> {
    const exerciseGroups = workoutData.reduce((acc, set) => {
      if (!acc[set.exercise_id]) {
        acc[set.exercise_id] = [];
      }
      acc[set.exercise_id].push(set);
      return acc;
    }, {});

    const metrics: Record<string, PerformanceMetrics> = {};

    for (const [exerciseId, sets] of Object.entries(exerciseGroups) as [string, any[]][]) {
      const completedSets = sets.filter(s => s.completed);
      
      if (completedSets.length === 0) continue;

      // Calculate average RPE (fatigue indicator)
      const avgRpe = completedSets.reduce((sum, s) => sum + (s.rpe || 7), 0) / completedSets.length;

      // Calculate volume progression (weight * reps over time)
      const sortedSets = completedSets.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      const recentVolume = sortedSets.slice(-6).reduce((sum, s) => sum + (s.weight * s.reps), 0);
      const earlierVolume = sortedSets.slice(0, 6).reduce((sum, s) => sum + (s.weight * s.reps), 0);
      const volumeProgression = earlierVolume > 0 ? (recentVolume - earlierVolume) / earlierVolume : 0;

      // Calculate strength progression (max weight over time)
      const recentMaxWeight = Math.max(...sortedSets.slice(-6).map(s => s.weight));
      const earlierMaxWeight = Math.max(...sortedSets.slice(0, 6).map(s => s.weight));
      const strengthProgression = earlierMaxWeight > 0 ? (recentMaxWeight - earlierMaxWeight) / earlierMaxWeight : 0;

      // Calculate consistency score (how often they hit target reps)
      const consistencyScore = completedSets.filter(s => s.rpe <= 8.5).length / completedSets.length;

      // Fatigue indicator based on RPE trends
      const recentRpe = sortedSets.slice(-3).reduce((sum, s) => sum + (s.rpe || 7), 0) / 3;
      const fatigueIndicator = recentRpe > 8.5 ? 1 : recentRpe < 7 ? -1 : 0;

      metrics[exerciseId] = {
        exerciseId,
        avgRpe,
        volumeProgression,
        strengthProgression,
        consistencyScore,
        fatigueIndicator
      };
    }

    return metrics;
  }

  // Generate specific recommendations based on performance metrics
  private generateExerciseRecommendations(exerciseId: string, metrics: PerformanceMetrics): TrainingRecommendation[] {
    const recommendations: TrainingRecommendation[] = [];

    // Weight increase recommendation
    if (metrics.consistencyScore > 0.8 && metrics.avgRpe < 7.5 && metrics.fatigueIndicator <= 0) {
      recommendations.push({
        type: 'weight_increase',
        exerciseId,
        reason: `Consistent performance with low RPE (${metrics.avgRpe.toFixed(1)}) indicates readiness for weight increase`,
        confidence: 0.85,
        priority: 'high'
      });
    }

    // Rep increase recommendation
    if (metrics.consistencyScore > 0.7 && metrics.avgRpe < 8 && metrics.strengthProgression < 0.05) {
      recommendations.push({
        type: 'rep_increase',
        exerciseId,
        reason: `Good consistency but minimal strength gains - try increasing reps before adding weight`,
        confidence: 0.75,
        priority: 'medium'
      });
    }

    // Deload recommendation
    if (metrics.fatigueIndicator > 0 && metrics.avgRpe > 8.5 && metrics.volumeProgression < -0.1) {
      recommendations.push({
        type: 'deload',
        exerciseId,
        reason: `High fatigue (RPE ${metrics.avgRpe.toFixed(1)}) and declining volume indicate need for deload`,
        confidence: 0.9,
        priority: 'high'
      });
    }

    // Volume adjustment recommendation
    if (metrics.volumeProgression > 0.3 && metrics.avgRpe > 8) {
      recommendations.push({
        type: 'volume_adjustment',
        exerciseId,
        reason: `Rapid volume increase with high RPE - consider reducing sets to maintain quality`,
        confidence: 0.7,
        priority: 'medium'
      });
    }

    return recommendations;
  }

  // Store AI recommendations in database
  private async storeRecommendations(userId: string, recommendations: TrainingRecommendation[]) {
    try {
      const { error } = await supabase
        .from('ai_recommendations')
        .insert(
          recommendations.map(rec => ({
            user_id: userId,
            type: rec.type,
            exercise_id: rec.exerciseId,
            reason: rec.reason,
            confidence: rec.confidence,
            priority: rec.priority,
            created_at: new Date().toISOString(),
            applied: false
          }))
        );

      if (error) throw error;
    } catch (error) {
      console.error('Error storing recommendations:', error);
    }
  }

  // Get current recommendations for user
  async getRecommendations(userId: string): Promise<TrainingRecommendation[]> {
    try {
      const { data, error } = await supabase
        .from('ai_recommendations')
        .select(`
          *,
          exercises(name, category)
        `)
        .eq('user_id', userId)
        .eq('applied', false)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('priority', { ascending: false })
        .order('confidence', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }

  // Mark recommendation as applied
  async applyRecommendation(recommendationId: string) {
    try {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({ applied: true, applied_at: new Date().toISOString() })
        .eq('id', recommendationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error applying recommendation:', error);
    }
  }

  // Predict optimal deload timing based on fatigue patterns
  async predictDeloadTiming(userId: string): Promise<{ shouldDeload: boolean; weeksUntilDeload: number; confidence: number }> {
    try {
      const { data, error } = await supabase
        .from('workout_sets')
        .select(`
          rpe,
          weight,
          reps,
          workouts!inner(date, user_id)
        `)
        .eq('workouts.user_id', userId)
        .gte('workouts.date', new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString())
        .order('workouts.date', { ascending: true });

      if (error) throw error;

      // Analyze fatigue trends over the last 3 weeks
      const weeklyFatigue = this.calculateWeeklyFatigue(data);
      const fatigueSlope = this.calculateTrendSlope(weeklyFatigue);
      
      // Predict when fatigue will reach critical threshold
      const currentFatigue = weeklyFatigue[weeklyFatigue.length - 1];
      const criticalThreshold = 8.5;
      
      if (currentFatigue >= criticalThreshold) {
        return { shouldDeload: true, weeksUntilDeload: 0, confidence: 0.9 };
      }

      const weeksUntilDeload = Math.max(1, Math.ceil((criticalThreshold - currentFatigue) / fatigueSlope));
      const shouldDeload = weeksUntilDeload <= 1;
      const confidence = Math.min(0.95, 0.6 + (Math.abs(fatigueSlope) * 0.1));

      return { shouldDeload, weeksUntilDeload, confidence };
    } catch (error) {
      console.error('Error predicting deload timing:', error);
      return { shouldDeload: false, weeksUntilDeload: 4, confidence: 0.5 };
    }
  }

  private calculateWeeklyFatigue(data: any[]): number[] {
    const weeklyData: { [week: string]: number[] } = {};
    
    data.forEach(set => {
      const date = new Date(set.workouts.date);
      const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = [];
      }
      
      if (set.rpe) {
        weeklyData[weekKey].push(set.rpe);
      }
    });

    return Object.values(weeklyData).map(rpes => 
      rpes.reduce((sum, rpe) => sum + rpe, 0) / rpes.length
    );
  }

  private calculateTrendSlope(values: number[]): number {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + (i * val), 0);
    const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }
}

export const aiTrainingService = new AITrainingService();