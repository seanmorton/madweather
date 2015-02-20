$(function() {

  setTimeout(function() { location.reload(); }, 15*60*1000);
  getCurrentConditions();
  getForecast();
  setupWindAlert();
  cycleAOSCams();

});

$(window).resize(function() {
  setTimeout(setupWindAlert, 1000);
});

function getCurrentConditions() {
  
  var url = "http://api.wunderground.com/api/6e9aa946c05091e4/conditions/q/WI/Madison.json"

  $.getJSON(url, function(json) {
    var loc = json.current_observation.display_location.full 
    var icon = "./images/icons/" + json.current_observation.icon + ".png";
    var wun_icon = json.current_observation.image.url;
    var temp = Math.round(json.current_observation.temp_f) + "&degF"; 
    var desc = json.current_observation.weather
    var wind = json.current_observation.wind_dir + " " +  Math.round(json.current_observation.wind_mph) + "/" + Math.round(json.current_observation.wind_gust_mph) + " MPH";
    var windchill = "windchill: " + Math.round(json.current_observation.windchill_f) + "&degF";
    var visibility = "visibility: " + json.current_observation.visibility_mi + " miles";
    var precipitation = "precipitation " + json.current_observation.precip_today_in + " in";
    var humidity = "humidity: " + json.current_observation.relative_humidity;
    var updated = "updated: " + json.current_observation.observation_time.slice(-12, -4);

    $("#location").html(loc); 
    $("#icon").attr("src", icon);
    $("#temp").html(temp);
    $("#desc").html(desc.toLowerCase());
    $("#wind").html(wind);
    $("#windchill").html(windchill);
    $("#visibility").html(visibility);
    $("#precipitation").html(precipitation);
    $("#humidity").html(humidity);
    $("#updated").html(updated);
    $("#wunderground").attr("src", wun_icon);
  }); 
}



function getForecast() {

  var url = "http://api.wunderground.com/api/6e9aa946c05091e4/forecast/q/WI/Madison.json"

  $.getJSON(url, function(json) {
    for (i = 0; i < 4; i++) {
      var day = json.forecast.simpleforecast.forecastday[i].date.weekday;
      var icon = "./images/icons/" + json.forecast.simpleforecast.forecastday[i].icon + ".png";
      var high = Math.round(json.forecast.simpleforecast.forecastday[i].high.fahrenheit) + "&degF";
      var low = Math.round(json.forecast.simpleforecast.forecastday[i].low.fahrenheit) + "&degF";
      var desc = json.forecast.simpleforecast.forecastday[i].conditions;
      var pop = "precipitation: " + json.forecast.simpleforecast.forecastday[i].pop + "%";
      var snow = json.forecast.simpleforecast.forecastday[i].snow_allday.in;
      if (snow > 0)
        pop += " (" + snow + "in)";

      if (i == 0) {
        $("#" + i + "-day").html("Today"); 
      } else {
        $("#" + i + "-day").html(day); 
      }
      $("#" + i + "-icon").attr("src", icon);
      $("#" + i + "-temp").html(high + " / " + low); 
      $("#" + i + "-desc").html(desc.toLowerCase()); 
      $("#" + i + "-pop").html(pop); 
    }
  });
}

function setupWindAlert() {
  var widget = $("#windalert");
  var parentWidth = widget.parent().width();
  var url = "http://widgets.windalert.com/widgets/web/forecastTable?spot_id=1200&units_wind=mph&units_height=ft&units_temp=F&days=4&width=" + parentWidth + "&height=195&color=870100&app=windalert";
  
  widget.attr("src", url)
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
