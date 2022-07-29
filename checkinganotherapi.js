window.addEventListener('load', ()=>{
    let long = 36.7783;
    let lat = 119.4179;

    //GETTING THE ELEMENTS FROM THE DOM
    let tempLocation = document.querySelector(".tempLocation")
    let tempDegree = document.querySelector(".tempDegree")
    let tempDesc = document.querySelector(".tempDesc")

    const weather = {};
    weather.temperature = {
        unit: "celcius"
    }
    const KELVIN = 273;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const key = "074ec377da0b4eb78e4c32330392aeed"
            const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}524901&appid=${key}`;
            console.log(api);
            fetch(api)
            .then(response =>{
                let data = response.json();
                console.log(data);
                return data;
            })
            .then(function(data){
                console.log(data);
                if (data.main) {weather.temperature.value = Math.floor(data.main.temp - KELVIN)
                weather.description = data.weather[0].icon;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
        }})
            .then(()=>{
                displayWeather()
            })
        });
    }

    //DISPLAYING THE WEATHER TO THE Ui
    function displayWeather(){
        // tempDegree.innerHTML = `${weather.temperature.value}<p>&#176; <span>C</span></p>`
    }
}); 