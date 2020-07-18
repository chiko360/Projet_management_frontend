import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Pusher from "pusher-js";
import { toast } from 'react-semantic-toasts';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import { Button} from "semantic-ui-react";
import HorNavbar from "../HorNavbar"
function Teacherprofile() {

    const [first_name, setfname] = useState(null);
    const [last_name, setlname] = useState(null);
    const [date_of_birth, setdob] = useState(null);
    const [gender, setgender] = useState(null);
    const [grade, setgrade] = useState(null);
    let history = useHistory();

    const getinfo = async () => {
        let url = 'http://localhost:8000/profiles/teacher/';
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
            setgrade(response.data['0'].grade)
        })
        .catch(function (error) {
          history.push('/Forbiden')
          }
        )
    }


    useEffect(()=> {
      if (localStorage.getItem('type')!=='teacher'){
        history.push('/Forbiden')
      }
        getinfo();
        //const pusher = new Pusher("269da359d7787125ca29", {cluster: "eu",
        //authEndpoint: "http://localhost:8000/api/pusher/auth",
        //  });
        //  var channel = pusher.subscribe("my-channel");
        //  channel.bind('my-event', function(data) {
        //    return toast({
        //      type: "info",
        //      icon: "info",
        //      title: data.title,
        //      description: data.body,
        //      time: 5000,
        //    });
        //  }
        //);
    },[]);
    return(
            <React.Fragment>
              <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
                <header className="App-header">
                  <p>
                    teacher page
                  </p>
                </header>
              <div>
                  <center>
                    <h1>hello this is {first_name} {last_name}</h1>
                    <h1>i was born at {date_of_birth}</h1>
                    <h1>i'm a {gender}</h1>
                    <h1>i'm a {grade} teacher at esi sba</h1>
                    <Button color='blue' onClick={()=>{history.replace('/changePassword')}}>change password</Button>
                    <Button color='red' onClick={()=>{history.push("/logout")}}>logout</Button>
                  </center>
              </div>
              </React.Fragment>
        );
    }

export default Teacherprofile;