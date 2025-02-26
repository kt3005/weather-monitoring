const weatherApi = {
    key: "bd37876f472bee7f1339f7a7d13bec8c",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {   //display text only when enter is pressed.
    
    if(event.keyCode == 13) {        //enter ascii
        console.log(searchInputBox.value);   //for display of searched place
        getWeatherReport(searchInputBox.value);  //passing value to getweatherreport.
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    //api.openweathermap.org/data/2.5/weather?q=(city name)&appid=(your api key)
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  //fetching data from api
    .then(weather => {
        return weather.json();   //api returns data in json,xml and html format.
    }).then(showWeatherReport);   //function call which shows details on user interface.
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);  //display.

    let city = document.getElementById('city');    //for place and country
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');  //for temperature
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; //math.round for integer value.

    let minMaxTemp = document.getElementById('min-max');  //min max temp.
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');   //weather type. for ex: cloudy,sunny etc.
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');   //for date
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);   //function call

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        let bg = document.getElementById('input-id'); 
        console.log(style="color:red");   
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/clouds.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/haze.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];   //array

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}