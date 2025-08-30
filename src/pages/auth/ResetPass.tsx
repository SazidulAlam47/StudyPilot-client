import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import SFrom from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../schemas/auth.schema';
import { useNavigate, useSearchParams } from 'react-router';
import { useResetPasswordMutation } from '../../redux/api/auth.api';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ResetPass = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [resetPassword] = useResetPasswordMutation();

    const id = searchParams.get('id');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!id || !token) {
            navigate('/login');
        }
    }, [id, token, navigate]);

    const handleResetPass = async (data: FieldValues) => {
        const toastId = toast.loading('Resetting password...');
        try {
            const resetPasswordData = {
                token,
                data: {
                    id,
                    password: data.password,
                },
            };
            await resetPassword(resetPasswordData).unwrap();
            toast.success('Password reset successfully!', { id: toastId });
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Container className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight mb-2">
                        Reset Password
                    </h1>
                </div>
                <SFrom
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
                        Reset Password
                    </Button>
                </SFrom>
            </div>
        </Container>
    );
};

export default ResetPass;
