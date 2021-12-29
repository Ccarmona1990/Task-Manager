
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

export const usertasksAPI_URL = 'https://taskm-api.herokuapp.com/api/v1/usertasks/';

export const logintasksAPI_URL = 'https://taskm-api.herokuapp.com/api/v1/login/';

//**************************************************** */

//export const serverAPI_URL = 'http://localhost:8080/api/v1/tasks/';

//export const usertasksAPI_URL = 'http://localhost:8080/api/v1/usertasks/';

//export const logintasksAPI_URL = 'http://localhost:8080/api/v1/login/';

//***************************************************** */

export const registerAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/register';

export const loginAuthAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/login/';

export const sessionAPI_URL = 'https://tm-auth-api.herokuapp.com/api/v1/tasks/';

//**************************************************** */
//export const registerAPI_URL = 'http://localhost:3001/api/v1/register';

//export const loginAuthAPI_URL = 'http://localhost:3001/api/v1/login/';

//export const sessionAPI_URL = 'http://localhost:3001/api/v1/tasks/';
