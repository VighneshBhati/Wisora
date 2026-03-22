import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { BarChart3, TrendingUp, Users, Star, Download, Calendar } from 'lucide-react';

const usageStats = [
  { label: 'Total Sessions', value: '127', change: '+23%', positive: true },
  { label: 'Credits Used', value: '1,160', change: '+18%', positive: true },
  { label: 'Avg Session Rating', value: '4.7', change: '+0.2', positive: true },
  { label: 'Active Users', value: '89', change: '-5%', positive: false },
];

const topExperts = [
  { name: 'Rahul Sharma', domain: 'Product Management', sessions: 28, rating: 4.9, credits: 224 },
  { name: 'Priya Nair', domain: 'Data Science', sessions: 22, rating: 5.0, credits: 264 },
  { name: 'Arjun Mehta', domain: 'Finance', sessions: 18, rating: 4.8, credits: 108 },
];

const topUsers = [
  { name: 'Riya Sharma', sessions: 8, credits: 64, dept: 'CSE' },
  { name: 'Prof. Suresh Kumar', sessions: 6, credits: 48, dept: 'Faculty' },
  { name: 'Karan Patel', sessions: 5, credits: 40, dept: 'MBA' },
];

export const InstitutionalReports = () => {
  return (
    <>
      <SEOHead title="Reports & Analytics | KIA Institutional" />
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Reports & Analytics</h1>
              <p className="text-muted-foreground">Track usage, sessions, and expert performance</p>
            </div>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Download className="h-4 w-4 mr-2" /> Export Report
            </Button>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {usageStats.map((stat) => (
              <Card key={stat.label} className="glass-card border-white/10">
                <CardContent className="p-5">
                  <div className="text-2xl font-black mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                  <Badge className={`text-xs border ${stat.positive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {stat.change} this month
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Experts */}
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" /> Top Experts Used
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topExperts.map((expert, i) => (
                  <div key={expert.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                      <div>
                        <div className="font-semibold text-sm">{expert.name}</div>
                        <div className="text-xs text-muted-foreground">{expert.domain}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-bold">{expert.sessions} sessions</div>
                      <div className="text-muted-foreground flex items-center gap-1 justify-end"><Star className="h-3 w-3 text-yellow-400" />{expert.rating}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Users */}
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" /> Most Active Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topUsers.map((user, i) => (
                  <div key={user.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.dept}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-bold">{user.sessions} sessions</div>
                      <div className="text-muted-foreground">{user.credits} credits used</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Session Feedback Summary */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary-400" /> Session Feedback Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Excellent (5★)', count: 68, pct: 54 },
                  { label: 'Good (4★)', count: 42, pct: 33 },
                  { label: 'Average (3★)', count: 12, pct: 9 },
                  { label: 'Poor (1-2★)', count: 5, pct: 4 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28">{row.label}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};
