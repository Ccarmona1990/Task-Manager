import React from 'react';
import Login from '../utils/Login';
import Registration from '../utils/Registration';
import '../authStyle.scss';

const Auth = () => {
    React.useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <div className='container'>
            <Registration />
            <Login/>
        </div>
    )
}

export default Auth
