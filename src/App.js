import React from 'react'
import axios from 'axios'


class App extends React.Component{

constructor(props){
  super(props)

  this.state={
    lat :'',

    long : '',

    placeName : '',

  }
}

getLocationinfo= async (event)=>{
  event.preventDefault();

const placeName=event.target.placeName.value
const key= 'pk.4e47bf6d397576710acc509953c29e71'
const url=`https://api.locationiq.com/v1/autocomplete.php?key=${key}&q=${placeName}`

let collectedData= await axios.get(url);
console.log(collectedData.data);


this.setState({
  lat:collectedData.data[0].lat,
  long:collectedData.data[0].lon,
  placeName:collectedData.data[0].display_name,

})

}

render(){
  return(

    <>

    <form onSubmit={this.getLocationinfo}>
      
      <input type='text' name="placeName"  />
      <button type='submit' > Get Location</button>
    </form>



    <p>Display name : {this.state.placeName}</p>
      <p>Lat : {this.state.lat}</p>
      <p>Lon : {this.state.long}</p>


    </>
  )
}

}

export default App