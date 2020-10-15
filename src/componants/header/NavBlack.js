import React, { useEffect, useState } from 'react';
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
function NavBlack(props) {

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const [first_name, setfname] = useState(null);
  const [last_name, setlname] = useState(null);
  const [Leader, setLeader] = useState(false);
  const [activeItem, setAItem] = useState(null);
  const [notifications, setNotif] = useState([]);
  const [invitations, setInv] = useState([]);
  const type = props.type
  const logged = props.islogged
  let history = useHistory();
  //const handleItemClick = (e, { name }) => setAItem(name)

  function Truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  };



  const getnotifs = async () => {
    let url = 'http://localhost:8001/api/notifications/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    await axios(options).then(res => {
      const response = res.data;
      setNotif(response)
    })
  }

  const getinvites = async () => {
    let url = 'http://localhost:8001/groups/invitations/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    await axios(options).then(res => {
      const response = res.data;
      
      setInv(response)
    })
  }

  const acceptInv = async (grp) => {
    let url = 'http://localhost:8001/groups/handleinvite/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'Post',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
      data: { 'grp': grp, 'accepted': true }
    };
    await axios(options).then(res => {
      const response = res.data;
      //TODO : message that he joing the groupe
    })
  }
  const refuseInv = async (grp) => {
    let url = 'http://localhost:8001/groups/handleinvite/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'Post',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
      data: { 'grp': grp, 'accepted': false },
    };
    await axios(options).then(res => {
      const response = res.data;
    })
  }

  function Loginbutton(props) {
    const logged = props.logged
    if (logged === null) {
      return <Nav position='right'>
        <NavItem
          name='Log in'
        >

          <Button
            block
            className="btn-round btn-info"
            onClick={() => { history.push("/login") }}
          >
            Log in
                  </Button>
                  Log in
                </NavItem>
        <NavItem>
          <Button block
            className="btn-round btn-info"
            name='Log in'
            onClick={() => { history.push("/login") }}>
            Login Now
                  </Button>
        </NavItem>
      </Nav>
    }
    else {
      return <Nav position='right'>
        <NavItem
          name='Notifications'
          active={activeItem === 'Notifications'}
        >
          <Dropdown scrolling nav inNavbar >
            <DropdownToggle
              caret
              color="default"
              data-toggle="dropdown"
              nav
              role="button"
            >

              <div class="notif">
                <span class="badge">
                  {notifications.length}
                </span>
                <Icofont icon="alarm" />
              </div>


            </DropdownToggle>

            <DropdownMenu
              style={{ minHeight: "50px", minWidth: "220px" }}
            >
              {(() => {
                if (notifications.length === 0) {
                  return <div >
                    <DropdownItem>
                      no notifications yet.
                                                 </DropdownItem>
                  </div>
                }
              })()}

              {notifications.map((notif, index) => {

                return <div >
                  <DropdownItem>

                    <h5> {notif.title}</h5>

                    {notif.body}
                    <br />
                    {notif.created_on}

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
            >



              <Icofont icon="user-alt-7" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="dropdownMenuButton"
              className="dropdown-info"
            >
            </DropdownMenu>
            <DropdownMenu
              aria-labelledby="dropdownMenuButton"
              className="dropdown-info"
            >
              <DropdownItem
                active={activeItem === 'Profile'}
                onClick={() => {
                  if (type === 'student') { history.push("/student") }
                  else if (type === 'teacher') { history.push("/teacher") }
                }}
                target="_blank"
              >
                My Profile
                          </DropdownItem>
              <DropdownItem
                onClick={() => { history.push("/changePassword") }}
                target="_blank"
              >
                change password
                                          </DropdownItem>
              <DropdownItem
                onClick={() => { history.push("/logout") }}
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



  const LeaderOrNo = async () => {
    let url = 'http://localhost:8001/profiles/getgroup/';
    let token = localStorage.getItem("token");
    axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .request({
        url: url,
        method: "get",
      })
      .then((res) => {
        setLeader(res.data.leader)
      }
      )
  }



  function Choosep(props) {
    const isLeader = props.Leader

    if (isLeader === false) {
      return null
    }

    else if (isLeader === true) {
      return (<NavItem
        name='ChooseProjects'
      >
        <NavLink
          target="_blank"
          active={activeItem === 'ChooseProject'}
          onClick={() => { history.push("/student/ChooseProject") }}
        >
          Choose Project
  </NavLink>

      </NavItem>)
    }
    else return null;
  }



  useEffect(() => {
    LeaderOrNo();
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

  }, []);

  if (type === 'student') {
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

              <Choosep Leader={Leader} />


              <NavItem
                name='AllProjects'
              >
                <NavLink
                  target="_blank"
                  active={activeItem === 'AllProjects'}
                  onClick={() => { history.push("/student/themes") }}
                >
                  All Projects
                </NavLink>

              </NavItem>


              <NavItem
                name='My group'
              >
                <NavLink
                  target="_blank"
                  active={activeItem === 'My group'}
                  onClick={() => { history.push("/student/group") }}
                >
                  My Group
                </NavLink>

              </NavItem>

              <NavItem
                name='cantactus'
              >
                <NavLink
                  target="_blank"
                  active={activeItem === 'contactus'}
                  onClick={() => { history.push("/contactus") }}
                >
                  Contact Us
                </NavLink>

              </NavItem>

              <NavItem
                name='invitations'
                active={activeItem === 'invitations'}
              //onClick={handleItemClick}
              >

                <Dropdown scrolling nav inNavbar >
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    role="button"
                  >

                    <div class="notif">
                      <span class="badge">
                        {invitations.length}
                      </span>
                      <Icofont icon="users-alt-3" />
                    </div>

                  </DropdownToggle>
                  <DropdownMenu
                    style={{ minHeight: "50px", minWidth: "210px" }}
                  >

                    {(() => {
                      if (invitations.length === 0) {
                        return <div >
                          <DropdownItem>
                            There is no invitation yet
                                                 </DropdownItem>
                        </div>
                      }
                    })()}

                    {invitations.map((inv, index) => {
                      return <div >
                        <DropdownItem>
                          <div class='box'>
                            <h3 class='notif-card' >you have been invited to join group {inv.grp}</h3>
                            <h4 class='notif-card' >{inv.timestamp}</h4>
                            <Button size="lg" className="btn-round" color="green" onClick={() => { acceptInv(inv.grp) }}> Accept </Button>
                            <Button size="lg" className="btn-round" color="red" onClick={() => { refuseInv(inv.grp) }}> refuse </Button>
                          </div>
                        </DropdownItem>
                      </div>
                    })}
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <Loginbutton logged={logged} />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>


    )
  }
  else if (type === 'teacher') {
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
                name='Submit'
              >
                <NavLink
                  active={activeItem === 'Submit'}
                  onClick={() => { history.push("/teacher/results") }}
                >
                  Results
                </NavLink>
              </NavItem>
              <NavItem
                name='My Themes'
              >
                <NavLink
                  active={activeItem === 'My Themes'}
                  onClick={() => { history.push("/teacher/myProjects") }}
                >
                  My Projects
                </NavLink>
              </NavItem>
              <NavItem
                name='Submit'
              >
                <NavLink
                  active={activeItem === 'Submit'}
                  onClick={() => { history.push("/teacher/addProject") }}
                >
                  Add Project
                </NavLink>
              </NavItem>
              <Loginbutton logged={logged} />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>


    )
  }
  else { return null; }
}
export default NavBlack;