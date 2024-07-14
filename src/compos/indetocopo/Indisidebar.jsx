import React, { useEffect, useState } from 'react'
import Dataserv from '../../appwrite/Data'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Indisidebar = () => {
    const [todos, settodos] = useState([])
    const {userdata} = useSelector(state=> state.track)
    const {slug} = useParams()

    const fetchtodos = async()=>{
        try {
            const todo = (await Dataserv.alltodos(userdata)).documents
            settodos(todo)
            console.log(todo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchtodos()
    },[])

  return (
    <div className='w-[15rem] p-2 sticky top-0 bg-black'>
        <p className='text-[0.8rem] text-center font-medium uppercase'>your workspaces</p>
        <div className='flex flex-col gap-3'>
        {todos.map((e)=>(
            <Link key={e.$id} to={`/workspace/${userdata}/${e.$id}`} className={`py-2 px-3 rounded-md capitalize hover:bg-neutral-800 ${slug == e.$id && "bg-neutral-700"} `}>
                {e.title}
            </Link>
        ))}
        </div>
    </div>
  )
}

export default Indisidebar