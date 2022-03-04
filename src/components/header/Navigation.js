import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Navigation = (props)=> {
    let links = null; 
    if(props.token === null){
        links = (
        <Button ><Link to="/login" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Log in</Link></Button>
        )
    }

    else{
        links = (
        <>
        <Nav className="mr-auto" navbar>
            <NavItem>
                <Link to="/rooms" className="nav-link">Rooms</Link>
            </NavItem>
        </Nav>
        <Button ><Link to="/logout" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Log out</Link></Button>
        </>
        )
    }
    
    return (
           <div>
              <div>
                <Navbar dark color="dark" expand="sm">
                        <NavbarBrand href="/">Hotel Booking</NavbarBrand>
                        {links}
                </Navbar>
            </div>
           </div>
        );    
}

export default connect(mapStateToProps)(Navigation);