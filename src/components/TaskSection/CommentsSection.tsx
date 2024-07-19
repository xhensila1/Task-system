import React, { useState } from 'react';
import { CommentType } from '../../types/taskTypes';
import { MentionsInput, Mention } from 'react-mentions';
import { useTranslation } from 'react-i18next';

interface CommentsSectionProps {
    comments: CommentType[];
    addComment: (comment: CommentType) => void;
    users: any[];
    currentUser: any;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, addComment, users, currentUser }) => {
    const [newComment, setNewComment] = useState<string>('');
    const { t } = useTranslation();

    const handleCommentChange = (event: any, newValue: string) => {
        setNewComment(newValue);
    };

    const handleAddComment = () => {
        if (newComment.trim() && currentUser) {
            const newCommentObj: CommentType = {
                author: currentUser.username,
                text: newComment,
                date: new Date().toISOString()
            };
            addComment(newCommentObj);
            setNewComment('');
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700">{t('commentsSection.comments')}</label>
            <MentionsInput
                value={newComment}
                onChange={handleCommentChange}
                className="w-full px-3 py-2 border rounded"
            >
                <Mention
                    trigger="@"
                    data={users.map((user: any) => ({ id: user.username, display: user.username }))}
                />
            </MentionsInput>
            <button
                type="button"
                onClick={handleAddComment}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
               {t('commentsSection.addComment')}
            </button>
            <div className="mt-4">
                <label className="block text-gray-700">{t('commentsSection.existingComments')}</label>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} className="mb-2">
                            <strong>{comment.author}</strong>: {comment.text} <br />
                            <small>{new Date(comment.date).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommentsSection;
