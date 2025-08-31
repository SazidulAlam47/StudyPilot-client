export type TDay =
    | 'Saturday'
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday';

export type TClass = {
    day: TDay;
    slots: string[];
};

export type TSchedule = {
    user: string;
    timeSlots: string[];
    classes: TClass[];
};
