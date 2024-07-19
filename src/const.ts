

import { faCheckCircle, faTimesCircle, faHourglassHalf, faVial } from '@fortawesome/free-solid-svg-icons';

export const URL = 'http://localhost:3002';

export const STATUSES = ['New', 'Work in Progress', 'Ready for Testing', 'Done'];

export const PRIORITIES = ['Low', 'Medium', 'High'];

export const METRICS_DATA = [
    { label: 'New Tasks', status: STATUSES[0], icon: faTimesCircle, color: 'text-red-500' },
    { label: 'Tasks In Progress', status: STATUSES[1], icon: faHourglassHalf, color: 'text-yellow-500' },
    { label: 'Ready for Testing', status: STATUSES[2], icon: faVial, color: 'text-blue-500' },
    { label: 'Completed Tasks', status: STATUSES[3], icon: faCheckCircle, color: 'text-green-500' }
];


export const LANGUAGES = [
    { code: 'en', name: 'English', flag: '/assets/images/flags/en.svg' },
    { code: 'it', name: 'Italian', flag: '/assets/images/flags/it.svg' }
  ];