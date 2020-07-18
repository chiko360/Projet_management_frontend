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

function NavBlack(props) {
 
  const toggleNavbarCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
  };
  return (
    
    <Navbar
      expand="lg"
    >

      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            target="_blank"
            title="make it easy"
          >
            PFE esi-sba
          </NavbarBrand>
          <button
            className={classnames("navbar-toggler navbar-toggler", {
            })}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
        >
          <Nav navbar>

            
            <NavItem>
              <NavLink
                href="/Index"
                target="_blank"
              >
             Acceuil
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="dropdownMenuButton"
                        nav
                        onClick={e => e.preventDefault()}
                        role="button"
                      >
                        Années
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem header tag="span">
                          Année universitaire
                        </DropdownItem>
                        <DropdownItem
                           href="/themes"
                           target="_blank"
                        >
                         2 cpi
                        </DropdownItem>

                        <DropdownItem
                         href="/themes"
                         target="_blank"
                        >
                         1 cs
                        </DropdownItem>
                        <DropdownItem
                      href="/themes"
                      target="_blank"
                        >
                          2 cs
                        </DropdownItem>
                        <DropdownItem
                     href="/themes"
                     target="_blank"
                        >
                          3 cs (pfe)
                        </DropdownItem>
                        <DropdownItem divider />
                        
                        
                      </DropdownMenu>
                    </UncontrolledDropdown>

            
                    <NavItem>
            <NavLink
                href="/teacher"
                target="_blank"
              >
                Prof 
               </NavLink>
            </NavItem>

            <NavItem>
            <NavLink
                href="/student"
                target="_blank"
              >
                Student
               </NavLink>
            </NavItem>

            
            <NavItem>
              <NavLink
                href="/contact"
                target="_blank"
              >
                Nous-Contacter     
             </NavLink>
            </NavItem>

            <NavItem>
            

              <Button block className="btn-round btn-danger" href="/login">
                    Connexion
                  </Button>
            </NavItem>
          
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    
  );
}                       
export default NavBlack;

NavBlack.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  handle_logout: PropTypes.func.isRequired
};