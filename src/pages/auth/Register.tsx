/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import { Link, useNavigate } from 'react-router';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import SInputPassword from '../../components/form/SInputPassword';
import SFileUpload from '../../components/form/SFileUpload';
import type { FieldValues } from 'react-hook-form';
import {
    useLoginWithEmailMutation,
    useRegisterMutation,
} from '../../redux/api/auth.api';
import { toast } from 'sonner';
import { setToLocalStorage } from '../../utils/localStorage';
import { authKey } from '../../constants/auth.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/auth.schema';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUpload';
import type { IUser } from '../../types';
import { getUser } from '../../utils/user';
import { useEffect } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [loginWithEmail] = useLoginWithEmailMutation();

    const decodedUser = getUser();

    useEffect(() => {
        if (decodedUser) {
            navigate('/');
        }
    }, [decodedUser, navigate]);

    const handleRegister = async (data: FieldValues) => {
        const newUser: Omit<IUser, '_id'> = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        const toastId = toast.loading('Creating account...');
        try {
            if (data?.file) {
                newUser.profilePhoto = await uploadImageToCloudinary(data.file);
            }

            const registerRes = await register(newUser).unwrap();
            if (registerRes) {
                const loginRes = await loginWithEmail({
                    email: registerRes.email,
                    password: data.password,
                }).unwrap();
                const token = loginRes.accessToken;
                if (token) {
                    setToLocalStorage(authKey, token);
                    navigate('/');
                    toast.success('Login successful!', { id: toastId });
                }
            }
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <Container className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <title>StudyPilot - Register</title>
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight mb-2">
                        Register
                    </h1>
                    <p className="text-[#60708a] text-base font-normal leading-normal">
                        Create your free account to start your learning journey.
                    </p>
                </div>
                <SForm
                    onSubmit={handleRegister}
                    resolver={zodResolver(registerSchema)}
                >
                    <SInput
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                    />
                    <SInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <SInputPassword />
                    <SFileUpload label="Profile Photo" />
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </SForm>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="text-center">
                        <span className="text-[#60708a] text-sm font-normal">
                            Already have account?{' '}
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

export default Register;
