import React from 'react'
import {CalendarComponent} from '@syncfusion/ej2-react-calendars'

const Calendar = ({setTimeStamp, dispatch}) => {
    
    const dateValue = new Date("12/02/2021 11:30 AM" )
    const minDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(),1)); 
    const maxDate = new Date(new Date(new Date().getFullYear(), new Date().getMonth(),31)); 
    const placeholder = 'Choose a time and a date';
    const format = 'dd-MMM-yy';

    const handleTimeStamp=(e)=>{
        let fullDueDate = e.target.value;
        const fullDueDateToStr = fullDueDate.toString();
        setTimeStamp(fullDueDateToStr.substring(0,15));
        dispatch({type:'TOGGLE_CALENDAR'})
    }
    
    return (
        <div>
            <CalendarComponent
            onChange={handleTimeStamp}
            showTodayButton={false}
            format={format}>
            </CalendarComponent>
        </div>
    )
}

export default Calendar
