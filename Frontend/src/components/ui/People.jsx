import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Badge } from "./badge";
import { useSocketContext } from "@/context/socketContext";


const People = ({name,pp,id,initials,handleCLick,isActive}) => {

    const select = () => {
        handleCLick(id,name,pp);
    }

    const custom = isActive ? 'bg-gray-500' : '';

    const {onlineUsers} = useSocketContext();



    return (
        <div className={`rounded-xl cursor-pointer p-1 flex items-center gap-4 ${custom}`} onClick={select}>
            <Avatar className="relative flex items-center justify-center w-14 h-14">
                <AvatarImage className="" src={pp} />
                <AvatarFallback className="text-3xl" >{initials}</AvatarFallback>
                {onlineUsers.includes(id)?
                    <div className="absolute top-0 right-0 bg-green-500 rounded-full w-4 h-4"></div>
                    :<div className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4"></div>
                }
            </Avatar>
            <div>
                {name}
            </div>
        </div>
    )
}

export default People;