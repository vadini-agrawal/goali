import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Update from '../components/Update';



export class home extends Component {
    state = {
        update: null
    }
    componentDidMount() {
        axios.get('/updates')
            .then(res => {
                console.log(res.data);
                this.setState({
                    updates: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentUpdatesMarkup = this.state.updates ? (
            this.state.updates.map(update => <Update key={update.updateId} update={update}/>)
        ) : ( <p> Loading ...</p>
        );
        return (
            <Container>
                <Row>
                    <Col md={9} lg={9} sm={8} xs={12}>
                        {recentUpdatesMarkup}
                    </Col>
                    <Col md={3} lg={3} sm={4} xs={12}>
                        <p> Profile...</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default home
