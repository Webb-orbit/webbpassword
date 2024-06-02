import { Link } from "react-router-dom"

const Profabout = () => {
    return (
        <pre className='flex flex-col gap-10 p-10 max-sm:p-3 font-light poppins-regular text-neutral-100'>
            <div className='poppins-regular capitalize font-semibold text-neutral-200'> Dark Password</div>
            <div>The most secure personal work website would be built upon layers of robust security measures, ensuring the protection of sensitive information and user privacy.</div>
            <div>your any todos and others info stay your admin side. <b className="font-semibold">Not even Darkpassword can read your informations</b> </div>
            <div>
             At the core of Dark Password lies end-to-end encryption protocols. Every piece of data, from login credentials to sensitive documents, is encrypted using industry-standard algorithms, ensuring that even in transit or at rest, your information remains impenetrable to unauthorized access.</div>
             <div>
                connect us : <Link className="text-green-500" target="_blank" to={"https://discord.gg/H3eAdvumdr"}>Discord</Link>
             </div>
        </pre>
    )
}

export default Profabout