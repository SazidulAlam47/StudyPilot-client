/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'flowbite-react';
import { googleLogin } from '../../firebase/firebase.action';
import Container from '../../components/Container';
import { Link, useLocation, useNavigate } from 'react-router';
import googleLogo from '../../assets/google.svg';
import SForm from '../../components/Form/SForm';
import SInput from '../../components/Form/SInput';
import SInputPassword from '../../components/Form/SInputPassword';
import type { FieldValues } from 'react-hook-form';
import {
    useLoginWithEmailMutation,
    useLoginWithGoogleMutation,
} from '../../redux/api/auth.api';
import { toast } from 'sonner';
import { setToLocalStorage } from '../../utils/localStorage';
import { authKey } from '../../constants/auth.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth.schema';
import formatFirebaseError from '../../utils/formatFirebaseError';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginWithEmail] = useLoginWithEmailMutation();
    const [loginWithGoogle] = useLoginWithGoogleMutation();

    const handleGoogleLogin = async () => {
        try {
            const userInfo = await googleLogin();
            const idToken = await userInfo.user.getIdToken();

            try {
                const res = await loginWithGoogle({ idToken }).unwrap();

                const token = res.accessToken;
                if (token) {
                    setToLocalStorage(authKey, token);
                    navigate('/');
                    toast.success('Login successful!');
                }
            } catch (error: any) {
                toast.error(
                    error.message || error.data || 'Something went wrong'
                );
            }
        } catch (error: any) {
            toast.error(formatFirebaseError(error.message));
        }
    };

    const handleEmailLogin = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in...');

        try {
            const res = await loginWithEmail(data).unwrap();

            const token = res.accessToken;
            if (token) {
                setToLocalStorage(authKey, token);
                if (location.state) {
                    navigate(location.state);
                } else {
                    navigate('/');
                }
                toast.success('Login successful!', { id: toastId });
            }
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
                        Login
                    </h1>
                    <p className="text-[#60708a] text-base font-normal leading-normal">
                        Enter your email and password to sign in
                    </p>
                </div>
                <SForm
                    onSubmit={handleEmailLogin}
                    resolver={zodResolver(loginSchema)}
                >
                    <SInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <SInputPassword />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </SForm>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="text-center">
                        <Link
                            to="/forget-password"
                            className="text-[#111418] hover:text-[#60708a] text-sm font-normal hover:underline"
                        >
                            Forgot password
                        </Link>
                    </div>
                    <Button
                        onClick={handleGoogleLogin}
                        color="light"
                        className="w-full border border-[#3c83f6] text-[#3c83f6] mt-1"
                    >
                        <img src={googleLogo} alt="G" className="size-4 mr-2" />
                        Sign in with Google
                    </Button>
                    <div className="text-center">
                        <span className="text-[#60708a] text-sm font-normal">
                            Not registered?{' '}
                            <Link
                                to="/register"
                                className="text-[#111418] hover:underline font-medium"
                            >
                                Create account
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;
