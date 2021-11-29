import React, { useEffect } from 'react'

const Notifications = ({notification, closeNotification}) => {

    useEffect(()=>{
        setTimeout(()=>{
            closeNotification();
        },3000)
    })
    return (
            <h3 className='notification'>
            {notification}</h3>
    )
}

const NotificationContainer = ({state, notification, closeNotification })=>{
    return (
        <div className='notificationContainer'>
            <div className="holder">
            {state.isNotificationShowing && 
            <Notifications 
            notification={notification}
            closeNotification={closeNotification}
            />}
            </div>
        </div>
    )
}

export default NotificationContainer
