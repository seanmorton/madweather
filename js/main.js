$(function() {

  // hard code to Madison for now
  var lat = "43.14";
  var lon = "-89.35";

  setInterval(getCurrentConditions(lat, lon), 900000);
  setInterval(getForecast(lat, lon), 900000);

});

function getCurrentConditions(lat, lon) {
  
  var url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&mode=js&lat=" + lat + "&lon=" + lon;

  $.getJSON(url, function(json) {
    var loc = json.name + ", " + json.sys.country;
    var icon = json.weather[0].icon + ".png";
    var temp = Math.round(json.main.temp) + "&degF"; 
    var desc = "wow " + json.weather[0].description;
    var wind = windDir(json.wind.deg) + " " +  Math.round(json.wind.speed) + " MPH";

    $("#location").html(loc); 
    $("#icon").attr("src", "./images/icons/" + icon);
    $("#temp").html(temp);
    $("#desc").html(desc.toLowerCase());
    $("#wind").html(wind);
  }); 
}

function getForecast(lat, lon) {

  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&mode=js&lat=" + lat + "&lon=" + lon;
  var today = new Date();
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

  $.getJSON(url, function(json) {
    for (i = 0; i < 5; i++) {
      var icon = json.list[i].weather[0].icon + ".png";
      var high = Math.round(json.list[i].temp.max) + "&degF";
      var low = Math.round(json.list[i].temp.min) + "&degF";
      var desc = json.list[i].weather[0].description;

      $("#" + i + "-day").html(weekdays[(today.getDay() + i) % 7]); 
      $("#" + i + "-icon").attr("src", "./images/icons/" + icon);
      $("#" + i + "-temp").html(high + " / " + low); 
      $("#" + i + "-desc").html(desc.toLowerCase()); 
    }
  });
}

function windDir(deg) {
  if (deg >= 337.5 || deg < 22.5) {
    return "N";
  } else if (deg >= 22.5 && deg < 67.5) {
    return "NE";
  } else if (deg >= 67.5 && deg < 112.5) {
    return "E";
  } else if (deg >= 112 && deg < 157.5) {
    return "SE";
  } else if (deg >= 157.5 && deg < 202.5) {
    return "S";
  } else if (deg >= 202.5 && deg < 247.5) {
    return "SW";
  } else if (deg >= 247.5 && deg < 292.5) {
    return "W";
  } else if (deg >= 292.5 && deg < 337.5) {
    return "NW";
  }
}

