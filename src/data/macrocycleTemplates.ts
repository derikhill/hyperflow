import { MacrocycleTemplate, MacrocycleType } from '../types';

export const macrocycleTemplates: MacrocycleTemplate[] = [
  {
    type: 'pure_hypertrophy',
    name: 'Pure Hypertrophy Specialization',
    description: 'Maximum muscle growth through progressive volume overload, metabolic stress, and mechanical tension',
    primaryGoal: 'Maximize muscle size and mass gain',
    targetAudience: 'Bodybuilders, physique competitors, and serious muscle builders',
    duration: 12,
    compatiblePrograms: ['upper-lower-4day', 'ppl-6day', 'classic-physique-4day'],
    volumeEmphasis: 'high',
    intensityEmphasis: 'moderate',
    frequencyRecommendation: 5,
    mesocycles: [
      {
        name: 'Volume Accumulation',
        weeks: [
          { week: 1, volumeMultiplier: 1.0, intensityZone: 'hypertrophy', isDeload: false },
          { week: 2, volumeMultiplier: 1.15, intensityZone: 'hypertrophy', isDeload: false },
          { week: 3, volumeMultiplier: 1.3, intensityZone: 'hypertrophy', isDeload: false },
          { week: 4, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'High volume, moderate intensity - maximize muscle damage and metabolic stress',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      },
      {
        name: 'Metabolic Intensification',
        weeks: [
          { week: 5, volumeMultiplier: 1.1, intensityZone: 'metabolic', isDeload: false },
          { week: 6, volumeMultiplier: 1.2, intensityZone: 'metabolic', isDeload: false },
          { week: 7, volumeMultiplier: 1.35, intensityZone: 'metabolic', isDeload: false },
          { week: 8, volumeMultiplier: 0.5, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Increased training density and metabolic stress for maximum growth stimulus',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      },
      {
        name: 'Growth Specialization',
        weeks: [
          { week: 9, volumeMultiplier: 1.25, intensityZone: 'specialization', isDeload: false },
          { week: 10, volumeMultiplier: 1.4, intensityZone: 'specialization', isDeload: false },
          { week: 11, volumeMultiplier: 1.5, intensityZone: 'specialization', isDeload: false },
          { week: 12, volumeMultiplier: 0.4, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Peak volume with specialized techniques - maximize hypertrophic adaptations',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      }
    ]
  },
  {
    type: 'powerbuilding',
    name: 'Powerbuilding Hybrid',
    description: 'Balanced approach combining strength development with muscle building for the best of both worlds',
    primaryGoal: 'Build strength while gaining muscle mass',
    secondaryGoal: 'Improve body composition and performance',
    targetAudience: 'Lifters wanting both strength and size gains',
    duration: 16,
    compatiblePrograms: ['upper-lower-4day', 'ppl-6day'],
    volumeEmphasis: 'moderate',
    intensityEmphasis: 'high',
    frequencyRecommendation: 4,
    mesocycles: [
      {
        name: 'Strength Foundation',
        weeks: [
          { week: 1, volumeMultiplier: 0.8, intensityZone: 'strength', isDeload: false },
          { week: 2, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 3, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 4, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Build strength base with compound movements - RPE 7-9, 3-6 reps',
        primaryGoal: 'strength',
        volumeProgression: 'linear'
      },
      {
        name: 'Hypertrophy Block',
        weeks: [
          { week: 5, volumeMultiplier: 1.1, intensityZone: 'hypertrophy', isDeload: false },
          { week: 6, volumeMultiplier: 1.2, intensityZone: 'hypertrophy', isDeload: false },
          { week: 7, volumeMultiplier: 1.3, intensityZone: 'hypertrophy', isDeload: false },
          { week: 8, volumeMultiplier: 0.5, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Volume accumulation for muscle growth - RPE 6-8, 8-15 reps',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      },
      {
        name: 'Strength Intensification',
        weeks: [
          { week: 9, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 10, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 11, volumeMultiplier: 1.1, intensityZone: 'strength', isDeload: false },
          { week: 12, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Peak strength development - RPE 8-9, 1-5 reps',
        primaryGoal: 'strength',
        volumeProgression: 'undulating'
      },
      {
        name: 'Powerbuilding Peak',
        weeks: [
          { week: 13, volumeMultiplier: 1.0, intensityZone: 'hypertrophy', isDeload: false },
          { week: 14, volumeMultiplier: 1.1, intensityZone: 'metabolic', isDeload: false },
          { week: 15, volumeMultiplier: 1.2, intensityZone: 'specialization', isDeload: false },
          { week: 16, volumeMultiplier: 0.4, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Combine strength and size gains - mixed rep ranges and intensities',
        primaryGoal: 'mixed',
        volumeProgression: 'undulating'
      }
    ]
  },
  {
    type: 'strength_focus',
    name: 'Strength Development',
    description: 'Powerlifting-oriented program with accessory work for muscle building and injury prevention',
    primaryGoal: 'Maximize strength in squat, bench, and deadlift',
    secondaryGoal: 'Build supporting muscle mass',
    targetAudience: 'Powerlifters and strength athletes',
    duration: 12,
    compatiblePrograms: ['upper-lower-4day'],
    volumeEmphasis: 'low',
    intensityEmphasis: 'high',
    frequencyRecommendation: 4,
    mesocycles: [
      {
        name: 'Volume Base Building',
        weeks: [
          { week: 1, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 2, volumeMultiplier: 1.1, intensityZone: 'strength', isDeload: false },
          { week: 3, volumeMultiplier: 1.2, intensityZone: 'strength', isDeload: false },
          { week: 4, volumeMultiplier: 0.7, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Build work capacity with moderate intensity - RPE 6-8, 5-8 reps',
        primaryGoal: 'strength',
        volumeProgression: 'linear'
      },
      {
        name: 'Intensity Development',
        weeks: [
          { week: 5, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 6, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 7, volumeMultiplier: 1.1, intensityZone: 'strength', isDeload: false },
          { week: 8, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Increase training intensity - RPE 7-9, 3-6 reps',
        primaryGoal: 'strength',
        volumeProgression: 'undulating'
      },
      {
        name: 'Peak Strength',
        weeks: [
          { week: 9, volumeMultiplier: 0.8, intensityZone: 'strength', isDeload: false },
          { week: 10, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 11, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 12, volumeMultiplier: 0.5, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Peak strength expression - RPE 8-10, 1-3 reps',
        primaryGoal: 'strength',
        volumeProgression: 'undulating'
      }
    ]
  },
  {
    type: 'athletic_performance',
    name: 'Athletic Performance',
    description: 'Sport-specific training combining strength, power, and muscle building for athletic enhancement',
    primaryGoal: 'Improve athletic performance and power output',
    secondaryGoal: 'Build functional muscle mass',
    targetAudience: 'Athletes and sports performance enthusiasts',
    duration: 16,
    compatiblePrograms: ['upper-lower-4day', 'full_body'],
    volumeEmphasis: 'moderate',
    intensityEmphasis: 'high',
    frequencyRecommendation: 4,
    mesocycles: [
      {
        name: 'General Preparation',
        weeks: [
          { week: 1, volumeMultiplier: 1.0, intensityZone: 'hypertrophy', isDeload: false },
          { week: 2, volumeMultiplier: 1.1, intensityZone: 'hypertrophy', isDeload: false },
          { week: 3, volumeMultiplier: 1.2, intensityZone: 'hypertrophy', isDeload: false },
          { week: 4, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Build muscle base and work capacity - RPE 6-8, 8-12 reps',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      },
      {
        name: 'Strength Development',
        weeks: [
          { week: 5, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 6, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 7, volumeMultiplier: 1.1, intensityZone: 'strength', isDeload: false },
          { week: 8, volumeMultiplier: 0.5, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Develop maximal strength - RPE 7-9, 3-6 reps',
        primaryGoal: 'strength',
        volumeProgression: 'linear'
      },
      {
        name: 'Power Conversion',
        weeks: [
          { week: 9, volumeMultiplier: 0.8, intensityZone: 'power', isDeload: false },
          { week: 10, volumeMultiplier: 0.9, intensityZone: 'power', isDeload: false },
          { week: 11, volumeMultiplier: 1.0, intensityZone: 'power', isDeload: false },
          { week: 12, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Convert strength to power - explosive movements, 1-5 reps',
        primaryGoal: 'power',
        volumeProgression: 'undulating'
      },
      {
        name: 'Competition Peak',
        weeks: [
          { week: 13, volumeMultiplier: 0.7, intensityZone: 'power', isDeload: false },
          { week: 14, volumeMultiplier: 0.8, intensityZone: 'power', isDeload: false },
          { week: 15, volumeMultiplier: 0.6, intensityZone: 'power', isDeload: false },
          { week: 16, volumeMultiplier: 0.4, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Peak athletic performance - sport-specific movements',
        primaryGoal: 'power',
        volumeProgression: 'undulating'
      }
    ]
  },
  {
    type: 'body_recomposition',
    name: 'Body Recomposition',
    description: 'Simultaneous fat loss and muscle building through strategic training and recovery protocols',
    primaryGoal: 'Lose fat while maintaining/building muscle',
    secondaryGoal: 'Improve body composition and metabolic health',
    targetAudience: 'Those looking to transform their physique',
    duration: 16,
    compatiblePrograms: ['upper-lower-4day', 'ppl-6day', 'full_body'],
    volumeEmphasis: 'moderate',
    intensityEmphasis: 'moderate',
    frequencyRecommendation: 5,
    mesocycles: [
      {
        name: 'Metabolic Foundation',
        weeks: [
          { week: 1, volumeMultiplier: 1.0, intensityZone: 'metabolic', isDeload: false },
          { week: 2, volumeMultiplier: 1.1, intensityZone: 'metabolic', isDeload: false },
          { week: 3, volumeMultiplier: 1.2, intensityZone: 'metabolic', isDeload: false },
          { week: 4, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Build metabolic capacity - RPE 6-8, 10-15 reps, shorter rest',
        primaryGoal: 'endurance',
        volumeProgression: 'linear'
      },
      {
        name: 'Strength Preservation',
        weeks: [
          { week: 5, volumeMultiplier: 0.9, intensityZone: 'strength', isDeload: false },
          { week: 6, volumeMultiplier: 1.0, intensityZone: 'strength', isDeload: false },
          { week: 7, volumeMultiplier: 1.1, intensityZone: 'strength', isDeload: false },
          { week: 8, volumeMultiplier: 0.5, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Maintain strength during fat loss - RPE 7-8, 5-8 reps',
        primaryGoal: 'strength',
        volumeProgression: 'undulating'
      },
      {
        name: 'Hypertrophy Focus',
        weeks: [
          { week: 9, volumeMultiplier: 1.1, intensityZone: 'hypertrophy', isDeload: false },
          { week: 10, volumeMultiplier: 1.2, intensityZone: 'hypertrophy', isDeload: false },
          { week: 11, volumeMultiplier: 1.3, intensityZone: 'hypertrophy', isDeload: false },
          { week: 12, volumeMultiplier: 0.6, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Build muscle while in deficit - RPE 6-8, 8-12 reps',
        primaryGoal: 'hypertrophy',
        volumeProgression: 'linear'
      },
      {
        name: 'Final Cut',
        weeks: [
          { week: 13, volumeMultiplier: 1.0, intensityZone: 'metabolic', isDeload: false },
          { week: 14, volumeMultiplier: 1.1, intensityZone: 'metabolic', isDeload: false },
          { week: 15, volumeMultiplier: 1.2, intensityZone: 'metabolic', isDeload: false },
          { week: 16, volumeMultiplier: 0.4, intensityZone: 'recovery', isDeload: true }
        ],
        focus: 'Final fat loss push - high volume, metabolic stress',
        primaryGoal: 'endurance',
        volumeProgression: 'linear'
      }
    ]
  }
];

export const getMacrocycleTemplate = (type: MacrocycleType): MacrocycleTemplate | undefined => {
  return macrocycleTemplates.find(template => template.type === type);
};

export const getCompatiblePrograms = (macrocycleType: MacrocycleType): string[] => {
  const template = getMacrocycleTemplate(macrocycleType);
  return template?.compatiblePrograms || [];
};