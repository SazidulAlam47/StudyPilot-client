/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../../schemas/auth.schema';
import { useNavigate } from 'react-router';
import { useChangePasswordMutation } from '../../redux/api/auth.api';
import { toast } from 'sonner';

const ChangePass = () => {
    const navigate = useNavigate();

    const [changePassword] = useChangePasswordMutation();

    const handleResetPass = async (data: FieldValues) => {
        const toastId = toast.loading('Changing password...');
        try {
            await changePassword(data).unwrap();
            toast.success('Password changed successfully!', { id: toastId });
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Container className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <title>StudyPilot - Change Password</title>
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight mb-2">
                        Change Password
                    </h1>
                </div>
                <SForm
                    onSubmit={handleResetPass}
                    resolver={zodResolver(changePasswordSchema)}
                >
                    <SInput
                        name="oldPassword"
                        type="password"
                        label="Old Password"
                        placeholder="Enter your old password"
                    />
                    <SInput
                        name="newPassword"
                        type="password"
                        label="New Password"
                        placeholder="Enter your new password"
                    />
                    <Button type="submit" className="w-full">
                        Change Password
                    </Button>
                </SForm>
            </div>
        </Container>
    );
};

export default ChangePass;
