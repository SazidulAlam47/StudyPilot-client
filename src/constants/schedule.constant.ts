import type { TClass, TDay } from '../types';

export const initialTimeSlots = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
];

const initialSlots: string[] = Array(10).fill('');
export const days: TDay[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
];

export const initialClasses: TClass[] = days.map((day) => ({
    day,
    slots: initialSlots,
}));
