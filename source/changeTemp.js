"strict mode";

let object = undefined;
let title = undefined;
let currTemp = undefined;
let newCity = undefined;

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
	makeCorsRequest(newCity);
};

// Make the actual CORS request.
function makeCorsRequest(city) {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="+city+",CA,US&units=imperial&APPID=a52110d5e31471d863d8f80d31d79cf1"

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

  for( let i =0 ; i< 6 ; i++){
   currTemp = object.list[i].main.temp;
  
    document.getElementById("temp"+i).textContent = Math.round(currTemp);
  }


 for( let i =0 ; i< 7 ; i++){
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

  // function setTime
}

