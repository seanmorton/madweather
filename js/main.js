$(function() {

  setInterval(getCurrentConditions(), 900000);
  setInterval(getForecast(), 900000);
  cycleAOSCams();

});

function getCurrentConditions() {
  
  var url = "http://api.wunderground.com/api/6e9aa946c05091e4/conditions/q/WI/Madison.json"

  $.getJSON(url, function(json) {
    var loc = json.current_observation.display_location.full 
    var icon = json.current_observation.icon_url
    var temp = Math.round(json.current_observation.temp_f) + "&degF"; 
    var desc = json.current_observation.weather
    var wind = json.current_observation.wind_dir + " " +  Math.round(json.current_observation.wind_mph) + "/" + Math.round(json.current_observation.wind_gust_mph) + " MPH";
    var windchill = "windchill: " + Math.round(json.current_observation.windchill_f) + "&degF";
    var visibility = "visibility: " + json.current_observation.visibility_mi + " miles";
    var updated = "updated: " + json.current_observation.observation_time.slice(-12, -4);

    $("#location").html(loc); 
    $("#icon").attr("src", icon);
    $("#temp").html(temp);
    $("#desc").html(desc.toLowerCase());
    $("#wind").html(wind);
    $("#windchill").html(windchill);
    $("#visibility").html(visibility);
    $("#updated").html(updated);
  }); 
}



function getForecast() {

  var url = "http://api.wunderground.com/api/6e9aa946c05091e4/forecast/q/WI/Madison.json"

  $.getJSON(url, function(json) {
    for (i = 0; i < 4; i++) {
      var day = json.forecast.simpleforecast.forecastday[i].date.weekday;
      var icon = json.forecast.simpleforecast.forecastday[i].icon_url;
      var high = Math.round(json.forecast.simpleforecast.forecastday[i].high.fahrenheit) + "&degF";
      var low = Math.round(json.forecast.simpleforecast.forecastday[i].low.fahrenheit) + "&degF";
      var desc = json.forecast.simpleforecast.forecastday[i].conditions;
      var pop = "precipitation: " + json.forecast.simpleforecast.forecastday[i].pop + "%";

      $("#" + i + "-day").html(day); 
      $("#" + i + "-icon").attr("src", icon);
      $("#" + i + "-temp").html(high + " / " + low); 
      $("#" + i + "-desc").html(desc.toLowerCase()); 
      $("#" + i + "-pop").html(pop); 
      
    }
  });
}

function cycleAOSCams() {
  var cameras = ["north", "east", "south", "west", "northwest"];
  var i = 0;

  setInterval(function() {
    url= "http://f5.aos.wisc.edu/webcam_movies/latest_" + cameras[i] + "_320x240.jpg"
    $("#aos").attr("src", url);
    i = (i + 1) % 5;
  }, 3000);
}
