import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import { Link, useNavigate } from 'react-router';
import { SForm, SInput } from '../../components/form';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../../schemas/auth.schema';
import { useForgotPasswordMutation } from '../../redux/api/auth.api';
import { toast } from 'sonner';

const ForgotPass = () => {
    const navigate = useNavigate();
    const [forgotPassword] = useForgotPasswordMutation();

    const handleForgetPass = async (data: FieldValues) => {
        const toastId = toast.loading('Sending reset email...');

        try {
            await forgotPassword(data).unwrap();

            toast.success('Password reset email sent successfully!', {
                id: toastId,
            });
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
                        Forgot Password
                    </h1>
                    <p className="text-[#60708a] text-base font-normal leading-normal">
                        Enter your email to reset you password
                    </p>
                </div>
                <SForm
                    onSubmit={handleForgetPass}
                    resolver={zodResolver(forgotPasswordSchema)}
                >
                    <SInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <Button type="submit" className="w-full">
                        Send Reset Email
                    </Button>
                </SForm>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="text-center">
                        <span className="text-[#60708a] text-sm font-normal">
                            Remember password?{' '}
                            <Link
                                to="/login"
                                className="text-[#111418] hover:underline font-medium"
                            >
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ForgotPass;
