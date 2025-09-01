import { Controller } from 'react-hook-form';
import { Datepicker, Label } from 'flowbite-react';
import SFormError from './SFormError';

type UInputProps = {
    name: string;
    label?: string;
    disabled?: boolean;
    className?: string;
    maxDate?: Date;
};

const SDatePicker = ({
    name,
    label,
    disabled = false,
    className,
    maxDate,
}: UInputProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <div className="mb-1 block">
                        <Label htmlFor={name} className="text-[#111418]">
                            {label}
                        </Label>
                    </div>
                    <Datepicker
                        {...field}
                        id={name}
                        disabled={disabled}
                        color={error ? 'failure' : 'gray'}
                        maxDate={maxDate}
                    />
                    <SFormError error={error} />
                </div>
            )}
        />
    );
};

export default SDatePicker;
