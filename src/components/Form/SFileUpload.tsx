import { useController, useFormContext } from 'react-hook-form';
import UFromError from './SFromError';
import { FileInput, Label } from 'flowbite-react';

type UInputProps = {
    label?: string;
    className?: string;
};

const SFileUpload = ({ label, className }: UInputProps) => {
    const { control, setValue } = useFormContext();

    const {
        field: { name },
        fieldState: { error },
    } = useController({
        name: 'file',
        control,
    });

    return (
        <div className={className}>
            <Label className="mb-2 block" htmlFor="file">
                {label}
            </Label>
            <FileInput
                id="file"
                name={name}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setValue('file', file);
                    }
                }}
            />
            <UFromError error={error} />
        </div>
    );
};

export default SFileUpload;
