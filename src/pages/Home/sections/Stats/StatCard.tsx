import { cn } from '../../../../utils/cn';

type StatCardProps = {
    title: string;
    value: string;
    fullWidth?: boolean;
};

const StatCard = ({ title, value, fullWidth }: StatCardProps) => {
    return (
        <div
            className={cn(
                'flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f5]',
                {
                    'sm:col-span-2 md:col-span-1': fullWidth,
                },
            )}
        >
            <p className="text-[#111418] text-base font-medium leading-normal">
                {title}
            </p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                {value}
            </p>
        </div>
    );
};

export default StatCard;
