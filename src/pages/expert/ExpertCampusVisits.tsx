import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar, Clock, Users, CheckCircle, Building } from 'lucide-react';

type VisitStatus = 'confirmed' | 'pending' | 'completed';

interface Visit {
  id: string; institution: string; location: string; date: string;
  time?: string; duration: string; sessionType: string; students: number;
  room?: string; earnings: number; status: VisitStatus;
}

const initialUpcoming: Visit[] = [
  { id: '1', institution: 'IIT Delhi', location: 'Hauz Khas, New Delhi', date: 'Mar 28, 2026', time: '10:00 AM', duration: 'Full Day', sessionType: 'Workshop', students: 80, room: 'Seminar Hall B', earnings: 1500, status: 'confirmed' },
  { id: '2', institution: 'IIM Ahmedabad', location: 'Vastrapur, Ahmedabad', date: 'Apr 12, 2026', time: '2:00 PM', duration: 'Half Day', sessionType: 'Seminar', students: 120, room: 'Auditorium', earnings: 800, status: 'confirmed' },
];

const pastVisits = [
  { id: '3', institution: 'BITS Pilani', location: 'Pilani, Rajasthan', date: 'Mar 10, 2026', duration: 'Full Day', sessionType: 'Workshop', students: 65, earnings: 1500, rating: 4.9 },
  { id: '4', institution: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu', date: 'Feb 20, 2026', duration: 'Half Day', sessionType: '1:1 Mentoring', students: 20, earnings: 800, rating: 5.0 },
];

const statusColors: Record<VisitStatus, string> = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export const ExpertCampusVisits = () => {
  const { toast } = useToast();
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [changesOpen, setChangesOpen] = useState(false);
  const [changesTarget, setChangesTarget] = useState<string>('');
  const [changesNote, setChangesNote] = useState('');

  const markCompleted = (id: string) => {
    setUpcoming(prev => prev.map(v => v.id === id ? { ...v, status: 'completed' as VisitStatus } : v));
    toast({ title: 'Visit Marked Completed', description: 'The campus visit has been recorded as completed.' });
  };

  const openChanges = (institution: string) => {
    setChangesTarget(institution);
    setChangesNote('');
    setChangesOpen(true);
  };

  const submitChanges = () => {
    if (!changesNote.trim()) { toast({ title: 'Please describe the changes needed', variant: 'destructive' }); return; }
    toast({ title: 'Change Request Sent', description: `Your request has been sent to ${changesTarget}.` });
    setChangesOpen(false);
  };

  return (
    <>
      <SEOHead title="Campus Visits | KIA Expert" />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">Campus Visits</h1>
            <p className="text-muted-foreground">Manage your on-campus expert sessions and workshops</p>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past Visits ({pastVisits.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {upcoming.map((visit) => (
                <Card key={visit.id} className="glass-card border-white/10 hover:border-purple-500/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/20">
                          <Building className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{visit.institution}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" /> {visit.location}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{visit.date}</span>
                            {visit.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{visit.time}</span>}
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{visit.students} students</span>
                            {visit.room && <span>{visit.room}</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">{visit.sessionType}</Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">{visit.duration}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs border ${statusColors[visit.status]}`}>{visit.status}</Badge>
                        <span className="text-lg font-black text-green-400">₹{visit.earnings}</span>
                      </div>
                    </div>
                    {visit.status !== 'completed' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30" onClick={() => markCompleted(visit.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" /> Mark Completed
                        </Button>
                        <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10" onClick={() => openChanges(visit.institution)}>
                          Request Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="past" className="space-y-4 mt-4">
              {pastVisits.map((visit) => (
                <Card key={visit.id} className="glass-card border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-white/10">
                          <Building className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-bold">{visit.institution}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" /> {visit.location}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{visit.date}</span>
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{visit.students} students</span>
                            <span>{visit.sessionType}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(visit.rating) ? 'text-yellow-400' : 'text-muted-foreground'}>★</span>
                            ))}
                            <span className="text-muted-foreground ml-1">{visit.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs mb-2">completed</Badge>
                        <div className="text-lg font-black text-green-400">₹{visit.earnings}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Request Changes Dialog */}
        <Dialog open={changesOpen} onOpenChange={setChangesOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader>
              <DialogTitle>Request Changes — {changesTarget}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">Describe what needs to be changed for this campus visit.</p>
              <Textarea
                value={changesNote}
                onChange={e => setChangesNote(e.target.value)}
                placeholder="e.g. Need to reschedule to April 15, change room to Auditorium..."
                className="bg-white/5 border-white/10 resize-none h-28"
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setChangesOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitChanges}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};
