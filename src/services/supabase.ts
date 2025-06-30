import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          date: string;
          duration?: number;
          notes?: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          name: string;
          date: string;
          duration?: number;
          notes?: string;
          completed: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          date?: string;
          duration?: number;
          notes?: string;
          completed?: boolean;
        };
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          notes?: string;
          created_at: string;
        };
        Insert: {
          workout_id: string;
          exercise_id: string;
          notes?: string;
        };
        Update: {
          workout_id?: string;
          exercise_id?: string;
          notes?: string;
        };
      };
      workout_sets: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          set_number: number;
          reps: number;
          weight: number;
          rpe?: number;
          completed: boolean;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          workout_id: string;
          exercise_id: string;
          set_number: number;
          reps: number;
          weight: number;
          rpe?: number;
          completed: boolean;
          timestamp: string;
        };
        Update: {
          workout_id?: string;
          exercise_id?: string;
          set_number?: number;
          reps?: number;
          weight?: number;
          rpe?: number;
          completed?: boolean;
          timestamp?: string;
        };
      };
      ai_recommendations: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          exercise_id?: string;
          reason: string;
          confidence: number;
          priority: string;
          applied: boolean;
          applied_at?: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          exercise_id?: string;
          reason: string;
          confidence: number;
          priority: string;
          applied?: boolean;
          applied_at?: string;
        };
        Update: {
          user_id?: string;
          type?: string;
          exercise_id?: string;
          reason?: string;
          confidence?: number;
          priority?: string;
          applied?: boolean;
          applied_at?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          category: string;
          primary_muscles: string[];
          secondary_muscles: string[];
          equipment: string;
          instructions: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          category: string;
          primary_muscles: string[];
          secondary_muscles: string[];
          equipment: string;
          instructions: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          primary_muscles?: string[];
          secondary_muscles?: string[];
          equipment?: string;
          instructions?: string;
        };
      };
    };
  };
};