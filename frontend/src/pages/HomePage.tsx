import { useState } from "react"
import validator from 'validator'
import { useMutation } from "@tanstack/react-query"

export default function HomePage(){
    const goToPrivacyPolicy = () => {
        window.location.href = '/PrivacyPolicy';
    }

    const [currentEmail, setCurrentEmail] = useState<string>("")
    const [subscribedText, setSubscribedText] = useState<string>("")

    const mutation = useMutation({
    mutationFn: async (email: string) => {
        const res = await fetch("http://localhost:3000/Email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) {
            throw new Error("Failed to subscribe");
        }
        return res.text(); // or res.json()
    },
    onSuccess: () => {
        setSubscribedText("Subscribed!");
        setCurrentEmail("");
    },
    onError: () => {
        setSubscribedText("Error subscribing. Try again.");
    },
    });

    const subscribeEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubscribedText("")
        
        // sanitize email //
        var email = currentEmail.trim()
        if (!validator.isEmail(email)) console.log("invalid")
        const [local, domain] = email.split('@');

        // some email rules
        if (local.length > 64) console.log("Invalid email")
        if (domain.length > 255) console.log("Invalid email")
        email = local + '@' + domain.toLowerCase();
        if (email.length > 254) console.log("Invalid email")

        // replace weird chars
        email = email.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        
        // backend call /
        mutation.mutate(email);
    }

    

    return (
        <div className="flex flex-col items-center min-h-screen w-200 mx-auto py-20 bg-zinc-900">
            
            {/* Logo w/ slogan */}
            <div className="flex flex-col items-center justify-center mb-10 mt-2">
                <img src="tbspgames.png" className="max-h-50 mb-3 "/><></>
                <h1 className="italic bold text-[clamp(1rem,4vw,2rem)]">bite-sized adventures</h1>
            </div>

            {/* About */}
            <div className="w-150 bg-purple-900 p-3 mx-20 my-8">
                <h1 className="text-3xl">About</h1>
                <div className="h-1 bg-white my-3"></div>
                <p>
                    Founded in 2025 in Toronto, Canada, tbsp games is a team of diverse, 
                    international creatives that have a love and passion for making games that are not too big, and not too small.
                    Currently, we are developing <a target="_blank" rel="noopener noreferrer" href="liamhuynh.pages.dev" className="underline text-purple-500 hover:text-purple-600">Licht</a>, a 2D story-driven action puzzle game.
                </p>
            </div>

            {/* Games */}
            <div className="w-150 bg-purple-900 p-3 mx-20 my-7">
                <h1 className="text-3xl">Licht</h1>
                <div className="h-1 bg-white my-3"></div>
                <p>
                    <i>Licht</i> is a 2D isometric dystopia about a lost civilization, a world of robots, and a boy who finds himself connecting the two. 
                    Inspired by games such as <i>The Legend of Zelda</i>, <i>Hades</i>, and <i>Hyperlight Drifter</i>, <i>Licht</i> is an action-packed single-player experience. 
                </p>
                <p>
                    Follow along with our journey <a target="_blank" rel="noopener noreferrer" href="liamhuynh.pages.dev" className="underline text-purple-500 hover:text-purple-600">here!</a>
                </p>
            </div>

            {/* Team */}
            <div className="w-150 bg-purple-900 p-3 mx-20 my-7">
                <h1 className="text-3xl">Team</h1>
                <div className="h-1 bg-white my-3"></div>
                <div className="flex flex-row py-2">
                    <div className="flex flex-col w-[50%] items-center">
                        <h2 className="mt-3 font-bold">Liam Huynh</h2>
                            <h3 className="leading-tight">Principal Designer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/liam-huynh-91aa1a1a1/" className="underline text-purple-500 hover:text-purple-600">@liamhuynh</a>
                        <h2 className="mt-5 font-bold">Andrew Wang</h2>
                            <h3 className="leading-tight">Lead Composer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/tgw_wang/" className="underline text-purple-500 hover:text-purple-600">@tgw_wang</a>
                        <h2 className="mt-5 font-bold">Rohith Rajmohan</h2>
                            <h3 className="leading-tight">Principal Artist</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/all._.brite/" className="underline text-purple-500 hover:text-purple-600">@all._.brite</a>
                    </div>
                    <div className="flex flex-col w-[50%] items-center">
                        <h2 className="mt-3 font-bold">Felix (Tae Yeon) Ha</h2>
                            <h3 className="leading-tight">Lead Designer</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/taeyeonha/" className="underline text-purple-500 hover:text-purple-600">@taeyeonha</a>
                        <h2 className="mt-5 font-bold">Jannah Kandil</h2>
                            <h3 className="leading-tight">Art Director</h3>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jannahkandil_/" className="underline text-purple-500 hover:text-purple-600">@jannahkandil_</a>
                    </div>
                </div>
            </div>

            {/* Newsletter w/ Privacy Policy */}
            {/* also sanitize */}
            <div className="flex flex-col w-150 bg-purple-900 p-3 mx-20 my-7 mb-100">
                <h1 className="text-3xl">Newsletter</h1>
                <div className="h-1 bg-white my-3"></div>
                <p>
                    Subscribe to the tbsp games newsletter for our latest news and updates!
                </p>
                <a onClick={goToPrivacyPolicy} className="cursor-pointer underline text-purple-500 hover:text-purple-600">Privacy Policy</a>
                <form className="flex flex-col items-center" onSubmit={subscribeEmail}>
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
            </div>

        </div>
    )
}