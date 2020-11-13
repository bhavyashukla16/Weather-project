const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extented: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apikey = "0e8cefff7d23231466cb4ad8278711b2";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apikey +"&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageUrl= "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      res.render("weather", {cityname : query});
      // res.render("weather", {temperature : temp});
      res.render("weather", {weatherDes : weatherDescription});
      // res.render("weather", {image : imageUrl});




    })
  })
})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
