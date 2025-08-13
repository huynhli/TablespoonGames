import { Helmet } from "react-helmet-async"
import useChangeTitle from "../components/useChangeTitle"

export default function PrivacyPolicyPage(){
    useChangeTitle("tbsp games - Privacy Policy")
    return (
        <div className="flex flex-col items-center min-h-screen w-200 mx-auto py-20 bg-zinc-900">
            <Helmet>
                <title>Jobs – tbsp games</title>
                <meta name="description" content="Join the tbsp games team and help create bite-sized adventures like Licht." />
                <link rel="canonical" href="https://tablespoongames.pages.dev/Jobs" />
            </Helmet>
            <div className="w-150 bg-purple-900 p-3 mx-20 my-7">
                <h1 className="text-3xl">Privacy Policy</h1>
                <div className="h-1 bg-white my-3"></div>
                <p>
                    Subscribe to the tbsp games newsletter for our latest news and updates!
                </p>
                <a></a>
                <button></button>
            </div>
        </div>
    )
    
}