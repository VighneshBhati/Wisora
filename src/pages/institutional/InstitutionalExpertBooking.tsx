import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { 
  Video, MapPin, Calendar, Clock, Users, Star, 
  CreditCard, Building, CheckCircle, ArrowRight
} from 'lucide-react';

const experts = [
  { id: '1', name: 'Rahul Sharma', domain: 'Product Management', badge: 'Gold', rating: 4.9, sessions: 312, onlineCredits: 8, visitCredits: 40, avatar: '👨‍💼', available: true },
  { id: '2', name: 'Priya Nair', domain: 'Data Science & ML', badge: 'Platinum', rating: 5.0, sessions: 489, onlineCredits: 12, visitCredits: 60, avatar: '👩‍💻', available: true },
  { id: '3', name: 'Arjun Mehta', domain: 'Finance & Investing', badge: 'Silver', rating: 4.8, sessions: 156, onlineCredits: 6, visitCredits: 30, avatar: '👨‍🏫', available: false },
];

const badgeColors: Record<string, string> = {
  Bronze: 'bg-amber-700/20 text-amber-600 border-amber-600/30',
  Silver: 'bg-gray-400/20 text-gray-300 border-gray-400/30',
  Gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Platinum: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
};

const CampusVisitForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    expert: '', date: '', duration: '2hrs', location: '', room: '', students: '', sessionType: 'workshop'
  });

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {['Select Expert', 'Visit Details', 'Confirm'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-green-400' : step === i + 1 ? 'text-primary-400' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${step > i + 1 ? 'bg-green-500/20 border-green-500/30' : step === i + 1 ? 'bg-primary-500/20 border-primary-500/30' : 'bg-white/5 border-white/10'}`}>
                {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden md:block">{s}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px bg-white/10" />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <h3 className="font-bold">Select Expert for Campus Visit</h3>
          {experts.map((expert) => (
            <Card key={expert.id} className={`glass-card cursor-pointer transition-all ${form.expert === expert.id ? 'border-primary-500/50 bg-primary-500/10' : 'border-white/10 hover:border-primary-500/20'}`}
              onClick={() => setForm(f => ({ ...f, expert: expert.id }))}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{expert.avatar}</span>
                    <div>
                      <div className="font-bold text-sm">{expert.name}</div>
                      <div className="text-xs text-muted-foreground">{expert.domain}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs border ${badgeColors[expert.badge]}`}>{expert.badge}</Badge>
                        <span className="text-xs flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{expert.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Campus Visit</div>
                    <div className="font-bold text-primary-400 flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> {expert.visitCredits} credits/day
                    </div>
                    {!expert.available && <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs mt-1">Unavailable</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white" disabled={!form.expert} onClick={() => setStep(2)}>
            Continue <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold">Campus Visit Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Visit Date</label>
              <Input type="date" className="bg-white/5 border-white/10" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <div className="flex gap-2">
                {['2hrs', 'Half Day', 'Full Day'].map((d) => (
                  <Button key={d} size="sm" variant={form.duration === d ? 'default' : 'outline'}
                    className={form.duration === d ? 'bg-primary-500 text-white' : 'border-white/10'}
                    onClick={() => setForm(f => ({ ...f, duration: d }))}>
                    {d}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2"><Building className="h-4 w-4" /> Campus Address</label>
              <Input placeholder="e.g. IIT Delhi, Hauz Khas, New Delhi" className="bg-white/5 border-white/10" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Room / Hall</label>
              <Input placeholder="e.g. Seminar Hall B, Room 204" className="bg-white/5 border-white/10" value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2"><Users className="h-4 w-4" /> Expected Students</label>
              <Input type="number" placeholder="e.g. 60" className="bg-white/5 border-white/10" value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Type</label>
              <div className="flex gap-2 flex-wrap">
                {['workshop', '1:1 mentoring', 'seminar'].map((t) => (
                  <Button key={t} size="sm" variant={form.sessionType === t ? 'default' : 'outline'}
                    className={form.sessionType === t ? 'bg-primary-500 text-white capitalize' : 'border-white/10 capitalize'}
                    onClick={() => setForm(f => ({ ...f, sessionType: t }))}>
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10" onClick={() => setStep(1)}>Back</Button>
            <Button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white" onClick={() => setStep(3)}>
              Review Request <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold">Confirm Campus Visit Request</h3>
          <Card className="glass-card border-primary-500/20 bg-primary-500/5">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expert</span><span className="font-semibold">{experts.find(e => e.id === form.expert)?.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="font-semibold">{form.date || 'Not set'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{form.duration}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Location</span><span className="font-semibold">{form.location || 'Not set'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Session Type</span><span className="font-semibold capitalize">{form.sessionType}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expected Students</span><span className="font-semibold">{form.students || 'Not set'}</span></div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                <span>Credits Required</span>
                <span className="text-primary-400 flex items-center gap-1"><CreditCard className="h-4 w-4" /> {experts.find(e => e.id === form.expert)?.visitCredits || 0}</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10" onClick={() => setStep(2)}>Back</Button>
            <Button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white" onClick={() => {
              toast({ title: '✅ Visit Request Submitted', description: 'Your campus visit request has been sent to the expert for confirmation.' });
              setStep(1);
              setForm({ expert: '', date: '', duration: '2hrs', location: '', room: '', students: '', sessionType: 'workshop' });
            }}>
              <CheckCircle className="h-4 w-4 mr-2" /> Request Visit
            </Button>
            <Button variant="outline" className="border-white/10" onClick={() => toast({ title: '💬 Negotiation Request Sent', description: 'The expert will contact you to discuss a suitable time.' })}>Negotiate Time</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const InstitutionalExpertBooking = () => {
  const [mode, setMode] = useState<'online' | 'campus'>('online');
  const { toast } = useToast();

  return (
    <>
      <SEOHead title="Expert Booking | Wisora Institutional" />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">Expert Booking</h1>
            <p className="text-muted-foreground">Book online sessions or schedule on-campus expert visits</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-3">
            <Button
              onClick={() => setMode('online')}
              className={mode === 'online' ? 'bg-primary-500 text-white' : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'}
            >
              <Video className="h-4 w-4 mr-2" /> Online Session
            </Button>
            <Button
              onClick={() => setMode('campus')}
              className={mode === 'campus' ? 'bg-purple-500 text-white' : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'}
            >
              <MapPin className="h-4 w-4 mr-2" /> On-Campus Visit
              <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">USP</Badge>
            </Button>
          </div>

          {mode === 'online' ? (
            <div className="space-y-4">
              <h3 className="font-bold">Select Expert for Online Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experts.map((expert) => (
                  <Card key={expert.id} className="glass-card border-white/10 hover:border-primary-500/30 cursor-pointer transition-all hover:scale-105">
                    <CardContent className="p-5">
                      <div className="text-4xl mb-3 text-center">{expert.avatar}</div>
                      <div className="font-bold text-sm mb-1">{expert.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{expert.domain}</div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`text-xs border ${badgeColors[expert.badge]}`}>{expert.badge}</Badge>
                        <span className="text-xs flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{expert.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <CreditCard className="h-3 w-3 text-primary-400" />
                        <span className="text-primary-400 font-semibold">{expert.onlineCredits} credits/session</span>
                      </div>
                      <Button size="sm" className="w-full bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 border border-primary-500/30 text-xs"
                        onClick={() => toast({ title: '💳 Payment Gateway', description: 'Payment Gateway Under Development.' })}>
                        Use Credits & Book
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="glass-card border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" /> Schedule Physical Campus Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CampusVisitForm />
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

