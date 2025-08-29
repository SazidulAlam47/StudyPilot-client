/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode, type RefObject, useImperativeHandle } from 'react';
import {
    type FieldValues,
    FormProvider,
    type SubmitHandler,
    useForm,
} from 'react-hook-form';
import { cn } from '../../utils/cn';

export type TUFromFncRef = {
    resetFrom: () => void;
};

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
    values?: Record<string, unknown>;
};

type UFromProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    fncRef?: RefObject<unknown>;
    className?: string;
} & TFormConfig;

const SFrom = ({
    children,
    onSubmit,
    defaultValues,
    resolver,
    fncRef = undefined,
    values,
    className,
}: UFromProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }
    if (resolver) {
        formConfig.resolver = resolver;
    }
    if (values) {
        formConfig.values = values;
    }

    const methods = useForm(formConfig);

    const resetFrom = () => {
        methods.reset();
    };

    useImperativeHandle(fncRef, () => ({
        resetFrom,
    }));

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={cn('space-y-4', className)}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default SFrom;
