import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { Check, Zap, Crown, Star } from 'lucide-react';
import styled from 'styled-components';

/* ── Fanned glass-card deck ── */
const PlanDeck = styled.div<{ $color: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  margin-bottom: 24px;

  .glass {
    position: relative;
    width: 160px;
    height: 190px;
    background: linear-gradient(rgba(255,255,255,0.12), transparent);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 25px 25px rgba(0,0,0,0.35);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: 0.45s cubic-bezier(0.34,1.56,0.64,1);
    border-radius: 14px;
    margin: 0 -42px;
    backdrop-filter: blur(12px);
    background-color: ${({ $color }) => $color};
    cursor: default;
  }

  .glass:nth-child(1) { transform: rotate(-15deg); }
  .glass:nth-child(2) { transform: rotate(5deg); }
  .glass:nth-child(3) { transform: rotate(25deg); }

  &:hover .glass {
    transform: rotate(0deg) !important;
    margin: 0 8px;
  }

  .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    background: rgba(255,255,255,0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 0 0 14px 14px;
  }

  .glass svg {
    width: 32px;
    height: 32px;
    fill: #fff;
    opacity: 0.9;
  }
`;

/* ── Plan card wrapper ── */
const PlanCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => $highlight ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)'};
  border: 1px solid ${({ $highlight }) => $highlight ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)'};
  border-radius: 24px;
  padding: 28px 24px 24px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  }
`;

/* SVG icons for the fan cards */
const IconSessions = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 48a208 208 0 1 1 0 416A208 208 0 1 1 256 48zm0-48C114.6 0 0 114.6 0 256S114.6 512 256 512s256-114.6 256-256S397.4 0 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64 20-30-88-58.7V120H232z"/>
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
  </svg>
);
const IconCrown = () => (
  <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63.6 52.6H426c31.6 0 58.1-22.2 63.6-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/>
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
  </svg>
);
const IconAI = () => (
  <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 352a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm176 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
  </svg>
);
const IconUnlimited = () => (
  <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm144 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 80c0 70.7-57.3 128-128 128s-128-57.3-128-128H480c0 0 0 0 0 0z"/>
  </svg>
);

const planIcons = {
  Starter:  [IconSessions, IconChat, IconAI],
  Growth:   [IconStar, IconSessions, IconChat],
  Pro:      [IconCrown, IconUnlimited, IconAI],
};

const deckColors = {
  Starter: 'rgba(59,130,246,0.18)',
  Growth:  'rgba(99,102,241,0.18)',
  Pro:     'rgba(234,179,8,0.18)',
};

const deckLabels = {
  Starter: ['Sessions', 'Messaging', 'AI Help'],
  Growth:  ['Priority', 'Sessions', 'Chat'],
  Pro:     ['Crown', 'Unlimited', 'AI'],
};


const plans = [
  {
    name: 'Starter',
    price: 499,
    period: 'month',
    icon: <Zap className="h-6 w-6" />,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    badge: '',
    features: [
      '2 sessions/month (Bronze experts)',
      'Text messaging with experts',
      'Session recordings',
      'Basic AI pre-assistant',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: 1299,
    period: 'month',
    icon: <Star className="h-6 w-6" />,
    color: 'from-primary-500/20 to-primary-600/10 border-primary-500/30',
    badge: 'Most Popular',
    features: [
      '5 sessions/month (up to Gold)',
      'Priority booking',
      'File sharing in chat',
      'AI expert matching',
      'Expert comparison tool',
      'Priority support',
    ],
    cta: 'Upgrade to Growth',
  },
  {
    name: 'Pro',
    price: 2999,
    period: 'month',
    icon: <Crown className="h-6 w-6" />,
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    badge: 'Best Value',
    features: [
      'Unlimited sessions (all tiers)',
      'Platinum expert access',
      'Quick Solve (10-min instant calls)',
      'Hybrid sessions (online → offline)',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    cta: 'Go Pro',
  },
];

export const PersonalSubscription = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <>
      <SEOHead title="Subscription | KIA" />
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-black mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">Unlock unlimited access to India's top verified experts</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant={billing === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBilling('monthly')}
                className={billing === 'monthly' ? 'bg-primary-500 text-white' : ''}
              >Monthly</Button>
              <Button
                variant={billing === 'annual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBilling('annual')}
                className={billing === 'annual' ? 'bg-primary-500 text-white' : ''}
              >
                Annual <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">Save 20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const icons = planIcons[plan.name as keyof typeof planIcons];
              const labels = deckLabels[plan.name as keyof typeof deckLabels];
              const deckColor = deckColors[plan.name as keyof typeof deckColors];
              const isHighlight = plan.badge === 'Most Popular';
              return (
                <PlanCard key={plan.name} $highlight={isHighlight}>
                  {plan.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary-500 text-white text-xs">{plan.badge}</Badge>
                    </div>
                  )}

                  {/* Fanned icon deck */}
                  <PlanDeck $color={deckColor}>
                    {icons.map((Icon, i) => (
                      <div key={i} className="glass" data-text={labels[i]}>
                        <Icon />
                      </div>
                    ))}
                  </PlanDeck>

                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-white/10 text-white">{plan.icon}</div>
                    <span className="text-xl font-bold text-white">{plan.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-4xl font-black text-white">
                      ₹{billing === 'annual' ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-white/50">/{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                    {plan.cta}
                  </Button>
                </PlanCard>
              );
            })}
          </div>

          {/* Current Plan */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Current Plan: Free</h3>
                  <p className="text-sm text-muted-foreground">You're on the free tier. Upgrade to unlock more sessions.</p>
                </div>
                <Button variant="outline" className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10">
                  Renew / Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};
