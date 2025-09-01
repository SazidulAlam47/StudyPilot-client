import { Link } from 'react-router';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import SectionHeading from '../../components/SectionHeading';
import { useGetAllStudyGoalQuery } from '../../redux/api/studyGoalApi';
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
import CreateStudyGoalModal from './CreateStudyGoalModal';
import UpdateStudyGoalModal from './UpdateStudyGoalModal';

const Study = () => {
    const { data: studyGoals, isLoading } = useGetAllStudyGoalQuery(undefined);

    if (isLoading) return <Loader />;

    return (
        <Container className="min-h-[calc(100dvh-198px)] my-10">
            <SectionHeading
                title="Study Goals & Tasks"
                subTitle="Manage your study goals and track your learning progress"
                className="mb-8"
            />
            {studyGoals?.length ? (
                <div className="overflow-x-auto rounded-md space-y-3">
                    <CreateStudyGoalModal />
                    <Table className="text-xs sm:text-base" hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Goal Title
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Target Date
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Edit
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Details
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-gray-200">
                            {studyGoals?.map((goal) => {
                                return (
                                    <TableRow
                                        key={goal._id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {goal.title}
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            {moment(goal.targetDate).format(
                                                'Do MMM, YY'
                                            )}
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            <UpdateStudyGoalModal
                                                studyGoal={goal}
                                            />
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            <Link
                                                to={`/study/${goal._id}`}
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                View Details
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="min-h-[40dvh] rounded-lg flex flex-col justify-center items-center text-center p-8">
                    <div className="text-gray-400 mb-4">
                        <IoDocumentTextOutline size={80} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Study Goals Yet
                    </h3>
                    <p className="max-w-[500px] text-gray-500 dark:text-gray-400 mb-4">
                        You haven't created any study goals yet. Start
                        organizing your learning journey by creating your first
                        study goal!
                    </p>
                    <CreateStudyGoalModal />
                </div>
            )}
        </Container>
    );
};

export default Study;
