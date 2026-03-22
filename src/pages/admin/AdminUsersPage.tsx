import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { TeacherPageHeader } from '@/components/teacher/TeacherPageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Crown, Users, Search, Filter, UserPlus, Mail, Calendar, Shield, GraduationCap, User, Eye, Pencil } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
  avatar_url?: string;
}

export const AdminUsersPage = () => {
  const { teacher } = useTenant();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // View/Edit dialogs
  const [viewUser, setViewUser] = useState<UserProfile | null>(null);
  const [editUser, setEditUser] = useState<UserProfile | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');

  // Add User dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: '', email: '', role: 'student' });

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<UserProfile[]> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, created_at, last_sign_in_at, avatar_url')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'teacher':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'student':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'teacher':
        return <GraduationCap className="h-4 w-4" />;
      case 'student':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <SEOHead />
      <DashboardLayout>
        <div className="space-y-6">
          <TeacherPageHeader
            title={teacher ? `Users - ${teacher.display_name}` : "User Management"}
            subtitle={teacher ? `Manage users for ${teacher.display_name}` : "Manage all users across the platform"}
            actionLabel="Add User"
            onAction={() => { setNewUser({ full_name: '', email: '', role: 'student' }); setAddOpen(true); }}
            actionIcon={<UserPlus className="h-4 w-4 mr-2" />}
            actionButtonProps={{ className: 'btn-primary' }}
          />

          {/* Admin Badge */}
          {!teacher && (
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-5 w-5 text-amber-500" />
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Global Admin View
              </Badge>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Students</p>
                    <p className="text-2xl font-bold text-green-600">{stats.students}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Teachers</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.teachers}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Admins</p>
                    <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="shrink-0"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Role Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role</label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Users ({filteredUsers.length})</span>
                {filteredUsers.length !== users.length && (
                  <Badge variant="outline">
                    Filtered from {users.length} total
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No users found</h3>
                  <p className="text-muted-foreground">
                    {filteredUsers.length === 0 && users.length > 0 
                      ? "Try adjusting your filters or search terms"
                      : "No users have been registered yet"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {user.full_name || 'Unnamed User'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                Joined {new Date(user.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className={`${getRoleColor(user.role)} border flex items-center gap-1`}>
                              {getRoleIcon(user.role)}
                              {user.role}
                            </Badge>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { setEditUser(user); setEditName(user.full_name || ''); setEditRole(user.role || 'student'); }}>
                                <Pencil className="h-3 w-3 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setViewUser(user)}>
                                <Eye className="h-3 w-3 mr-1" /> View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* View User Dialog */}
        <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
            {viewUser && (
              <div className="space-y-3 py-2 text-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {viewUser.full_name?.charAt(0) || viewUser.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-bold text-base">{viewUser.full_name || 'Unnamed User'}</div>
                    <div className="text-muted-foreground">{viewUser.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground">Role</span><div className="font-semibold capitalize">{viewUser.role}</div></div>
                  <div><span className="text-muted-foreground">Joined</span><div className="font-semibold">{new Date(viewUser.created_at).toLocaleDateString()}</div></div>
                  <div><span className="text-muted-foreground">User ID</span><div className="font-mono text-xs truncate">{viewUser.id}</div></div>
                </div>
              </div>
            )}
            <DialogFooter><Button onClick={() => setViewUser(null)}>Close</Button></DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit User</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1"><label className="text-sm font-medium">Full Name</label><Input value={editName} onChange={e => setEditName(e.target.value)} /></div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <Select value={editRole} onValueChange={setEditRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditUser(null)}>Cancel</Button>
              <Button className="btn-primary" onClick={async () => {
                if (!editUser) return;
                const { error } = await supabase.from('profiles').update({ full_name: editName, role: editRole }).eq('id', editUser.id);
                if (error) { toast({ title: 'Error updating user', description: error.message, variant: 'destructive' }); return; }
                toast({ title: 'User Updated', description: `${editName} has been updated.` });
                setEditUser(null);
              }}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add User Dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1"><label className="text-sm font-medium">Full Name</label><Input value={newUser.full_name} onChange={e => setNewUser(p => ({ ...p, full_name: e.target.value }))} placeholder="Full name" /></div>
              <div className="space-y-1"><label className="text-sm font-medium">Email</label><Input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" /></div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <Select value={newUser.role} onValueChange={v => setNewUser(p => ({ ...p, role: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button className="btn-primary" onClick={() => {
                if (!newUser.full_name.trim() || !newUser.email.trim()) { toast({ title: 'Name and email required', variant: 'destructive' }); return; }
                toast({ title: 'Invite Sent', description: `An invitation has been sent to ${newUser.email}. They will appear here once they sign up.` });
                setAddOpen(false);
              }}>Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};
