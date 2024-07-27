import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/context/authContext"
import Nav from "@/components/ui/Nav"

const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {setState} = useAuthContext();

    const handleSubmit = async () => {
        if(username==="" || password===""){
            setError("All Fields must be filled");
            return;
        }
        if(password.length<=6){
            setError("Password must be longer than six characters");
            return;
        }
        try{
            const res = await fetch("https://chat-app-0xb9.onrender.com/api/auth/login",{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type' : "application/json"},
                body: JSON.stringify({username:username,password:password}),
            });
            
            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            if(res.ok){
                localStorage.setItem("user" , JSON.stringify(data));
                setState(data);
                setLoading(false);
                setError(null);
            }
        }
        catch (error){
            setLoading(false);
            setError(error.message);
        }
    }
  
    return (
        <div>
            <Nav className="z-10"/>
            <div className="w-full h-screen flex justify-center items-center z-10 p-5">
                <Card className="mx-auto w-full max-w-lg z-10">
                    <CardHeader>
                        <CardTitle className="text-2xl">Log In</CardTitle>
                        <CardDescription>
                        Enter your information to Log In
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Enter Your Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Enter Your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full mt-3" onClick={handleSubmit}>
                                Log In
                            </Button>
                            <div className="mt-2 text-center text-sm">
                                Don't have an account?{" "}
                                <Link to="/signup" className="underline">
                                    Sign Up
                                </Link>
                            </div>
                            {error && 
                                <div className="p-3 text-center text-md border border-red-400 rounded-sm overflow-hidden text-red-400">
                                    <div>{error}</div>
                                </div>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
  )
}

export default Login;