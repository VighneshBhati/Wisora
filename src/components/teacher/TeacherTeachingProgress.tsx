import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  activeDiscussions: number;
}

interface TeacherTeachingProgressProps {
  stats: DashboardStats;
}

export function TeacherTeachingProgress({ stats }: TeacherTeachingProgressProps) {
  const { t } = useTranslation('teacher');
  
  return (
    <Card className="glass-card border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-purple-500/5" />
      <CardHeader className="relative z-10">
        <CardTitle className="gradient-text text-xl flex items-center gap-2">
          <Star className="h-6 w-6" />
          Expert Performance Overview
        </CardTitle>
        <CardDescription>Your impact as a Wisora verified expert</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-green-500/10 border border-primary-500/20">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <BookOpen className="h-8 w-8 text-black" />
            </div>
            <h3 className="font-semibold mb-2">Session Expert</h3>
            <p className="text-sm text-muted-foreground">
              {stats.totalCourses} sessions created
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-accent-500/10 border border-blue-500/20">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Users className="h-8 w-8 text-black" />
            </div>
            <h3 className="font-semibold mb-2">Client Mentor</h3>
            <p className="text-sm text-muted-foreground">
              Guiding {stats.totalStudents} clients
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Star className="h-8 w-8 text-black" />
            </div>
            <h3 className="font-semibold mb-2">Earnings</h3>
            <p className="text-sm text-muted-foreground">
              ₹{stats.totalRevenue} earned
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

