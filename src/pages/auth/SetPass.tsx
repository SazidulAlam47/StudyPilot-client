/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../schemas/auth.schema';
import { useNavigate } from 'react-router';
import { useSetPasswordMutation } from '../../redux/api/auth.api';
import { toast } from 'sonner';

const SetPass = () => {
    const navigate = useNavigate();

    const [setPassword] = useSetPasswordMutation();

    const handleResetPass = async (data: FieldValues) => {
        const toastId = toast.loading('Setting new password...');
        try {
            await setPassword(data).unwrap();
            toast.success('Password set successfully!', { id: toastId });
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Container className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <title>StudyPilot - Set Password</title>
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight mb-2">
                        Set Password
                    </h1>
                </div>
                <SForm
                    onSubmit={handleResetPass}
                    resolver={zodResolver(resetPasswordSchema)}
                >
                    <SInput
                        name="password"
                        type="password"
                        label="New Password"
                        placeholder="Enter your new password"
                    />
                    <SInput
                        name="confirmPassword"
                        type="password"
                        label="Confirm New Password"
                        placeholder="Confirm your new password"
                    />
                    <Button type="submit" className="w-full">
                        Set Password
                    </Button>
                </SForm>
            </div>
        </Container>
    );
};

export default SetPass;
