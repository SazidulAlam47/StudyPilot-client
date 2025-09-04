/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../../components/form/SForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import STextArea from '../../../components/form/STextArea';
import { generateStudyGoalSchema } from '../../../schemas/studyGoal.schema';
import { useGenerateStudyTaskMutation } from '../../../redux/api/studyGoalApi';

type GenerateStudyTaskModalProps = {
    studyGoalId: string;
    generateStudyTask: ReturnType<typeof useGenerateStudyTaskMutation>[0];
    disabled?: boolean;
};

const GenerateStudyTaskModal = ({
    studyGoalId,
    generateStudyTask,
    disabled,
}: GenerateStudyTaskModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const handleCreateStudyGoal = async (data: FieldValues) => {
        setOpenModal(false);
        const toastId = toast.loading('Generating Study Task...');

        try {
            await generateStudyTask({ studyGoalId, data }).unwrap();

            toast.success('Study task generated', {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                size="xs"
                disabled={disabled}
            >
                Generate Study Task with AI
            </Button>
            <Modal
                show={openModal}
                size="lg"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader className="mt-2">
                    <span className="ml-4">Generate Study Task</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(generateStudyGoalSchema)}
                        >
                            <STextArea
                                name="prompt"
                                label="Instructions (Prompt)"
                                placeholder="Describe your study goal: subject, key topics, syllabus scope, deadline, daily time, current progress, challenges."
                                rows={6}
                            />

                            <Button type="submit" className="w-full">
                                Generate
                            </Button>
                        </SForm>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default GenerateStudyTaskModal;
