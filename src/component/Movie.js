import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card ,Col,Row,Container} from "react-bootstrap";

class Movie extends React.Component {
  render() {
    return <>

    
    
{/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={this.props.image_ur} />
  <Card.Body>
    <Card.Title>{this.props.title}</Card.Title>
    <Card.Text>
    {this.props.overview}
    </Card.Text>
    <Card.Text>
    {this.props.average_votes}
    </Card.Text>
    <Card.Text>
    {this.props.popularity}
    </Card.Text>
    <Card.Text>
    {this.props.released_on}
    </Card.Text>
    
  </Card.Body>
</Card> */}

 <Container>
<Row xs={3} md={4} className="g-4">
  
    
    
    
    <Col>
      <Card>
        <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/original/${this.props.image_ur}`} />
        <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
    <Card.Text>
    {this.props.overview}
    </Card.Text>
    <Card.Text>
    <Card.Title>Average Votes</Card.Title>
    {this.props.average_votes}
    </Card.Text>
    <Card.Text>
    <Card.Title>popularity</Card.Title>
    {this.props.popularity}
    </Card.Text>
    <Card.Text>
    <Card.Title>released_on</Card.Title>
    {this.props.released_on}
    </Card.Text>
        </Card.Body>
      </Card>
   
   
   
    </Col>
  
</Row>
</Container>
    
    
    
    </>;
  }
}
export default Movie;
