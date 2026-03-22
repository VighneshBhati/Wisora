import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, TrendingUp, Video, MapPin, Download } from 'lucide-react';

const earningsSummary = [
  { label: 'Total Earned', value: '48,200', iconKey: 'dollar', color: 'from-green-500/20 to-green-600/10 border-green-500/20' },
  { label: 'This Month', value: '8,400', iconKey: 'trend', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20' },
  { label: 'Session Earnings', value: '32,600', iconKey: 'video', color: 'from-primary-500/20 to-primary-600/10 border-primary-500/20' },
  { label: 'Visit Earnings', value: '15,600', iconKey: 'map', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20' },
];

const transactions = [
  { type: 'session', desc: 'Online session - Riya Sharma', date: 'Mar 20, 2026', amount: 199, status: 'paid' },
  { type: 'visit', desc: 'Campus visit - BITS Pilani (Full Day)', date: 'Mar 10, 2026', amount: 1500, status: 'paid' },
  { type: 'session', desc: 'Online session - Karan Patel', date: 'Mar 8, 2026', amount: 149, status: 'paid' },
  { type: 'session', desc: 'Online session - Ananya Singh', date: 'Mar 5, 2026', amount: 199, status: 'pending' },
  { type: 'visit', desc: 'Campus visit - NIT Trichy (Half Day)', date: 'Feb 20, 2026', amount: 800, status: 'paid' },
];

const SummaryIcon = ({ iconKey }: { iconKey: string }) => {
  if (iconKey === 'dollar') return <DollarSign className="h-5 w-5 text-green-400" />;
  if (iconKey === 'trend') return <TrendingUp className="h-5 w-5 text-blue-400" />;
  if (iconKey === 'video') return <Video className="h-5 w-5 text-primary-400" />;
  return <MapPin className="h-5 w-5 text-purple-400" />;
};

export const ExpertEarnings = () => {
  const { toast } = useToast();

  const downloadStatement = () => {
    const header = 'Description,Date,Amount (INR),Status\n';
    const rows = transactions.map(t => `"${t.desc}","${t.date}",${t.amount},${t.status}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kia-earnings-statement.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Statement Downloaded', description: 'Saved as kia-earnings-statement.csv' });
  };

  return (
    <>
      <SEOHead title="Earnings | KIA Expert" />
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Earnings</h1>
              <p className="text-muted-foreground">Track your session and campus visit earnings</p>
            </div>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={downloadStatement}>
              <Download className="h-4 w-4 mr-2" /> Download Statement
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earningsSummary.map((item) => (
              <Card key={item.label} className={`glass-card bg-gradient-to-br ${item.color}`}>
                <CardContent className="p-5">
                  <div className="p-2 rounded-xl bg-white/10 w-fit mb-3">
                    <SummaryIcon iconKey={item.iconKey} />
                  </div>
                  <div className="text-2xl font-black mb-1">&#8377;{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3"><CardTitle className="text-base font-bold">Earnings by Type</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Online Sessions', amount: 32600, pct: 68, color: 'bg-primary-500' },
                  { label: 'Campus Visits', amount: 15600, pct: 32, color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold">&#8377;{item.amount.toLocaleString()} ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3"><CardTitle className="text-base font-bold">Monthly Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { month: 'March 2026', amount: 8400 },
                    { month: 'February 2026', amount: 12200 },
                    { month: 'January 2026', amount: 9800 },
                    { month: 'December 2025', amount: 11400 },
                  ].map((m) => (
                    <div key={m.month} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                      <span className="text-sm text-muted-foreground">{m.month}</span>
                      <span className="font-bold text-green-400">&#8377;{m.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3"><CardTitle className="text-base font-bold">Transaction History</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${tx.type === 'visit' ? 'bg-purple-500/20' : 'bg-primary-500/20'}`}>
                        {tx.type === 'visit' ? <MapPin className="h-4 w-4 text-purple-400" /> : <Video className="h-4 w-4 text-primary-400" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{tx.desc}</div>
                        <div className="text-xs text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={tx.status === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30 text-xs' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs'}>
                        {tx.status}
                      </Badge>
                      <span className="font-bold text-green-400">+&#8377;{tx.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};
