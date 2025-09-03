/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import SDatePicker from '../../components/form/SDatePicker';
import { useEditStudyTaskMutation } from '../../redux/api/studyGoalApi';
import { studyTaskSchema } from '../../schemas/studyGoal.schema';
import SSelect from '../../components/form/SSelect';
import {
    daysOptions,
    priorityOptions,
} from '../../constants/studyGoal.constant';
import SCheckBox from '../../components/form/SCheckBox';
import IconButton from '../../components/IconButton';
import { MdOutlineEdit } from 'react-icons/md';
import type { TStudyTask } from '../../types';

type EditTaskGoalModalProps = {
    studyTask: TStudyTask;
};

const EditStudyTaskModal = ({ studyTask }: EditTaskGoalModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [editStudyTask] = useEditStudyTaskMutation();

    const handleCreateStudyGoal = async (data: FieldValues) => {
        const toastId = toast.loading('Updating Study Task...');

        try {
            await editStudyTask({ studyTaskId: studyTask._id, data }).unwrap();

            toast.success('Study task updated', {
                id: toastId,
            });
            setOpenModal(false);
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    const defaultValues = {
        ...studyTask,
        deadline: new Date(studyTask.deadline),
    };

    return (
        <>
            <IconButton onClick={() => setOpenModal(true)}>
                <MdOutlineEdit size={20} />
            </IconButton>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader className="mt-2">
                    <span className="ml-4">Update Study Task</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(studyTaskSchema)}
                            defaultValues={defaultValues}
                        >
                            <SInput
                                name="topic"
                                label="Topic"
                                placeholder="Enter topic"
                            />

                            <SSelect
                                name="priority"
                                label="Priority"
                                options={priorityOptions}
                            />
                            <SDatePicker
                                name="deadline"
                                label="Deadline"
                                minDate={new Date()}
                                placeholder="Please Select a Deadline"
                            />
                            <SCheckBox
                                name="days"
                                options={daysOptions}
                                label="Select days"
                            />
                            <SInput
                                name="timeSlot"
                                label="Time Slot"
                                placeholder="HH:MM"
                            />
                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        </SForm>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default EditStudyTaskModal;
