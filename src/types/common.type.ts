/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponseSuccessType = {
    data: any;
};

export type TResponseErrorType = {
    statusCode: number;
    message: string;
};

export type TDay =
    | 'Saturday'
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday';
