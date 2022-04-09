import "./ridecard.css"

export default function RideCard({ride}){
    return(
        <>
        {ride ?
        <div className="ride_card">
            <div className="ride_card_left">
                <img src={ride.map_url}></img>
                <div className="details">
                    <p><span>Ride Id : </span>{ride.id}</p>
                    <p><span>Origin Station : </span>{ride.origin_station_code}</p>
                    <p><span>Station_path : </span>{(ride.station_path).toString()}</p>
                    <p><span>Date : </span>{new Date(ride.date).toUTCString()}</p>
                    <p><span>Distance : </span>{ride.distance}</p>
                </div>
            </div>
            <div className="places">
                <p>{ride.city}</p>
                <p>{ride.state}</p>
            </div>
        </div>
        :""}
        </>
    )
}
