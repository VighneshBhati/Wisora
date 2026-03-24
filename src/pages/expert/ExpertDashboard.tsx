import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import {
  DollarSign, Calendar, Clock, Star, CheckCircle, AlertCircle,
  ArrowRight, Users, Sparkles, TrendingUp
} from 'lucide-react';

const stats = [
  {
    label: 'Total Earnings',
    value: '₹48,200',
    change: '+₹8,400 this month',
    icon: DollarSign,
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.15)',
    borderColor: 'rgba(52,211,153,0.2)',
    accentColor: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    label: 'Sessions Done',
    value: '312',
    change: '+28 this month',
    icon: CheckCircle,
    iconColor: 'text-blue-400',
    glowColor: 'rgba(96,165,250,0.15)',
    borderColor: 'rgba(96,165,250,0.2)',
    accentColor: 'from-blue-500/20 to-blue-600/5',
  },
  {
    label: 'Avg Rating',
    value: '4.9 ★',
    change: 'Based on 289 reviews',
    icon: Star,
    iconColor: 'text-yellow-400',
    glowColor: 'rgba(250,204,21,0.15)',
    borderColor: 'rgba(250,204,21,0.2)',
    accentColor: 'from-yellow-500/20 to-yellow-600/5',
  },
  {
    label: 'Pending Requests',
    value: '5',
    change: '2 campus visits',
    icon: AlertCircle,
    iconColor: 'text-orange-400',
    glowColor: 'rgba(251,146,60,0.15)',
    borderColor: 'rgba(251,146,60,0.2)',
    accentColor: 'from-orange-500/20 to-orange-600/5',
  },
];

const upcomingSessions = [
  { user: 'Riya Sharma', type: 'Online', date: 'Mar 25, 2026', time: '3:00 PM', duration: '60 min', earnings: 199 },
  { user: 'Karan Patel', type: 'Online', date: 'Mar 26, 2026', time: '11:00 AM', duration: '45 min', earnings: 149 },
  { user: 'IIT Delhi (Campus)', type: 'Campus Visit', date: 'Mar 28, 2026', time: '10:00 AM', duration: 'Full Day', earnings: 1500 },
];

type ReqStatus = 'pending' | 'accepted' | 'rejected';
interface PendingReq { from: string; type: string; domain: string; time: string; earnings: number; status: ReqStatus; }

const initialPendingRequests: PendingReq[] = [
  { from: 'Ananya Singh', type: 'Online', domain: 'Career Advice', time: 'Mar 27, 3 PM', earnings: 199, status: 'pending' },
  { from: 'BITS Pilani', type: 'Campus Visit', domain: 'Workshop', time: 'Apr 5, Full Day', earnings: 1500, status: 'pending' },
];

export const ExpertDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [proposeOpen, setProposeOpen] = useState(false);
  const [proposeTarget, setProposeTarget] = useState('');
  const [proposeDate, setProposeDate] = useState('');

  const updateRequest = (from: string, status: ReqStatus) => {
    setPendingRequests(prev => prev.map(r => r.from === from ? { ...r, status } : r));
    toast({ title: status === 'accepted' ? 'Request Accepted' : 'Request Rejected', description: status === 'accepted' ? `Session with ${from} confirmed.` : `Request from ${from} declined.` });
  };

  const openPropose = (from: string) => {
    setProposeTarget(from);
    setProposeDate('');
    setProposeOpen(true);
  };

  const submitPropose = () => {
    if (!proposeDate) { toast({ title: 'Select a date', variant: 'destructive' }); return; }
    toast({ title: 'New Time Proposed', description: `Proposal sent to ${proposeTarget} for ${proposeDate}.` });
    setProposeOpen(false);
  };

  return (
    <>
      <SEOHead title="Expert Dashboard | Wisora" />
      <DashboardLayout>
        <div className="relative space-y-8">

          {/* Ambient background glow */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary)/0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="pointer-events-none absolute top-40 right-0 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(var(--secondary)/0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />

          {/* Header */}
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs font-semibold text-yellow-400"
                style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)' }}>
                <Sparkles className="h-3 w-3" /> Senior Expert Mode
              </div>
              <h1 className="text-3xl font-black tracking-tight">Expert Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage your sessions, visits, and earnings</p>
            </div>
            <Button
              onClick={() => navigate('/expert/profile')}
              variant="outline"
              className="border-white/10 hover:bg-white/5 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              Edit Profile & Availability
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="hover-glow rounded-2xl p-5 relative overflow-hidden transition-all duration-500 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${stat.borderColor}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.03)`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.accentColor} rounded-2xl`} />
                  {/* Glow spot */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-60"
                    style={{ background: `radial-gradient(circle, ${stat.glowColor} 0%, transparent 70%)`, filter: 'blur(12px)' }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                      </div>
                      <TrendingUp className="h-3 w-3 text-muted-foreground opacity-50" />
                    </div>
                    <div className="text-2xl font-black mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-xs font-semibold text-foreground/70 mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.change}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sessions + Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

            {/* Upcoming Sessions */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
              {/* Card header accent line */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--primary)/0.6), transparent)' }} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="font-bold text-sm">Upcoming Sessions</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/expert/bookings')}
                    className="text-xs h-7 px-2 hover:bg-white/5" style={{ color: 'hsl(var(--primary-light))' }}>
                    View all <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {upcomingSessions.map((session, i) => (
                    <div key={i} className="group rounded-xl p-3 transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderLeft: '2px solid hsl(var(--primary)/0.5)',
                      }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            {session.user}
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{session.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.time}</span>
                            <span className="opacity-70">{session.duration}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={session.type === 'Campus Visit'
                              ? { background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.25)' }
                              : { background: 'rgba(96,165,250,0.15)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.25)' }}>
                            {session.type}
                          </span>
                          <div className="text-sm font-bold text-emerald-400">₹{session.earnings}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(251,146,60,0.6), transparent)' }} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)' }}>
                      <AlertCircle className="h-4 w-4 text-orange-400" />
                    </div>
                    <span className="font-bold text-sm">Pending Requests</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.25)' }}>
                      {pendingRequests.length}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/expert/bookings')}
                    className="text-xs h-7 px-2 hover:bg-white/5" style={{ color: 'hsl(var(--primary-light))' }}>
                    View all <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {pendingRequests.map((req, i) => (
                    <div key={i} className="rounded-xl p-3 transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderLeft: '2px solid rgba(251,146,60,0.5)',
                      }}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-sm">{req.from}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{req.domain} · {req.time}</div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={req.type === 'Campus Visit'
                              ? { background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.25)' }
                              : { background: 'rgba(96,165,250,0.15)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.25)' }}>
                            {req.type}
                          </span>
                          <div className="text-sm font-bold text-emerald-400">&#8377;{req.earnings}</div>
                        </div>
                      </div>
                      {req.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button className="flex-1 text-xs py-1.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
                            style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}
                            onClick={() => updateRequest(req.from, 'accepted')}>
                            Accept
                          </button>
                          <button className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
                            style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
                            onClick={() => updateRequest(req.from, 'rejected')}>
                            Reject
                          </button>
                          <button className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'hsl(var(--primary-light))', border: '1px solid rgba(255,255,255,0.1)' }}
                            onClick={() => openPropose(req.from)}>
                            Propose
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs font-semibold px-2 py-1 rounded-lg w-fit"
                          style={req.status === 'accepted'
                            ? { background: 'rgba(52,211,153,0.12)', color: '#34d399' }
                            : { background: 'rgba(248,113,113,0.08)', color: '#f87171' }}>
                          {req.status}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Propose New Time Dialog */}
        <Dialog open={proposeOpen} onOpenChange={setProposeOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Propose New Time — {proposeTarget}</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <Input type="date" value={proposeDate} onChange={e => setProposeDate(e.target.value)} className="bg-white/5 border-white/10" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setProposeOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitPropose}>Send Proposal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

