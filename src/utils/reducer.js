const reducer = (status, action)=>{
    switch (action.type){
        case 'ADD_TASK':
            return {
                ...status,
                tasks: [...status.tasks, action.payload],
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
                tasks: action.payload1,
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
            return {
                ...status,
                isEdit: false,
                isNotificationShowing: true,
                notificationMessage: "Item Edited"
            }
        case 'COMPLETED_TASK':
            console.log(action.payload3);
            return {
                ...status,
                tasks: [action.payload3[0]],
                completedTasks: [action.payload3[1]],
                isNotificationShowing: true,
                notificationMessage: "Task Completed",
                isTaskCompleted: true
            }
        case 'UNCOMPLETED_TASK':
            return {
                ...status,
                tasks: [...status.tasks, action.payload4[1]],
                completedTasks: [action.payload4[0]],
                isTaskCompleted: false
            }
        default:
            throw new Error('No matching action type')
    }
    
}

export default reducer