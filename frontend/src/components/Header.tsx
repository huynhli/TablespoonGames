export default function Header(){
    
    const handleUIChange = () => {
        console.log("Changing ui");
    }

    const scrollToSpot = (pixels: number): void => {
        window.scrollTo({ top: pixels, behavior: 'smooth'});
    }

    const openJobsPage = () => {
        window.location.href='/Jobs'
    }

    return (
        // TODO small screen header reorg
        // TODO if on other page, redirect + scroll --> probably pass a hash
        <div className="flex flex-row w-full justify-between h-12 mt-2 px-2 bg-purple-900">
            {/* UI Change button */}
            <div className="flex w-30 justify-center">
                <button onClick={handleUIChange} className=" transition-all cursor-pointer hover:text-zinc-900 font-medium duration-200 self-center px-2 py-1 bg-purple-600 rounded-lg text-white hover:bg-purple-700 active:bg-purple-700">Light mode</button>
            </div>

            {/* Middle */}
            <div className="flex flex-row items-center text-zinc-900">
                <div className="w-18 text-center"><a onClick={() => scrollToSpot(700)} className="inline-block mx-2 cursor-pointer text-zinc-900 font-bold text-lg transition-all hover:text-white duration-300 hover:scale-125">Games</a></div>
                <div className="w-18 text-center"><a onClick={() => scrollToSpot(950)} className="inline-block mx-2 cursor-pointer text-zinc-900 font-bold text-lg transition-all hover:text-white duration-300 hover:scale-125">Team</a></div>
                <div className="w-18 text-center"><a onClick={openJobsPage} className="inline-block mx-2 cursor-pointer text-zinc-900 font-bold text-lg transition-all hover:text-white duration-300 hover:scale-125">Jobs</a></div>
                
                
            </div>
            
            {/* Icons */}
            <div className="flex justify-center w-30">
                <a className="self-center cursor-pointer" href="mailto:tbspgames@gmail.com"><img src="mail_icon.png" className="hover:invert h-9 object-contain transition-all duration-300 hover:scale-125 mr-2" ></img></a>
                <a className="self-center cursor-pointer" href="https://tbspgames.itch.io/"><img src="itch-io-seeklogo.png" className="hover:invert h-6 object-contain transition-all duration-300 hover:scale-125" ></img></a>
            </div>
        </div>
    )
}