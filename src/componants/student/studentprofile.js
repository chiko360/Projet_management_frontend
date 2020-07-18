import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button} from "semantic-ui-react";
import HorNavbar from '../HorNavbar';
function Studentprofile() {

    const [first_name, setfname] = useState(null);
    const [last_name, setlname] = useState(null);
    const [date_of_birth, setdob] = useState(null);
    const [gender, setgender] = useState(null);
    const [promo, setpromo] = useState(null);
    let history = useHistory();

    const getinfo = async () => {
        let url = 'http://localhost:8000/profiles/student/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        
        await axios(options).then(res => {
            const response = res.data;
            setfname(response.data['0'].first_name)
            setlname(response.data['0'].last_name)
            setdob(response.data['0'].birth_date)
            setgender(response.data['0'].gender)
            setpromo(response.data['0'].promo)
        })
        .catch(function (error) {
          history.push('/Forbiden')
          }
        )
    }

    useEffect(()=> {
      if (localStorage.getItem('type')!=='student'){
        history.push('/Forbiden')
      }
        getinfo();
    },[]);
        return (
            <React.Fragment>
              <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
                <header className="App-header">
                  <p>
                    Student page
                  </p>
                </header>
                <div>
                  <center>
                    <h1>hello this is {first_name} {last_name}</h1>
                    <h1>i was born at {date_of_birth}</h1>
                    <h1>i'm a {gender}</h1>
                    <h1>i'm a {promo} student at esi sba</h1>
                    <Button color='blue' onClick={()=>{history.replace('/changePassword')}}>change password</Button>
                    <Button color='red' onClick={()=>{history.push("/logout")}}>logout</Button>
                  </center>
                </div>
              </React.Fragment>
        );
    }

export default Studentprofile;