import {useState, useEffect, useContext} from "react"
import { UserContext } from "../../context/usercontext"
import "./navbar.css"

export default function Navbar(){
    const {value} = useContext(UserContext)
    const {user,setUser} = value

    const fetchUser = async() =>{
        await fetch('https://assessment.api.vweb.app/user')
            .then(async(response)=>{
                if(response.ok){
                    const data = await response.json()
                    setUser(data)
                }
            })
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <div className="nav_back">
            <h1>Edvora</h1>
            {user ?
                <div className="user">
                    <h2>{user.name}</h2>
                    <img src={user.url}></img>
                </div>
            :""}
        </div>
    )
}
