import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type SButtonProps = {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
    className?: string;
};

const SButton = ({
    variant = 'primary',
    size = 'medium',
    children,
    className,
    ...props
}: SButtonProps) => {
    return (
        <button
            className={cn(
                'flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em]',
                {
                    'h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm':
                        size === 'small',
                    'h-10 px-4 text-sm sm:h-12 sm:px-5 sm:text-base':
                        size === 'medium',
                    'h-12 px-6 text-base sm:h-14 sm:px-7 sm:text-lg':
                        size === 'large',
                },
                {
                    'bg-[#3c83f6] text-white': variant === 'primary',
                    'bg-[#f0f2f5] text-[#111418]': variant === 'secondary',
                },
                className
            )}
            {...props}
        >
            <span className="truncate">{children}</span>
        </button>
    );
};

export default SButton;
