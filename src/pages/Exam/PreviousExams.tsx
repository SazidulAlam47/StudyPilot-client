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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Topic</TableHeadCell>
                        <TableHeadCell>Total Questions</TableHeadCell>
                        <TableHeadCell>Correct Answers</TableHeadCell>
                        <TableHeadCell>Score</TableHeadCell>
                        <TableHeadCell>Time</TableHeadCell>
                        <TableHeadCell>Date</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200">
                    {exams?.map((exam) => (
                        <TableRow
                            key={exam._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {exam.topic}
                            </TableCell>
                            <TableCell>{exam.totalQuestions}</TableCell>
                            <TableCell>
                                {exam.correctAnswers?.toString() || null}
                            </TableCell>
                            <TableCell>
                                {exam.score?.toString()
                                    ? exam.score + '%'
                                    : null}
                            </TableCell>
                            <TableCell>
                                {moment(exam.createdAt).format('h:mm A')}
                            </TableCell>
                            <TableCell>
                                {moment(exam.createdAt).format('Do MMM, YY')}
                            </TableCell>
                            <TableCell>
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
        </Container>
    );
};

export default PreviousExams;
