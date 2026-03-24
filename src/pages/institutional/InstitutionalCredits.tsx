import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, TrendingUp, TrendingDown, Plus, Zap, Users, MapPin, Calendar } from 'lucide-react';

const creditPacks = [
  { credits: 100, price: 4999, bonus: 0, label: 'Starter Pack' },
  { credits: 300, price: 12999, bonus: 30, label: 'Growth Pack', popular: true },
  { credits: 600, price: 22999, bonus: 100, label: 'Enterprise Pack' },
  { credits: 1500, price: 49999, bonus: 300, label: 'Mega Pack' },
];

const transactions = [
  { type: 'debit', desc: 'Online session — Rahul Sharma', credits: -8, date: 'Mar 20, 2026', user: 'Riya Sharma' },
  { type: 'credit', desc: 'Credits purchased — Growth Pack', credits: +330, date: 'Mar 18, 2026', user: 'Admin' },
  { type: 'debit', desc: 'Campus visit — Priya Nair (Full Day)', credits: -60, date: 'Mar 15, 2026', user: 'Admin' },
  { type: 'debit', desc: 'Online session — Arjun Mehta', credits: -6, date: 'Mar 12, 2026', user: 'Karan Patel' },
  { type: 'debit', desc: 'Online session — Sneha Kapoor', credits: -8, date: 'Mar 10, 2026', user: 'Ananya Singh' },
];

export const InstitutionalCredits = () => {
  const [balance] = useState(1840);
  const { toast } = useToast();

  const handlePurchase = (pack: { label: string; price: number; credits: number; bonus: number }) => {
    toast({
      title: '🚧 Payment Gateway Under Development',
      description: `${pack.label} (${pack.credits + pack.bonus} credits for ₹${pack.price.toLocaleString()}) will be available soon!`,
    });
  };

  const handleAddCredits = () => {
    toast({
      title: '🚧 Payment Gateway Under Development',
      description: 'Credit top-up via payment gateway is coming soon. Stay tuned!',
    });
  };

  return (
    <>
      <SEOHead title="Credits System | Wisora Institutional" />
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-black">Credits System</h1>
            <p className="text-muted-foreground">Manage your institution's credit balance and usage</p>
          </div>

          {/* Balance Card */}
          <Card className="glass-card bg-gradient-to-br from-primary-500/20 to-secondary-500/10 border-primary-500/30">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Current Balance</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-primary-400">{balance.toLocaleString()}</span>
                    <span className="text-xl text-muted-foreground">credits</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">≈ {Math.floor(balance / 8)} online sessions or {Math.floor(balance / 60)} full-day campus visits</p>
                </div>
                <div className="text-right space-y-2">
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white w-full" onClick={handleAddCredits}>
                    <Plus className="h-4 w-4 mr-2" /> Add Credits
                  </Button>
                  <p className="text-xs text-muted-foreground">1 credit ≈ ₹25 value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Usage Guide */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Online Session (Bronze)', credits: 4, icon: <Zap className="h-4 w-4 text-amber-600" /> },
              { label: 'Online Session (Gold)', credits: 8, icon: <Zap className="h-4 w-4 text-yellow-400" /> },
              { label: 'Campus Visit (Half Day)', credits: 30, icon: <MapPin className="h-4 w-4 text-purple-400" /> },
              { label: 'Campus Visit (Full Day)', credits: 60, icon: <MapPin className="h-4 w-4 text-purple-400" /> },
            ].map((item) => (
              <Card key={item.label} className="glass-card border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">{item.icon}<span className="text-xs text-muted-foreground">{item.label}</span></div>
                  <div className="text-2xl font-black text-primary-400">{item.credits}</div>
                  <div className="text-xs text-muted-foreground">credits</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Credit Packs */}
          <div>
            <h2 className="text-xl font-bold mb-4">Purchase Credits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {creditPacks.map((pack) => (
                <Card key={pack.label} className={`glass-card relative ${pack.popular ? 'border-primary-500/50 bg-primary-500/5' : 'border-white/10'}`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary-500 text-white text-xs">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl font-black text-primary-400 mb-1">{pack.credits + pack.bonus}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {pack.credits} credits {pack.bonus > 0 && <span className="text-green-400">+{pack.bonus} bonus</span>}
                    </div>
                    <div className="font-bold text-sm mb-1">{pack.label}</div>
                    <div className="text-xl font-black mb-4">₹{pack.price.toLocaleString()}</div>
                    <Button size="sm" className="w-full bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 border border-primary-500/30" onClick={() => handlePurchase(pack)}>
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <Card className="glass-card border-white/10">
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${tx.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {tx.type === 'credit' ? <TrendingUp className="h-4 w-4 text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-400" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{tx.desc}</div>
                          <div className="text-xs text-muted-foreground">{tx.date} · {tx.user}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.credits > 0 ? '+' : ''}{tx.credits}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

