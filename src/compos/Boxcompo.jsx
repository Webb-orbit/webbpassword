
const Boxcompo = ({mass ,child, visiblety, setvisiblety }) => {
    return (
        <div className={` z-50 poppins-regular  w-full h-screen backdrop-blur-sm fixed top-0 justify-center items-center ${visiblety?"flex":"hidden"}`}>
            <div className='bg-neutral-950  w-[45vw] h-[80vh] rounded-md  p-5 flex flex-col  max-sm:w-[100%] max-sm:h-screen overflow-y-scroll editor break-words'>

                <div className='flex justify-between items-center py-1'>
                    <h3 className='font-bold '>{mass}</h3>
                    <button>
                        <span onClick={()=>setvisiblety(false)} className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {child}
            </div>
        </div>
    )
}

export default Boxcompo