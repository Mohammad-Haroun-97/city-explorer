import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Img from 'react-bootstrap/Image'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component{

constructor(props){
  super(props)

  

  this.state={
    lat :'',

    long : '',

    placeName : '',
    
    errMassege:false,
    mapImg:false,

  }
}

getLocationinfo= async (event)=>{
  event.preventDefault();

const placeName=event.target.placeName.value
const key= 'pk.4e47bf6d397576710acc509953c29e71'
const url=`https://api.locationiq.com/v1/autocomplete.php?key=${key}&q=${placeName}`

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
}

render(){
  return(

   





    <>
    
    <h1 style={{ padding: 25 }}>Get Your Location Now</h1>
    <div style={{textAlign:'center'}}>
       <Form onSubmit={this.getLocationinfo}>
         
         <input type='text' name="placeName"  />
         <Button style={{ marginLeft: 60}} style={{backgroundColor: '#B61919' }} type='submit' > Get Location</Button>
       </Form>
       </div>
   
   
   <div style={{textAlign:'center'}} >
       <p>Display name : {this.state.placeName}</p>
         <p>Lat : {this.state.lat}</p>
         <p>Lon : {this.state.long}</p>
         </div>
   
   
        {  this.state.mapImg && <Img   style={{ marginLeft:'15rem' }} src={`https://maps.locationiq.com/v3/staticmap?key=pk.4e47bf6d397576710acc509953c29e71&center=${this.state.lat},${this.state.long}&size=400x400`} />}
   
        {this.state.errMassege && <p>You Have an Error</p>}
         
   
   
       </>
     )
   }
   
   }
   
   export default App