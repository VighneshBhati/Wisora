import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Search, CreditCard, Trash2 } from 'lucide-react';

const initialStudents = [
  { id: '1', name: 'Riya Sharma', email: 'riya@college.edu', credits: 12, sessions: 3, status: 'active' },
  { id: '2', name: 'Karan Patel', email: 'karan@college.edu', credits: 8, sessions: 1, status: 'active' },
  { id: '3', name: 'Ananya Singh', email: 'ananya@college.edu', credits: 0, sessions: 5, status: 'inactive' },
  { id: '4', name: 'Dev Mehta', email: 'dev@college.edu', credits: 20, sessions: 0, status: 'active' },
];

const initialFaculty = [
  { id: '5', name: 'Prof. Suresh Kumar', email: 'suresh@college.edu', credits: 30, sessions: 8, status: 'active' },
  { id: '6', name: 'Dr. Meena Iyer', email: 'meena@college.edu', credits: 15, sessions: 4, status: 'active' },
];

type User = { id: string; name: string; email: string; credits: number; sessions: number; status: string };

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const UserTable = ({ users, onAssignCredits, onRemove }: { users: User[]; onAssignCredits: (u: User) => void; onRemove: (id: string, name: string) => void }) => (
  <div className="space-y-2">
    {users.map((user) => (
      <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/20 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center hidden md:block">
            <div className="text-sm font-bold text-yellow-400">{user.credits}</div>
            <div className="text-xs text-muted-foreground">credits</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-sm font-bold">{user.sessions}</div>
            <div className="text-xs text-muted-foreground">sessions</div>
          </div>
          <Badge className={`text-xs border ${statusColors[user.status]}`}>{user.status}</Badge>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="text-primary-400 hover:bg-primary-500/10 h-8 w-8 p-0" title="Assign Credits" onClick={() => onAssignCredits(user)}>
              <CreditCard className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10 h-8 w-8 p-0" title="Remove User" onClick={() => onRemove(user.id, user.name)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const InstitutionalUsers = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState(initialStudents);
  const [faculty, setFaculty] = useState(initialFaculty);

  // Add User dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', credits: '10' });

  // Assign Credits dialog
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [creditTarget, setCreditTarget] = useState<User | null>(null);
  const [creditAmount, setCreditAmount] = useState('10');

  const openAssignCredits = (user: User) => {
    setCreditTarget(user);
    setCreditAmount('10');
    setCreditsOpen(true);
  };

  const submitAssignCredits = () => {
    const amount = parseInt(creditAmount);
    if (!amount || amount <= 0) { toast({ title: 'Enter a valid credit amount', variant: 'destructive' }); return; }
    const update = (list: User[]) => list.map(u => u.id === creditTarget?.id ? { ...u, credits: u.credits + amount } : u);
    setStudents(update);
    setFaculty(update);
    toast({ title: 'Credits Assigned', description: `${amount} credits added to ${creditTarget?.name}.` });
    setCreditsOpen(false);
  };

  const removeUser = (id: string, name: string) => {
    setStudents(prev => prev.filter(u => u.id !== id));
    setFaculty(prev => prev.filter(u => u.id !== id));
    toast({ title: 'User Removed', description: `${name} has been removed.` });
  };

  const submitAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) { toast({ title: 'Name and email are required', variant: 'destructive' }); return; }
    const user: User = { id: Date.now().toString(), name: newUser.name, email: newUser.email, credits: parseInt(newUser.credits) || 0, sessions: 0, status: 'active' };
    if (newUser.role === 'faculty') setFaculty(prev => [...prev, user]);
    else setStudents(prev => [...prev, user]);
    toast({ title: 'User Added', description: `${newUser.name} has been added as ${newUser.role}.` });
    setNewUser({ name: '', email: '', role: 'student', credits: '10' });
    setAddOpen(false);
  };

  return (
    <>
      <SEOHead title="User Management | KIA" />
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">User Management</h1>
              <p className="text-muted-foreground">Manage students, faculty, and their credit allocations</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => { setCreditTarget(null); setCreditAmount('10'); setCreditsOpen(true); }}>
                <CreditCard className="h-4 w-4 mr-2" /> Assign Credits
              </Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={() => setAddOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 bg-white/5 border-white/10"
            />
          </div>

          <Tabs defaultValue="students">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
              <TabsTrigger value="faculty">Faculty ({faculty.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="mt-4">
              <UserTable users={students.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))} onAssignCredits={openAssignCredits} onRemove={removeUser} />
            </TabsContent>
            <TabsContent value="faculty" className="mt-4">
              <UserTable users={faculty.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))} onAssignCredits={openAssignCredits} onRemove={removeUser} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Add User Dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1"><label className="text-sm font-medium">Full Name</label><Input value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Riya Sharma" className="bg-white/5 border-white/10" /></div>
              <div className="space-y-1"><label className="text-sm font-medium">Email</label><Input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="e.g. riya@college.edu" className="bg-white/5 border-white/10" /></div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <Select value={newUser.role} onValueChange={v => setNewUser(p => ({ ...p, role: v }))}>
                  <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="student">Student</SelectItem><SelectItem value="faculty">Faculty</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><label className="text-sm font-medium">Initial Credits</label><Input type="number" value={newUser.credits} onChange={e => setNewUser(p => ({ ...p, credits: e.target.value }))} className="bg-white/5 border-white/10" /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Credits Dialog */}
        <Dialog open={creditsOpen} onOpenChange={setCreditsOpen}>
          <DialogContent className="glass-card border-white/10">
            <DialogHeader><DialogTitle>Assign Credits{creditTarget ? ` — ${creditTarget.name}` : ''}</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">{creditTarget ? `Current balance: ${creditTarget.credits} credits` : 'Assign credits to a user.'}</p>
              <div className="space-y-1"><label className="text-sm font-medium">Credits to Add</label><Input type="number" value={creditAmount} onChange={e => setCreditAmount(e.target.value)} className="bg-white/5 border-white/10" /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setCreditsOpen(false)}>Cancel</Button>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white" onClick={submitAssignCredits}>Assign Credits</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};
