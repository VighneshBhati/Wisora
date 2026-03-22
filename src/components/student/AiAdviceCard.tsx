
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain, Sparkles, TrendingUp, Clock, Target, Lightbulb, Trophy, BookOpen, Zap, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';

interface AiAdvice {
  category: string;
  advice: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  actionable: boolean;
  confidence: number;
}

interface SerializableAdvice {
  category: string;
  advice: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  iconType: string;
  actionable: boolean;
  confidence: number;
}

export const AiAdviceCard = () => {
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const [advice, setAdvice] = useState<AiAdvice[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const { t } = useTranslation('dashboard');

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'target': return <Target className="h-4 w-4" />;
      case 'clock': return <Clock className="h-4 w-4" />;
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      case 'brain': return <Brain className="h-4 w-4" />;
      case 'sparkles': return <Sparkles className="h-4 w-4" />;
      case 'lightbulb': return <Lightbulb className="h-4 w-4" />;
      case 'trophy': return <Trophy className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      case 'zap': return <Zap className="h-4 w-4" />;
      case 'calendar': return <Calendar className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'check': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const generateAdvice = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch comprehensive learning data
      const [enrollmentsRes, progressRes, quizRes, transactionsRes, callsRes] = await Promise.all([
        supabase.from('enrollments').select(`*, course:courses (title, category, price)`).eq('student_id', user.id),
        supabase.from('lesson_progress').select('*').eq('student_id', user.id),
        supabase.from('quiz_attempts').select('*').eq('student_id', user.id),
        supabase.from('wallet_transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
        supabase.from('student_call_history').select('*').eq('student_id', user.id).order('call_started_at', { ascending: false }).limit(5)
      ]);

      const enrollments = enrollmentsRes.data || [];
      const lessonProgress = progressRes.data || [];
      const quizAttempts = quizRes.data || [];
      const transactions = transactionsRes.data || [];
      const callHistory = callsRes.data || [];

      const generatedAdvice: AiAdvice[] = [];

      // Advanced Learning Pattern Analysis
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Activity Analysis
      const recentProgress = lessonProgress.filter(p => new Date(p.completed_at) > weekAgo);
      const recentQuizzes = quizAttempts.filter(q => new Date(q.started_at) > weekAgo);
      const recentCalls = callHistory.filter(c => new Date(c.call_started_at) > weekAgo);

      // Session Velocity Analysis
      if (enrollments.length > 0) {
        const progressRate = lessonProgress.length / (enrollments.length * 5);
        
        if (progressRate < 0.2) {
          generatedAdvice.push({
            category: 'Session Engagement',
            advice: 'You have booked sessions but haven\'t been very active. Try scheduling a quick 15-min call with an expert to get back on track.',
            priority: 'high',
            icon: <Clock className="h-4 w-4" />,
            actionable: true,
            confidence: 85
          });
        } else if (progressRate > 0.8) {
          generatedAdvice.push({
            category: 'Achievement',
            advice: 'You\'re highly engaged with your expert sessions! Consider upgrading to a Growth or Pro plan to unlock more sessions.',
            priority: 'low',
            icon: <Trophy className="h-4 w-4" />,
            actionable: true,
            confidence: 90
          });
        }
      }

      // Quiz Performance Intelligence
      if (quizAttempts.length > 0) {
        const avgScore = quizAttempts.reduce((sum, attempt) => sum + (attempt.score || 0) / (attempt.max_score || 1), 0) / quizAttempts.length;
        const recentAvgScore = recentQuizzes.length > 0 ? 
          recentQuizzes.reduce((sum, attempt) => sum + (attempt.score || 0) / (attempt.max_score || 1), 0) / recentQuizzes.length : avgScore;

        if (avgScore < 0.6) {
          generatedAdvice.push({
            category: 'Preparation Strategy',
            advice: 'Your assessment scores suggest you may benefit from a 1:1 session with a domain expert before your next attempt.',
            priority: 'high',
            icon: <Brain className="h-4 w-4" />,
            actionable: true,
            confidence: 80
          });
        }

        if (recentAvgScore > avgScore + 0.2) {
          generatedAdvice.push({
            category: 'Improvement Trend',
            advice: 'Your recent performance is improving significantly. Keep the momentum going with regular expert check-ins.',
            priority: 'medium',
            icon: <TrendingUp className="h-4 w-4" />,
            actionable: false,
            confidence: 75
          });
        }
      }

      // AI Tutor Usage Analysis
      if (callHistory.length > 0) {
        const totalMinutes = callHistory.reduce((sum, call) => sum + call.call_duration_minutes, 0);
        const avgCallDuration = totalMinutes / callHistory.length;

        if (avgCallDuration < 5) {
          generatedAdvice.push({
            category: 'Session Quality',
            advice: 'Your sessions are very short. Try preparing specific questions before each call to get maximum value from your expert.',
            priority: 'medium',
            icon: <Zap className="h-4 w-4" />,
            actionable: true,
            confidence: 70
          });
        }

        if (recentCalls.length === 0 && callHistory.length > 0) {
          generatedAdvice.push({
            category: 'Re-engagement',
            advice: 'You haven\'t had a session recently. Book a Quick Solve call (10 min) to stay connected with your expert.',
            priority: 'medium',
            icon: <Lightbulb className="h-4 w-4" />,
            actionable: true,
            confidence: 65
          });
        }
      }

      // Financial Optimization
      if (transactions.length > 0) {
        const creditPurchases = transactions.filter(t => t.transaction_type === 'credit');
        const coursePurchases = transactions.filter(t => t.transaction_type === 'course_purchase');
        
        if (creditPurchases.length > coursePurchases.length && user.wallet > 100) {
          generatedAdvice.push({
            category: 'Budget Optimization',
            advice: 'You have unused credits. Consider booking a group session or campus workshop to get more value.',
            priority: 'low',
            icon: <Target className="h-4 w-4" />,
            actionable: true,
            confidence: 60
          });
        }
      }

      // Domain Diversity Analysis
      const categories = enrollments.map(e => e.course?.category).filter(Boolean);
      const uniqueCategories = [...new Set(categories)];
      
      if (uniqueCategories.length === 1 && enrollments.length > 2) {
        generatedAdvice.push({
          category: 'Domain Diversification',
          advice: `You've only explored ${uniqueCategories[0]}. KIA has experts across Finance, Law, Career, Tech and more — try a trial session in a new domain.`,
          priority: 'medium',
          icon: <BookOpen className="h-4 w-4" />,
          actionable: true,
          confidence: 70
        });
      }

      // Engagement Patterns
      if (recentProgress.length === 0 && enrollments.length > 0) {
        generatedAdvice.push({
          category: 'Re-engagement Alert',
          advice: 'You haven\'t been active recently. Your booked experts are ready — schedule a session today to keep your momentum.',
          priority: 'critical',
          icon: <AlertTriangle className="h-4 w-4" />,
          actionable: true,
          confidence: 95
        });
      }

      // Success Celebration
      if (recentProgress.length > 5 && recentQuizzes.length > 0) {
        const recentQuizAvg = recentQuizzes.reduce((sum, q) => sum + (q.score || 0) / (q.max_score || 1), 0) / recentQuizzes.length;
        if (recentQuizAvg > 0.8) {
          generatedAdvice.push({
            category: 'Achievement Unlocked',
            advice: 'Outstanding performance this week! You\'re making the most of KIA. Consider leaving a review for your expert.',
            priority: 'low',
            icon: <CheckCircle2 className="h-4 w-4" />,
            actionable: false,
            confidence: 85
          });
        }
      }

      // Default encouragement
      if (generatedAdvice.length === 0) {
        const encouragements = [
          'Start by booking a trial session with a Bronze-tier expert for just ₹99. Real experience, real answers.',
          'Use the Expert Comparison tool to find the best match for your specific problem before booking.',
          'Try a Quick Solve call — 10 minutes with the right expert can save you weeks of confusion.'
        ];
        
        generatedAdvice.push({
          category: 'Personalized Guidance',
          advice: encouragements[Math.floor(Math.random() * encouragements.length)],
          priority: 'medium',
          icon: <Sparkles className="h-4 w-4" />,
          actionable: true,
          confidence: 50
        });
      }

      // Sort by priority and confidence
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      generatedAdvice.sort((a, b) => {
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        return priorityDiff !== 0 ? priorityDiff : b.confidence - a.confidence;
      });

      setAdvice(generatedAdvice);
      setLastGenerated(new Date().toLocaleString());

      // Convert to serializable format
      const serializableAdvice: SerializableAdvice[] = generatedAdvice.map(item => ({
        category: item.category,
        advice: item.advice,
        priority: item.priority,
        actionable: item.actionable,
        confidence: item.confidence,
        iconType: getIconTypeFromCategory(item.category)
      }));

      // Store insights
      await supabase.from('ai_advisor_insights').insert({
        user_id: user.id,
        user_type: 'student',
        insights: serializableAdvice as any,
        data_snapshot: {
          enrollments_count: enrollments.length,
          lessons_completed: lessonProgress.length,
          quiz_attempts: quizAttempts.length,
          recent_activity: {
            lessons_this_week: recentProgress.length,
            quizzes_this_week: recentQuizzes.length,
            calls_this_week: recentCalls.length
          },
          performance_metrics: {
            avg_quiz_score: quizAttempts.length > 0 ? 
              quizAttempts.reduce((sum, q) => sum + (q.score || 0) / (q.max_score || 1), 0) / quizAttempts.length : 0,
            progress_rate: enrollments.length > 0 ? lessonProgress.length / (enrollments.length * 5) : 0
          }
        }
      });

      toast({
        title: 'AI Analysis Complete',
        description: `Generated ${generatedAdvice.length} personalized insights.`,
      });

    } catch (error: any) {
      console.error('Error generating AI advice:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate insights. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getIconTypeFromCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'Learning Velocity': 'clock',
      'Study Strategy': 'brain',
      'Achievement Recognition': 'trophy',
      'Improvement Trend': 'trending',
      'AI Tutor Optimization': 'zap',
      'Resource Utilization': 'lightbulb',
      'Budget Optimization': 'target',
      'Learning Diversification': 'book',
      'Re-engagement': 'alert',
      'Achievement Unlocked': 'check',
      'Personalized Guidance': 'sparkles'
    };
    return categoryMap[category] || 'sparkles';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/30 text-red-300 border-red-500/50';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-3 w-3" />;
      case 'high': return <Zap className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <CheckCircle2 className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="gradient-text text-lg sm:text-xl font-bold">AI Guidance Advisor</div>
            <span className="text-muted-foreground/80 text-xs sm:text-sm">Personalized insights to maximize your KIA experience</span>
          </div>
          <Button 
            onClick={generateAdvice} 
            disabled={loading}
            className="btn-primary w-full sm:w-auto text-xs sm:text-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-1 sm:mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Get Smart Insights
              </>
            )}
          </Button>
        </div>
        {lastGenerated && (
          <p className="text-xs text-muted-foreground">
            Last analysis: {lastGenerated}
          </p>
        )}
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        {advice.length > 0 ? (
          <div className="space-y-4">
            {advice.map((item, index) => (
              <div key={index} className="group relative p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-medium text-purple-200">{item.category}</h4>
                      <Badge className={`text-xs flex items-center gap-1 ${getPriorityColor(item.priority)}`}>
                        {getPriorityIcon(item.priority)}
                        {item.priority}
                      </Badge>
                      {item.actionable && (
                        <Badge className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Actionable
                        </Badge>
                      )}
                      <Badge className="text-xs bg-gray-500/20 text-gray-400 border-gray-500/30">
                        {item.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.advice}
                    </p>
                  </div>
                </div>
                {/* Subtle progress bar for confidence */}
                <div className="mt-3 w-full bg-white/5 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-1000"
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">
              Ready to unlock personalized guidance?
            </p>
            <p className="text-xs text-muted-foreground">
              AI analyzes your session patterns and suggests the best next steps.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
