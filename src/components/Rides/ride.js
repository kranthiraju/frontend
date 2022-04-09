import { useContext, useEffect, useState } from "react"
import RideCard from "../RideCard/ridecard"
import { UserContext } from "../../context/usercontext"
import "./rides.css"

export default function Ride(){
    const {value} = useContext(UserContext)
    const {user,setUser} = value

    const [rides,setRides] = useState()
    const [d_rides,setDRides] = useState([]) // all rides
    const [openfilter,setOpenFilter] = useState(false)

    const [states,setState] = useState()
    const [city,setCity] = useState()

    const [selectstate,setSelect_state] = useState()
    const [selectcity,setSelect_city] = useState()

    const [type,setType] = useState("Nearest rides")

    const types = ["Nearest rides","Upcoming rides","Past rides"]

    const fetchRides = async() =>{
        const data = await fetch('https://assessment.api.vweb.app/rides')
            .then(async(response)=>{
                if(response.ok){
                    return await response.json()
                }
            })

        const hello = await data.map(i=>{
            i["station_path"].some(j=>{
                if(j >= user["station_code"]){
                    i["distance"] = j - user["station_code"]
                    return true
                }
            })
        })

        let res = []
        await data.map(i=>{
            if(i["distance"]!==undefined){
                res.push(i)
            }
        })

        res.sort((a,b)=>a["distance"]-b["distance"])
        setRides(res)
        setDRides(res)
    }

    const upcomingRides = async() =>{
        const upcoming = await d_rides.filter(i=>new Date(i.date) > new Date())
        setRides(upcoming)
    }

    const pastRides = async() => {
        const past = await d_rides.filter(i=>new Date(i.date) < new Date())
        setRides(past)
    }

    const filter = (
        <div className="filter_back">
            <p>Filters</p>
            {states ?
                <select name="state" placeholder="select state" onChange={(e)=>setSelect_state(e.target.value)}>
                    {states.map(i=><option value={i}>{i}</option>)}
                </select> : ""}
            {city ?
            <select name="city" placeholder="select city" onChange={(e)=>setSelect_city(e.target.value)}>
                {city.map(i=><option value={i}>{i}</option>)}
            </select> : ""}
        </div>
    )

    const getallstates = async() =>{
        let s = []
        let c = []
        await rides.map(i=>{
            if(s.includes(i["state"])==false){
                s.push(i["state"])
            }
            if(c.includes(i["city"])==false){
                c.push(i["city"])
            }
        })
        setState(s.sort())
        setCity(c.sort())
    }

    const getbystate = () =>{
        setRides(d_rides.filter(i=>i.state===selectstate))
    }
    const getbycity = () =>{
        setRides(d_rides.filter(i=>i.city===selectcity))
    }

    useEffect(()=>{
        if(user && type=="Nearest rides")
        {
            fetchRides()
        }
        else if(type=="Upcoming rides"){
            upcomingRides()
        }
        else if(type=="Past rides"){
            pastRides()
        }
    },[user,type])

    useEffect(()=>{
        getallstates()
    },[rides])

    useEffect(()=>{
        getbystate()
    },[selectstate])

    useEffect(()=>{
        getbycity()
    },[selectcity])

    return(
        <div className="ride_back">
            <div className="filters_options">
                <div className="options">
                    {types.map(i=><p className={i==type ? "active" : "options_not"} onClick={()=>setType(i)}>{i}</p>)}
                </div>
                <div className="filters" onClick={()=>setOpenFilter(!openfilter)}>
                    <img src="https://img.icons8.com/ios-filled/30/FFFFFF/sorting-answers.png"/>
                    <p>Filters</p>
                </div>
                {openfilter ? filter : ""}
            </div>
            {rides ?
                <div className="rides_all">
                    {rides.map(i=><RideCard ride={i} key={i.id+i.city}/>)}
                </div>
            :""}
        </div>
    )
}
