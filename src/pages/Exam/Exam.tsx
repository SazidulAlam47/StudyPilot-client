/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router';
import Container from '../../components/Container';
import {
    useGetExamQuery,
    useValidateAnswersMutation,
} from '../../redux/api/examApi';
import { useEffect } from 'react';
import SRadio from '../../components/form/SRadio';
import SForm from '../../components/form/SForm';
import { Button, Card } from 'flowbite-react';
import type { FieldValues } from 'react-hook-form';
import Loader from '../../components/Loader';
import TitleText from '../../components/TitleText';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import capitalize from '../../utils/capitalize';

const Exam = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: exam, isError, isLoading } = useGetExamQuery(id);
    const [validateAnswers] = useValidateAnswersMutation();

    const handleSubmit = async (data: FieldValues) => {
        let error = false;

        const answers = Object.values(data).map((item) => {
            if (!item) error = true;
            return Number(item);
        });

        if (error) {
            toast.error('Please Complete all Questions');
            return;
        }

        const toastId = toast.loading('Evaluating answers...');

        try {
            const res = await validateAnswers({
                id,
                data: { answers },
            }).unwrap();
            toast.success('Your answers have been evaluated', {
                id: toastId,
            });
            Swal.fire({
                title: 'Quiz Completed',
                icon: 'success',
                html: `
                    <div class='space-y-2'>
                        <div>
                            <span class="font-semibold">Topic:</span>
                            ${res?.topic} (${capitalize(res.difficulty)})
                        </div>
                        <div>
                            <span class="font-semibold">
                                Number of Questions:
                            </span>
                            ${res?.totalQuestions}
                        </div>
                        <div>
                            <span class="font-semibold">
                                Total Correct Answers:
                            </span>
                            ${
                                res?.correctAnswers ??
                                '<span class="text-gray-400 italic">Pending</span>'
                            }
                        </div>
                        <div>
                            <span class="font-semibold">Score:</span>
                            ${
                                res?.correctAnswers
                                    ? res.score + '%'
                                    : '<span class="text-gray-400 italic">Pending</span>'
                            }
                        </div>
                    </div>
                `,
                focusConfirm: false,
                confirmButtonText: 'Great!',
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    useEffect(() => {
        if (isError) {
            navigate('/quiz');
        }
    }, [isError, navigate]);

    const defaultValues: Record<number, string> = {};

    exam?.submittedAnswers?.forEach((answer, index) => {
        defaultValues[index] = answer.toString();
    });

    return (
        <Container className="py-12 max-w-7xl mx-auto">
            <title>StudyPilot - Quiz</title>
            <TitleText className="mb-10">
                Challenge Your Knowledge: Take the Quiz!
            </TitleText>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-2 p-5">
                        <SForm
                            onSubmit={handleSubmit}
                            defaultValues={defaultValues}
                        >
                            <div className="space-y-8">
                                {exam?.questions.map((question, index) => (
                                    <div key={index} className="space-y-2">
                                        <SRadio
                                            name={index.toString()}
                                            label={
                                                `${index + 1}. ` + question.text
                                            }
                                            options={question.options}
                                            disabled={
                                                !!exam.submittedAnswers?.length
                                            }
                                            selectedIndex={
                                                exam?.submittedAnswers?.[index]
                                            }
                                            correctAnswer={
                                                question.correctAnswer
                                            }
                                        />
                                        {question?.correctAnswer?.toString() ? (
                                            <p className="mt-3">
                                                <span className="font-bold">
                                                    Correct Answer:{' '}
                                                </span>
                                                {
                                                    question.options[
                                                        question.correctAnswer
                                                    ]
                                                }
                                            </p>
                                        ) : null}
                                    </div>
                                ))}

                                {exam?.submittedAnswers?.length ? null : (
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-32"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SForm>
                    </Card>

                    <Card className="sticky top-24 bg-white shadow-lg rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-6 border-b border-gray-200 pb-3">
                            Exam Summary
                        </h2>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <span className="font-semibold">Topic:</span>{' '}
                                {exam?.topic}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Difficulty:
                                </span>{' '}
                                {capitalize(exam?.difficulty || '')}
                            </div>
                            <div>
                                <span className="font-semibold">Language:</span>{' '}
                                {capitalize(exam?.language || '')}
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>{' '}
                                {exam?.submittedAnswers?.length ? (
                                    <span className="text-green-600 font-semibold">
                                        Completed
                                    </span>
                                ) : (
                                    <span className="text-yellow-600 font-semibold">
                                        In Progress
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Number of Questions:
                                </span>{' '}
                                {exam?.totalQuestions}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Total Correct Answers:
                                </span>{' '}
                                {exam?.correctAnswers ?? (
                                    <span className="text-gray-400 italic">
                                        Pending
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="font-semibold">Score:</span>{' '}
                                {exam?.correctAnswers ? (
                                    <span>{exam.score + '%'}</span>
                                ) : (
                                    <span className="text-gray-400 italic">
                                        Pending
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Container>
    );
};

export default Exam;
