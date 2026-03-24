import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import MorphCard from '@/components/ui/MorphCard';
import styled from 'styled-components';
import { 
  Users, CreditCard, Calendar, TrendingUp, 
  Plus, UserPlus, MapPin, ArrowRight, Activity, Star
} from 'lucide-react';

const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #222533;
  color: #fbebe2;
  padding: 20px;
  width: 100%;
  height: 160px;
  border-radius: 26px;
  user-select: none;
  transition: all 0.3s ease-in-out;
  border: 1px solid transparent;
  cursor: default;

  .mac-header { display: flex; align-items: center; gap: 8px; }
  .mac-dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; }
  .mac-red    { background-color: #ff5f57; }
  .mac-yellow { background-color: #ffbd2e; }
  .mac-green  { background-color: #28c941; }
  .stat-value { font-size: 2.4rem; font-weight: 900; line-height: 1; transition: all 0.3s ease-in-out; }
  .stat-label { font-size: 12px; color: rgba(251,235,226,0.6); transition: all 0.3s ease-in-out; }
  .stat-change { font-size: 11px; color: rgba(251,235,226,0.35); }

  &:hover { background-color: #1d1d1d; transform: scale(1.05); border-color: #5e63ff; }
  &:hover .stat-label { font-size: 13px; font-weight: 500; color: #b1cbf6; }
  &:hover .stat-value { color: #5e63ff; }
`;

const stats = [
  { label: 'Total Users', value: '248', change: '+12 this month', icon: <Users className="h-5 w-5 text-blue-400" />, color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20' },
  { label: 'Credits Remaining', value: '1,840', change: '460 used this month', icon: <CreditCard className="h-5 w-5 text-yellow-400" />, color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20' },
  { label: 'Active Sessions', value: '14', change: '3 today', icon: <Activity className="h-5 w-5 text-green-400" />, color: 'from-green-500/20 to-green-600/10 border-green-500/20' },
  { label: 'Campus Visits', value: '3', change: '1 upcoming', icon: <MapPin className="h-5 w-5 text-purple-400" />, color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20' },
];

const upcomingVisits = [
  { expert: 'Rahul Sharma', domain: 'Product Management', date: 'Mar 28, 2026', type: 'Workshop', students: 45, status: 'confirmed' },
  { expert: 'Priya Nair', domain: 'Data Science', date: 'Apr 5, 2026', type: 'Seminar', students: 80, status: 'pending' },
];

const recentActivity = [
  { text: 'Arjun Mehta session booked by Riya Sharma', time: '2h ago', type: 'booking' },
  { text: '200 credits added to account', time: '1d ago', type: 'credits' },
  { text: 'Campus visit confirmed — Rahul Sharma', time: '2d ago', type: 'visit' },
  { text: '15 new users invited', time: '3d ago', type: 'users' },
];

export const InstitutionalDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="Institutional Dashboard | Wisora" />
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">🏫 Institutional Mode</Badge>
              <h1 className="text-2xl font-black">Institution Dashboard</h1>
              <p className="text-muted-foreground">Manage your organization's expert access and credits</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/institutional/users')} variant="outline" className="border-white/10 hover:bg-white/5">
                <UserPlus className="h-4 w-4 mr-2" /> Invite Users
              </Button>
              <Button onClick={() => navigate('/institutional/credits')} className="bg-primary-500 hover:bg-primary-600 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add Credits
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatusCard key={stat.label}>
                <div className="mac-header">
                  <span className="mac-dot mac-red" />
                  <span className="mac-dot mac-yellow" />
                  <span className="mac-dot mac-green" />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-change">{stat.change}</div>
              </StatusCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Campus Visits */}
            <Card className="glass-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-400" /> Upcoming Campus Visits
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/institutional/expert-booking')} className="text-primary-400 text-xs">
                  Schedule Visit <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingVisits.map((visit, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-sm">{visit.expert}</div>
                        <div className="text-xs text-muted-foreground">{visit.domain}</div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{visit.date}</span>
                          <span>{visit.type}</span>
                          <span>{visit.students} students</span>
                        </div>
                      </div>
                      <Badge className={visit.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30 text-xs' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs'}>
                        {visit.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-sm" onClick={() => navigate('/institutional/expert-booking')}>
                  <Plus className="h-4 w-4 mr-2" /> Schedule Expert Visit
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-400" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Book Online Session', icon: '💻', path: '/institutional/expert-booking' },
              { label: 'Schedule Campus Visit', icon: '🏫', path: '/institutional/expert-booking?mode=campus' },
              { label: 'Manage Users', icon: '👥', path: '/institutional/users' },
              { label: 'View Reports', icon: '📊', path: '/institutional/reports' },
            ].map((action) => (
              <MorphCard key={action.label} onClick={() => navigate(action.path)}>
                <div className="p-4 text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <div className="text-sm font-semibold text-white">{action.label}</div>
                </div>
              </MorphCard>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

