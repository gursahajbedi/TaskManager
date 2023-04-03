import { AuthContext } from "./AuthContext";
import {useContext} from "react"

export default function useAuthContext(){
    const context = useContext(AuthContext)
    return context
}