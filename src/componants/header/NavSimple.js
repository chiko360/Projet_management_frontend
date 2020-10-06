import React from "react";
// nodejs library that concatenates strings
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
import PropTypes from 'prop-types';

function NavSimple(props) {
 
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  
React.useEffect(() => {
const updateNavbarColor = () => {
  if (
    document.documentElement.scrollTop > 200 ||
    document.body.scrollTop > 200
  ) {
    setNavbarColor("");
  } else if (
    document.documentElement.scrollTop < 201 ||
    document.body.scrollTop < 201
  ) {
    setNavbarColor("navbar-transparent");
  }
};

window.addEventListener("scroll", updateNavbarColor);

return function cleanup() {
  window.removeEventListener("scroll", updateNavbarColor);
};
});
    

  return (
    
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="100"
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

            
            <NavItem>
              <NavLink
                href="/"
              >
             Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="/contactus"
              >
                Contact Us 
             </NavLink>
            </NavItem>
          
                    <NavItem>
              <NavLink
                href="/aboutus"
              >
                About Us 
             </NavLink>
            </NavItem>

            <NavItem>
            
              <Button     
              style={{width:"100%"}}          
               className="bttn-hover color-9 btn-lg "  
               href="/login">
                    Login Now
                  </Button>
            </NavItem>
          
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    
    
  );
}                       
export default NavSimple;

NavSimple.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired
};