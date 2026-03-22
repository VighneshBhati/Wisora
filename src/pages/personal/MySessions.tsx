import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Video, RotateCcw, X, Star, MessageSquare } from 'lucide-react';

const upcomingSessions = [
  {
    id: '1', expert: 'Rahul Sharma', domain: 'Product Management', date: 'Mar 25, 2026',
    time: '3:00 PM', duration: '60 min', type: 'Online', status: 'confirmed', avatar: '👨‍💼', price: 199
  },
  {
    id: '2', expert: 'Priya Nair', domain: 'Data Science', date: 'Mar 28, 2026',
    time: '11:00 AM', duration: '45 min', type: 'Online', status: 'pending', avatar: '👩‍💻', price: 299
  },
];

const completedSessions = [
  {
    id: '3', expert: 'Arjun Mehta', domain: 'Finance', date: 'Mar 15, 2026',
    time: '2:00 PM', duration: '60 min', type: 'Online', status: 'completed', avatar: '👨‍🏫', price: 149, rating: 5
  },
  {
    id: '4', expert: 'Sneha Kapoor', domain: 'UX Design', date: 'Mar 10, 2026',
    time: '4:00 PM', duration: '30 min', type: 'Online', status: 'completed', avatar: '👩‍🎨', price: 199, rating: 4
  },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const MySessions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(upcomingSessions);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [targetSession, setTargetSession] = useState<typeof upcomingSessions[0] | null>(null);
  const [newDate, setNewDate] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const cancelSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Session Cancelled', description: 'Your session has been cancelled successfully.' });
  };

  const openReschedule = (session: typeof upcomingSessions[0]) => {
    setTargetSession(session);
    setNewDate('');
    setRescheduleOpen(true);
  };

  const submitReschedule = () => {
    if (!newDate) { toast({ title: 'Please select a new date', variant: 'destructive' }); return; }
    toast({ title: 'Reschedule Requested', description: `Reschedule request sent to ${targetSession?.expert} for ${newDate}.` });
    setRescheduleOpen(false);
  };

  const openReview = (session: typeof completedSessions[0]) => {
    setTargetSession(session as any);
    setReviewText('');
    setReviewRating(5);
    setReviewOpen(true);
  };

  const submitReview = () => {
    if (!reviewText.trim()) { toast({ title: 'Please write a review', variant: 'destructive' }); return; }
    toast({ title: 'Review Submitted', description: `Thank you for reviewing ${targetSession?.expert}!` });
    setReviewOpen(false);
  };

  return (
    <>
      <SEOHead title="My Sessions | KIA" />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">My Sessions</h1>
            <p className="text-muted-foreground">Manage your upcoming and past expert sessions</p>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedSessions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {sessions.length === 0 ? (
                <Card className="glass-card border-white/10">
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming sessions. Book one now!</p>
                    <Button className="mt-4 bg-primary-500 hover:bg-primary-600 text-white" onClick={() => navigate('/teachers')}>Browse Experts</Button>
                  </CardContent>
                </Card>
              ) : (
                sessions.map((session) => (
                  <Card key={session.id} className="glass-card border-white/10 hover:border-primary-500/20 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{session.avatar}</div>
                          <div>
                            <div className="font-bold">{session.expert}</div>
                            <div className="text-sm text-muted-foreground">{session.domain}</div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{session.date}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.time}</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`text-xs border ${statusColors[session.status]}`}>{session.status}</Badge>
                          <span className="text-sm font-semibold text-primary-400">&#8377;{session.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white" onClick={() => toast({ title: 'Joining Call...', description: `Connecting to session with ${session.expert}` })}>
                          <Video className="h-4 w-4 mr-2" /> Join Call
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => openReschedule(session)}>
                          <RotateCcw className="h-4 w-4 mr-2" /> Reschedule
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => cancelSession(session.id)}>
                          <X className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-4">
              {completedSessions.map((session) => (
                <Card key={session.id} className="glass-card border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{session.avatar}</div>
                        <div>
                          <div className="font-bold">{session.expert}</div>
                          <div className="text-sm text-muted-foreground">{session.domain}</div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{session.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.time}</span>
                          </div>
                          {session.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs border ${statusColors[session.status]}`}>{session.status}</Badge>
                        <span className="text-sm font-semibold text-primary-400">₹{session.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => openReview(session)}>
                        <MessageSquare className="h-4 w-4 mr-2" /> Leave Review
                      </Button>
                      <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10" onClick={() => navigate('/teachers')}>
                        Book Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Reschedule Dialog */}
        <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Reschedule Session — {targetSession?.expert}</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">Select a new preferred date for your session.</p>
              <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="bg-white/5 border-white/10" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setRescheduleOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitReschedule}>Request Reschedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Dialog */}
        <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Review — {targetSession?.expert}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReviewRating(n)}>
                    <Star className={`h-5 w-5 ${n <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  </button>
                ))}
              </div>
              <Textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Share your experience..." className="bg-white/5 border-white/10 resize-none h-24" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setReviewOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitReview}>Submit Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};
