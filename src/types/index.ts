export interface Exercise {
  id: string;
  name: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  instructions: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  rpe?: number;
  completed: boolean;
  restTime?: number; // seconds
  tempo?: string; // e.g., "3-1-2-1" for eccentric-pause-concentric-pause
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
  technique?: 'standard' | 'drop_set' | 'rest_pause' | 'cluster' | 'mechanical_drop';
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  duration?: number;
  notes?: string;
  completed: boolean;
  volumeLoad?: number; // total weight x reps
  intensityScore?: number; // average RPE
}

export interface MesocycleWeek {
  week: number;
  volumeMultiplier: number;
  intensityZone: 'recovery' | 'hypertrophy' | 'metabolic' | 'specialization' | 'strength' | 'power';
  isDeload: boolean;
  techniques?: string[]; // advanced techniques for this week
}

export interface Mesocycle {
  id: string;
  name: string;
  weeks: MesocycleWeek[];
  focus: string;
  startDate: string;
  endDate: string;
  primaryGoal: 'hypertrophy' | 'strength' | 'endurance' | 'power' | 'mixed';
  volumeProgression: 'linear' | 'undulating' | 'block';
}

export type MacrocycleType = 
  | 'pure_hypertrophy' 
  | 'powerbuilding' 
  | 'strength_focus' 
  | 'athletic_performance' 
  | 'body_recomposition';

export interface MacrocycleTemplate {
  type: MacrocycleType;
  name: string;
  description: string;
  primaryGoal: string;
  secondaryGoal?: string;
  targetAudience: string;
  duration: number; // weeks
  mesocycles: Omit<Mesocycle, 'id' | 'startDate' | 'endDate'>[];
  compatiblePrograms: string[]; // program type IDs
  volumeEmphasis: 'high' | 'moderate' | 'low';
  intensityEmphasis: 'high' | 'moderate' | 'low';
  frequencyRecommendation: number; // days per week
}

export interface Macrocycle {
  id: string;
  name: string;
  type: MacrocycleType;
  startDate: string;
  endDate: string;
  mesocycles: Mesocycle[];
  goal: string;
  currentMesocycle: number;
  currentWeek: number;
  primaryFocus: 'hypertrophy' | 'strength' | 'mixed' | 'athletic' | 'recomposition';
  targetMuscleGroups?: string[];
  customizations?: {
    volumeAdjustment: number; // percentage modifier
    intensityAdjustment: number; // percentage modifier
    frequencyPreference: number; // days per week
  };
}

export interface TrainingProgram {
  id: string;
  name: string;
  type: 'upper_lower' | 'push_pull_legs' | 'full_body' | 'bro_split' | 'classic_physique';
  frequency: number;
  primaryGoal: 'hypertrophy' | 'strength' | 'mixed' | 'athletic';
  compatibleMacrocycles: MacrocycleType[];
  sessions: {
    name: string;
    exercises: {
      exerciseId: string;
      sets: number;
      repRange: string;
      rpe: number;
      restTime?: number; // seconds
      technique?: string;
      notes?: string;
    }[];
  }[];
}

export interface VolumeTarget {
  muscleGroup: string;
  setsPerWeek: number;
  frequency: number;
  intensityRange: string;
}

export interface HypertrophyMetrics {
  weeklyVolume: number;
  volumeProgression: number;
  averageRPE: number;
  timeUnderTension: number;
  metabolicStress: number;
  mechanicalTension: number;
}