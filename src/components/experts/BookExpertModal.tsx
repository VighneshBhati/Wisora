import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import type { Expert } from '@/hooks/useExperts';
import type { Booking } from '@/hooks/useBookings';

const Inp = styled.input`
  width: 100%;
  min-height: 42px;
  color: #fff;
  outline: none;
  transition: 0.3s;
  padding: 0 12px;
  background: #1a1a1a;
  border-radius: 8px;
  border: 2px solid #2a2a2a;
  font-size: 13px;
  &::placeholder { color: #555; }
  &:focus {
    border-color: #00ff75;
    box-shadow: 0 0 0 2px rgba(0,255,117,0.12);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 64px;
  color: #fff;
  outline: none;
  transition: 0.3s;
  padding: 10px 12px;
  background: #1a1a1a;
  border-radius: 8px;
  border: 2px solid #2a2a2a;
  font-size: 13px;
  resize: none;
  &::placeholder { color: #555; }
  &:focus {
    border-color: #00ff75;
    box-shadow: 0 0 0 2px rgba(0,255,117,0.12);
  }
`;

const ConfirmBtn = styled.button`
  width: 100%;
  padding: 11px;
  cursor: pointer;
  background: linear-gradient(135deg, #00ff75, #3700ff);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: 0.3s;
  box-shadow: 0 4px 15px rgba(0,255,117,0.2);
  &:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(0,255,117,0.35); }
`;

const BackBtn = styled.button`
  width: 100%;
  padding: 11px;
  cursor: pointer;
  background: transparent;
  border: 2px solid #2a2a2a;
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  font-size: 14px;
  font-weight: 600;
  transition: 0.3s;
  &:hover { border-color: #444; color: #fff; }
`;

const SlotBtn = styled.button<{ $active: boolean }>`
  padding: 7px 4px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  border: 2px solid ${p => p.$active ? '#00ff75' : '#2a2a2a'};
  background: ${p => p.$active ? 'rgba(0,255,117,0.1)' : '#1a1a1a'};
  color: ${p => p.$active ? '#00ff75' : 'rgba(255,255,255,0.4)'};
  transition: 0.2s;
  &:hover { border-color: #00ff75; color: #00ff75; }
`;

const DurBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 2px solid ${p => p.$active ? '#00ff75' : '#2a2a2a'};
  background: ${p => p.$active ? 'rgba(0,255,117,0.1)' : '#1a1a1a'};
  color: ${p => p.$active ? '#00ff75' : 'rgba(255,255,255,0.4)'};
  transition: 0.2s;
  &:hover { border-color: #00ff75; color: #00ff75; }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
`;

const TIME_SLOTS = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'];

interface Props {
  expert: Expert | null;
  open: boolean;
  onClose: () => void;
  onBook: (booking: Omit<Booking, 'id' | 'bookedAt' | 'status'>) => void;
}

export const BookExpertModal: React.FC<Props> = ({ expert, open, onClose, onBook }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ date: '', time: '', duration: '30min' as '30min' | '60min', topic: '' });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const cost = form.duration === '60min' ? (expert?.rate_per_session ?? 0) * 2 : (expert?.rate_per_session ?? 0);

  const handleConfirm = () => {
    if (!form.date || !form.time || !form.topic.trim()) { toast.error('Fill all fields first.'); return; }
    onBook({ expertId: expert!.id, expertName: expert!.display_name, specialization: expert!.specialization, date: form.date, time: form.time, duration: form.duration, topic: form.topic.trim() });
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setForm({ date: '', time: '', duration: '30min', topic: '' });
    onClose();
  };

  if (!expert) return null;
  const initials = expert.display_name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border border-white/10 text-white" style={{ background: '#0f0f0f' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-white">
            {step === 3 ? '🎉 Booking Confirmed!' : 'Book a Session'}
          </DialogTitle>
        </DialogHeader>

        {/* Expert strip */}
        {step !== 3 && (
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Avatar className="h-11 w-11">
              <AvatarImage src={expert.profile_image_url ?? undefined} />
              <AvatarFallback style={{ background: 'linear-gradient(135deg,#00ff75,#3700ff)', color: '#fff', fontWeight: 700 }}>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-white text-sm">{expert.display_name}</div>
              <div className="text-xs text-white/40">{expert.specialization}</div>
            </div>
            <Badge className="bg-green-500/15 text-green-400 border-green-500/25 text-xs">{expert.rate_per_session} credits</Badge>
          </div>
        )}

        {/* Step dots */}
        {step !== 3 && (
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className={step === 1 ? 'text-[#00ff75] font-semibold' : ''}>1. Pick Slot</span>
            <div className="flex-1 h-px bg-white/10" />
            <span className={step === 2 ? 'text-[#00ff75] font-semibold' : ''}>2. Confirm</span>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label><Calendar className="h-3.5 w-3.5" /> Date</Label>
              <Inp type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} />
            </div>

            <div>
              <Label><Clock className="h-3.5 w-3.5" /> Time Slot</Label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map(t => (
                  <SlotBtn key={t} $active={form.time === t} onClick={() => set('time', t)}>{t}</SlotBtn>
                ))}
              </div>
            </div>

            <div>
              <Label>Duration</Label>
              <div className="flex gap-3">
                {(['30min', '60min'] as const).map(d => (
                  <DurBtn key={d} $active={form.duration === d} onClick={() => set('duration', d)}>
                    {d} — {d === '30min' ? expert.rate_per_session : expert.rate_per_session * 2} credits
                  </DurBtn>
                ))}
              </div>
            </div>

            <div>
              <Label>What do you want to discuss?</Label>
              <Textarea placeholder="e.g. Career switch to product management, resume review..." value={form.topic} onChange={e => set('topic', e.target.value)} />
            </div>

            <ConfirmBtn onClick={() => { if (!form.date || !form.time || !form.topic.trim()) { toast.error('Fill all fields first.'); return; } setStep(2); }}>
              Continue →
            </ConfirmBtn>
          </div>
        )}

        {/* Step 2 — Review */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 p-5 space-y-3 text-sm" style={{ background: 'rgba(255,255,255,0.03)' }}>
              {[
                ['Expert', expert.display_name],
                ['Date', new Date(form.date).toDateString()],
                ['Time', form.time],
                ['Duration', form.duration],
                ['Topic', form.topic],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40">{label}</span>
                  <span className="font-medium text-white max-w-[55%] text-right">{val}</span>
                </div>
              ))}
              <div className="border-t border-white/8 pt-3 flex justify-between font-bold">
                <span className="flex items-center gap-1 text-white/60"><CreditCard className="h-4 w-4" /> Total</span>
                <span className="text-[#00ff75]">{cost} credits</span>
              </div>
            </div>
            <div className="flex gap-3">
              <BackBtn onClick={() => setStep(1)}>← Back</BackBtn>
              <ConfirmBtn onClick={handleConfirm}>Confirm Booking</ConfirmBtn>
            </div>
          </div>
        )}

        {/* Step 3 — Success */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-5 py-4 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,255,117,0.1)', border: '2px solid rgba(0,255,117,0.3)' }}>
              <CheckCircle className="h-8 w-8 text-[#00ff75]" />
            </div>
            <div>
              <p className="font-black text-lg text-white">Session booked with {expert.display_name}!</p>
              <p className="text-white/40 text-sm mt-1">{new Date(form.date).toDateString()} at {form.time} · {form.duration}</p>
              <p className="text-white/30 text-xs mt-1">{cost} credits deducted</p>
            </div>
            <ConfirmBtn onClick={handleClose}>Done ✓</ConfirmBtn>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
