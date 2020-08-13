import React, { useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Icofont from 'react-icofont';
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
function IndexNavbar(props) {
  
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  
  const [first_name, setfname] = useState(null);
  const [last_name, setlname] = useState(null);
  const [activeItem,setAItem] = useState(null);
  const [notifications, setNotif] = useState([]);
  const [invitations, setInv] = useState([]);
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
const getinvites = async () => {
  let url = 'http://localhost:8000/groups/invitations/';
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
      console.log(response)
      setInv(response)
  })
}

  function Loginbutton(props){
    const logged = props.logged
    if (logged===null){
        return  <Nav position='right'>
                <NavItem
                  name='Log in'
                  > <Button
                      block 
                      className="btn-round btn-info"
                      onClick={()=>{history.push("/login")}}
                      >
                     Log in
                  </Button>
                </NavItem>
              
                </Nav>
    }
    else {
      return  <Nav position='right'>
                <NavItem 
                  name='Notifications'
                  active={activeItem === 'Notifications'}
                  onClick={handleItemClick}>
                  <Dropdown scrolling nav inNavbar >
                    <DropdownToggle
                        caret
                        color="default"
                        data-toggle="dropdown"
                        nav
                        role="button"
                      >
                       <Icofont icon="alarm"/>
                       </DropdownToggle>
                      <DropdownMenu
                        style={{minHeight:"600px"}}
                      >
                    {notifications.map((notif,index) => {
                      return  <div style={{width: "500px",height:"100px"}}>
                       <DropdownItem>
                           <div class='box'>
                              <h3 class='notif-card' >{notif.title}</h3>
                              <h4 class='notif-card' >{notif.body}</h4>
                              <h5 class='notif-card' >{notif.created_on}</h5>
                        </div>
                      </DropdownItem>
                    </div>
                    })}
                     </DropdownMenu>
                    </Dropdown>
                     </NavItem>

                     <NavItem
                name='Log out'
                >
                     <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        aria-expanded={false}
                        caret
                        data-toggle="dropdown"
                        id="dropdownMenuButton"
                        nav
                        onClick={e => e.preventDefault()}
                        role="button"
                        className="bttn-hover color-8"
                      >
                         <Icofont icon="user-alt-7" /> : name name
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem
     active={activeItem === 'Profile'}
     onClick={()=>{
       if(type==='student'){history.push("/student")}
       else if(type==='teacher'){history.push("/teacher")}
      }}
                        target="_blank"
                        >
                          My Profile
                          </DropdownItem>
                          
                          <DropdownItem
              onClick={()=>{history.push("/logout")}}
              target="_blank"
                        >
                          Log Out
                                          </DropdownItem>

                        <DropdownItem divider />
                        </DropdownMenu>
                    </UncontrolledDropdown>
              </NavItem>
              </Nav>
    }
  }

  useEffect(()=> {
<<<<<<< HEAD
    getinfo();
=======
>>>>>>> 9e9d68f572a7b940cd93fb6e2910cd7e1c0bd4cd
    getnotifs();
    getinvites();
      const updateNavbarColor = () => {
        if (
          document.documentElement.scrollTop > 70 ||
          document.body.scrollTop > 70
        ) {
          setNavbarColor("");
        } else if (
          document.documentElement.scrollTop < 71 ||
          document.body.scrollTop < 71
        ) {
          setNavbarColor("navbar-transparent");
        }
      };
      
      window.addEventListener("scroll", updateNavbarColor);
      
      return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
      };

  },[]);

  if (type ==='student'){
    return (
      <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="10"
      expand="lg"
    >

      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="make it easy"
          >
            PFE esi-sba
          </NavbarBrand>

          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
    <Nav navbar>
    <NavItem
                      name='Home'
                      >
              <NavLink
                target="_blank"
          active={activeItem === 'Home'}
          onClick={()=>{history.push("/")}}
              >
                 Home
                </NavLink>
           
      </NavItem>
      
      <NavItem
                      name='AllProjects'
                      >
              <NavLink
                target="_blank"
          active={activeItem === 'AllProjects'}
          onClick={()=>{history.push("/student/themes")}}
              >
                 All Projects
                </NavLink>
           
      </NavItem>

      <NavItem
                      name='AddProject'
                      >
              <NavLink
                target="_blank"
          active={activeItem === 'AddProject'}
          onClick={()=>{history.push("/student/addProject")}}
              >
                 Add Project
                </NavLink>
           
      </NavItem>

        <NavItem
          name='My group'
          >
             <NavLink
                target="_blank"
                active={activeItem === 'My group'}
                onClick={()=>{history.push("/student/group")}}
              >
          My Group
                </NavLink>

          </NavItem>
       
          <Loginbutton logged={logged}/>
          </Nav>
  </Collapse>
</Container>
</Navbar>


    )
  }
else if (type ==='teacher'){
  return (
    <Navbar
      className={classnames("fixed-top")}
      expand="lg"
    >

      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="make it easy"
          >
            PFE esi-sba
          </NavbarBrand>

          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
    <Nav navbar>
    <NavItem
        name='Home'
      >
        <NavLink
                target="_blank"
                active={activeItem === 'Home'}
                onClick={()=>{history.push("/")}}
              >
        Home
                </NavLink>
        </NavItem>
      <NavItem
        name='My Themes'
        >
           <NavLink
                target="_blank"
                active={activeItem === 'My Themes'}
                onClick={()=>{history.push("/teacher/myProjects")}}
              >
        My Projects
                </NavLink>
        </NavItem>
      <NavItem
        name='Submit'
        >
                     <NavLink
                target="_blank"
                active={activeItem === 'Submit'}
                onClick={()=>{history.push("/teacher/addProject")}}
              >
        Add Project
                </NavLink>
        </NavItem>
        <Loginbutton logged={logged}/>
        </Nav>
  </Collapse>
</Container>
</Navbar>


  )
}
}
export default  IndexNavbar;