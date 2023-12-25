const key = "78c13c7d14026703c4632a7298ef5634"
let main = $('main')
let nameOfCity = $('#searchCity').val()
// card container. display: flex
let cardsContainer = $('<div>').attr("id", "cardContainer").css({
    "padding": "30px",
    "background-color": "black",
    "color": "white",
    "display": "flex",
    "height": "fit-content",
    "flex-wrap": "wrap",
    "justify-content": "space-between"
})
// convert kelvin to fahrenheit
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
  }
// Get coords of city and state
function getData(city, state) {
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`;

    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
//! name creation
        console.log(nameOfCity)
        //! append name to a newly created section, append section to main
        let nameSection = $('<section>')
        $(nameSection).append(nameOfCity)
        main.append(nameSection)
//! day one card
        let dayOne = $('<div>').attr("id", "dayOne")
        let dayTwo = $('<div>').attr("id", "dayTwo")
        let dayThree = $('<div>').attr("id", "dayThree")
        let dayFour = $('<div>').attr("id", "dayFour")
        let dayFive = $('<div>').attr("id", "dayFive")
        cardsContainer.append(dayOne)
        cardsContainer.append(dayTwo)
        cardsContainer.append(dayThree)
        cardsContainer.append(dayFour)
        cardsContainer.append(dayFive)
        main.append(cardsContainer)
        console.log(data)
        let long = data[0].lon
        let lat = data[0].lat
        let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
                //We dont want to display the time beacue this will be a a simple app that has five cards, one for each day.
//so we are using the Date object to use toLocaLDateString on .dt_text, which removes the time part. Then we pass
//More concantinations into dayOne

//DAY ONE
            let dateStr = data.list[0].dt_txt;
            let date = new Date(dateStr);
            let formattedDate = date.toLocaleDateString()
            //convert k to f
            let tempKelvin = data.list[0].main.temp;
            let tempFahrenheit = kelvinToFahrenheit(tempKelvin);
            let wind = data.list[0].wind.speed;
            let humidity = data.list[0].main.humidity;
            dayOne.append(`<p>Date: ${formattedDate}</p><p>Temperature: ${tempFahrenheit.toFixed(2)}</p><p>Wind: ${wind}</p><p>Humidity: ${humidity}</p>`);
                
// DAY TWO
            let date2 = new Date(data.list[2].dt_txt);
            let formattedDate2 = date2.toLocaleDateString();
            // convert k to f
            let tempKelvin2 = data.list[2].main.temp;
            let tempFahrenheit2 = kelvinToFahrenheit(tempKelvin2);
            let wind2 = data.list[2].wind.speed;
            let humidity2 = data.list[2].main.humidity;
            dayTwo.append(`<p>Date: ${formattedDate2}</p><p>Temperature: ${tempFahrenheit2.toFixed(2)}</p><p>Wind: ${wind2}</p><p>Humidity: ${humidity2}</p>`);

            // DAY THREE
            let date3 = new Date(data.list[10].dt_txt);
            let formattedDate3 = date3.toLocaleDateString();
            // convert k to f
            let tempKelvin3 = data.list[10].main.temp;
            let tempFahrenheit3 = kelvinToFahrenheit(tempKelvin3);
            let wind3 = data.list[10].wind.speed;
            let humidity3 = data.list[10].main.humidity;
            dayThree.append(`<p>Date: ${formattedDate3}</p><p>Temperature: ${tempFahrenheit3.toFixed(2)}</p><p>Wind: ${wind3}</p><p>Humidity: ${humidity3}</p>`);

            // DAY FOUR
            let date4 = new Date(data.list[18].dt_txt);
            let formattedDate4 = date4.toLocaleDateString();
            // convert k to f
            let tempKelvin4 = data.list[18].main.temp;
            let tempFahrenheit4 = kelvinToFahrenheit(tempKelvin4);
            let wind4 = data.list[18].wind.speed;
            let humidity4 = data.list[18].main.humidity;
            dayFour.append(`<p>Date: ${formattedDate4}</p><p>Temperature: ${tempFahrenheit4.toFixed(2)}</p><p>Wind: ${wind4}</p><p>Humidity: ${humidity4}</p>`);

            // DAY FIVE
            console.log(data)
            let date5 = new Date(data.list[26].dt_txt);
            console.log(date5)
            let formattedDate5 = date5.toLocaleDateString();
            // convert k to f
            let tempKelvin5 = data.list[26].main.temp;
            let tempFahrenheit5 = kelvinToFahrenheit(tempKelvin5);
            let wind5 = data.list[26].wind.speed;
            let humidity5 = data.list[26].main.humidity;
            console.log(formattedDate5);
            dayFive.append(`<p>Date: ${formattedDate5}</p><p>Temperature: ${tempFahrenheit5.toFixed(2)}</p><p>Wind: ${wind5}</p><p>Humidity: ${humidity5}</p>`);
        })
        })
    }

$("#searchButton").on("click", function(){
    let city = $("#searchCity").val()
    let state = $("#searchState").val()
    getData(city, state)

})

