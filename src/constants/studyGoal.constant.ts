import createOptions from '../utils/createOptions';
import { days } from './schedule.constant';

export const priority = ['low', 'medium', 'high'];

export const priorityOptions = createOptions(priority);

export const daysOptions = days.map((day) => ({
    label: day,
    value: day,
}));

export const studyTaskDefaultValues = {
    topic: '',
    priority: 'low',
    deadline: undefined,
    days: [],
    timeSlot: undefined,
};
