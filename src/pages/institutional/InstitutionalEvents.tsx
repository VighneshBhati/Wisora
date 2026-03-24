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
import { Calendar, Users, MapPin, Plus, Clock, Star } from 'lucide-react';

type EventItem = { id: string; title: string; expert: string; date: string; time: string; type: string; location: string; registered: number; capacity: number; status: string };

const initialEvents: EventItem[] = [
  { id: '1', title: 'Product Management Masterclass', expert: 'Rahul Sharma', date: 'Mar 28, 2026', time: '10:00 AM - 1:00 PM', type: 'Workshop', location: 'Seminar Hall A', registered: 45, capacity: 60, status: 'open' },
  { id: '2', title: 'Data Science Career Seminar', expert: 'Priya Nair', date: 'Apr 5, 2026', time: '2:00 PM - 5:00 PM', type: 'Seminar', location: 'Auditorium', registered: 78, capacity: 100, status: 'open' },
  { id: '3', title: 'Finance & Investment Workshop', expert: 'Arjun Mehta', date: 'Apr 12, 2026', time: '11:00 AM - 2:00 PM', type: 'Workshop', location: 'Room 204', registered: 30, capacity: 30, status: 'full' },
];

const pastEvents = [
  {
    id: '4', title: 'UX Design Sprint', expert: 'Sneha Kapoor', date: 'Mar 10, 2026',
    type: 'Workshop', attended: 42, rating: 4.8
  },
  {
    id: '5', title: 'Startup Ecosystem Talk', expert: 'Vikram Reddy', date: 'Feb 28, 2026',
    type: 'Seminar', attended: 95, rating: 4.9
  },
];

const statusColors: Record<string, string> = {
  open: 'bg-green-500/20 text-green-400 border-green-500/30',
  full: 'bg-red-500/20 text-red-400 border-red-500/30',
  upcoming: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export const InstitutionalEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState(initialEvents);
  const [hostOpen, setHostOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerTarget, setRegisterTarget] = useState<EventItem | null>(null);
  const [registerCount, setRegisterCount] = useState('5');
  const [newEvent, setNewEvent] = useState({ title: '', expert: '', date: '', time: '', location: '', capacity: '60', type: 'Workshop' });

  const openRegister = (event: EventItem) => {
    setRegisterTarget(event);
    setRegisterCount('5');
    setRegisterOpen(true);
  };

  const submitRegister = () => {
    const count = parseInt(registerCount);
    if (!count || count <= 0) { toast({ title: 'Enter a valid number', variant: 'destructive' }); return; }
    if (!registerTarget) return;
    const remaining = registerTarget.capacity - registerTarget.registered;
    if (count > remaining) { toast({ title: `Only ${remaining} spots left`, variant: 'destructive' }); return; }
    setEvents(prev => prev.map(e => {
      if (e.id !== registerTarget.id) return e;
      const newReg = e.registered + count;
      return { ...e, registered: newReg, status: newReg >= e.capacity ? 'full' : 'open' };
    }));
    toast({ title: 'Students Registered', description: `${count} students registered for "${registerTarget.title}".` });
    setRegisterOpen(false);
  };

  const submitHostWorkshop = () => {
    if (!newEvent.title.trim() || !newEvent.expert.trim() || !newEvent.date) {
      toast({ title: 'Title, expert, and date are required', variant: 'destructive' }); return;
    }
    const event: EventItem = {
      id: Date.now().toString(), title: newEvent.title, expert: newEvent.expert,
      date: newEvent.date, time: newEvent.time || 'TBD', type: newEvent.type,
      location: newEvent.location || 'TBD', registered: 0,
      capacity: parseInt(newEvent.capacity) || 60, status: 'open'
    };
    setEvents(prev => [...prev, event]);
    toast({ title: 'Workshop Created', description: `"${newEvent.title}" has been scheduled.` });
    setNewEvent({ title: '', expert: '', date: '', time: '', location: '', capacity: '60', type: 'Workshop' });
    setHostOpen(false);
  };

  return (
    <>
      <SEOHead title="Events & Workshops | Wisora Institutional" />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Events & Workshops</h1>
              <p className="text-muted-foreground">Manage campus events and expert-led workshops</p>
            </div>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={() => setHostOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Host Workshop
            </Button>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="upcoming">Upcoming ({events.length})</TabsTrigger>
              <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {events.map((event) => (
                <Card key={event.id} className="glass-card border-white/10 hover:border-primary-500/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{event.title}</h3>
                          <Badge className={`text-xs border ${statusColors[event.status]}`}>{event.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">by {event.expert}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{event.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.registered}/{event.capacity} registered</span>
                        </div>
                        <div className="mt-3 w-full bg-white/10 rounded-full h-1.5">
                          <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">{event.type}</Badge>
                        <Button size="sm" className="bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 border border-primary-500/30 text-xs" disabled={event.status === 'full'} onClick={() => openRegister(event)}>
                          Register Students
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="past" className="space-y-4 mt-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="glass-card border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">by {event.expert} · {event.date}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.attended} attended</span>
                          <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{event.rating} rating</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">{event.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Host Workshop Dialog */}
        <Dialog open={hostOpen} onOpenChange={setHostOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Host a Workshop</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1"><label className="text-sm font-medium">Workshop Title</label><Input value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} placeholder="e.g. AI in Finance" className="bg-white/5 border-white/10" /></div>
              <div className="space-y-1"><label className="text-sm font-medium">Expert / Speaker</label><Input value={newEvent.expert} onChange={e => setNewEvent(p => ({ ...p, expert: e.target.value }))} placeholder="e.g. Rahul Sharma" className="bg-white/5 border-white/10" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-sm font-medium">Date</label><Input type="date" value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1"><label className="text-sm font-medium">Time</label><Input value={newEvent.time} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} placeholder="e.g. 10:00 AM - 1:00 PM" className="bg-white/5 border-white/10" /></div>
              </div>
              <div className="space-y-1"><label className="text-sm font-medium">Location / Room</label><Input value={newEvent.location} onChange={e => setNewEvent(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Seminar Hall A" className="bg-white/5 border-white/10" /></div>
              <div className="space-y-1"><label className="text-sm font-medium">Capacity</label><Input type="number" value={newEvent.capacity} onChange={e => setNewEvent(p => ({ ...p, capacity: e.target.value }))} className="bg-white/5 border-white/10" /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setHostOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitHostWorkshop}>Create Workshop</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Register Students Dialog */}
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Register Students — {registerTarget?.title}</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">
                {registerTarget && `${registerTarget.capacity - registerTarget.registered} spots remaining.`}
              </p>
              <div className="space-y-1"><label className="text-sm font-medium">Number of Students</label><Input type="number" value={registerCount} onChange={e => setRegisterCount(e.target.value)} className="bg-white/5 border-white/10" /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setRegisterOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitRegister}>Register</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

