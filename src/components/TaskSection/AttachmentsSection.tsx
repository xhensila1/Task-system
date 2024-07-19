import React, { useState } from 'react';
import { FileAttachment } from '../../types/taskTypes';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

interface AttachmentsSectionProps {
    attachments: FileAttachment[];
    addAttachment: (attachment: FileAttachment) => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({ attachments, addAttachment }) => {
    const [newFile, setNewFile] = useState<File | null>(null);
    const { t } = useTranslation();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewFile(e.target.files[0]);
        }
    };

    const handleAddFile = () => {
        if (newFile) {
            const newFileObj: FileAttachment = {
                id: uuidv4(),
                filename: newFile.name,
                url: URL.createObjectURL(newFile)
            };
            addAttachment(newFileObj);
            setNewFile(null);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700">{t('attachmentsSection.attachments')}</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
            />
            <button
                type="button"
                onClick={handleAddFile}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
                {t('attachmentsSection.addFile')}

            </button>
            <div className="mt-4">
                <label className="block text-gray-700"> {t('attachmentsSection.existingAttachments')}</label>
                <ul>
                    {attachments.map((attachment) => (
                        <li key={attachment.id}>
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                {attachment.filename}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AttachmentsSection;
