import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,Tab,Card, Container } from 'react-bootstrap';

class Weather extends React.Component {
    constructor(props){
        super(props)
    }

  
    

    render() {
        return (
            <>
            <Container>
            <Row>
  
    <Col  sm={8}>
      <Card>
        
        <Card.Body>
        
    <Card.Text>
    {this.props.date}
    </Card.Text>
    <Card.Text>
    {this.props.description}
    </Card.Text>
 
        </Card.Body>
      </Card>
    </Col>
  
</Row>
</Container>

            {/* <Row xs={3} md={4} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
    <Col>
  
    
      
        <ListGroup.Item action href="#link1">
        {this.props.date}
                             <br></br>
                            {this.props.description}
        </ListGroup.Item>
       
    </Col>
    ))}
    <Row/> */}
    
    


                    
                
            </>
        )
    }

}

export default Weather;