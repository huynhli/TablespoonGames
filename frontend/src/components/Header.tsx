type HeaderProps = {
  onToggleTheme: () => void
  darkMode: boolean
}

export default function Header({ onToggleTheme, darkMode: darkMode} : HeaderProps){

    const scrollToSpot = (pixels: number): void => {
        window.scrollTo({ top: pixels, behavior: 'smooth'});
    }

    const openJobsPage = () => {
        window.location.href='/Jobs'
    }

    return (
        // TODO small screen header reorg
        // TODO if on other page, redirect + scroll --> probably pass a hash
        <div className={`flex flex-row w-full justify-between h-12 px-2 ${darkMode ? `bg-purple-800` : `bg-purple-700`}`}>
            {/* UI Change button */}
            <div className="flex w-30 justify-center">
                <button onClick={onToggleTheme} className={`transition-all cursor-pointer font-medium duration-200 self-center px-2 py-1 bg-purple-600 rounded-lg active:bg-purple-900 ${
                    darkMode
                    ? 'text-white hover:text-zinc-900 hover:bg-purple-700' 
                    : 'text-zinc-900 hover:text-white hover:bg-purple-800'
                    }`}>{darkMode ? "Light mode" : "Dark mode"}</button>
            </div>

            {/* Middle */}
            <div className="flex flex-row items-center text-zinc-900">
                <div className="w-18 text-center"><a onClick={() => scrollToSpot(700)} className={`inline-block mx-2 cursor-pointer font-bold text-lg transition-all  duration-300 hover:scale-125 ${darkMode ? `text-white hover:text-zinc-900` : `text-zinc-900 hover:text-white`}`}>Games</a></div>
                <div className="w-18 text-center"><a onClick={() => scrollToSpot(950)} className={`inline-block mx-2 cursor-pointer font-bold text-lg transition-all duration-300 hover:scale-125 ${darkMode ? `text-white hover:text-zinc-900` : `text-zinc-900 hover:text-white`}`}>Team</a></div>
                <div className="w-18 text-center"><a onClick={openJobsPage} className={`inline-block mx-2 cursor-pointer font-bold text-lg transition-all duration-300 hover:scale-125 ${darkMode ? `text-white hover:text-zinc-900` : `text-zinc-900 hover:text-white`}`}>Jobs</a></div>
                
                
            </div>
            
            {/* Icons */}
            <div className="flex justify-center w-30">
                <a className="self-center cursor-pointer" href="mailto:tbspgames@gmail.com"><img src="mail_icon.png" className={`h-9 object-contain transition-all duration-300 hover:scale-125 mr-2 ${darkMode ? `invert hover:invert-0` : `invert-0 hover:invert`}`} ></img></a>
                <a className="self-center cursor-pointer" href="https://tbspgames.itch.io/"><img src="itch-io-seeklogo.png" className={`h-6 object-contain transition-all duration-300 hover:scale-125 ${darkMode ? `invert hover:invert-0` : `invert-0 hover:invert`}`} ></img></a>
            </div>
        </div>
    )
}