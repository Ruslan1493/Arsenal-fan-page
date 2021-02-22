import React from 'react'
import style from './ErrorComponent.module.scss'

const ErrorComponent = (props) => {
    console.log(props.error)
    return (
        <div className={style.errorNotification}>
        {
            props.error 
            ? 
            <div className={style.err}>{props.message}</div>
            :
            <div className={style.succ}>{props.message}</div>
        }
        </div>
    )
}

export default ErrorComponent;