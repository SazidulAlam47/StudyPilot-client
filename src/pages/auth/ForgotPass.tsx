import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import { Link } from 'react-router';
import SFrom from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import type { FieldValues } from 'react-hook-form';

const ForgotPass = () => {
    const handleSubmit = (data: FieldValues) => {
        console.log(data);
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
                <SFrom onSubmit={handleSubmit}>
                    <SInput
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                    />
                    <Button type="submit" className="w-full">
                        Send Reset Email
                    </Button>
                </SFrom>
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
