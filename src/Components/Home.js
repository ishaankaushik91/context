import {
  CContainer,
  CRow,
  CCol,
  CImage,
  CNav,
  CNavItem,
  CNavLink,
  CButton
} from "@coreui/react";
import { Link } from "react-router-dom";
import Logo from "./Assets/Logo.webp";
import Postman from "./Assets/Postman.gif";

function Home() {
  return (
    <>
      <CNav>
        <CNavItem>
          <CNavLink target="_blank" href="https://documenter.getpostman.com/view/8858534/SW7dX7JG#c438d742-5050-4dd1-a338-86f3d00cc4e7">
            <CImage draggable={false} src={Logo} width={50} />
          </CNavLink>
        </CNavItem>

        <CNavItem>
            <CNavLink href="/">
                Home
            </CNavLink>
        </CNavItem>

        <CNavItem>
            <CNavLink href="/register">
                Register
            </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink href="/login">
                Login
          </CNavLink>
        </CNavItem>
      </CNav>
      <hr /><br /><br /><br /><br /><br />

      <CContainer>
        <CRow>
          <CCol>
            <p>
            "I thought we were great You took your love back and ran us off track <br />
            I counted all the days 'Til you would come back, how stupid was that <br />
            Now you're missing what we used to have Guess the vodka brought the  <br />
            feeling back I was caught up in the aftermath But now if you really  <br />
            wanna know Ask how many nights I've been thinking of you Zero, zero" ~ Chris Brown  <br />
            </p>
            <Link to="/register">
                <CButton>
                    Register
                </CButton>
            </Link>

            <Link to="/login">
                <CButton color="info" style={{marginLeft:"3px"}}>
                    Login
                </CButton>  
            </Link>
          </CCol>

          <CCol>
              <CImage draggable={false} src={Postman}></CImage>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default Home;
