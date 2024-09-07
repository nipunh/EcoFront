import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper';
// import { ModeToggle } from '../components/modeToggle';
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
import { ListItem } from '@material-ui/core';

const currTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc" };
  }
  else {
    return { color: "#FFFFFF" };
  }
}

const Menu = ({ history }) => (
  <></>
  // <NavigationMenu >
  //   <NavigationMenuList>
  //     <NavigationMenuItem>
  //       <Link href="/" key={"/"} to={"/"}>
  //         {/* <NavigationMenuLink  className={navigationMenuTriggerStyle()}> */}
  //           Home
  //          {/* </NavigationMenuLink> */}
  //       </Link>
  //     </NavigationMenuItem>

      /* <NavigationMenuItem>
        {isAuthenticated() && isAuthenticated().user.role === 0 &&
          <Link href="/user/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              User Dashboard
            </NavigationMenuLink>
          </Link>
        }
      </NavigationMenuItem>

      <NavigationMenuItem>
        {isAuthenticated() && isAuthenticated().user.role === 1 &&
          <Link href="/admin/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Admin Dashboard
            </NavigationMenuLink>
          </Link>
        }

      </NavigationMenuItem>

      <NavigationMenuItem>
        {!isAuthenticated() &&
          <>
            <Link href="/signup" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Register
              </NavigationMenuLink>
            </Link>

            <Link href="/signin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </Link>
          </>
        }
      </NavigationMenuItem>

      <NavigationMenuItem>
        {!isAuthenticated() &&
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Logout
            </NavigationMenuLink>
          </Link>
        }
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem> */

  //   </NavigationMenuList>
  // </NavigationMenu>
  // <Navbar bg="dark" variant="dark" expand="lg">
  //   <Navbar.Brand href="#home">
  //     <img
  //    src={require('./logo.png')}
  //     width="30"
  //     height="30"
  //     className="d-inline-block align-top"

  //   />
  //  </Navbar.Brand>
  //   <Navbar.Toggle />

  //   <Navbar.Collapse id="basic-navbar-nav">
  //     <Nav className="mr-auto">
  //       <Nav.Link style={currTab(history, "/")} className="nav-link" href="/"> Home </Nav.Link>

  //       {isAuthenticated() && isAuthenticated().user.role === 0 && <Nav.Link style={currTab(history, "/user/dashboard")}
  //         className="nav-link"
  //         href="/user/dashboard">
  //         User Dashboard</Nav.Link>
  //       }

  //       {isAuthenticated() && isAuthenticated().user.role === 1 && <Nav.Link style={currTab(history, "/admin/dashboard")}
  //         className="nav-link"
  //         href="/admin/dashboard">
  //         Admin Dashboard</Nav.Link>
  //       }

  //       {!isAuthenticated() &&
  //         <Fragment>
  //           <Nav.Link style={currTab(history, "/signup")} className="nav-link" href="/signup"> Signup</Nav.Link>
  //           <Nav.Link style={currTab(history, "/signin")} className="nav-link" href="/signin"> Login</Nav.Link>
  //         </Fragment>
  //       }

  //       {isAuthenticated() && (
  //         <Nav.Link style={currTab(history, "/signOut")}
  //           className="nav-link"
  //           onClick={() => {
  //             signout(() => {
  //               history.push("/")
  //             })
  //           }}
  //         >
  //           Logout</Nav.Link>
  //       )}



  //       <Nav.Link style={currTab(history, "/cart")} className="nav-link" href="/cart"> Cart</Nav.Link>
  //     </Nav>
  //     <Form inline>
  //       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //       <Button variant="outline-success">Search</Button>
  //     </Form>
  //   </Navbar.Collapse>
  // </Navbar> 
)

export default withRouter(Menu);
