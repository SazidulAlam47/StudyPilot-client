/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'flowbite-react';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import SSelect from '../../components/form/SSelect';
import {
    difficultiesOptions,
    languagesOptions,
    questionsNumbersOptions,
    startExamDefaultValues,
} from '../../constants/exam.constant';
import type { FieldValues } from 'react-hook-form';
import SectionHeading from '../../components/SectionHeading';
import { zodResolver } from '@hookform/resolvers/zod';
import { startExamSchema } from '../../schemas/exam.schema';
import { toast } from 'sonner';
import { useCreateExamMutation } from '../../redux/api/examApi';
import { useNavigate } from 'react-router';

const ExamInput = () => {
    const navigate = useNavigate();
    const [createExam] = useCreateExamMutation();

    const handleExamStart = async (data: FieldValues) => {
        const toastId = toast.loading('Generating Questions with AI...');

        try {
            const res = await createExam(data).unwrap();

            navigate(`/quiz/${res._id}`);
            toast.success('Exam started', {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };
    return (
        <div className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <div className="w-full max-w-md mx-auto">
                <SectionHeading
                    title="Start Your AI-Generated Exam"
                    subTitle="Input your topic, difficulty, and language to create a personalized quiz that tests your knowledge effectively."
                    size="small"
                />
                <SForm
                    onSubmit={handleExamStart}
                    resolver={zodResolver(startExamSchema)}
                    defaultValues={startExamDefaultValues}
                >
                    <SInput
                        name="topic"
                        label="Quiz Topic"
                        placeholder="Enter any topic you want"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <SSelect
                            name="difficulty"
                            label="Difficulty"
                            options={difficultiesOptions}
                        />
                        <SSelect
                            name="numQuestions"
                            label="Number of Questions"
                            options={questionsNumbersOptions}
                        />
                    </div>
                    <SSelect
                        name="language"
                        label="Language"
                        options={languagesOptions}
                    />
                    <Button type="submit" className="w-full">
                        Start Quiz
                    </Button>
                </SForm>
            </div>
        </div>
    );
};

export default ExamInput;
