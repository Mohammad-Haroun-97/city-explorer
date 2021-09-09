import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Img from 'react-bootstrap/Image'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Weather from './component/weather';




class App extends React.Component{

constructor(props){
  super(props)

  

  this.state={
    lat :'',
    long : '',
    placeName : '',
    errMassege:false,
    mapImg:false,
    showWeather: false,
    weatherErr: '',
    renderedLocWeatherData:[],

  }
}

getLocationinfo= async (event)=>{
  event.preventDefault();

const placeName=event.target.cityName.value
const REACT_APP_KEY= 'pk.43fed3791d35ddb76aa14f749c6d3080'
const url=`https://api.locationiq.com/v1/autocomplete.php?key=${REACT_APP_KEY}&q=${placeName}`

let serverRoute=process.env.REACT_APP_SERVER
let weatherData = `https://new-cit-api-haroun.herokuapp.com/weather?searchQuery=${placeName}`;

try{
let collectedData= await axios.get(url);
console.log(collectedData.data);


this.setState({
  lat:collectedData.data[0].lat,
  long:collectedData.data[0].lon,
  placeName:collectedData.data[0].display_name,
  mapImg:true,

  errMassege:false,

})

}


catch
{
  console.log('err');
  this.setState({
    errMassege: true
  })
}


try {
  let frontWeatherData = await axios.get(weatherData);
  
    this.setState({
      renderedLocWeatherData: frontWeatherData  ,
      showWeather: true,
      
    })
  
}
catch {
  this.setState({
    weatherErr: 'sorry , no weather data availabe for your location',
    showWeather: false,
    

  })

}
}

render(){
  return(

    <>
    
    <h1 style={{ padding: 25 }}>Get Your Location Now</h1>
    <div style={{textAlign:'center'}}>
       <Form onSubmit={this.getLocationinfo}>
         
         <input type='text' name="cityName"  />
         <Button style={{ marginLeft: 60}} style={{backgroundColor: '#B61919' }} type='submit' > Get Location</Button>
       </Form>
       </div>
   
   
   <div style={{textAlign:'center'}} >
       <p>Display name : {this.state.placeName}</p>
         <p>Lat : {this.state.lat}</p>
         <p>Lon : {this.state.long}</p>
         </div>
   
   
        {  this.state.mapImg && <Img   style={{ marginLeft:'29rem' }} src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.long}&size=400x400`} />}
   
        {/* {this.state.errMassege && <p>You Have an Error</p>} */}

        <div>
            {
              this.state.renderedLocWeatherData.map((weather) => {
                return (
                  <div>
                    <p>{weather.date}</p>
                    <p>{weather.description} </p>
                  </div>
                );
              })}
          </div>

          

       </>
     )
   }
   
   }
   
   export default App