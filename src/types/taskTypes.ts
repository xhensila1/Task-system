export enum TaskStatus {
    NEW = 'New',
    WORK_IN_PROGRESS = 'Work in Progress',
    READY_FOR_TESTING = 'Ready for Testing',
    DONE = 'Done',
}

export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
};

export interface CommentType {
    author: string;
    text: string;
    date: string;
}

export interface FileAttachment {
    id: string;
    filename: string;
    url: string;
}

export interface TaskType {
    id: string;
    description: string;
    startDate: string;
    estimation: number;
    status: TaskStatus;
    assignee: string;
    priority: TaskPriority;
    comments: CommentType[];
    attachments?: FileAttachment[]; 
}


export interface UpdateTaskPayload {
    id: string;
    description: string;
    startDate: string;
    estimation: number;
    status: TaskStatus;
    assignee: string;
    priority: TaskPriority;
    comments?: CommentType[];
    attachments?: FileAttachment[]; 
}

export interface TaskState {
    tasks: TaskType[];
    status: 'idle' | 'loading' | 'failed';
}
