import { type ComponentType } from 'react';

type StepProps = {
    icon: ComponentType<{ className?: string; size?: number }>;
    title: string;
    description: string;
    hasLine?: boolean;
};

const Step = ({
    icon: Icon,
    title,
    description,
    hasLine = true,
}: StepProps) => {
    return (
        <div className="flex items-start gap-4 mb-2">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="text-blue-600" size={20} />
                </div>
                {hasLine && <div className="w-0.5 bg-gray-200 h-16 mt-2"></div>}
            </div>
            <div className="flex-1 pt-2">
                <h3 className="text-[#111418] text-lg font-medium leading-normal mb-2">
                    {title}
                </h3>
                <p className="text-[#60708a] text-base font-normal leading-normal">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Step;
