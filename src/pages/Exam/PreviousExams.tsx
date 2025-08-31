import { Link } from 'react-router';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import SectionHeading from '../../components/SectionHeading';
import { useGetPreviousExamsQuery } from '../../redux/api/examApi';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';
import moment from 'moment';
import { IoDocumentTextOutline } from 'react-icons/io5';
import capitalize from '../../utils/capitalize';

const PreviousExams = () => {
    const { data: exams, isLoading } = useGetPreviousExamsQuery(undefined);

    if (isLoading) return <Loader />;

    return (
        <Container className="min-h-[calc(100dvh-198px)]  my-10">
            <SectionHeading
                title="Recent Quiz Results"
                subTitle="Review your latest exam scores and track your progress over time"
                className="mb-8"
            />
            {exams?.length ? (
                <div className="overflow-x-auto rounded-md">
                    <Table className="text-xs sm:text-base" hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Topic
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Difficulty
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Language
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Total Questions
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Correct Answers
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Score
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Time
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Date
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Action
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-gray-200">
                            {exams?.map((exam) => (
                                <TableRow
                                    key={exam._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {exam.topic}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {capitalize(exam.difficulty || '')}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {capitalize(exam.language || '')}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {exam.totalQuestions}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {exam.correctAnswers?.toString() ||
                                            null}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {exam.score?.toString()
                                            ? exam.score + '%'
                                            : null}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {moment(exam.createdAt).format(
                                            'h:mm A'
                                        )}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {moment(exam.createdAt).format(
                                            'Do MMM, YY'
                                        )}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {
                                            <Link
                                                to={`/quiz/${exam._id}`}
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                {exam.correctAnswers?.toString()
                                                    ? 'View Answers'
                                                    : 'Continue Quiz'}
                                            </Link>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="min-h-[40dvh]  rounded-lg flex flex-col justify-center items-center text-center p-8">
                    <div className="text-gray-400 mb-4">
                        <IoDocumentTextOutline size={80} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Quiz History Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't taken any quizzes yet. Start your learning
                        journey by taking your first quiz!
                    </p>
                    <Link
                        to="/quiz"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Take Your First Quiz
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default PreviousExams;
