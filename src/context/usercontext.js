import { useState , createContext, useEffect} from "react"

export const UserContext = createContext()

export default function UserProvider({children}){
    const [user,setUser] = useState()

    const val = {
        user,
        setUser
    }


    return(
        <UserContext.Provider value={{value:val}}>
            {children}
        </UserContext.Provider>
    )
}
