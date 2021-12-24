const reducer = (status, action)=>{
    switch (action.type){
        case 'DB_CONNECTION':
            return {
                ...status,
                tasks: action.payload.tasks,
                completedTasks: action.payload.completedtasks
            }
        case 'ADD_TASK':
            return {
                ...status,
                tasks: action.payload,
                isNotificationShowing: true,
                notificationMessage: "Item Added"
            }
        case 'NO_TASK':
            return {
                ...status,
                isNotificationShowing: true,
                notificationMessage: "Please enter a task"
            }
        case 'DELETE_TASK':
            return {
                ...status,
                tasks: action?.deleteUncompletedTaskPayload,
                isNotificationShowing: true,
                notificationMessage: "Task Deleted"
            }
        case 'DELETE_COMPLETEDTASK':
            return {
                ...status,
                completedTasks: action?.deleteCompletedTaskPayload,
                isNotificationShowing: true,
                notificationMessage: "Task Deleted"
            }
        case 'CLOSE_NOTIFICATION':
            return {
                ...status,
                isNotificationShowing: false
            }
        case 'EDIT_TASK':
            return {
                ...status,
                isEdit: true,
                currentTaskToEdit: action.payload2,
                isNotificationShowing: true,
                notificationMessage: "Edit Started "
            }
        case 'END_EDIT':
            if(status.isTaskCompleted){
                return {
                    ...status,
                    completedTasks: action.editedTaskPayload,
                    isEdit: false,
                    isNotificationShowing: true,
                    notificationMessage: "Item Edited"
                }
            } else if (!status.isTaskCompleted){
                return {
                    ...status,
                    tasks: action.editedTaskPayload,
                    isEdit: false,
                    isNotificationShowing: true,
                    notificationMessage: "Item Edited"
                }
            }
        break
        case 'COMPLETED_TASK':
            return {
                ...status,
                tasks: action.uncompletedTaskPayload,
                completedTasks: action.completedTaskPayload,
                isNotificationShowing: true,
                notificationMessage: "Task Completed",
                isTaskCompleted: true
            } 
        case 'UNCOMPLETED_TASK':
            return {
                ...status,
                tasks: action.uncompletedTaskPayload,
                completedTasks: action.completedTaskPayload,
                isTaskCompleted: false
            }
        case 'TOGGLE_CALENDAR':
            return {
                ...status,
                isCalendarShowing: !status.isCalendarShowing,
            }
        case 'ERROR':
            throw new Error(action.payload)
        default:
            throw new Error('No matching action type')
    }
}

export default reducer