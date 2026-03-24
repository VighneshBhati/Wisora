import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Clock, Star, Trash2, CalendarCheck, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useExperts } from '@/hooks/useExperts';
import { useBookings } from '@/hooks/useBookings';
import { AddExpertModal } from '@/components/experts/AddExpertModal';
import { BookExpertModal } from '@/components/experts/BookExpertModal';
import type { Expert } from '@/hooks/useExperts';
import { SEOHead } from '@/components/seo/SEOHead';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  animation: ${fadeUp} 0.7s ease both;
`;

const ExpertCardWrap = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  &:hover { box-shadow: 0 0 30px 1px rgba(0,255,117,0.25); }
  .inner {
    background: #111;
    border-radius: 18px;
    padding: 22px 20px;
    transition: all 0.2s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &:hover .inner { transform: scale(0.98); border-radius: 20px; }
`;

const BookBtn = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  background: ${p => p.$disabled ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #00ff75, #3700ff)'};
  border: none;
  border-radius: 8px;
  color: ${p => p.$disabled ? 'rgba(255,255,255,0.2)' : '#fff'};
  font-size: 14px;
  font-weight: 700;
  transition: 0.3s;
  box-shadow: ${p => p.$disabled ? 'none' : '0 4px 15px rgba(0,255,117,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
  &:hover:not([disabled]) { transform: scale(1.02); box-shadow: 0 6px 20px rgba(0,255,117,0.35); }
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  cursor: pointer;
  background: linear-gradient(135deg, #00ff75, #3700ff);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: 0.3s;
  box-shadow: 0 4px 15px rgba(0,255,117,0.2);
  &:hover { transform: scale(1.03); box-shadow: 0 6px 20px rgba(0,255,117,0.35); }
`;

const SPECIALIZATIONS = [
  'All','Product Management','Data Science & ML','Finance & Law','UX & Design',
  'Tech & Engineering','Entrepreneurship','Health & Wellness','Creative Arts',
  'Marketing & Growth','Career Coaching','Other',
];

const domainColor: Record<string, string> = {
  'Product Management': 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'Data Science & ML': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'Finance & Law': 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  'UX & Design': 'bg-pink-500/15 text-pink-300 border-pink-500/25',
  'Tech & Engineering': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'Entrepreneurship': 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  'Health & Wellness': 'bg-green-500/15 text-green-300 border-green-500/25',
  'Creative Arts': 'bg-rose-500/15 text-rose-300 border-rose-500/25',
};

const ExpertCard: React.FC<{
  expert: Expert;
  onBook: (e: Expert) => void;
  onRemove?: (id: string) => void;
}> = ({ expert, onBook, onRemove }) => {
  const initials = expert.display_name.split(' ').map(n => n[0]).join('').toUpperCase();
  const cls = domainColor[expert.specialization] || 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25';

  return (
    <ExpertCardWrap>
      <div className="inner">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={expert.profile_image_url ?? undefined} />
            <AvatarFallback style={{ background: 'linear-gradient(135deg,#00ff75,#3700ff)', color: '#fff', fontWeight: 700 }}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-sm">{expert.display_name}</span>
              {expert.is_custom && (
                <Badge className="bg-green-500/15 text-green-400 border-green-500/25 text-xs">Added</Badge>
              )}
            </div>
            <Badge className={`mt-1 text-xs border ${cls}`}>{expert.specialization}</Badge>
          </div>
          {expert.is_custom && onRemove && (
            <button onClick={() => onRemove(expert.id)} className="text-white/20 hover:text-red-400 transition-colors p-1 shrink-0">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <p className="text-white/50 text-xs leading-relaxed mt-3 line-clamp-3 flex-1">{expert.bio}</p>

        <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{expert.experience_years}y exp</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#00ff75]" />{expert.rate_per_session} credits</span>
          {!expert.available && <span className="text-red-400/60">Unavailable</span>}
        </div>

        <BookBtn $disabled={!expert.available} disabled={!expert.available} onClick={() => expert.available && onBook(expert)}>
          <CalendarCheck className="h-4 w-4" />
          {expert.available ? 'Book Session' : 'Not Available'}
        </BookBtn>
      </div>
    </ExpertCardWrap>
  );
};

export const ExpertsPage: React.FC = () => {
  const { allExperts, addExpert, removeExpert } = useExperts();
  const { bookings, addBooking } = useBookings();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [bookingExpert, setBookingExpert] = useState<Expert | null>(null);
  const [showBookings, setShowBookings] = useState(false);

  const filtered = allExperts.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = e.display_name.toLowerCase().includes(q) || e.specialization.toLowerCase().includes(q) || e.bio.toLowerCase().includes(q);
    const matchFilter = filter === 'All' || e.specialization === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <SEOHead title="Experts | Wisora" />
      <div className="min-h-screen bg-[#090a0f] text-white">
        <Navbar extraXSpacing />

        {/* Hero */}
        <Section className="pt-32 pb-12 px-6 md:px-20 xl:px-44 text-center">
          <Badge className="mb-6 bg-green-500/15 text-green-400 border-green-500/25 text-sm px-4 py-1">
            ✦ Verified Experts
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
            Talk to someone who's<br />
            <span className="bg-gradient-to-r from-[#00ff75] to-[#3700ff] bg-clip-text text-transparent">
              actually been there.
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Book 1:1 sessions with verified professionals across 10+ domains. Real answers, no fluff.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <AddBtn onClick={() => setShowAdd(true)}>
              <Plus className="h-4 w-4" /> Add Expert
            </AddBtn>
            {bookings.length > 0 && (
              <button
                onClick={() => setShowBookings(b => !b)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm font-semibold"
              >
                <BookOpen className="h-4 w-4" />
                My Bookings ({bookings.length})
              </button>
            )}
          </div>
        </Section>

        {/* Bookings panel */}
        {showBookings && bookings.length > 0 && (
          <Section className="px-6 md:px-20 xl:px-44 pb-8" style={{ animationDelay: '0.05s' }}>
            <div className="rounded-3xl border border-white/8 p-8" style={{ background: 'linear-gradient(135deg, #1b2735 0%, #090a0f 100%)' }}>
              <h2 className="text-xl font-black mb-5">My Bookings</h2>
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/7">
                    <div>
                      <div className="font-bold text-white text-sm">{b.expertName}</div>
                      <div className="text-xs text-white/40 mt-0.5">{b.specialization} · {b.topic}</div>
                      <div className="text-xs text-white/25 mt-1">{new Date(b.date).toDateString()} at {b.time} · {b.duration}</div>
                    </div>
                    <Badge className="bg-green-500/15 text-green-400 border-green-500/25 capitalize text-xs">{b.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Filters */}
        <Section className="px-6 md:px-20 xl:px-44 pb-10" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                placeholder="Search by name, domain, or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-56 bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                {SPECIALIZATIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* Grid */}
        <Section className="px-6 md:px-20 xl:px-44 pb-32" style={{ animationDelay: '0.15s' }}>
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/25">
              <p className="text-2xl font-black mb-2">No experts found.</p>
              <p className="text-sm">
                Try a different search or{' '}
                <button onClick={() => setShowAdd(true)} className="text-[#00ff75] underline">add one</button>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(expert => (
                <ExpertCard
                  key={expert.id}
                  expert={expert}
                  onBook={e => setBookingExpert(e)}
                  onRemove={expert.is_custom ? (id) => { removeExpert(id); toast.success('Expert removed.'); } : undefined}
                />
              ))}
            </div>
          )}
        </Section>
      </div>

      <AddExpertModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={addExpert} />
      <BookExpertModal
        expert={bookingExpert}
        open={!!bookingExpert}
        onClose={() => setBookingExpert(null)}
        onBook={(booking) => { addBooking(booking); toast.success('Session booked!'); }}
      />
    </>
  );
};
