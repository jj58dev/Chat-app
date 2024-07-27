import { Send } from "lucide-react";
import { Button } from "./button";
import ChatBubble from "./ChatBubble";
import { ScrollArea } from "./scroll-area";
import { Input } from "./input";
import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/socketContext";


const Messages = ({id,conversation,setConversation}) => {

    const [message,setMessage] = useState("");

    const {socket} = useSocketContext();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setConversation((prevConversation) => [...prevConversation, newMessage]);
        };
    
        if (socket) {
            socket.on("newMessage", handleNewMessage);
    
            return () => {
                socket.off("newMessage", handleNewMessage);
            };
        }
    }, [socket, conversation]);


    const handleSend = async () => {
        const res = await fetch(`https://chat-app-0xb9.onrender.com/api/messages/send/${id}`,{
            method : 'POST',
            credentials : 'include',
            headers : {'Content-Type' : "application/json"},
            body : JSON.stringify({message})
        })

        const data = await res.json();


        if(res.ok){
            setConversation([...conversation,data]);
            setMessage("");
        }
    }

    return (
        <div className="flex flex-col h-full max-h-full">
                        <ScrollArea className="relative h-[calc(100vh_-_21rem)]">
                            <div className="absolute bottom-0 p-3 pl-4 flex flex-col gap-2 w-full">
                                {conversation && conversation.map((m) => <ChatBubble text={m.message} isUser={m.senderId!==id} key={m._id} />)}
                            </div>
                        </ScrollArea>
                        <div className="h-24 p-2">
                            <div className="flex w-full items-center space-x-2">
                                <Input className="rounded-xl" placeholder="Enter your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <Button variant="outline" className="rounded-xl" disabled={message.length==0} onClick={handleSend}>
                                    <Send />
                                </Button>
                            </div>
                        </div>
                    </div>
    )
}

export default Messages