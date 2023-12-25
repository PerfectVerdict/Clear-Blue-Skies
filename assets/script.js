const key = "78c13c7d14026703c4632a7298ef5634"

// the search form
let main = $('main')

// card container
let cardsContainer = $('<div>').attr("id", "cardContainer").css({
    "background-color": "red",
    "display": "flex"
})

let divForSearch = $('<div>')
 
main.append(divForSearch)

// convert kelvin to fahrenheit
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
  }

// Get Coords of city and state
function getData(city, state) {
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
 
    })
    .then(function (data) {
//! name creation
        let name = (data[0].name)
        let nameSection = $('<section>')
        $(nameSection).append(name)
        main.append(nameSection)
//! day one card
        let dayOne = $('<div>')
        cardsContainer.append(dayOne)
        main.append(cardsContainer)
        let long = data[0].lon
        let lat = data[0].lat
        let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
//We dont want to display the time beacue this will be a a simple app that has five cards, one for each day.
//so we are using the Date object to use toLocaLDateString on .dt_text, which removes the time part. Then we pass
//More concantinations into dayOne
                let dateStr = data.list[0].dt_txt;
                let date = new Date(dateStr);
                let formattedDate = date.toLocaleDateString();
//convert k to f
                let tempKelvin = data.list[0].main.temp;
                let tempFahrenheit = kelvinToFahrenheit(tempKelvin);
                let wind = data.list[0].wind.speed;
                let humidity = data.list[0].main.humidity;
                dayOne.append(`<p>Date: ${formattedDate}</p><p>Temperature: ${tempFahrenheit.toFixed(2)}</p><p>Wind: ${wind}</p><p>Humidity: ${humidity}</p>`);
              });
        })
    }

//TODO save search history in local storage
$("#searchButton").on("click", function(){
    let city = $("#searchCity").val()
    let state = $("#searchState").val()
    getData(city, state)

})
