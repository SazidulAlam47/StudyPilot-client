import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';
import { useGetMyScheduleQuery } from '../../redux/api/scheduleApi';
import Loader from '../../components/Loader';
import { Link } from 'react-router';
import { SlCalender } from 'react-icons/sl';

const Schedule = () => {
    const { data: schedule, isLoading } = useGetMyScheduleQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    if (!schedule) {
        return (
            <Container className="min-h-[calc(100dvh-198px)] my-10">
                <SectionHeading
                    title="Weekly Class Schedule"
                    subTitle="Stay on track with your classes at a glance"
                    className="mb-8"
                />

                <div className="min-h-[40dvh]  rounded-lg flex flex-col justify-center items-center text-center p-8">
                    <div className="text-gray-400 mb-4">
                        <SlCalender size={80} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Schedule Found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't created a schedule yet. Create you schedule
                        now.
                    </p>
                    <Link
                        to="/schedule-edit"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Create Schedule
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="min-h-[calc(100dvh-198px)] my-10">
            <title>StudyPilot - My Schedule</title>
            <SectionHeading
                title="Weekly Class Schedule"
                subTitle="Stay on track with your classes at a glance"
                className="mb-8"
            />

            <div className="flex justify-end mb-5">
                <Link to="/schedule-edit">
                    <Button>Edit</Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <Table className="text-xs sm:text-sm md:text-base" hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="whitespace-nowrap">
                                Day
                            </TableHeadCell>
                            {schedule.timeSlots.map((slot, index) => (
                                <TableHeadCell
                                    key={index}
                                    className="whitespace-nowrap"
                                >
                                    {slot}
                                </TableHeadCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.classes.map((dayClass) => (
                            <TableRow
                                key={dayClass.day}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <TableCell className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {dayClass.day}
                                </TableCell>
                                {dayClass.slots.map((slot, index) => (
                                    <TableCell
                                        key={index}
                                        className="align-top"
                                    >
                                        {slot ? (
                                            <span>{slot}</span>
                                        ) : (
                                            <span className="opacity-40">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
};

export default Schedule;
