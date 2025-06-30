import { Exercise } from '../types';

export const exerciseDatabase: Exercise[] = [
  // Chest
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    instructions: 'Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.'
  },
  {
    id: 'machine-press',
    name: 'Machine Chest Press',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    instructions: 'Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.'
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbells',
    instructions: 'Set bench to 30-45 degrees, press dumbbells from chest level to overhead.'
  },
  {
    id: 'dips',
    name: 'Parallel Bar Dips',
    category: 'Chest',
    primaryMuscles: ['Chest', 'Triceps'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Parallel Bars',
    instructions: 'Support body on bars, lower until chest level with hands, press back up.'
  },
  {
    id: 'db-flyes',
    name: 'Dumbbell Flyes',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbells',
    instructions: 'Lie on bench, hold dumbbells above chest, lower in wide arc, squeeze chest to return.'
  },
  {
    id: 'low-cable-flyes',
    name: 'Low Cable Flyes',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbells',
    instructions: 'Lie on bench, hold dumbbells above chest, lower in wide arc, squeeze chest to return.'
  },
  {
    id: 'pec-deck',
    name: 'Pec Deck',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbells',
    instructions: 'Lie on bench, hold dumbbells above chest, lower in wide arc, squeeze chest to return.'
  },
  
  // Back
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'Back',
    primaryMuscles: ['Back', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Traps', 'Forearms'],
    equipment: 'Barbell',
    instructions: 'Stand with bar over midfoot, grip bar, keep back straight, lift by extending hips and knees.'
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: 'Pull-up Bar',
    instructions: 'Hang from bar with overhand grip, pull body up until chin over bar.'
  },
  {
    id: 'pullover',
    name: 'Pullover',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: 'Machine, cable, or dumbbell',
    instructions: 'Pull weight from behind head in a stretched position towards the waist contracting the lats.'
  },
  {
    id: 'barbell-rows',
    name: 'Bent-over Barbell Rows',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Barbell',
    instructions: 'Hinge at hips, keep back straight, row bar to lower chest/upper abdomen.'
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps'],
    equipment: 'Cable Machine',
    instructions: 'Sit at lat pulldown machine, pull bar down to upper chest with wide grip.'
  },
  {
    id: 'cable-rows',
    name: 'Seated Cable Rows',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable Machine',
    instructions: 'Sit at cable row machine, pull handle to lower chest, squeeze shoulder blades.'
  },
  {
    id: 't-bar-rows',
    name: 'T-Bar Rows',
    category: 'Back',
    primaryMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'T-Bar',
    instructions: 'Straddle T-bar, bend at hips, row weight to chest with neutral grip.'
  },

  // Shoulders
  {
    id: 'overhead-press',
    name: 'Standing Overhead Press',
    category: 'Shoulders',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps', 'Core'],
    equipment: 'Barbell',
    instructions: 'Stand with feet shoulder-width apart, press bar from shoulders to overhead.'
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'Shoulders',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: [],
    equipment: 'Dumbbells',
    instructions: 'Stand with dumbbells at sides, raise arms out to sides until parallel to floor.'
  },
  {
    id: 'rear-delt-flyes',
    name: 'Rear Delt Flyes',
    category: 'Shoulders',
    primaryMuscles: ['Rear Delts'],
    secondaryMuscles: ['Back'],
    equipment: 'Dumbbells',
    instructions: 'Bend forward, hold dumbbells, raise arms out to sides squeezing rear delts.'
  },
  {
    id: 'front-raises',
    name: 'Front Raises',
    category: 'Shoulders',
    primaryMuscles: ['Front Delts'],
    secondaryMuscles: [],
    equipment: 'Dumbbells',
    instructions: 'Hold dumbbells at sides, raise one arm forward to shoulder height, alternate.'
  },
  {
    id: 'db-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'Shoulders',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbells',
    instructions: 'Sit or stand, press dumbbells from shoulder level to overhead.'
  },
  {
    id: 'cable-lateral-raises',
    name: 'Cable Lateral Raises',
    category: 'Shoulders',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: [],
    equipment: 'Cable Machine',
    instructions: 'Stand beside cable machine, raise arm out to side against resistance.'
  },
  {
    id: 'upright-rows',
    name: 'Upright Rows',
    category: 'Shoulders',
    primaryMuscles: ['Shoulders', 'Traps'],
    secondaryMuscles: ['Biceps'],
    equipment: 'Barbell',
    instructions: 'Hold bar with narrow grip, pull up to chest level keeping elbows high.'
  },

  // Legs
  {
    id: 'squat',
    name: 'Back Squat',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves'],
    equipment: 'Barbell',
    instructions: 'Position bar on upper back, descend until thighs parallel to floor, drive through heels to stand.'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'Legs',
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Back'],
    equipment: 'Barbell',
    instructions: 'Hold bar at hip level, hinge at hips keeping legs relatively straight, lower bar to mid-shin.'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings'],
    equipment: 'Leg Press Machine',
    instructions: 'Sit in machine, place feet on platform, lower weight by bending knees, press back up.'
  },
  {
    id: 'leg-curls',
    name: 'Lying Leg Curls',
    category: 'Legs',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: [],
    equipment: 'Leg Curl Machine',
    instructions: 'Lie face down, curl heels toward glutes against resistance.'
  },
  {
    id: 'leg-extensions',
    name: 'Leg Extensions',
    category: 'Legs',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: [],
    equipment: 'Leg Extension Machine',
    instructions: 'Sit in machine, extend legs against resistance until straight.'
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves'],
    equipment: 'Dumbbells',
    instructions: 'Step forward into lunge position, push off front foot to step into next lunge.'
  },
  {
    id: 'calf-raises',
    name: 'Standing Calf Raises',
    category: 'Legs',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: 'Calf Raise Machine',
    instructions: 'Stand on platform, rise up on toes as high as possible, lower with control.'
  },
  {
    id: 'seated-calf-raises',
    name: 'Seated Calf Raises',
    category: 'Legs',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: 'Seated Calf Machine',
    instructions: 'Sit with weight on thighs, rise up on toes, lower with control.'
  },

  // Arms
  {
    id: 'barbell-curls',
    name: 'Barbell Curls',
    category: 'Arms',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: 'Barbell',
    instructions: 'Stand with bar in hands, curl weight up by flexing biceps, lower with control.'
  },
  {
    id: 'close-grip-bench',
    name: 'Close-Grip Bench Press',
    category: 'Arms',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Shoulders'],
    equipment: 'Barbell',
    instructions: 'Lie on bench, grip bar with hands closer than shoulder-width, press weight.'
  },
  {
    id: 'db-curls',
    name: 'Dumbbell Curls',
    category: 'Arms',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbells',
    instructions: 'Stand with dumbbells, curl one arm at a time or both together.'
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'Arms',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dip Station',
    instructions: 'Support body on dip bars, lower by bending elbows, press back up.'
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'Arms',
    primaryMuscles: ['Biceps', 'Forearms'],
    secondaryMuscles: [],
    equipment: 'Dumbbells',
    instructions: 'Hold dumbbells with neutral grip, curl up keeping thumbs facing up.'
  },
  {
    id: 'overhead-tricep-ext',
    name: 'Overhead Tricep Extension',
    category: 'Arms',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: [],
    equipment: 'Dumbbell',
    instructions: 'Hold dumbbell overhead with both hands, lower behind head, extend back up.'
  },
  {
    id: 'preacher-curls',
    name: 'Preacher Curls',
    category: 'Arms',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: [],
    equipment: 'Preacher Bench',
    instructions: 'Sit at preacher bench, curl weight up with arms supported on pad.'
  },
  {
    id: 'cable-tricep-pushdowns',
    name: 'Cable Tricep Pushdowns',
    category: 'Arms',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: [],
    equipment: 'Cable Machine',
    instructions: 'Stand at cable machine, push rope or bar down by extending elbows.'
  },

  // Core/Abs
  {
    id: 'planks',
    name: 'Planks',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Bodyweight',
    instructions: 'Hold body in straight line from head to heels, engage core muscles.'
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    instructions: 'Lie on back, knees bent, lift shoulders off ground by contracting abs.'
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Forearms'],
    equipment: 'Pull-up Bar',
    instructions: 'Hang from bar, raise legs up by contracting abs, lower with control.'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    instructions: 'Sit with knees bent, lean back slightly, rotate torso side to side.'
  },
  {
    id: 'cable-crunches',
    name: 'Cable Crunches',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: [],
    equipment: 'Cable Machine',
    instructions: 'Kneel at cable machine, crunch down by contracting abs against resistance.'
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'Core',
    primaryMuscles: ['Core'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    instructions: 'Lie on back, raise legs up by contracting lower abs, lower with control.'
  }
];