import { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { googleLogin } from '../../firebase/firebase.action';
import Container from '../../components/Container';
import { Link } from 'react-router';
import googleLogo from '../../assets/google.svg';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleGoogleLogin = async () => {
        try {
            const userInfo = await googleLogin();
            const idToken = await userInfo.user.getIdToken();
            console.log(idToken);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email Field */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" className="text-[#111418]">
                                Email
                            </Label>
                        </div>
                        <TextInput
                            id="email1"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            color="gray"
                            required
                        />
                        <p className="text-red-600 ml-1">error</p>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                className="text-[#111418]"
                            >
                                Password
                            </Label>
                        </div>
                        <div className="relative">
                            <TextInput
                                id="password1"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
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
