import { Link } from 'react-router-dom'

const Failcompo = ({errmas = "something went wrong"}) => {
  return (
    <>
    <div className=' w-full h-screen flex justify-center items-center flex-col gap-4'>
    <div className='poppins-regular font-semibold capitalize'>{errmas}</div>
    <Link className='flex items-center text-[0.9rem] poppins-regular uppercase font-light text-green-300' to={"/"}><span className="material-symbols-outlined">
link
</span>try again</Link>
    </div>
    </>
  )
}

export default Failcompo