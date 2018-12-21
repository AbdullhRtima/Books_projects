import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';

class FooterPage extends React.Component {
    render(){
        return(
            <div className="footer" style={{backgroundColor:"#343a40"}}>
            <Footer>
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                       <div className="color">
                        &copy; {(new Date().getFullYear())} Copyright:<a> Made with love By AKMA </a>
                        </div>
                    </Container>
                </div>
            </Footer>
            </div>
        );
    }
}

export default FooterPage;
