import { TrainingProgram } from '../types';

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'upper-lower-4day',
    name: 'Upper/Lower Hypertrophy',
    type: 'upper_lower',
    frequency: 4,
    primaryGoal: 'hypertrophy',
    compatibleMacrocycles: ['pure_hypertrophy', 'powerbuilding', 'strength_focus', 'athletic_performance', 'body_recomposition'],
    sessions: [
      {
        name: 'Upper Body A - Volume Focus',
        exercises: [
          { exerciseId: 'bench-press', sets: 4, repRange: '8-10', rpe: 7, restTime: 120, notes: 'Focus on controlled tempo' },
          { exerciseId: 'barbell-rows', sets: 4, repRange: '8-10', rpe: 7, restTime: 120 },
          { exerciseId: 'incline-db-press', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'lat-pulldowns', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'barbell-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'close-grip-bench', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Lower Body A - Quad Emphasis',
        exercises: [
          { exerciseId: 'squat', sets: 4, repRange: '8-10', rpe: 7, restTime: 180, notes: 'Deep range of motion' },
          { exerciseId: 'romanian-deadlift', sets: 4, repRange: '10-12', rpe: 7, restTime: 120 },
          { exerciseId: 'leg-press', sets: 3, repRange: '15-20', rpe: 8, restTime: 90, notes: 'High foot placement' },
          { exerciseId: 'leg-extensions', sets: 3, repRange: '15-20', rpe: 8, restTime: 60 },
          { exerciseId: 'walking-lunges', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'calf-raises', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 }
        ]
      },
      {
        name: 'Upper Body B - Pump Focus',
        exercises: [
          { exerciseId: 'incline-db-press', sets: 4, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'cable-rows', sets: 4, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'db-flyes', sets: 3, repRange: '12-15', rpe: 8, restTime: 75, technique: 'drop_set' },
          { exerciseId: 'pullover', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'lateral-raises', sets: 4, repRange: '15-20', rpe: 8, restTime: 45, technique: 'rest_pause' },
          { exerciseId: 'hammer-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'cable-tricep-pushdowns', sets: 3, repRange: '15-20', rpe: 8, restTime: 45 }
        ]
      },
      {
        name: 'Lower Body B - Posterior Chain',
        exercises: [
          { exerciseId: 'deadlift', sets: 3, repRange: '6-8', rpe: 8, restTime: 180, notes: 'Focus on hip hinge' },
          { exerciseId: 'squat', sets: 3, repRange: '12-15', rpe: 7, restTime: 120, notes: 'Lighter weight, higher reps' },
          { exerciseId: 'leg-curls', sets: 4, repRange: '12-15', rpe: 8, restTime: 75 },
          { exerciseId: 'leg-press', sets: 3, repRange: '20-25', rpe: 8, restTime: 90, notes: 'Low foot placement' },
          { exerciseId: 'seated-calf-raises', sets: 4, repRange: '20-25', rpe: 8, restTime: 45 }
        ]
      }
    ]
  },
  {
    id: 'ppl-6day',
    name: 'Push/Pull/Legs Hypertrophy',
    type: 'push_pull_legs',
    frequency: 6,
    primaryGoal: 'hypertrophy',
    compatibleMacrocycles: ['pure_hypertrophy', 'powerbuilding', 'body_recomposition'],
    sessions: [
      {
        name: 'Push A - Chest Focus',
        exercises: [
          { exerciseId: 'bench-press', sets: 4, repRange: '8-10', rpe: 7, restTime: 120 },
          { exerciseId: 'incline-db-press', sets: 4, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'pec-deck', sets: 3, repRange: '12-15', rpe: 8, restTime: 75 },
          { exerciseId: 'lateral-raises', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 },
          { exerciseId: 'close-grip-bench', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'overhead-tricep-ext', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Pull A - Width Focus',
        exercises: [
          { exerciseId: 'pull-ups', sets: 4, repRange: '8-12', rpe: 8, restTime: 120, notes: 'Wide grip' },
          { exerciseId: 'barbell-rows', sets: 4, repRange: '8-10', rpe: 7, restTime: 120 },
          { exerciseId: 'lat-pulldowns', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'cable-rows', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'rear-delt-flyes', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 },
          { exerciseId: 'barbell-curls', sets: 4, repRange: '10-12', rpe: 7, restTime: 75 },
          { exerciseId: 'hammer-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Legs A - Quad Dominant',
        exercises: [
          { exerciseId: 'squat', sets: 4, repRange: '8-10', rpe: 7, restTime: 180 },
          { exerciseId: 'leg-press', sets: 4, repRange: '12-15', rpe: 8, restTime: 120 },
          { exerciseId: 'leg-extensions', sets: 3, repRange: '15-20', rpe: 8, restTime: 75, technique: 'rest_pause' },
          { exerciseId: 'romanian-deadlift', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'leg-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'calf-raises', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 }
        ]
      }
    ]
  },
  {
    id: 'classic-physique-4day',
    name: 'Classic Physique Bro Split (4-on, 1-off)',
    type: 'bro_split',
    // 4-on, 1-off rolling schedule: train 4 days in a row, then rest 1 day, repeat. This means 5-6 days/week depending on calendar. Frequency is set to 0 and not used for this split.
    frequency: 0,
    primaryGoal: 'hypertrophy',
    compatibleMacrocycles: ['pure_hypertrophy', 'body_recomposition'],
    sessions: [
      {
        name: 'Abs/Back/Rear Delts - Width & Detail',
        exercises: [
          { exerciseId: 'hanging-leg-raises', sets: 4, repRange: '12-15', rpe: 8, restTime: 60 },
          { exerciseId: 'cable-crunches', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 },
          { exerciseId: 'pullover', sets: 4, repRange: '10-12', rpe: 8, restTime: 90, notes: 'Stretch focus' },
          { exerciseId: 'lat-pulldowns', sets: 4, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'barbell-rows', sets: 4, repRange: '8-10', rpe: 7, restTime: 120 },
          { exerciseId: 't-bar-rows', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'cable-rows', sets: 3, repRange: '15-20', rpe: 8, restTime: 75, technique: 'drop_set' },
          { exerciseId: 'rear-delt-flyes', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 }
        ]
      },
      {
        name: 'Calves/Chest/Front Delts - Mass & Shape',
        exercises: [
          { exerciseId: 'seated-calf-raises', sets: 4, repRange: '20-25', rpe: 8, restTime: 45 },
          { exerciseId: 'incline-db-press', sets: 4, repRange: '10-12', rpe: 7, restTime: 120 },
          { exerciseId: 'machine-press', sets: 4, repRange: '8-10', rpe: 8, restTime: 120 },
          { exerciseId: 'pec-deck', sets: 3, repRange: '12-15', rpe: 8, restTime: 75, technique: 'rest_pause' },
          { exerciseId: 'low-cable-flyes', sets: 3, repRange: '15-20', rpe: 8, restTime: 75 },
          { exerciseId: 'front-raises', sets: 4, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'calf-raises', sets: 4, repRange: '15-20', rpe: 8, restTime: 45 }
        ]
      },
      {
        name: 'Abs/Arms/Hamstrings - Detail & Separation',
        exercises: [
          { exerciseId: 'leg-raises', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 },
          { exerciseId: 'barbell-curls', sets: 4, repRange: '10-12', rpe: 7, restTime: 75 },
          { exerciseId: 'preacher-curls', sets: 3, repRange: '12-15', rpe: 8, restTime: 75 },
          { exerciseId: 'hammer-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'close-grip-bench', sets: 4, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'overhead-tricep-ext', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'cable-tricep-pushdowns', sets: 3, repRange: '15-20', rpe: 8, restTime: 60, technique: 'drop_set' },
          { exerciseId: 'romanian-deadlift', sets: 4, repRange: '10-12', rpe: 8, restTime: 120 },
          { exerciseId: 'leg-curls', sets: 4, repRange: '12-15', rpe: 8, restTime: 75 }
        ]
      },
      {
        name: 'Medial Delts/Calves/Quads - Size & Sweep',
        exercises: [
          { exerciseId: 'lateral-raises', sets: 5, repRange: '15-20', rpe: 8, restTime: 45, technique: 'rest_pause' },
          { exerciseId: 'cable-lateral-raises', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'upright-rows', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'calf-raises', sets: 5, repRange: '15-20', rpe: 8, restTime: 45 },
          { exerciseId: 'squat', sets: 4, repRange: '10-12', rpe: 7, restTime: 150 },
          { exerciseId: 'leg-press', sets: 4, repRange: '15-20', rpe: 8, restTime: 120 },
          { exerciseId: 'leg-extensions', sets: 4, repRange: '15-20', rpe: 8, restTime: 75, technique: 'drop_set' },
          { exerciseId: 'walking-lunges', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 }
        ]
      }
    ]
  },
  {
    id: 'powerbuilding-upper-lower',
    name: 'Powerbuilding Upper/Lower',
    type: 'upper_lower',
    frequency: 4,
    primaryGoal: 'mixed',
    compatibleMacrocycles: ['powerbuilding', 'strength_focus'],
    sessions: [
      {
        name: 'Upper Power - Strength Focus',
        exercises: [
          { exerciseId: 'bench-press', sets: 5, repRange: '3-5', rpe: 8, restTime: 180, notes: 'Heavy compound focus' },
          { exerciseId: 'barbell-rows', sets: 5, repRange: '3-5', rpe: 8, restTime: 180 },
          { exerciseId: 'overhead-press', sets: 4, repRange: '5-6', rpe: 7, restTime: 150 },
          { exerciseId: 'close-grip-bench', sets: 3, repRange: '6-8', rpe: 7, restTime: 120 },
          { exerciseId: 'barbell-curls', sets: 3, repRange: '8-10', rpe: 7, restTime: 90 }
        ]
      },
      {
        name: 'Lower Power - Strength Focus',
        exercises: [
          { exerciseId: 'squat', sets: 5, repRange: '3-5', rpe: 8, restTime: 240, notes: 'Competition style' },
          { exerciseId: 'deadlift', sets: 4, repRange: '3-5', rpe: 8, restTime: 240 },
          { exerciseId: 'leg-press', sets: 3, repRange: '8-10', rpe: 7, restTime: 120 },
          { exerciseId: 'leg-curls', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'calf-raises', sets: 4, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Upper Hypertrophy - Volume Focus',
        exercises: [
          { exerciseId: 'incline-db-press', sets: 4, repRange: '8-12', rpe: 7, restTime: 90 },
          { exerciseId: 'cable-rows', sets: 4, repRange: '8-12', rpe: 7, restTime: 90 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '10-15', rpe: 7, restTime: 75 },
          { exerciseId: 'lat-pulldowns', sets: 3, repRange: '10-15', rpe: 7, restTime: 75 },
          { exerciseId: 'db-flyes', sets: 3, repRange: '12-15', rpe: 8, restTime: 60 },
          { exerciseId: 'hammer-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'cable-tricep-pushdowns', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Lower Hypertrophy - Volume Focus',
        exercises: [
          { exerciseId: 'leg-press', sets: 4, repRange: '12-15', rpe: 7, restTime: 120 },
          { exerciseId: 'romanian-deadlift', sets: 4, repRange: '10-12', rpe: 7, restTime: 120 },
          { exerciseId: 'leg-extensions', sets: 3, repRange: '15-20', rpe: 8, restTime: 75 },
          { exerciseId: 'leg-curls', sets: 3, repRange: '15-20', rpe: 8, restTime: 75 },
          { exerciseId: 'walking-lunges', sets: 3, repRange: '12-15', rpe: 7, restTime: 90 },
          { exerciseId: 'seated-calf-raises', sets: 4, repRange: '15-20', rpe: 7, restTime: 45 }
        ]
      }
    ]
  },
  {
    id: 'athletic-full-body',
    name: 'Athletic Full Body',
    type: 'full_body',
    frequency: 3,
    primaryGoal: 'athletic',
    compatibleMacrocycles: ['athletic_performance'],
    sessions: [
      {
        name: 'Full Body A - Power Emphasis',
        exercises: [
          { exerciseId: 'squat', sets: 4, repRange: '3-5', rpe: 8, restTime: 180, notes: 'Explosive concentric' },
          { exerciseId: 'bench-press', sets: 4, repRange: '5-6', rpe: 7, restTime: 150 },
          { exerciseId: 'barbell-rows', sets: 3, repRange: '6-8', rpe: 7, restTime: 120 },
          { exerciseId: 'overhead-press', sets: 3, repRange: '6-8', rpe: 7, restTime: 120 },
          { exerciseId: 'romanian-deadlift', sets: 3, repRange: '8-10', rpe: 7, restTime: 90 },
          { exerciseId: 'planks', sets: 3, repRange: '30-60s', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Full Body B - Strength Emphasis',
        exercises: [
          { exerciseId: 'deadlift', sets: 4, repRange: '3-5', rpe: 8, restTime: 240 },
          { exerciseId: 'incline-db-press', sets: 4, repRange: '6-8', rpe: 7, restTime: 120 },
          { exerciseId: 'pull-ups', sets: 3, repRange: '6-10', rpe: 8, restTime: 120 },
          { exerciseId: 'leg-press', sets: 3, repRange: '8-12', rpe: 7, restTime: 90 },
          { exerciseId: 'db-shoulder-press', sets: 3, repRange: '8-10', rpe: 7, restTime: 90 },
          { exerciseId: 'hanging-leg-raises', sets: 3, repRange: '10-15', rpe: 7, restTime: 60 }
        ]
      },
      {
        name: 'Full Body C - Hypertrophy Emphasis',
        exercises: [
          { exerciseId: 'leg-press', sets: 4, repRange: '10-15', rpe: 7, restTime: 120 },
          { exerciseId: 'db-flyes', sets: 3, repRange: '12-15', rpe: 8, restTime: 75 },
          { exerciseId: 'lat-pulldowns', sets: 3, repRange: '10-12', rpe: 7, restTime: 90 },
          { exerciseId: 'lateral-raises', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 },
          { exerciseId: 'leg-curls', sets: 3, repRange: '12-15', rpe: 7, restTime: 75 },
          { exerciseId: 'barbell-curls', sets: 3, repRange: '10-12', rpe: 7, restTime: 60 },
          { exerciseId: 'cable-tricep-pushdowns', sets: 3, repRange: '12-15', rpe: 7, restTime: 60 }
        ]
      }
    ]
  }
];