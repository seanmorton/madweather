$(document).ready(function() {

  var lat = "43.14";
  var lon = "-89.35";
  var url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&mode=js&lat=" + lat + "&lon=" + lon;

  $.getJSON(url, function(json) {
    var loc = json.name + ", " + json.sys.country;
    var temp = Math.round(json.main.temp) + "&degF"; 
    var desc = "wow " + json.weather[0].description;
    var wind = Math.round(json.wind.speed) + " MPH " + windDir(json.wind.deg);

    $("#location").html(loc); 
    $("#temp").html(temp);
    $("#desc").html(desc);
    $("#wind").html(wind);
  }); 

  url = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&mode=js&lat=" + lat + "&lon=" + lon;

  var today = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  $.getJSON(url, function(json) {
    for (i = 0; i < 5; i++) {
      var temp = Math.round(json.list[i].temp.day) + "&degF";
      var desc = "such " + json.list[i].weather[0].description;

      $("#" + i + "-day").html(weekday[(today.getDay() + i) % 7]); 
      $("#" + i + "-temp").html(temp); 
      $("#" + i + "-desc").html(desc); 
    }
  });
});

function KtoF(temp) {
  return Math.round((temp - 273.15) * 9 / 5 + 32); 
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

