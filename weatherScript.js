
$(document).ready(function(){
var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});
      google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace();
      });
$("#run-search").on("click", function(){
  event.preventDefault();
  var finalLoc = $("#autocomplete").val();
  $("#weatherGif").removeClass("invisible");
  $("#anid").removeClass("invisible");
  console.log(finalLoc);
  loadLocation(finalLoc);
});

console.log($("#result").text());
function loadLocation(Location) {

  localStorage.setItem("previousLocation",Location);
  
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=67f7b70a57885cc5e9a93ac4280e436f`,
      }).done(function(theWeather) {
        var data = theWeather;
        // Sets result div text to the city name
        $("#result").text(data.name + " ");
        // Sets the weather result div text to the weather description
        $("#resultWeather").text(data.weather[0].description + " ");
        // Sets main result text to the temperature
        $("#resultTemp").text(((data.main.temp - 273.15) * 9/5 + 32).toFixed(2) + " °F ");
        // Sets wind result text to the wind speed
        $("#resultWind").text(data.wind.speed + " MPH ");
        // Shows response
        console.log(data);
      });
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${Location}&appid=67f7b70a57885cc5e9a93ac4280e436f`,
      }).done(function(forecast) {
        var set = forecast;
        // Sets result div text to the city name
        for(var i=1; i++; i<7){
        $("#f"+i).text(set.list[i].dt_txt);
        $("#f"+i+"w").text(set.list[i]);
      }
      
        // Sets the weather result div text to the weather description
        
        // Sets main result text to the temperature
       // $("f2w").text(((set[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + " °F ");
        // Sets wind result text to the wind speed
        $("#resultWind").text(" MPH ");

        $("#inv2").removeClass("invisible");
      
        console.log(forecast.list[0]);
      });



      // Set one second delay on second API to give the first API time to update after the search
      setTimeout(() => {  
        $.ajax({
          url: "https://api.giphy.com/v1/gifs/search?api_key=fbIf1ckwS6OC3tiJr1DgcpOH3SHQcgT1&limit=1&offset=0&rating=G&lang=en&q=" + $("#resultWeather").text().trim().replace(/\s+/g, '-'),
        }).done(function(gifTest) {
          var gifData = gifTest;
          // Setting weather gif source to gif url
          $("#weatherGif").attr("src", gifData.data[0].images.original.url);
          // Setting alt to Weather-image
          $("#weatherGif").attr("alt", "Weather-image");
          // Can check the source here
          console.log(gifData.data[0].images.original.url);
          // Can check the url request here
          console.log("https://api.giphy.com/v1/gifs/search?api_key=fbIf1ckwS6OC3tiJr1DgcpOH3SHQcgT1&limit=1&offset=0&rating=G&lang=en&q=" + $("#resultWeather").text().trim().replace(/\s+/g, '-'));
        });
        var newbtn = document.createElement("BUTTON");
        newbtn.innerHTML = Location;
        newbtn.id = Location;
        newbtn.addEventListener("click",function(){
          event.preventDefault();
          var finalLoc = Location;
          $("#weatherGif").removeClass("invisible");
          $("#anid").removeClass("invisible");
          console.log(finalLoc);
          loadLocation(finalLoc);})
        document.body.appendChild(newbtn);

      }, 
      
      1000);
      
             
};
var prevloc = localStorage.getItem("previousLocation");



});