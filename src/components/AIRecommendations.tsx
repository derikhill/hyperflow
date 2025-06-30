import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { aiTrainingService, TrainingRecommendation } from '../services/aiTrainingService';
import { exerciseDatabase } from '../data/exercises';

interface AIRecommendationsProps {
  userId: string;
}

export function AIRecommendations({ userId }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<TrainingRecommendation[]>([]);
  const [deloadPrediction, setDeloadPrediction] = useState<{
    shouldDeload: boolean;
    weeksUntilDeload: number;
    confidence: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
    loadDeloadPrediction();
  }, [userId]);

  const loadRecommendations = async () => {
    try {
      const recs = await aiTrainingService.getRecommendations(userId);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDeloadPrediction = async () => {
    try {
      const prediction = await aiTrainingService.predictDeloadTiming(userId);
      setDeloadPrediction(prediction);
    } catch (error) {
      console.error('Error loading deload prediction:', error);
    }
  };

  const applyRecommendation = async (recommendationId: string) => {
    try {
      await aiTrainingService.applyRecommendation(recommendationId);
      setRecommendations(prev => prev.filter(r => r.id !== recommendationId));
    } catch (error) {
      console.error('Error applying recommendation:', error);
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'weight_increase':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'deload':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Brain className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">AI Training Coach</h2>
            <p className="text-purple-100">Personalized recommendations based on your performance data</p>
          </div>
        </div>
      </div>

      {/* Deload Prediction */}
      {deloadPrediction && (
        <div className={`rounded-lg p-6 border-2 ${
          deloadPrediction.shouldDeload 
            ? 'border-orange-200 bg-orange-50' 
            : 'border-emerald-200 bg-emerald-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Deload Prediction</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              deloadPrediction.shouldDeload 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {Math.round(deloadPrediction.confidence * 100)}% confidence
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {deloadPrediction.shouldDeload ? (
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            ) : (
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            )}
            <div>
              <p className="font-medium text-gray-900">
                {deloadPrediction.shouldDeload 
                  ? 'Deload recommended this week' 
                  : `Continue training - deload in ${deloadPrediction.weeksUntilDeload} weeks`
                }
              </p>
              <p className="text-sm text-gray-600">
                Based on your fatigue patterns and performance trends
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Recommendations ({recommendations.length})
        </h3>
        
        {recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No new recommendations available</p>
            <p className="text-sm">Complete more workouts to get AI insights</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const exercise = exerciseDatabase.find(e => e.id === rec.exerciseId);
              return (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${getPriorityColor(rec.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getRecommendationIcon(rec.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 capitalize">
                            {rec.type.replace('_', ' ')}
                          </h4>
                          {exercise && (
                            <span className="text-sm text-gray-500">
                              • {exercise.name}
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.priority === 'high' 
                              ? 'bg-red-100 text-red-700'
                              : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{rec.reason}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Confidence: {Math.round(rec.confidence * 100)}%</span>
                          {rec.currentWeight && rec.recommendedWeight && (
                            <span>
                              {rec.currentWeight}lbs → {rec.recommendedWeight}lbs
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => applyRecommendation(rec.id)}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-md"
                        title="Apply recommendation"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => applyRecommendation(rec.id)}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-md"
                        title="Dismiss recommendation"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}