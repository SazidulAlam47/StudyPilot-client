export type TDifficulty = 'easy' | 'medium' | 'hard';

export type TResponseSuccessType = {
    data: any;
};

export type TResponseErrorType = {
    statusCode: number;
    message: string;
};
