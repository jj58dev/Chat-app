import { Button } from "@/components/ui/button";
import ChatBubble from "@/components/ui/ChatBubble";
import { Input } from "@/components/ui/input";
import Messages from "@/components/ui/Messages";
import Nav from "@/components/ui/Nav";
import People from "@/components/ui/People";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search, Send } from "lucide-react";
import { useEffect, useState } from "react";

const Chat = () => {

    const [search,setSearch] = useState("");
    const [peopleArray,setPeopleArray] = useState([]);
    const [curConvo,setCurConvo] = useState(null);
    const [pic,setPic] = useState(null);
    const [name,setName] = useState(null);
    const [conversation,setConversation] = useState(null);
    const [renderedArray,setRenderedArray] = useState(null);


    const getInitials = (fullName) => {
        const nameArray = fullName.split(' ');
      
        const initialsArray = nameArray.map(word => word.charAt(0).toUpperCase());
      
        const initials = initialsArray.join('');
      
        return initials;
    };

    useEffect(()=>{
        const userFetch = async () => {
            const res = await fetch("https://chat-app-0xb9.onrender.com/api/users/",{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            const arr = data.allUsers.map((item) => {
                return (
                    {name:item.fullName , pp:item.profilePic , id:item._id} 
                )
            });
            setPeopleArray(arr);
            setRenderedArray(arr);

        }

        userFetch();

    },[]);

    const handleCLick = (id,name,pic) => {
        setConversation(null);
        setCurConvo(id);
        setName(name);
        setPic(pic);
    }

    useEffect(() => {
        const fetchConvo = async () => {
            const res = await fetch(`https://chat-app-0xb9.onrender.com/api/messages/${curConvo}`,{
                method : 'GET',
                credentials : 'include'
            });

            const data = await res.json()

            setConversation(data);
        }

        if(curConvo){
            fetchConvo();
        }

    },[curConvo]);

    const onSearch = (e) => {
        setSearch(e.target.value);
        setRenderedArray(peopleArray.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } 



    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Nav />
            <div className="mt-24 p-8 grid grid-cols-4 gap-5 z-10 flex-grow">
                <div className=" px-2 pt-4 flex flex-col gap-5 z-10" >
                    <div className="flex items-center gap-2 pl-2 border-2 rounded-xl">
                        <Search />
                        <Input placeholder="Search" className="border-none rounded-r-xl" value = {search} onChange={onSearch}/>
                    </div>
                    <ScrollArea className="h-[calc(100vh_-_21rem)]">
                        <div className=" p-2 z-10 flex flex-col gap-4 overflow-y-auto">
                            {renderedArray && renderedArray.map((item) => {
                                return <People name={item.name} pp={item.pp} key={item.id} id={item.id} initials={getInitials(item.name)} handleCLick={handleCLick} isActive={item.id===curConvo}  />
                            })}
                        </div>
                    </ScrollArea>
                </div>
                {   curConvo?
                    <div className="z-10 col-span-3 p-2 flex flex-col">
                        <div className="h-24 ml-3 flex gap-10 items-center">
                            <Avatar className="flex items-center justify-center w-20 h-20">
                                <AvatarImage src={pic} />
                                <AvatarFallback className="text-4xl">{name && getInitials(name)}</AvatarFallback>
                            </Avatar>
                            <div className="text-xl">
                                {name}
                            </div>
                        </div>
                        <Messages id={curConvo} conversation={conversation} setConversation={setConversation} />
                    </div>:
                    <div className="flex justify-center items-center col-span-3">
                        <div className="text-5xl">Select a person to start a Conversation</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Chat;