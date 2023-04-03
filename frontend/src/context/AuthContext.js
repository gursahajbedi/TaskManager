import { createContext, useEffect } from "react";
import { useReducer } from "react";


export const initialValue={user:null}

export const AuthContext = createContext(initialValue)

export const reducer=(state,action)=>{
    
    if(action.type==="LOGIN"){
        return {user:action.payload}
    }
    if(action.type==="LOGOUT"){
        return {user:null}
    }
    else{
        return state
    }    
}

export const AuthContextProvider=({children})=>{
    
    const [state,dispatch]=useReducer(reducer,initialValue)

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"LOGIN",payload:user})
        }
    },[dispatch])

    // console.log("AuthContext state",state)

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


