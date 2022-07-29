    //GETTING THE ELEMENTS FROM THE DOM
    let tempLocation = document.querySelector(".tempLocation");
    let tempDegreed = document.querySelector(".tempDegree");
    let tempDesc = document.querySelector(".tempDesc");
    let iconElemd = document.querySelector("#iconElem")

    const weather = {};

    weather.temperature = {
        unit: "celcius"
    }

    const KELVIN = 273; 
    const key = "0d51b31beffbfc0524b8829602f3ce4e";

    // CHECK IF USER SUPPORTS GEOLOCATION

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    }else{
        console.log("Not working")
    }

    //SETTING USER POSITION
    function setPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }

    function showError(error){
        alert("You need to accept that!!!")
    }

    function getWeather(latitude, longitude){
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        console.log(api)
        fetch(api)
            .then(function(response){
                let data = response.json();
                return data;
            })
            .then(function(data){
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country; 
            })
            .then(function(){
                displayWeather();
            })
    }

    //DISPLAY WEATHER TO UI

    function displayWeather(){
        iconElemd.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempDegreed.innerHTML = `${weather.temperature.value}<span style="color: #f6a71c; font-size: 28px;"><sup>&#176;C</sup></span>`
        tempDesc.innerHTML = weather.description;
        tempLocation.innerHTML = `${weather.city}, ${weather.country}, `
    }


    //ADDED SOME STYLINGS
    // tempDegreed.style.color = "#f6a71c"
    //CONVERT TO FAHRENHEIT

    function celsiusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    }

    //WHEN USER CLICKS ON THE DEGREE
    tempDegreed.addEventListener('click', function(){
        if(weather.temperature.value === undefined) return;

        if(weather.temperature.unit == "celsius"){
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);

            tempDegreed.innerHTML = `${fahrenheit}<span style="color: #f6a71c; font-size: 28px;"><sup>&#176;F</sup></span>`;
            weather.temperature.unit = "fahrenheit";
        }else{
            tempDegreed.innerHTML = `${weather.temperature.value}<span style="color: #f6a71c; font-size: 28px;"><sup>&#176;C</sup></span>`;
            weather.temperature.unit = "celsius"
        }
    })




    //CHECKING AND ADDING DATE

    let dae = new Date()
    console.log(dae)