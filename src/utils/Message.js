import React from 'react'

const Message = ({msj, link}) => {
    return (
        <div className={`message hide ${link}`}>
            {msj}
        </div>
    )
}

export default Message
