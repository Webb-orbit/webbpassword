import Todos from "./Todos"
const Todocon = () => {

  return (
    <>
    <div className={`w-[100%] h-[100vh] bg-black relative`}>
      <div className="w-full h-full flex justify-center absolute  items-center ">
        <Todos/>  
      </div>
    </div>
    </>
  )
}

export default Todocon