import useAuthContext from "../context/useAuthContext"

export function useLogout(){
    const {dispatch}=useAuthContext()
    const logout=()=>{
        //removing user form the local storage
        localStorage.removeItem("user")
        //dispatching null value
        dispatch({type:"LOGOUT"})
    }
    return {logout}
    
}