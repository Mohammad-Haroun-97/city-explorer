import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Img from "react-bootstrap/Image";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./component/Weather";
import Movie from "./component/Movie";


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
      moviesShow:false,

      // dailyData: false,
      
      // renderedLocWeatherData:[],
     fixedWeatherDataItem : [],
     moviesArray : [],
    };
  }

  getLocationinfo = async (event) => {
    event.preventDefault();

    let selectCity = event.target.userInput.value;

    // let serverRoute = process.env.REACT_APP_SERVER;

    const url = `https://eu1.locationiq.com/v1/search.php?key=pk.43fed3791d35ddb76aa14f749c6d3080&q=${selectCity}&format=json`;

    try {
      let collectedData = await axios.get(url);
      // console.log(collectedData.data);

      this.setState({
        lat: collectedData.data[0].lat,
        long: collectedData.data[0].lon,
        placeName: collectedData.data[0].display_name,
        mapImg: true,
        locationErr :false,
        // errMassege: false,
        // showWeather :true,
      });
    } catch {
      console.log("err");
      this.setState({
        locationErr: true,
        mapImg: false,
      });
    }



    try{
    let observed = `https://lab08-city-api.herokuapp.com/weather?city=${selectCity}&key=e2c95883c34745f58ae63470e722f634`;

    let finalData= await axios.get(observed);
    if (finalData.data !== 'Error, please enter a valid Data') {
      this.setState({

        fixedWeatherDataItem: finalData.data,
        showWeather :true,
        weatherError : false,
      })
      console.log(this.state.showWeather);
    
    }else{
      this.setState({
        showWeather :false,
        weatherError : true,
        
      });


    }

      
    }
    
     
  catch {
    
    this.setState({
      showWeather :false,
      weatherError : true,
      
    });
    console.log('hello');
  }


  try{

    const moviesData=`https://lab08-city-api.herokuapp.com/movies?api_key=1742e55e6961c331f1b0e9a8c7b098f1&query=${selectCity}`

    let frontMovieData= await axios.get(moviesData)
    console.log(frontMovieData);
    if (frontMovieData.data !== 'Error!, you are in catch side') {
      
    
    this.setState({


      moviesArray : frontMovieData.data,
      moviesShow : true,

    })
  }
  else{
    this.setState({
      moviesShow : false,
    })
    

  }

    
  }

  catch{
    this.setState({
      moviesShow : false,
    })
    


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

        {this.state.mapImg &&(

        <div style={{ textAlign: "center" }}>
          <p>Display name : {this.state.placeName}</p>
          <p>Lat : {this.state.lat}</p>
          <p>Lon : {this.state.long}</p>
        </div>
         )}

        {this.state.mapImg && (
          <Img
            style={{ marginLeft: "29rem" }}
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.long}&size=400x400`}
          />
        )}

        {this.state.errMassege && (
          
            <Card.Body>Error, The city Center is not valid</Card.Body>
          
        )}

{this.state.locationErr && (
          
          <Card.Body>Error, The city that you inserted is not valid</Card.Body>
        
      )}




{this.state.showWeather &&( this.state.fixedWeatherDataItem.map((element) => {
              return (<Weather
              date={element.date}
                description={element.description}
                
              />
              )
            }))}

            {this.state.weatherError&&(
              <Card.Body></Card.Body>


            )}



{this.state.moviesShow &&( this.state.moviesArray.map((element) => {
              return (<Movie 
                
                image_ur={element.image_ur}
                title={element.original_title}
                overview={element.overview}
                average_votes={element.average_votes}
                popularity={element.popularity}
                released_on={element.released_on}
                
              />
              )
            }))}




            

      </>
    );
  }
}

export default App;
