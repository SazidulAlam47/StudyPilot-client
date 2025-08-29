import { Button } from 'flowbite-react';
import Container from '../../components/Container';
import SFrom from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import type { FieldValues } from 'react-hook-form';

const ResetPass = () => {
    const handleSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <Container className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight mb-2">
                        Reset Password
                    </h1>
                </div>
                <SFrom onSubmit={handleSubmit}>
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
