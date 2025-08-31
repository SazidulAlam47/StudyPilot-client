/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import SForm from '../../components/Form/SForm';
import SInput from '../../components/Form/SInput';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Button,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import {
    days,
    initialClasses,
    initialTimeSlots,
} from '../../constants/schedule.constant';
import {
    useCreateOrUpdateScheduleMutation,
    useGetMyScheduleQuery,
} from '../../redux/api/scheduleApi';
import type { TClass } from '../../types';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router';

const arr = Array(10).fill(null);

const ScheduleEdit = () => {
    const navigate = useNavigate();
    const { data: schedule, isLoading } = useGetMyScheduleQuery(undefined);

    const [timeSlots, setTimeSlots] = useState<string[]>(
        schedule?.timeSlots || initialTimeSlots
    );
    const [classes, setClasses] = useState<TClass[]>(
        schedule?.classes || initialClasses
    );

    useEffect(() => {
        setTimeSlots(schedule?.timeSlots || initialTimeSlots);
        setClasses(schedule?.classes || initialClasses);
    }, [schedule]);

    const [createOrUpdateSchedule] = useCreateOrUpdateScheduleMutation();

    const handleSaveSchedule = async (data: FieldValues) => {
        const newTimeSlots = arr.map((_, index) => data[`timeSlot_${index}`]);

        const updatedClasses: TClass[] = days.map((day) => {
            const daySlots: string[] = [];
            arr.forEach((_, index) => {
                const fieldName = `${day}_${index}`;
                daySlots[index] = data[fieldName] || '';
            });
            return { day: day, slots: daySlots };
        });

        const newSchedule = {
            timeSlots: newTimeSlots,
            classes: updatedClasses,
        };

        const toastId = toast.loading('Updating schedule...');

        try {
            await createOrUpdateSchedule(newSchedule).unwrap();
            toast.success('Schedule updated successfully', { id: toastId });
            navigate('/schedule');
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    const getFormValues = (timeSlots: string[], classes: TClass[]) => {
        const defaultValues: Record<string, string> = {};

        timeSlots.forEach((slot, index) => {
            defaultValues[`timeSlot_${index}`] = slot;
        });

        classes.forEach((day) => {
            day.slots.forEach((slot, slotIndex) => {
                const fieldName = `${day.day}_${slotIndex}`;
                defaultValues[fieldName] = slot || '';
            });
        });

        return defaultValues;
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Container className="min-h-[calc(100dvh-198px)] my-10">
            <SectionHeading
                title="Edit Weekly Class Schedule"
                subTitle="Update your classes and manage your weekly schedule"
                className="mb-8"
            />
            <SForm
                onSubmit={handleSaveSchedule}
                defaultValues={getFormValues(initialTimeSlots, initialClasses)}
                values={getFormValues(timeSlots, classes)}
                className="space-y-6"
            >
                <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Table className="text-xs sm:text-sm md:text-base">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="whitespace-nowrap">
                                    Day
                                </TableHeadCell>
                                {arr.map((_, index) => (
                                    <TableHeadCell
                                        key={index}
                                        className="whitespace-nowrap min-w-[150px] p-2"
                                    >
                                        <SInput
                                            name={`timeSlot_${index}`}
                                            placeholder="Time Slot"
                                            className="min-w-0"
                                        />
                                    </TableHeadCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {days.map((day) => (
                                <TableRow
                                    key={day}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <TableCell className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {day}
                                    </TableCell>
                                    {arr.map((_, index) => (
                                        <TableCell
                                            key={index}
                                            className="align-top p-2"
                                        >
                                            <SInput
                                                name={`${day}_${index}`}
                                                placeholder="Class (Teacher)"
                                                className="min-w-0"
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-center">
                    <Button type="submit" size="lg" className="px-8">
                        Save Schedule
                    </Button>
                </div>
            </SForm>
        </Container>
    );
};

export default ScheduleEdit;
