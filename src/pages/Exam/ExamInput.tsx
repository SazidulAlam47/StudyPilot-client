import { Button } from 'flowbite-react';
import SFrom from '../../components/form/SForm';
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

const ExamInput = () => {
    const handleExamStart = (data: FieldValues) => {
        console.log(data);
    };
    return (
        <div className="min-h-[calc(100dvh-198px)] flex justify-center items-center py-10">
            <div className="w-full max-w-md mx-auto">
                <SectionHeading
                    title="Start Your AI-Generated Exam"
                    subTitle="Input your topic, difficulty, and language to create a personalized quiz that tests your knowledge effectively."
                    size="small"
                />
                <SFrom
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
                            defaultValue={10}
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
                </SFrom>
            </div>
        </div>
    );
};

export default ExamInput;
