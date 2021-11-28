import React from 'react'
import { useFetch } from './CostumHooks/useFetch';
import { useDrag } from './CostumHooks/useDrag';

function GithubUsers() {
    const url = "https://api.github.com/users";
    const dragging = 'dragging';
    const itemClass = 'user';
    const {data, isError, isLoading} = useFetch(url)
    const {startDrag,endDrag,overDrag} = useDrag(dragging,itemClass)
    
    if(isLoading){
        return (
        <div className="container">
            <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"></img>
        </div>
        )
    }
    if(isError){
        return (
        <div className="container">
            <img src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif"></img>
        </div>
        )
    }
    
    return (
        <>
            <div className="container">
                <h2>Github Users</h2>
                <section 
                className='users'
                onDragOver={overDrag}
                >
                    {data.map((user)=>{
                        const { id, avatar_url, login, html_url } = user;
                        return (
                            <div 
                            key={id} 
                            className='user'
                            onDragStart={startDrag}
                            onDragEnd={endDrag}
                            draggable="true">
                                <div 
                                className='person'>
                                <img src={avatar_url}
                                draggable="false"></img>
                                <aside 
                                className='info'
                                draggable="false">
                                    <h3 draggable="false">{login}</h3>
                                    <a
                                    className='profile'
                                    href={html_url}
                                    draggable="false"
                                    >profile</a>
                                </aside>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        </>
    )
}

export default GithubUsers
