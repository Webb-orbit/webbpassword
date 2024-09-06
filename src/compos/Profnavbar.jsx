import {NavLink } from 'react-router-dom'

function Profnavbar() {

  const navbar = [
    {
      name:"overview",
      slug:"/account/info"
    },
    {
      name:"shares",
      slug:"/account/allshares"
    },
    {
      name:"About us",
      slug:"/account/about-us"
    },
    {
      name:"Dangerzone",
      slug:"/account/Dangerzone"
    },

  ]

  return (
    <div className=' select-none bg-neutral-900 w-full h-11 flex px-16 items-center gap-3 max-sm:px-1  max-sm:overflow-x-scroll'>
        {
          navbar.map((e)=>(
            <NavLink key={e.slug} to={e.slug} className={({isActive})=>`${isActive?"bg-neutral-800/80":null} flex justify-center items-center rounded-[0.2rem] py-1 px-3 hover:bg-neutral-700/80  text-[0.9rem] max-sm:text-[3vw]  whitespace-nowrap`}>
              {e.name}
            </NavLink>
          ))
        }

    </div>
  )
}

export default Profnavbar