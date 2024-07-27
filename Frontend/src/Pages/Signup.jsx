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
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useState } from "react"
import { useAuthContext } from "@/context/authContext"
import Nav from "@/components/ui/Nav"

const SignUp = () => {
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [gender,setGender] = useState("");
    
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState("");

    const {setState} = useAuthContext();

    const handleSubmit = async () => {
        if(name==="" || username==="" || password==="" || confirmPassword==="" || gender===""){
            setError("All Fields must be filled");
            return;
        }
        if(password.length<=6){
            setError("Password must be longer than six characters");
            return;
        }
        if(password!==confirmPassword){
            setError("Passwords must Match");
            return;
        }

        setLoading(true);

        try{
            const res = await fetch("https://chat-app-0xb9.onrender.com/api/auth/signin",{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type' : "application/json"},
                body: JSON.stringify({fullName: name , username:username,password:password,confirmPassword:confirmPassword , gender:gender}),
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
            <Nav />
            <div className="w-full h-screen flex justify-center items-center z-10 p-5">
                <Card className="mx-auto w-full max-w-lg z-10">
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardDescription>
                        Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="fullname">Name</Label>
                                <Input id="fullname" placeholder="Enter Your Name" required  value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Enter Your Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter Your password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" placeholder="Confirm Your password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label >Gender</Label>
                                <RadioGroup defaultValue="none" className="flex" onValueChange={(value) => setGender(value)}>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <RadioGroupItem value="male" id="option-one"/>
                                        <Label htmlFor="option-one">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <RadioGroupItem value="female" id="option-two"/>
                                        <Label htmlFor="option-two">Female</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button disabled={loading} type="submit" className="w-full mt-3" onClick={handleSubmit}>
                                Create an account
                            </Button>
                            <div className="mt-2 text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline">
                                    Log in
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

export default SignUp;

