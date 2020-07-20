import React, { useEffect,useState} from 'react';
import { Dropdown,Menu,Icon, Segment} from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Pusher from "pusher-js";
import { toast } from 'react-semantic-toasts';
function HorNavbar(props) {
  

  const [activeItem,setAItem] = useState(null);
  const [notifications, setNotif] = useState([]);
  const type = props.type
  const logged = props.islogged
  let history = useHistory();
  const handleItemClick = (e, { name }) => setAItem(name)

  function Truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };


  const getnotifs = async () => {
    let url = 'http://localhost:8000/api/notifications/';
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
        setNotif(response)
    })
}

  function Loginbutton(props){
    const logged = props.logged
    if (logged===null){
        return  <Menu.Menu position='right'>
                <Menu.Item
                  name='Log in'
                  onClick={()=>{history.push("/login")}}
                  >
                  <Icon name='Log in' />
                  Log in
                </Menu.Item>
                <Menu.Item
                  name='Log in'
                  onClick={()=>{history.push("/login")}}
                  >
                  <Icon name='Log in' />
                  Log in
                </Menu.Item>
                </Menu.Menu>
    }
    else {
      return  <Menu.Menu position='right'>
                <Menu.Item
                  name='Notifications'
                  active={activeItem === 'Notifications'}
                  onClick={handleItemClick}
                >
                <Dropdown  scrolling icon='bell'> 
                  <Dropdown.Menu style={{minHeight:"600px"}}>
                    {notifications.map((notif,index) => {
                      return  <div style={{width: "500px",height:"100px"}}>
                       <Dropdown.Item>
                        <div class='box'>
                              <h3 class='notif-card' >{notif.title}</h3>
                              <h4 class='notif-card' >{notif.body}</h4>
                              <h5 class='notif-card' >{notif.created_on}</h5>
                        </div>
                      </Dropdown.Item>
                    </div>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                </Menu.Item>
              <Menu.Item
                name='Log out'
                onClick={()=>{history.push("/logout")}}
                >
                <Icon name='log out' />
                Log out
              </Menu.Item>
              </Menu.Menu>
    }
  }

  useEffect(()=> {
      getnotifs();
  },[]);

  if (type ==='student'){
    return (
      <Menu>
        <Menu.Item header>Gestion des projets</Menu.Item>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={()=>{history.push("/")}}
        >
          <Icon name='home' />
          Home
          </Menu.Item>
        <Menu.Item
          name='Themes'
          active={activeItem === 'Themes'}
          onClick={()=>{history.push("/student/themes");}}
          >
          <Icon name='file' />
          Themes
          </Menu.Item>
        <Menu.Item
          name='My group'
          active={activeItem === 'My group'}
          onClick={()=>{history.push("/student/group")}}
          >
          <Icon name='group' />
          Group
          </Menu.Item>
          <Menu.Item
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={()=>{history.push("/student")}}
          >
          <Icon name='user circle' />
          Profile
          </Menu.Item>
          <Loginbutton logged={logged}/>
      </Menu>
    )
  }
else if (type ==='teacher'){
  return (
    <Menu >
      <Menu.Item header>Gestion des projets</Menu.Item>
      <Menu.Item
        name='Home'
        active={activeItem === 'Home'}
        onClick={()=>{history.push("/")}}
      >
        <Icon name='home' />
        Home
        </Menu.Item>
      <Menu.Item
        name='My Themes'
        active={activeItem === 'My Themes'}
        onClick={()=>{history.push("/teacher/myProjects")}}
        >
        <Icon name='file' />
        Themes
        </Menu.Item>
      <Menu.Item
        name='Submit'
        active={activeItem === 'Submit'}
        onClick={()=>{history.push("/teacher/addProject")}}
        >
        <Icon name='add' />
        Submit
        </Menu.Item>
        <Menu.Item
        name='Profile'
        active={activeItem === 'Profile'}
        onClick={()=>{history.push("/teacher")}}
        >
        <Icon name='user circle' />
        Profile
        </Menu.Item>
        <Loginbutton logged={logged}/>
    </Menu>
  )
}
}
export default HorNavbar;