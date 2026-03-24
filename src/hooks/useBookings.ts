import { useState } from 'react';

export interface Booking {
  id: string;
  expertId: string;
  expertName: string;
  specialization: string;
  date: string;
  time: string;
  duration: '30min' | '60min';
  topic: string;
  status: 'confirmed' | 'pending' | 'completed';
  bookedAt: string;
}

const STORAGE_KEY = 'wisora_bookings';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addBooking = (booking: Omit<Booking, 'id' | 'bookedAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}`,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    };
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newBooking;
  };

  return { bookings, addBooking };
};
