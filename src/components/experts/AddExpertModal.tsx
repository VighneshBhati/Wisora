import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { Expert } from '@/hooks/useExperts';

/* ── Styled to match the site's dark form style ── */
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
  box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 1px 1px 6px rgba(255,255,255,0.04);
  font-size: 13px;
  &::placeholder { color: #555; }
  &:focus {
    transform: scale(1.01);
    border-color: #00ff75;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 0 0 0 2px rgba(0,255,117,0.12);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  color: #fff;
  outline: none;
  transition: 0.3s;
  padding: 10px 12px;
  background: #1a1a1a;
  border-radius: 8px;
  border: 2px solid #2a2a2a;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 1px 1px 6px rgba(255,255,255,0.04);
  font-size: 13px;
  resize: none;
  &::placeholder { color: #555; }
  &:focus {
    transform: scale(1.01);
    border-color: #00ff75;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 0 0 0 2px rgba(0,255,117,0.12);
  }
`;

const SubmitBtn = styled.button`
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

const CancelBtn = styled.button`
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

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  display: block;
  margin-bottom: 6px;
`;

const SPECIALIZATIONS = [
  'Product Management','Data Science & ML','Finance & Law','UX & Design',
  'Tech & Engineering','Entrepreneurship','Health & Wellness','Creative Arts',
  'Marketing & Growth','Career Coaching','Other',
];

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (expert: Omit<Expert, 'id' | 'slug' | 'is_custom'>) => void;
}

export const AddExpertModal: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState({
    display_name: '', specialization: '', bio: '',
    experience_years: '', profile_image_url: '', rate_per_session: '', available: true,
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.display_name.trim() || !form.specialization || !form.bio.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    onAdd({
      display_name: form.display_name.trim(),
      specialization: form.specialization,
      bio: form.bio.trim(),
      experience_years: parseInt(form.experience_years) || 1,
      profile_image_url: form.profile_image_url.trim() || null,
      rate_per_session: parseInt(form.rate_per_session) || 8,
      available: form.available,
    });
    setForm({ display_name: '', specialization: '', bio: '', experience_years: '', profile_image_url: '', rate_per_session: '', available: true });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border border-white/10 text-white" style={{ background: '#0f0f0f' }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-white">Add New Expert</DialogTitle>
          <p className="text-white/40 text-sm">Fill in the details to register an expert on Wisora.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          <div>
            <Label>Full Name *</Label>
            <Inp placeholder="e.g. Arsh Maheshwari" value={form.display_name} onChange={e => set('display_name', e.target.value)} />
          </div>

          <div>
            <Label>Specialization *</Label>
            <Select value={form.specialization} onValueChange={v => set('specialization', v)}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] border-2 text-white h-[42px] rounded-lg">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                {SPECIALIZATIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Bio *</Label>
            <Textarea placeholder="Brief professional background and what they help with..." value={form.bio} onChange={e => set('bio', e.target.value)} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Years of Experience</Label>
              <Inp type="number" min={1} max={50} placeholder="e.g. 8" value={form.experience_years} onChange={e => set('experience_years', e.target.value)} />
            </div>
            <div>
              <Label>Rate (credits/session)</Label>
              <Inp type="number" min={1} placeholder="e.g. 10" value={form.rate_per_session} onChange={e => set('rate_per_session', e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Profile Image URL (optional)</Label>
            <Inp placeholder="https://..." value={form.profile_image_url} onChange={e => set('profile_image_url', e.target.value)} />
          </div>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="avail" checked={form.available} onChange={e => set('available', e.target.checked)}
              className="w-4 h-4 accent-[#00ff75]" />
            <label htmlFor="avail" className="text-sm text-white/50 cursor-pointer">Available for bookings</label>
          </div>

          <div className="flex gap-3 pt-1">
            <CancelBtn type="button" onClick={onClose}>Cancel</CancelBtn>
            <SubmitBtn type="submit">Add Expert</SubmitBtn>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
