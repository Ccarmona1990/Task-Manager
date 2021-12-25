
export const initialState = {
    tasks: [],
    completedTasks: [],
    isTaskCompleted: false,
    isNotificationShowing: false,
    notificationMessage: "",
    isEdit: false,
    isCalendarShowing: false,
}

export const URL = 'https://taskm-api.herokuapp.com/api/v1/tasks/';