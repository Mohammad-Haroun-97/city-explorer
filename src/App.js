import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Img from "react-bootstrap/Image";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./component/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      long: "",
      placeName: "",
      errMassege: false,
      mapImg: false,
      showWeather: false,
      weatherErr: "",
      // renderedLocWeatherData:[],
     fixedWeatherDataItem : [],
    };
  }

  getLocationinfo = async (event) => {
    event.preventDefault();

    let selectCity = event.target.userInput.value;

    // let serverRoute = process.env.REACT_APP_SERVER;

    const url = `https://eu1.locationiq.com/v1/search.php?key=pk.43fed3791d35ddb76aa14f749c6d3080&q=${selectCity}&format=json`;

    try {
      let collectedData = await axios.get(url);
      console.log(collectedData.data);

      this.setState({
        lat: collectedData.data[0].lat,
        long: collectedData.data[0].lon,
        placeName: collectedData.data[0].display_name,
        mapImg: true,
        errMassege: false,
      });
    } catch {
      console.log("err");
      this.setState({
        errMassege: true,
        mapImg: false,
      });
    }

    try{
    let weatherData = `${process.envREACT_APP_URL}/weather?searchQuery=${selectCity}`;

    let finalData= await axios.get(weatherData);
    this.setState({

      fixedWeatherDataItem:finalData.data,
      showWeather :true,
    })
  }
  catch {
    
    this.setState({
      showWeather :false,
    });
  }


  }





    // try {

    //   const weatherData = `http://api.weatherbit.io/v2.0/forecast/daily?city=${selectCity}&key=e2c95883c34745f58ae63470e722f634&format=json`;

    //   let frontWeatherData = await axios.get(weatherData);

    //     this.setState({
    //       renderedLocWeatherData: frontWeatherData.data,
    //       // showWeather: true,

    //     })

    // }
    // catch(error) {
    //   this.setState({
    //     renderedLocWeatherData: error.response,
    //     // showWeather: false,

    //   })

    // }
  

  render() {
    return (
      <>
        <h1 style={{ padding: 25 }}>Get Your Location Now</h1>
        <div style={{ textAlign: "center" }}>
          <Form onSubmit={this.getLocationinfo}>
            <input type="text" name="userInput" />
            <Button
              style={{ marginLeft: 60 }}
              style={{ backgroundColor: "#B61919" }}
              type="submit"
            >
              {" "}
              Get Location
            </Button>
          </Form>
        </div>

        <div style={{ textAlign: "center" }}>
          <p>Display name : {this.state.placeName}</p>
          <p>Lat : {this.state.lat}</p>
          <p>Lon : {this.state.long}</p>
        </div>

        {this.state.mapImg && (
          <Img
            style={{ marginLeft: "29rem" }}
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.long}&size=400x400`}
          />
        )}

        {this.state.errMassege && (
          <Card>
            <Card.Body>Error, The city Center is not valid</Card.Body>
          </Card>
        )}


{this.state.showWeather &&
        <Weather weatherData={this.state.fixedWeatherDataItem} ></Weather>}




        {/* <div> */}
        {/* {
              this.state.renderedLocWeatherData.map((weather) => {
                return (
                  <div>
                    <p>{weather.date}</p>
                    <p>{weather.description} </p>
                  </div>
                );
              })} */}
        {/* </div> */}
      </>
    );
  }
}

export default App;
