import { Outlet } from 'react-router-dom'
import Sharepage from '../compos/Sharepage'

const Inditodopage = () => {
  return (
    <>
    <Sharepage/>
    <Outlet/>
    </>
  )
}

export default Inditodopage