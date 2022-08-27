import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavBar(props) {
    const addSpotClick = () => {
        props.setAddInfo(true);
        console.log("Add Spot Clicked");
    }
    const addHomeClick = () => {
        props.setAddInfo(false);
        console.log("Add Home Clicked");
    }
    return (
        <div className="center">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={addHomeClick}>Home</Navbar.Brand>
                    <Navbar.Brand onClick={addSpotClick}>Add Data</Navbar.Brand>
                    <Navbar.Brand>Approve</Navbar.Brand>
                    <Navbar.Toggle/>
                    {/*<Nav className="me-auto">*/}
                    {/*<Nav.Link href="#features">Features</Nav.Link>*/}
                    {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                    {/*</Nav>*/}
                </Container>
            </Navbar>
            <br/>

        </div>
    );
}

export default AdminNavBar;