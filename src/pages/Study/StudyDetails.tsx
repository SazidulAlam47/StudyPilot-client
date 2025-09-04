import { useNavigate, useParams } from 'react-router';
import { useGetStudyGoalByIdQuery } from '../../redux/api/studyGoalApi';
import Loader from '../../components/Loader';
import { useEffect } from 'react';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import {
    Badge,
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
import AddStudyTaskModal from './modals/AddStudyTaskModal';
import EditStudyTaskModal from './modals/EditStudyTaskModal';
import DeleteStudyTaskModal from './modals/DeleteStudyTaskModal';
import GenerateStudyTaskModal from './modals/GenerateStudyTaskModal';

const StudyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: studyGoal,
        isError,
        isLoading,
    } = useGetStudyGoalByIdQuery(id);

    useEffect(() => {
        if (isError) {
            navigate('/study');
        }
    }, [isError, navigate]);

    return (
        <Container className="min-h-[calc(100dvh-198px)] my-10">
            <title>StudyPilot - Study Tasks</title>
            <SectionHeading
                title={
                    studyGoal
                        ? `${studyGoal.title} - Study Tasks`
                        : 'Study Goal Details'
                }
                subTitle={
                    studyGoal
                        ? `Target Date: ${moment(studyGoal.targetDate).format(
                              'Do MMM, YYYY',
                          )}`
                        : 'View and manage your study goal progress and tasks'
                }
                className="mb-8"
            />
            {isLoading ? (
                <Loader />
            ) : studyGoal && studyGoal.studyTasks?.length ? (
                <div className="overflow-x-auto rounded-md space-y-3">
                    <AddStudyTaskModal
                        buttonText="Add Study Task"
                        studyGoalId={studyGoal._id}
                    />
                    <Table className="text-xs sm:text-base" hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Topic
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Priority
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Deadline
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Days
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Time Slot
                                </TableHeadCell>
                                <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    Actions
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-gray-200">
                            {studyGoal.studyTasks.map((task) => (
                                <TableRow
                                    key={task._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {task.topic}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        <Badge
                                            className="w-fit px-2 py-1 rounded-xl"
                                            color={
                                                task.priority === 'high'
                                                    ? 'failure'
                                                    : task.priority === 'medium'
                                                      ? 'warning'
                                                      : 'success'
                                            }
                                        >
                                            {capitalize(task.priority)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {moment(task.deadline).format(
                                            'Do MMM, YY',
                                        )}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {task.days.join(', ')}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        {task.timeSlot}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 sm:px-4 sm:py-3 flex items-center gap-1.5">
                                        <EditStudyTaskModal studyTask={task} />
                                        <DeleteStudyTaskModal
                                            studyTask={task}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="min-h-[40dvh] rounded-lg flex flex-col justify-center items-center text-center p-8">
                    <div className="text-gray-400 mb-4">
                        <IoDocumentTextOutline size={80} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Study Tasks Yet
                    </h3>
                    <p className="max-w-[500px] text-gray-500 dark:text-gray-400 mb-4">
                        {studyGoal
                            ? `You haven't created any study tasks for "${studyGoal.title}" yet. Start organizing your study schedule by adding your first task!`
                            : 'Loading study goal details...'}
                    </p>
                    {studyGoal && (
                        <div className="flex items-center gap-2">
                            <AddStudyTaskModal
                                buttonText="Add Study Task Manually"
                                studyGoalId={studyGoal._id}
                            />
                            <GenerateStudyTaskModal
                                studyGoalId={studyGoal._id}
                            />
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default StudyDetails;
