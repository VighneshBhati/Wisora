import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import styled from 'styled-components';
import MorphCard from '@/components/ui/MorphCard';
import { 
  Search, Star, Clock, ArrowRight, Zap, Users, 
  TrendingUp, Shield, MessageSquare, Calendar
} from 'lucide-react';

const NeumorphCard = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }

  .neumorph-inner {
    background-color: #1a1a1a;
    border-radius: 18px;
    transition: all 0.2s ease;
    padding: 20px;
    height: 100%;
  }

  &:hover .neumorph-inner {
    transform: scale(0.98);
    border-radius: 20px;
  }
`;

const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #222533;
  color: #fbebe2;
  padding: 20px;
  width: 100%;
  height: 160px;
  border-radius: 26px;
  user-select: none;
  transition: all 0.3s ease-in-out;
  border: 1px solid transparent;
  cursor: default;

  .mac-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mac-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .mac-red    { background-color: #ff5f57; }
  .mac-yellow { background-color: #ffbd2e; }
  .mac-green  { background-color: #28c941; }

  .stat-value {
    font-size: 2.8rem;
    font-weight: 900;
    line-height: 1;
    transition: all 0.3s ease-in-out;
  }

  .stat-label {
    font-size: 12px;
    color: rgba(251,235,226,0.6);
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    background-color: #1d1d1d;
    transform: scale(1.05);
    border-color: #5e63ff;
  }
  &:hover .stat-label {
    font-size: 13px;
    font-weight: 500;
    color: #b1cbf6;
  }
  &:hover .stat-value {
    color: #5e63ff;
  }
`;
const featuredExperts = [
  { name: 'Rahul Sharma', domain: 'Product Management', badge: 'Gold', rating: 4.9, sessions: 312, price: 199, avatar: '👨‍💼' },
  { name: 'Priya Nair', domain: 'Data Science & ML', badge: 'Platinum', rating: 5.0, sessions: 489, price: 299, avatar: '👩‍💻' },
  { name: 'Arjun Mehta', domain: 'Finance & Investing', badge: 'Silver', rating: 4.8, sessions: 156, price: 149, avatar: '👨‍🏫' },
  { name: 'Sneha Kapoor', domain: 'UX Design', badge: 'Gold', rating: 4.9, sessions: 278, price: 199, avatar: '👩‍🎨' },
];

const categories = [
  { name: 'Career Growth', icon: '🚀', count: 48 },
  { name: 'Finance & Law', icon: '⚖️', count: 32 },
  { name: 'Tech & Engineering', icon: '💻', count: 67 },
  { name: 'Business & Strategy', icon: '📊', count: 41 },
  { name: 'Health & Wellness', icon: '🏥', count: 23 },
  { name: 'Creative Arts', icon: '🎨', count: 19 },
  { name: 'Education', icon: '🎓', count: 35 },
  { name: 'Entrepreneurship', icon: '💡', count: 54 },
];

const quickHelp = [
  { title: 'Resume Review', time: '15 min', price: '₹99', icon: '📄' },
  { title: 'Career Advice', time: '15 min', price: '₹99', icon: '🎯' },
  { title: 'Code Review', time: '15 min', price: '₹99', icon: '💻' },
  { title: 'Business Idea Validation', time: '15 min', price: '₹99', icon: '💡' },
];

const badgeColors: Record<string, string> = {
  Bronze: 'bg-amber-700/20 text-amber-600 border-amber-600/30',
  Silver: 'bg-gray-400/20 text-gray-300 border-gray-400/30',
  Gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Platinum: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
};

export const PersonalHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="Home | Wisora" />
      <DashboardLayout>
        <div className="space-y-8">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-secondary-500/10 border border-primary-500/20 p-8">
            <div className="relative z-10">
              <Badge className="mb-4 bg-primary-500/20 text-primary-400 border-primary-500/30">🇮🇳 India's Expert Guidance Platform</Badge>
              <h1 className="text-3xl md:text-4xl font-black mb-3">Talk to Real Experience</h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Connect with verified industry veterans for 1:1 guidance. Get real answers from professionals who've been there.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate('/teachers')} className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6">
                  <Search className="h-4 w-4 mr-2" /> Explore Experts
                </Button>
                <Button variant="outline" onClick={() => navigate('/personal/subscription')} className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10">
                  Book Trial — &#8377;99
                </Button>
                <Button variant="ghost" onClick={() => navigate('/personal/messages')} className="text-muted-foreground hover:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" /> Ask a Question
                </Button>
              </div>
            </div>
            <div className="absolute right-8 top-8 text-8xl opacity-10 select-none">🎯</div>
          </div>

          {/* Quick Help */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-400" /> Quick Help (15 min)</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/teachers')} className="text-primary-400">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickHelp.map((item) => (
                <MorphCard key={item.title} onClick={() => navigate('/teachers')}>
                  <div className="p-4 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm mb-1 text-white">{item.title}</div>
                    <div className="text-xs text-white/50 mb-2">{item.time} session</div>
                    <Badge className="bg-primary-500/20 text-primary-400 border-primary-500/30 text-xs">{item.price}</Badge>
                  </div>
                </MorphCard>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4">Browse by Domain</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <MorphCard key={cat.name} onClick={() => navigate('/teachers')}>
                  <div className="p-4 flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <div className="font-semibold text-sm text-white">{cat.name}</div>
                      <div className="text-xs text-white/50">{cat.count} experts</div>
                    </div>
                  </div>
                </MorphCard>
              ))}
            </div>
          </div>

          {/* Featured Experts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400" /> Featured Experts</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/teachers')} className="text-primary-400">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredExperts.map((expert) => (
                <NeumorphCard key={expert.name} onClick={() => navigate('/teachers')}>
                  <div className="neumorph-inner">
                    <div className="text-4xl mb-3 text-center">{expert.avatar}</div>
                    <div className="font-bold text-sm mb-1 text-white">{expert.name}</div>
                    <div className="text-xs text-white/50 mb-3">{expert.domain}</div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`text-xs border ${badgeColors[expert.badge]}`}>{expert.badge}</Badge>
                      <span className="text-xs flex items-center gap-1 text-white/70"><Star className="h-3 w-3 text-yellow-400" />{expert.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                      <span>{expert.sessions} sessions</span>
                      <span className="font-semibold text-primary-400">₹{expert.price}/hr</span>
                    </div>
                    <button
                      className="w-full py-2 rounded-xl text-xs font-semibold text-primary-400 transition-all duration-200"
                      style={{
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.25)',
                      }}
                      onClick={(e) => { e.stopPropagation(); navigate('/teachers'); }}
                    >
                      Book Session
                    </button>
                  </div>
                </NeumorphCard>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Verified Experts', value: '500+', icon: <Shield className="h-5 w-5 text-primary-400" /> },
              { label: 'Sessions Completed', value: '12K+', icon: <Calendar className="h-5 w-5 text-green-400" /> },
              { label: 'Domains Covered', value: '15+', icon: <TrendingUp className="h-5 w-5 text-yellow-400" /> },
              { label: 'Happy Users', value: '8K+', icon: <Users className="h-5 w-5 text-purple-400" /> },
            ].map((stat) => (
              <StatusCard key={stat.label}>
                <div className="mac-header">
                  <span className="mac-dot mac-red" />
                  <span className="mac-dot mac-yellow" />
                  <span className="mac-dot mac-green" />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </StatusCard>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

