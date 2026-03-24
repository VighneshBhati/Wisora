import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Video, CheckCircle, X, RotateCcw, Users } from 'lucide-react';

type Status = 'pending' | 'accepted' | 'rejected';

interface OnlineRequest {
  id: string; from: string; topic: string; date: string; time: string; duration: string; earnings: number; status: Status;
}
interface CampusRequest {
  id: string; from: string; topic: string; date: string; duration: string; location: string; students: number; earnings: number; status: Status;
}

const initialOnline: OnlineRequest[] = [
  { id: '1', from: 'Ananya Singh', topic: 'Career switch to product management', date: 'Mar 27, 2026', time: '3:00 PM', duration: '60 min', earnings: 199, status: 'pending' },
  { id: '2', from: 'Dev Mehta', topic: 'Resume review and interview prep', date: 'Mar 29, 2026', time: '11:00 AM', duration: '30 min', earnings: 99, status: 'pending' },
  { id: '3', from: 'Riya Sharma', topic: 'Product roadmap strategy', date: 'Apr 1, 2026', time: '4:00 PM', duration: '90 min', earnings: 299, status: 'accepted' },
];

const initialCampus: CampusRequest[] = [
  { id: '4', from: 'BITS Pilani', topic: 'Product Management Workshop', date: 'Apr 5, 2026', duration: 'Full Day', location: 'BITS Pilani, Rajasthan', students: 80, earnings: 1500, status: 'pending' },
  { id: '5', from: 'IIM Ahmedabad', topic: 'Startup Strategy Seminar', date: 'Apr 12, 2026', duration: 'Half Day', location: 'IIM Ahmedabad, Gujarat', students: 120, earnings: 800, status: 'accepted' },
];

const statusColors: Record<Status, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const ExpertBookingRequests = () => {
  const { toast } = useToast();
  const [online, setOnline] = useState(initialOnline);
  const [campus, setCampus] = useState(initialCampus);
  const [proposeOpen, setProposeOpen] = useState(false);
  const [proposeTarget, setProposeTarget] = useState<{ id: string; type: 'online' | 'campus'; name: string } | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const updateOnlineStatus = (id: string, status: Status) => {
    setOnline(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: status === 'accepted' ? 'Request Accepted' : 'Request Rejected', description: status === 'accepted' ? 'The session has been confirmed.' : 'The request has been declined.' });
  };

  const updateCampusStatus = (id: string, status: Status) => {
    setCampus(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: status === 'accepted' ? 'Visit Accepted' : 'Visit Declined', description: status === 'accepted' ? 'Campus visit confirmed.' : 'Campus visit declined.' });
  };

  const openPropose = (id: string, type: 'online' | 'campus', name: string) => {
    setProposeTarget({ id, type, name });
    setNewDate('');
    setNewTime('');
    setProposeOpen(true);
  };

  const submitPropose = () => {
    if (!newDate) { toast({ title: 'Date required', variant: 'destructive' }); return; }
    toast({ title: 'New Time Proposed', description: `Proposal sent to ${proposeTarget?.name} for ${newDate}${newTime ? ' at ' + newTime : ''}.` });
    setProposeOpen(false);
  };

  return (
    <>
      <SEOHead title="Booking Requests | Wisora Expert" />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">Booking Requests</h1>
            <p className="text-muted-foreground">Manage online session and campus visit requests</p>
          </div>

          <Tabs defaultValue="online">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="online">Online Requests ({online.length})</TabsTrigger>
              <TabsTrigger value="campus">Campus Visits ({campus.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="online" className="space-y-4 mt-4">
              {online.map((req) => (
                <Card key={req.id} className="glass-card border-white/10 hover:border-primary-500/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                          {req.from.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold">{req.from}</div>
                          <div className="text-sm text-muted-foreground">{req.topic}</div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{req.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{req.time}</span>
                            <span>{req.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs border ${statusColors[req.status]}`}>{req.status}</Badge>
                        <span className="text-sm font-bold text-green-400">₹{req.earnings}</span>
                      </div>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30" onClick={() => updateOnlineStatus(req.id, 'accepted')}>
                          <CheckCircle className="h-4 w-4 mr-2" /> Accept
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10" onClick={() => updateOnlineStatus(req.id, 'rejected')}>
                          <X className="h-4 w-4 mr-2" /> Reject
                        </Button>
                        <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10" onClick={() => openPropose(req.id, 'online', req.from)}>
                          <RotateCcw className="h-4 w-4 mr-2" /> Propose New Time
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="campus" className="space-y-4 mt-4">
              {campus.map((req) => (
                <Card key={req.id} className="glass-card border-white/10 hover:border-purple-500/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-bold">{req.from}</div>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Campus Visit</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{req.topic}</div>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{req.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{req.duration}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{req.location}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{req.students} students</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs border ${statusColors[req.status]}`}>{req.status}</Badge>
                        <span className="text-sm font-bold text-green-400">₹{req.earnings}</span>
                      </div>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30" onClick={() => updateCampusStatus(req.id, 'accepted')}>
                          <CheckCircle className="h-4 w-4 mr-2" /> Accept Visit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10" onClick={() => openPropose(req.id, 'campus', req.from)}>
                          Request Changes
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10" onClick={() => updateCampusStatus(req.id, 'rejected')}>
                          <X className="h-4 w-4 mr-2" /> Decline
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Propose New Time Dialog */}
        <Dialog open={proposeOpen} onOpenChange={setProposeOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader>
              <DialogTitle>Propose New Time</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">Suggest a new date/time to <span className="text-foreground font-semibold">{proposeTarget?.name}</span></p>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Date</label>
                <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Time (optional)</label>
                <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-white/5 border-white/10" />
              </div>
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

