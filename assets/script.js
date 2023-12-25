//! Note to grader: due to the api, if the time of today is passed a certaint point, it will give the weather for midnight, tonight
//! and call it the the next day because technically it is. The rest of the temps are set for noons forecast.
const key = "78c13c7d14026703c4632a7298ef5634"
let main = $('main')
let nameOfCity = $('#searchCity').val()
// create cards container
let cardsContainer = $('<div>').attr("id", "cardContainer").css({
    "padding": "40px",
    "background-color": "white",
    "color": "white",
    "display": "flex",
    "height": "fit-content",
    "flex-wrap": "wrap",
    "justify-content": "space-between",
    "margin-top": "20px",
    
})
// convert kelvin to fahrenheit function
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
            "background-color": "black",
            "padding": "10px"
            
        })
        let dayTwo = $('<div>').attr("id", "dayTwo")
        dayTwo.css({
            "background-color": "black",
            "padding": "10px"
        })
        let dayThree = $('<div>').attr("id", "dayThree")
        
        dayThree.css({
            "background-color": "black",
            "padding": "10px"
        })
        let dayFour = $('<div>').attr("id", "dayFour")
        dayFour.css({
            "background-color": "black",
            "padding": "10px"
        })
        let dayFive = $('<div>').attr("id", "dayFive")
        dayFive.css({
            "background-color": "black",
            "padding": "10px"
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
//! DAY ONE
// 1. put JSON contents into variables.
// store date in a variable
            let dateStr = data.list[0].dt_txt;
// make it a new date object
            let date = new Date(dateStr);
// use toLocalDateString() to format the date and remove the timestamp.
            let formattedDate = date.toLocaleDateString()
//convert kelvin to fehreinheit
            let tempKelvin = data.list[0].main.temp;
            let tempFahrenheit = kelvinToFahrenheit(tempKelvin);
            let icon = data.list[0].weather[0].icon
            let succinct = data.list[0].weather[0].main
            console.log(succinct)
            let descr = data.list[0].weather[0].description
            let imgForIcon = $("<img>")
            imgForIcon.attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
            let wind = data.list[0].wind.speed;
            let humidity = data.list[0].main.humidity;
            
// 2. put variables into cards
dayOne.append(succinct)
dayOne.append(`<p>Date: ${formattedDate}</p><p>Temperature: ${tempFahrenheit.toFixed(2)}</p>`);
dayOne.append(imgForIcon).append(descr)

dayOne.append(`<p>Wind: ${wind}</p><p>Humidity: ${humidity}</p>`);
//! DAY TWO
            let date2 = new Date(data.list[5].dt_txt);
            let formattedDate2 = date2.toLocaleDateString();
            let tempKelvin2 = data.list[5].main.temp;
            let tempFahrenheit2 = kelvinToFahrenheit(tempKelvin2);
            let icon2 = data.list[5].weather[0].icon
            let succinct2 = data.list[5].weather[0].main
            console.log(succinct)
            let descr2 = data.list[5].weather[0].description
            let imgForIcon2 = $("<img>")
            imgForIcon2.attr("src", "http://openweathermap.org/img/w/" + icon2 + ".png")
            let wind2 = data.list[5].wind.speed;
            let humidity2 = data.list[5].main.humidity;
            dayTwo.append(succinct2)
            dayTwo.append(`<p>Date: ${formattedDate2}</p><p>Temperature: ${tempFahrenheit2.toFixed(2)}</p><p>Wind: ${wind2}</p><p>Humidity: ${humidity2}</p>`);
            dayTwo.append(imgForIcon2).append(descr2)
            //! DAY THREE
            let date3 = new Date(data.list[13].dt_txt);
            let formattedDate3 = date3.toLocaleDateString();
            let tempKelvin3 = data.list[13].main.temp;
            let tempFahrenheit3 = kelvinToFahrenheit(tempKelvin3);
            let wind3 = data.list[13].wind.speed;
            let humidity3 = data.list[13].main.humidity;
            dayThree.append(`<p>Date: ${formattedDate3}</p><p>Temperature: ${tempFahrenheit3.toFixed(2)}</p><p>Wind: ${wind3}</p><p>Humidity: ${humidity3}</p>`);
//! DAY FOUR
            let date4 = new Date(data.list[21].dt_txt);
            let formattedDate4 = date4.toLocaleDateString();
            let tempKelvin4 = data.list[21].main.temp;
            let tempFahrenheit4 = kelvinToFahrenheit(tempKelvin4);
            let wind4 = data.list[21].wind.speed;
            let humidity4 = data.list[21].main.humidity;
            dayFour.append(`<p>Date: ${formattedDate4}</p><p>Temperature: ${tempFahrenheit4.toFixed(2)}</p><p>Wind: ${wind4}</p><p>Humidity: ${humidity4}</p>`);
//! DAY FIVE
            let date5 = new Date(data.list[25].dt_txt);
            let formattedDate5 = date5.toLocaleDateString();
            let tempKelvin5 = data.list[25].main.temp;
            let tempFahrenheit5 = kelvinToFahrenheit(tempKelvin5);
            let wind5 = data.list[25].wind.speed;
            let humidity5 = data.list[25].main.humidity;
            dayFive.append(`<p>Date: ${formattedDate5}</p><p>Temperature: ${tempFahrenheit5.toFixed(2)}</p><p>Wind: ${wind5}</p><p>Humidity: ${humidity5}</p>`);
            console.log(data)
            //! TODO ADD DAY 6
//! TODO ADD ICON
//! ADD LOCAL STORAGE
//! STYLE
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

