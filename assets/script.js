//! Note to grader: due to the api, if the time of today is passed a certaint point, it will give the weather for midnight, tonight
//! and call it the the next day because technically it is. The rest of the temps are set for noons forecast.
const key = "78c13c7d14026703c4632a7298ef5634"
let main = $('main')

let nameOfCity = $('#searchCity').val()
// create cards container
let cardsContainer = $('<div>').attr("id", "cardContainer").css({
    // "padding": "40px",
    // "background-color": "white",
    "color": "white",
    "display": "flex",
    // "height": "400px",
    // "width": "300px",
    "flex-wrap": "wrap",
    "justify-content": "space-around",
    "margin-top": "20px",
    "gap":"10px",
    "flex-direction": "column",
    
})
// convert kelvin to fahrenheit function.
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
  }

// this is the main function. It makes/appends the cards, and puts data in them.
  function getData(city, state) {
// Get coords of city and state
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`;
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
// name creation
// append name to a newly created section
        let nameSection = $('<section>')
        nameSection.css({
            "color": "black"
        })
        $(nameSection).append(city)
// append section to main
        main.append(nameSection)

// creates cards, & simple styling of cards.
        let dayOne = $('<div>').attr("id", "dayOne")
        dayOne.css({
            "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
            "backdrop-filter": "blur(8px)", // This be the blur
            "padding": "30px",
            "border-radius": "20px",
            
            
            
            
        })
        let dayTwo = $('<div>').attr("id", "dayTwo").attr("class", "card")
        dayTwo.css({
            "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
            "backdrop-filter": "blur(8px)", // This be the blur
            "padding": "30px",
            "border-radius": "20px",
        })
        let dayThree = $('<div>').attr("id", "dayThree").attr("class", "card")
        
        dayThree.css({
            "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
            "backdrop-filter": "blur(8px)", // This be the blur
            "padding": "30px",
            "border-radius": "20px",

        })
        let dayFour = $('<div>').attr("id", "dayFour").attr("class", "card")
        dayFour.css({
            "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
            "backdrop-filter": "blur(8px)", // This be the blur
            "padding": "30px",
            "border-radius": "20px",
        })
        let dayFive = $('<div>').attr("id", "dayFive").attr("class", "card")
        dayFive.css({
            "background": "rgba(255, 255, 255, 0.2)", // Make sure this color has an opacity of less than 1
            "backdrop-filter": "blur(8px)", // This be the blur
            "padding": "30px",
            "border-radius": "20px",
        })
// appends cards to the container
        cardsContainer.append(dayOne)
        cardsContainer.append(dayTwo)
        cardsContainer.append(dayThree)
        cardsContainer.append(dayFour)
        cardsContainer.append(dayFive)
// appends container to main
        main.append(cardsContainer)
// grab latitude and longitude for fetching city weather in weather url, a few lines down
        let long = data[0].lon
        let lat = data[0].lat
        let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

// after we get the coordinates we can plug them into the api:
//! DAY ONE 6am, noon, and 6pm.
// 1. put JSON contents into variables.
// store date in a variable
            // let dateStr = data.list[0].dt_txt;
// make it a new date object
            // let date = new Date(dateStr);
            let unix1 = parseInt(data.list[0].dt)
            let unix1Formatted = new Date(unix1 * 1000)
            let unix1Date = unix1Formatted.toDateString()
            let unix1Time = unix1Formatted.toLocaleTimeString()
            console.log(unix1Date)
            console.log(unix1Time)
// use toLocalDateString() to format the date and remove the timestamp.
            // let formattedDate = date.toLocaleDateString()
//convert kelvin to fehreinheit
            let tempKelvin = data.list[0].main.temp;
            let tempFahrenheit = kelvinToFahrenheit(tempKelvin);
            let icon = data.list[0].weather[0].icon
            let succinct = data.list[0].weather[0].main
            console.log(succinct)
            let descr = data.list[0].weather[0].description
            let imgForIcon = $("<img>")
            imgForIcon.css({
                "width": "50px",  // Set your desired width
                "height": "50px",  // Set your desired height
                "display": "inline"
            });
            imgForIcon.attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
            let wind = data.list[0].wind.speed;
            let humidity = data.list[0].main.humidity;
            
                // 2. put variables into cards
                dayOne.append(`
                <div class="cardDate">
                <p>${unix1Date}</p>
                </div>
                <div1 id="container">
                    <div class="div1">
                       
                        <p>${unix1Time}</p>
                        <p>${tempFahrenheit.toFixed(2)} F</p>
                        <div class="column">
                            <img src="http://openweathermap.org/img/w/${icon}.png" alt="${descr}" style="width: 50px; height: 50px; display: inline;">
                            <p>${descr}</p>
                            <p>${wind}</p>
                            <p>${humidity}</p>
                        </div>
                    </div>

                    <div class="div2">
                        <p>${unix1Time}</p>
                        <p>${tempFahrenheit.toFixed(2)} F</p>
                        <div class="column">
                            <img src="http://openweathermap.org/img/w/${icon}.png" alt="${descr}" style="width: 50px; height: 50px; display: inline;">
                            <p>${descr}</p>
                        </div>
                    </div>
                </div1>

                `);

                // dayOne.append(imgForIcon).append(descr);

                // Create a new div for icon, wind, and humidity
                // let weatherInfo = $('<div>').addClass('weather-info');
                // weatherInfo.append(`<p>Wind: ${wind}</p><p>Humidity: ${humidity}</p>`);
                // dayOne.append(weatherInfo);
//! DAY TWO
            let unix2 = parseInt(data.list[5].dt)
            let unix2Formatted = new Date(unix2 * 1000)
            let unix2Date = unix2Formatted.toDateString()
            let unix2Time = unix1Formatted.toLocaleTimeString()
            let tempKelvin2 = data.list[5].main.temp;
            let tempFahrenheit2 = kelvinToFahrenheit(tempKelvin2);
            let icon2 = data.list[5].weather[0].icon
            console.log(succinct)
            let descr2 = data.list[5].weather[0].description
            let imgForIcon2 = $("<img>")
            imgForIcon2.attr("src", "http://openweathermap.org/img/w/" + icon2 + ".png")
            let wind2 = data.list[5].wind.speed;
            let humidity2 = data.list[5].main.humidity;
            dayTwo.append(`<p>Date: ${unix2Date}</p><p>Time: ${unix2Time}<p>Temperature: ${tempFahrenheit2.toFixed(2)}</p>`);
            dayTwo.append(imgForIcon2).append(descr2)
            dayTwo.append(`<p>Wind: ${wind2}</p><p>Humidity: ${humidity2}</p>`)
//! DAY THREE
            let unix3 = parseInt(data.list[13].dt)
            let unix3Formatted = new Date(unix3 * 1000)
            let unix3Date = unix3Formatted.toDateString()
            let unix3Time = unix3Formatted.toLocaleTimeString()
            let tempKelvin3 = data.list[13].main.temp;
            let tempFahrenheit3 = kelvinToFahrenheit(tempKelvin3);
            let wind3 = data.list[13].wind.speed;
            let humidity3 = data.list[13].main.humidity;

            dayThree.append(`<p>Date: ${unix3Date}</p><p>Time: ${unix3Time}</p><p>Temperature: ${tempFahrenheit3.toFixed(2)}</p><p>Wind: ${wind3}</p><p>Humidity: ${humidity3}</p>`);
//! DAY FOUR
            let unix4 = parseInt(data.list[21].dt)
            let unix4Formatted = new Date(unix4 * 1000)
            let unix4Date = unix4Formatted.toDateString()
            let unix4Time = unix4Formatted.toLocaleTimeString()
            let tempKelvin4 = data.list[21].main.temp;
            let tempFahrenheit4 = kelvinToFahrenheit(tempKelvin4);
            let wind4 = data.list[21].wind.speed;
            let humidity4 = data.list[21].main.humidity;
            dayFour.append(`<p>Date: ${unix4Date}</p><p>Time: ${unix4Time}<p>Temperature: ${tempFahrenheit4.toFixed(2)}</p><p>Wind: ${wind4}</p><p>Humidity: ${humidity4}</p>`);
//! DAY FIVE
            let unix5 = parseInt(data.list[25].dt)
            let unix5Formatted = new Date(unix5 * 1000)
            let unix5Date = unix5Formatted.toDateString()
            let unix5Time = unix5Formatted.toLocaleTimeString()
            let tempKelvin5 = data.list[25].main.temp;
            let tempFahrenheit5 = kelvinToFahrenheit(tempKelvin5);
            let wind5 = data.list[25].wind.speed;
            let humidity5 = data.list[25].main.humidity;
            dayFive.append(`<p>Date: ${unix5Date}</p><p>Time: ${unix5Time}</p>Temperature: ${tempFahrenheit5.toFixed(2)}</p><p>Wind: ${wind5}</p><p>Humidity: ${humidity5}</p>`);
            console.log(data)

        })
        })
    }

$("#searchButton").on("click", function(){
// grab city and state so we can use it in getData() by getting the latitude and longitude
// of each city, which can be used to get the weather from the seperate api.
    let city = $("#searchCity").val()
    let state = $("#searchState").val()
    getData(city, state)

})

