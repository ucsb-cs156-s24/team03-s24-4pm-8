import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";

export default function AppNavbar({
  currentUser,
  systemInfo,
  doLogout,
  currentUrl = window.location.href,
}) {
  var oauthLogin = systemInfo?.oauthLogin || "/oauth2/authorization/google";
  return (
    <>
      {(currentUrl.startsWith("http://localhost:3000") ||
        currentUrl.startsWith("http://127.0.0.1:3000")) && (
        <AppNavbarLocalhost url={currentUrl} />
      )}
      <Navbar
        expand="xl"
        variant="dark"
        bg="dark"
        sticky="top"
        data-testid="AppNavbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <Nav className="me-auto">
            {systemInfo?.springH2ConsoleEnabled && (
              <>
                <Nav.Link href="/h2-console">H2Console</Nav.Link>
              </>
            )}
            {systemInfo?.showSwaggerUILink && (
              <>
                <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
              </>
            )}
          </Nav>

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid  */}
          </>

          <Navbar.Collapse className="justify-content-between">
            <Nav className="mr-auto">
              {hasRole(currentUser, "ROLE_ADMIN") && (
                <NavDropdown
                  title="Admin"
                  id="appnavbar-admin-dropdown"
                  data-testid="appnavbar-admin-dropdown"
                >
                  <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            {currentUser && currentUser.loggedIn && (
              <>
                <Nav.Link as={Link} to="/restaurants">
                  Restaurants
                </Nav.Link>
                <Nav.Link as={Link} to="/diningcommonsmenuitem">
                  UCSBDiningCommonsMenuItem
                </Nav.Link>
                <Nav.Link as={Link} to="/ucsbdates">
                  UCSB Dates
                </Nav.Link>
<<<<<<< HEAD
                <Nav.Link as={Link} to="/articles">
                  Articles
=======
                <Nav.Link as={Link} to="/helprequests">
                  Help Request
>>>>>>> 901345e2 (jm - moved help request to before menu item to fix merge conflicts)
                </Nav.Link>
                <Nav.Link as={Link} to="/placeholder">
                  Placeholder
                </Nav.Link>
                <Nav.Link as={Link} to="/ucsborganization">
                  UCSB Organization
                </Nav.Link>
                <Nav.Link as={Link} to="/menuitemreview">
                  MenuItemReview
                </Nav.Link>
                <Nav.Link as={Link} to="/RecommendationRequest">
                  Recommendation Request
                </Nav.Link>
              </>
            )}
            <Nav className="ml-auto">
              {currentUser && currentUser.loggedIn ? (
                <>
                  <Navbar.Text className="me-3" as={Link} to="/profile">
                    Welcome, {currentUser.root.user.email}
                  </Navbar.Text>
                  <Button onClick={doLogout}>Log Out</Button>
                </>
              ) : (
                <Button href={oauthLogin}>Log In</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
