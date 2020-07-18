import {useEffect} from 'react';
import { useHistory } from "react-router-dom";


function Logout(){
    let history = useHistory();

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        history.push('/login')
      } 

    useEffect(()=> {
        logout();
    },[]);

    return null

};

export default Logout;
