"use strict"

let object = undefined;
let title = undefined;
let currTemp = undefined;
let newCity = undefined;
let currTime = undefined;
let today = new Date();
const sacLat = 38.5816; 
const sacLon = -121.4944;

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function getCity(){
	newCity = document.getElementById("searchBar");
	console.log(newCity.value);
	makeCorsRequest(newCity.value);
	return false;
};

// Make the actual CORS request.
function makeCorsRequest(city) {

	let url = " ";

	if( isNaN( city[0]) ){
     	url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="+ city +",CA,US&units=imperial&APPID=a52110d5e31471d863d8f80d31d79cf1"
	}
	else{
		url = "http://api.openweathermap.org/data/2.5/forecast/hourly?zip="+ city +",US&units=imperial&APPID=a52110d5e31471d863d8f80d31d79cf1"
	}
  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      object = JSON.parse(responseStr);  // turn it into an object
      newRequest()
      //document.getElementById()
      //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed 
// makeCorsRequest();

function newRequest() {
  //
  let cityLat = object.city.coord.lat;
  let cityLon = object.city.coord.lon;

  if (distance(sacLat, sacLon, cityLat, cityLon, 'M') <= 150){
	  for( let i =0 ; i< 6 ; i++){
	   currTemp = object.list[i].main.temp;
	  
	    document.getElementById("temp"+i).textContent = Math.round(currTemp)+"\u00b0";
	  }

	  for( let i =0 ; i< 6 ; i++){

		 let time = today.getHours()+i; //+ ":00";
		 if(time >= 24){
			 time -= 24;
		 }

	   if(i == 0 ){
		   if( time > 12){
		   	time = time - 12;
		   	document.getElementById("hour"+i).textContent = time +" PM" ;
		   }
		   else{
		   	document.getElementById("hour"+i).textContent = time +" AM" ;
		   }
		}
		else{
	 		if( time > 12){
		   	time = time - 12;
		   	document.getElementById("hour"+i).textContent = time +":00 PM" ;
		   }
		   else{
		   	document.getElementById("hour"+i).textContent = time +":00 AM" ;
		   }
		}
	   
	  }


	 for( let i = 0 ; i < 7 ; i++){
	    let weatherIcon = document.getElementById("icon"+i);

	    // console.log(icon)
	  if(object.list[i].weather[0].icon == "04d" || object.list[i].weather[0].icon == "04n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/brokencloud.svg"
	  }
	  else if(object.list[i].weather[0].icon == "01n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/clear-night.svg"
	  }
	   else if(object.list[i].weather[0].icon == "01d"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/clearsky.svg"
	  }
	   else if(object.list[i].weather[0].icon == "02d"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/fewclouds-day.svg"
	  }
	   else if(object.list[i].weather[0].icon == "02n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/fewclouds-night.svg"
	  }
	   else if(object.list[i].weather[0].icon == "50d" || object.list[i].weather[0].icon == "50n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/mist.svg"
	  }
	   else if(object.list[i].weather[0].icon == "10d"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/rain-day.svg"
	  }
	   else if(object.list[i].weather[0].icon == "10n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/rain-night.svg"
	  }
	   else if(object.list[i].weather[0].icon == "03d" || object.list[i].weather[0].icon == "03n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/scatteredclouds.svg"
	  }
	   else if(object.list[i].weather[0].icon == "09d" || object.list[i].weather[0].icon == "09n"){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/showerrain.svg"
	  }
	   else if(object.list[i].weather[0].icon == "13d" || object.list[i].weather[0].icon == "13n" ){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/snow.svg"
	  }
	   else if(object.list[i].weather[0].icon == "11d" || object.list[i].weather[0].icon == "11n" ){
	    weatherIcon = document.getElementById("icon"+i);
	    weatherIcon.src = "assets/thunderstorms.svg"
	  }
	  } // end for

 } // end if
 else{
 	window.alert("Not found");
 }

  // function setTime
 //  for(let i = 0; i < 6; i++){

 //  	currTime = object.list[i].dt_txt;
 //  	currTime = currTime.split(' ');
 //  	let time = currTime[1].split(":");  
	
	// }// end for
}

// code from geoDataSource.com
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}