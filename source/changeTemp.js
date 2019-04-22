"strict mode";

let object = undefined;
let title = undefined;
let currTemp = undefined;


// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

   let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Dixon,CA,US&units=imperial&APPID=a52110d5e31471d863d8f80d31d79cf1"

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
makeCorsRequest();

function newRequest() {
  // title = document.getElementById("city").value;
  let icon = document.getElementById("icon1");
  	icon.src="assets/clearsky.svg"

  for( let i =0 ; i< 5 ; i++){
   currTemp = object.list[i].main.temp;
  
    document.getElementById("temp"+i).textContent = Math.round(currTemp);
  }


 for( let i =0 ; i< 5 ; i++){
    let icon = document.getElementById("icon"+i);

    // console.log(icon)
  if(object.list[i].weather[0].description == "Clouds"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/brokencloud.svg"
  }
  else if(object.list[i].weather[0].description == "clear night"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/clear-night.svg"
  }
   else if(object.list[i].weather[0].description == "clear day"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/clearsky.svg"
  }
   else if(object.list[i].weather[0].description == "few clouds day"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/fewclouds-day.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/fewclouds-night.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/mist.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/rain-day.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/rain-night.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/scatteredclouds.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/showerrain.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/snow.svg"
  }
   else if(object.list[i].weather[0].description == "clear sky"){
    icon = document.getElementById("icon"+i);
    icon.src = "assets/thunderstorms.svg"
  }
  } // end for
}