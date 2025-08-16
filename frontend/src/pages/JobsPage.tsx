import useChangeTitle from "../components/useChangeTitle"

export default function JobsPage(){

    useChangeTitle("tbsp games - Jobs")

    return (
        <div className="flex flex-col items-center min-h-screen w-200 mx-auto py-20 bg-zinc-900">
            
            <div className="w-150 bg-purple-900 p-3 mx-20 my-7">
                <h1 className="text-3xl">Jobs</h1>
                <div className="h-1 bg-white my-3"></div>
                <p className="mb-3">
                    We are currently not hiring or taking internships. Check back soon!
                </p>
            </div>
        </div>
    )
    
}