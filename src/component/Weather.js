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

           
    
    


                    
                
            </>
        )
    }

}

export default Weather;