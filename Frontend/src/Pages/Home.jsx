import Nav from "@/components/ui/Nav";

const Home = () => {
    return (
        <div className="flex flex-col h-screen z-10">
            <Nav />
            <div className="flex items-center h-full flex-grow">
                <div className="w-full  flex justify-center items-center z-10 cursor-pointer">
                    <div className="flex flex-col justify-center items-center gap-10 z-10">
                        <span className="font-bold text-6xl">
                            Welcome To Z-chat
                        </span>
                        <span className="font-bold text-4xl">
                            Connect Instantly, Communicate Seamlessly
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;