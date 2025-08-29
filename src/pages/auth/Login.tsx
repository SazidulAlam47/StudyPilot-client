import { Button } from 'flowbite-react';
import { googleLogin } from '../../firebase/firebase.action';
import Container from '../../components/Container';
import { Link } from 'react-router';
import googleLogo from '../../assets/google.svg';
import SFrom from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import SInputPassword from '../../components/form/SInputPassword';
import type { FieldValues } from 'react-hook-form';

const Login = () => {
    const handleGoogleLogin = async () => {
        try {
            const userInfo = await googleLogin();
            const idToken = await userInfo.user.getIdToken();
            console.log(idToken);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (data: FieldValues) => {
        console.log(data);
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
                <SFrom onSubmit={handleSubmit}>
                    <SInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <SInputPassword />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </SFrom>
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
