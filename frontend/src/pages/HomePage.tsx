import { useState } from "react"
import validator from 'validator'
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useOutletContext } from "react-router-dom" 
import useChangeTitle from "../components/useChangeTitle"

interface OutletContext {
    darkMode: boolean
}

export default function HomePage(){
    useChangeTitle("tbsp games - bite-sized adventures")

    const { darkMode } = useOutletContext<OutletContext>()

    const navigate = useNavigate()
    const goToPrivacyPolicy = () => {
        navigate('/PrivacyPolicy')
    }

    const [currentEmail, setCurrentEmail] = useState<string>("")
    const [subscribedText, setSubscribedText] = useState<string>("")

    const mutation = useMutation({
        mutationFn: async (email: string) => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            const res = await fetch(backendUrl + "/Email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.error || "Failed to subscribe. Try again.")
            }
            return json.message
        },
        onSuccess: (message) => {
            setSubscribedText(message || "Subscribed!")
            setCurrentEmail("")
        },
        onError: (error: any) => {
            setSubscribedText(`Error subscribing: ${error.message}`)
        },
    })

    const subscribeEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubscribedText("")
        
        // sanitize email //
        var email = currentEmail.trim()
        if (!validator.isEmail(email)) {
            setSubscribedText("Invalid email. Try again.")
            return
        }
        const [local, domain] = email.split('@')

        // some email rules
        if (local.length > 64 || domain.length > 255 || email.length > 254) {
            setSubscribedText("Invalid email length. Try again.")
            return
        }
        
        email = local + '@' + domain.toLowerCase()
        email = email.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        
        // backend call /
        mutation.mutate(email)
    }

    

    return (
        <div className={`flex flex-col items-center min-h-screen w-200 mx-auto py-20 ${ darkMode ? `bg-zinc-900` : `bg-white`}`}>

            {/* Logo w/ slogan */}
            <section className={`flex flex-col items-center justify-center mb-10 mt-2`}>
                <img loading="lazy" src="tbsp_games_logo_new.png" className={` max-h-50 mb-3 ${darkMode ? `invert` : ``} `} alt="tbsp games logo"/><></>
                <h1 className="hidden">tbsp table spoon games</h1>
                <h1 className={`italic bold text-[clamp(1rem,4vw,2rem)] ${darkMode ? `text-white` : `text-zinc-900`}`}>bite-sized adventures</h1>
            </section>

            {/* About */}
            <section id="about" className={`w-150 p-3 mx-20 my-8 ${darkMode ? `bg-purple-800` : `bg-purple-400`}`}>
                <h1 className={`text-3xl ${ darkMode ? `text-white` : `text-zinc-900`}`}>About</h1>
                <div className={`h-1 my-3 ${ darkMode ? `bg-white` : `bg-zinc-900`}`}></div>
                <p className={`${ darkMode ? `text-white` : `text-zinc-900`}`}>
                    Founded in 2025 in Toronto, Canada, tbsp games is a team of diverse, 
                    international creatives that have a love and passion for making games that are not too big, and not too small.
                    Currently, we are developing <a target="_blank" rel="noopener noreferrer" href="https://liamhuynh.pages.dev" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>Licht</a>, a 2D story-driven action puzzle game.
                </p>
            </section>

            {/* Games */}
            <section id="games" className={`w-150 p-3 mx-20 my-7 ${darkMode ? `bg-purple-800` : `bg-purple-400`}`}>
                <h1 className={`text-3xl ${ darkMode ? `text-white` : `text-zinc-900`}`}>Licht</h1>
                <div className={`h-1 my-3 ${ darkMode ? `bg-white` : `bg-zinc-900`}`}></div>
                <img src="player_initial_sketch.png" loading="lazy" className="px-[11%] py-[2%]"/>
                <p className={`${ darkMode ? `text-white` : `text-zinc-900`}`}>
                    <i>Licht</i> is a 2D isometric dystopia about a lost civilization, a world of robots, and a boy who finds himself connecting the two. 
                    Inspired by games such as <i>The Legend of Zelda</i>, <i>Hades</i>, and <i>Hyperlight Drifter</i>, <i>Licht</i> is driven by story, 
                    action-packed fighting, and puzzles to create a unique single-player experience.
                </p>
                <p className={`${ darkMode ? `text-white` : `text-zinc-900`}`}>
                    Follow along with our journey <a target="_blank" rel="noopener noreferrer" href="https://liamhuynh.pages.dev" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>here!</a>
                </p>
            </section>

            {/* Team */}
            <section id="team" className={`w-150 p-3 mx-20 my-7 ${darkMode ? `bg-purple-800` : `bg-purple-400`}`}>
                <h1 className={`text-3xl ${ darkMode ? `text-white` : `text-zinc-900`}`}>Team</h1>
                <div className={`h-1 my-3 ${ darkMode ? `bg-white` : `bg-zinc-900`}`}></div>
                <div className={`flex flex-row py-2`}>
                    <div className={`flex flex-col w-[50%] items-center`}>
                        <h2 className={`mt-3 font-bold ${ darkMode ? `text-white` : `text-zinc-900`}`}>Andrew Wang</h2>
                            <h3 className={`leading-tight ${ darkMode ? `text-white` : `text-zinc-900`}`}>Lead Composer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/tgw_wang/" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>@tgw_wang</a>
                        <h2 className={`mt-5 font-bold ${ darkMode ? `text-white` : `text-zinc-900`}`}>Rohith Rajmohan</h2>
                            <h3 className={`leading-tight ${ darkMode ? `text-white` : `text-zinc-900`}`}>Principal Artist</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/all._.brite/" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>@all._.brite</a>
                        <h2 className={`mt-5 font-bold ${ darkMode ? `text-white` : `text-zinc-900`}`}>Liam Huynh</h2>
                            <h3 className={`leading-tight ${ darkMode ? `text-white` : `text-zinc-900`}`}>Full-stack Developer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/liam-huynh-91aa1a1a1/" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>@liamhuynh</a>
                    </div>
                    <div className={`flex flex-col w-[50%] items-center`}>
                        <h2 className={`mt-3 font-bold ${ darkMode ? `text-white` : `text-zinc-900`}`}>Felix (Tae Yeon) Ha</h2>
                            <h3 className={`leading-tight ${ darkMode ? `text-white` : `text-zinc-900`}`}>Lead Designer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/taeyeonha/" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>@taeyeonha</a>
                        <h2 className={`mt-5 font-bold ${ darkMode ? `text-white` : `text-zinc-900`}`}>Jannah Kandil</h2>
                            <h3 className={`leading-tight ${ darkMode ? `text-white` : `text-zinc-900`}`}>Art Director</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jannahkandil_/" className={`underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>@jannahkandil_</a>
                    </div>
                </div>
            </section>

            {/* Newsletter w/ Privacy Policy */}
            {/* also sanitize */}
            <section className={`flex flex-col w-150 p-3 mx-20 my-7 mb-100 ${darkMode ? `bg-purple-800` : `bg-purple-400`}`}>
                <h1 className={`text-3xl ${ darkMode ? `text-white` : `text-zinc-900`}`}>Newsletter</h1>
                <div className={`h-1 my-3 ${ darkMode ? `bg-white` : `bg-zinc-900`}`}></div>
                <p className={`${ darkMode ? `text-white` : `text-zinc-900`}`}>
                    Subscribe to the tbsp games newsletter for our latest news and updates!
                </p>
                <a onClick={goToPrivacyPolicy} className={`cursor-pointer underline ${darkMode ? 'text-purple-500 hover:text-purple-600': 'text-purple-700 hover:text-purple-500'}`}>Privacy Policy</a>
                <form className={`flex flex-col items-center`} onSubmit={subscribeEmail}>
                    <input
                        className="bg-white text-gray-800 my-2 px-2 w-80 rounded-md"
                        type="text"
                        placeholder="Enter your email here"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        required
                    />
                    <button className="cursor-pointer rounded-lg p-1 px-3 w-50 bg-zinc-400 hover:bg-zinc-500" disabled={mutation.isPending}>{mutation.isPending ? "Subscribing" : "Subscribe!"}</button>
                </form>
                <p className="">{subscribedText}</p>
            </section>

        </div>
    )
}