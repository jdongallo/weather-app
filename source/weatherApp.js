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