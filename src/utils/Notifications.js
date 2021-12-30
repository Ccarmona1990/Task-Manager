import React, { useEffect } from 'react'

const NotificationContainer = ({state, dispatch})=>{
    const closeNotification = ()=>{
        dispatch({type: 'CLOSE_NOTIFICATION'});
    }

    useEffect(()=>{
        setTimeout(()=>{
            closeNotification();
        },3000)
    })
    return (
        <div className='notificationContainer'>
            {state.isNotificationShowing && 
            <h3 className='notification'>
            {state.notificationMessage}</h3>}
        </div>
    )
}
export const AuthNotification = ({isNotificationShowing, setIsNotificationShowing, notificationMessage})=>{
    useEffect(()=>{
        setTimeout(()=>{
            setIsNotificationShowing(false);
        },5000)
    })

    return (
        <div className='notificationContainer'>
            {isNotificationShowing && <h3 className='notification1'>
            {notificationMessage}</h3>}
        </div>
    )
}

export default NotificationContainer
