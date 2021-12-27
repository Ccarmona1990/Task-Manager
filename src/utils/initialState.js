
export const initialState = {
    tasks: [],
    completedTasks: [],
    isTaskCompleted: false,
    isNotificationShowing: false,
    notificationMessage: "",
    isEdit: false,
    isCalendarShowing: false,
}

export const serverAPI_URL = 'https://taskm-api.herokuapp.com/api/v1/tasks/';

export const registerAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/register';

export const loginAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/login/';

export const sessionAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/tasks/';
// http://localhost:3000/