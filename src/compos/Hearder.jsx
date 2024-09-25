import Time from "./Time"
import { BackgroundBeams } from "./utils/Bglines"

const Hearder = () => {

  return (
    <>
    <div className="h-[80vh] max-sm:h-[50vh] relative">
      <div className=" w-full h-full flex items-center justify-center flex-col max-sm:w-[70%] max-sm:mx-auto">
        <h1 className="itim text-[2.5rem] uppercase text-center text-neutral-200">plan <span className=" font-medium text-[2.7rem] text-neutral-50">write</span> execute</h1>
        <p className="poppins-regular text-[1rem] capitalize">focus in execution</p>
        <sub className="font-mono select-none">power by gemini AI</sub>
      </div>
      <Time/>
      <BackgroundBeams/>
    </div>
      </>
  )
}

export default Hearder