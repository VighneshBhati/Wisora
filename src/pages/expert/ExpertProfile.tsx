import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { User, DollarSign, Clock, Shield, Plus, Trash2, Save } from 'lucide-react';

const badgeInfo = [
  { name: 'Bronze', color: 'bg-amber-700/20 text-amber-600 border-amber-600/30', trial: '₹99', hourly: '₹499–₹799' },
  { name: 'Silver', color: 'bg-gray-400/20 text-gray-300 border-gray-400/30', trial: '₹149', hourly: '₹799–₹1,299' },
  { name: 'Gold', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', trial: '₹199', hourly: '₹1,299–₹1,999' },
  { name: 'Platinum', color: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30', trial: '₹299', hourly: '₹1,999–₹3,999' },
];

export const ExpertProfile = () => {
  const { toast } = useToast();
  const [currentBadge] = useState('Gold');
  const [pricing, setPricing] = useState({ trial: 199, hourly: 1499, halfDay: 800, fullDay: 1500 });
  const [availability, setAvailability] = useState({ mon: true, tue: true, wed: false, thu: true, fri: true, sat: false, sun: false });
  const [profile, setProfile] = useState({ name: 'Rahul Sharma', domain: 'Product Management', role: 'Senior PM at Flipkart', experience: '8', bio: '8+ years in product management at top Indian startups and MNCs. Helped 300+ professionals break into PM roles.' });
  const [skills, setSkills] = useState(['Product Strategy', 'Roadmapping', 'User Research', 'Agile', 'OKRs']);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    toast({ title: 'Profile Saved', description: 'Your expert profile has been updated successfully.' });
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
    toast({ title: 'Skill removed', description: `"${skill}" removed from your profile.` });
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) { toast({ title: 'Enter a skill name', variant: 'destructive' }); return; }
    if (skills.includes(trimmed)) { toast({ title: 'Skill already added', variant: 'destructive' }); return; }
    setSkills(prev => [...prev, trimmed]);
    setNewSkill('');
    setAddSkillOpen(false);
    toast({ title: 'Skill added', description: `"${trimmed}" added to your profile.` });
  };

  return (
    <>
      <SEOHead title="Expert Profile | KIA" />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Profile Management</h1>
              <p className="text-muted-foreground">Manage your expert profile, pricing, and availability</p>
            </div>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="badge">Badge Status</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card className="glass-card border-white/10">
                <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><User className="h-4 w-4" /> Basic Info</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-sm font-medium">Full Name</label><Input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Domain / Expertise</label><Input value={profile.domain} onChange={e => setProfile(p => ({ ...p, domain: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Current Role</label><Input value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Years of Experience</label><Input type="number" value={profile.experience} onChange={e => setProfile(p => ({ ...p, experience: e.target.value }))} className="bg-white/5 border-white/10" /></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:border-primary-500/50" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills / Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((tag) => (
                        <Badge key={tag} className="bg-primary-500/20 text-primary-400 border-primary-500/30 cursor-pointer hover:bg-red-500/20 hover:text-red-400 transition-colors" onClick={() => removeSkill(tag)}>
                          {tag} <Trash2 className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                      <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10 h-6 text-xs" onClick={() => setAddSkillOpen(true)}>
                        <Plus className="h-3 w-3 mr-1" /> Add Skill
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <Card className="glass-card border-white/10">
                <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><DollarSign className="h-4 w-4" /> Session Pricing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trial Session (15 min)</label>
                      <div className="flex items-center gap-2"><span className="text-muted-foreground">₹</span><Input type="number" value={pricing.trial} onChange={e => setPricing(p => ({ ...p, trial: +e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hourly Rate</label>
                      <div className="flex items-center gap-2"><span className="text-muted-foreground">₹</span><Input type="number" value={pricing.hourly} onChange={e => setPricing(p => ({ ...p, hourly: +e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Campus Visit — Half Day</label>
                      <div className="flex items-center gap-2"><span className="text-muted-foreground">₹</span><Input type="number" value={pricing.halfDay} onChange={e => setPricing(p => ({ ...p, halfDay: +e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Campus Visit — Full Day</label>
                      <div className="flex items-center gap-2"><span className="text-muted-foreground">₹</span><Input type="number" value={pricing.fullDay} onChange={e => setPricing(p => ({ ...p, fullDay: +e.target.value }))} className="bg-white/5 border-white/10" /></div>
                    </div>
                  </div>
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" /> Save Pricing
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4 mt-4">
              <Card className="glass-card border-white/10">
                <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Clock className="h-4 w-4" /> Weekly Availability</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Object.entries(availability).map(([day, active]) => (
                      <button
                        key={day}
                        onClick={() => setAvailability(a => ({ ...a, [day]: !a[day as keyof typeof a] }))}
                        className={`p-3 rounded-xl text-center transition-all ${active ? 'bg-primary-500/20 border border-primary-500/30 text-primary-400' : 'bg-white/5 border border-white/10 text-muted-foreground'}`}
                      >
                        <div className="text-xs font-bold uppercase">{day}</div>
                        <div className="text-xs mt-1">{active ? '✓' : '–'}</div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Click to toggle availability.</p>
                  <Button className="mt-4 bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" /> Save Availability
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badge" className="space-y-4 mt-4">
              <Card className="glass-card border-white/10">
                <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Shield className="h-4 w-4" /> Expert Badge System</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Your badge is determined by KIA's verification team based on experience, credentials, and community trust.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {badgeInfo.map((badge) => (
                      <div key={badge.name} className={`p-4 rounded-xl border ${badge.color} ${currentBadge === badge.name ? 'ring-2 ring-primary-500/50' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`border ${badge.color}`}>{badge.name}</Badge>
                          {currentBadge === badge.name && <Badge className="bg-primary-500 text-white text-xs">Current</Badge>}
                        </div>
                        <div className="text-xs space-y-1">
                          <div>Trial: <span className="font-bold">{badge.trial}</span></div>
                          <div>Hourly: <span className="font-bold">{badge.hourly}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-sm mb-2">Verification Requirements</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>✓ KYC verification (Aadhaar/PAN)</li>
                      <li>✓ Employment proof (offer letter / LinkedIn)</li>
                      <li>✓ Credential check (degree / certifications)</li>
                      <li>✓ Screening interview with KIA team</li>
                      <li>✓ Community trust score (after 10+ sessions)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Skill Dialog */}
        <Dialog open={addSkillOpen} onOpenChange={setAddSkillOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Add Skill</DialogTitle></DialogHeader>
            <div className="py-2">
              <Input
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="e.g. Growth Hacking"
                className="bg-white/5 border-white/10"
                onKeyDown={e => e.key === 'Enter' && addSkill()}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setAddSkillOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={addSkill}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};
