"use strict"

function showForecast() {
    let element = document.getElementById("forecast");
    element.classList.add("showForecast");
}

function hideForecast() {
    let element = document.getElementById("forecast");
    element.classList.remove("showForecast");
    element.classList.add("hideForecast");
    setTimeout(function() {element.classList.remove("hideForecast");}, 1000);
}
let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
		}
		
		// document.getElementById('img-holder').src = newImage.src;
		// document.getElementById('img-holder').style.display ='inline';
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		let newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}

getTenImages();

let image_counter = 0; 
function change_image(){
	document.getElementById("img-holder").src = imageArray[image_counter%10].src;
	image_counter++;
}

let timelapse = setInterval(change_image, 500);

