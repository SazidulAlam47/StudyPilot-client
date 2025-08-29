import { type ComponentType } from 'react';

type FeatureCardProps = {
    icon: ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-[#dbdfe6] bg-white p-4 hover:shadow-md transition-shadow">
            <div className="text-[#111418]">
                <Icon size={24} />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="text-[#111418] text-base font-bold leading-tight">
                    {title}
                </h2>
                <p className="text-[#60708a] text-sm font-normal leading-normal">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
