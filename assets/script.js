//! Note to grader: due to the api, if the time of today is passed a certaint point, it will give the weather for midnight, tonight
//! and call it the the next day because technically it is. The rest of the temps are set for noons forecast.
$(document).ready(function () {
    let nameSection = $('<section>')
    const key = "78c13c7d14026703c4632a7298ef5634"
    let main = $('main')
    let searchArray = []
    searchArray = JSON.parse(localStorage.getItem('searchArray')) || [];
    function renderHistory (searchArray) {
        for (let i = 0; i < searchArray.length; i++){
            main.append(`<button>${searchArray[i]}</button>`)
        }
    }
    renderHistory(searchArray)
    nameSection.attr("id", "nameSection")
    nameSection.css({
        "color": "black"
    })
    
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
        "gap": "10px",
        "flex-direction": "column",

    })
    // convert kelvin to fahrenheit function.
    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9 / 5 + 32;
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
                        
                        console.log(data)
                        // after we get the coordinates we can plug them into the api:
                        //! DAY ONE 10am, noon, and 10pm.
                        // 1. put JSON contents into variables.
                        // store date in a variable
                        // let dateStr = data.list[0].dt_txt;
                        // make it a new date object
                        // let date = new Date(dateStr);
                                        // 12 = 7am
                                        //15 = 10am east 3pm gwt
                                        //18 = 1pm
                                        //21 = 4pm
                                        //0000 = 7pm
                        // card one. 10am.
                        let unix1 = parseInt(data.list[4].dt)
                        let unix1Formatted = new Date(unix1 * 1000)
                        let unix1Date = unix1Formatted.toDateString()
                        let unix1Time = unix1Formatted.toLocaleTimeString()
                        console.log(unix1Date)
                        console.log(unix1Time)
                        // use toLocalDateString() to format the date and remove the timestamp.
                        // let formattedDate = date.toLocaleDateString()
                        //convert kelvin to fehreinheit
                        let tempKelvin1 = data.list[4].main.temp;
                        let tempFahrenheit1 = kelvinToFahrenheit(tempKelvin1);
                        let icon1 = data.list[4].weather[0].icon
                        // let succinct = data.list[6].weather[6].main
                        // console.log(succinct)
                        let descr1 = data.list[4].weather[0].description
                        let imgForIcon1 = $("<img>")
                        imgForIcon1.css({
                            "width": "50px",  // Set your desired width
                            "height": "50px",  // Set your desired height
                            "display": "inline"
                        });
                        imgForIcon1.attr("src", "http://openweathermap.org/img/w/" + icon1 + ".png")
                        let wind1 = data.list[4].wind.speed;
                        let humidity1 = data.list[4].main.humidity;
                        // 2. put variables into cards
                        dayOne.append(`
                    <div class="cardDate">
                    <p>${unix1Date}</p>
                    </div>
                    <div id="container">
                        <div class="div1">
                        
                            <p>${unix1Time}</p>
                            <p>${tempFahrenheit1.toFixed(2)} F</p>
                            <div class="column">
                                <img src="http://openweathermap.org/img/w/${icon1}.png" alt="${descr1}" style="width: 50px; height: 50px; display: inline;">
                                <p>${descr1}</p>
                                <p>${wind1} mph wind</p>
                                <p>${humidity1} % humidity</p>
                            </div>
                        </div>
                    `);
                        //! DAY TWO
                        let unix2 = parseInt(data.list[12].dt)
                        let unix2Formatted = new Date(unix2 * 1000)
                        let unix2Date = unix2Formatted.toDateString()
                        let unix2Time = unix1Formatted.toLocaleTimeString()
                        let tempKelvin2 = data.list[12].main.temp;
                        let tempFahrenheit2 = kelvinToFahrenheit(tempKelvin2);
                        let icon2 = data.list[12].weather[0].icon
                        // console.log(succinct)
                        let descr2 = data.list[12].weather[0].description
                        let imgForIcon2 = $("<img>")
                        imgForIcon2.attr("src", "http://openweathermap.org/img/w/" + icon2 + ".png")
                        let wind2 = data.list[12].wind.speed;
                        let humidity2 = data.list[12].main.humidity;

                        dayTwo.append(`
                        <div class="cardDate">
                        <p>${unix2Date}</p>
                        </div>
                        <div id="container">
                            <div class="div2">
                            
                                <p>${unix2Time}</p>
                                <p>${tempFahrenheit2.toFixed(2)} F</p>
                                <div class="column">
                                    <img src="http://openweathermap.org/img/w/${icon2}.png" alt="${descr2}" style="width: 50px; height: 50px; display: inline;">
                                    <p>${descr2}</p>
                                    <p>${wind2} mph wind</p>
                                    <p>${humidity2} % humidity</p>
                                </div>
                            </div>
                        </div>
                        `);




                        //! DAY THREE

                        let unix3 = parseInt(data.list[20].dt)
                        let unix3Formatted = new Date(unix3 * 1000)
                        let unix3Date = unix3Formatted.toDateString()
                        let unix3Time = unix3Formatted.toLocaleTimeString()
                        let tempKelvin3 = data.list[20].main.temp;
                        let tempFahrenheit3 = kelvinToFahrenheit(tempKelvin3);
                        let descr3 = data.list[20].weather[0].description
                        let icon3 = data.list[20].weather[0].icon
                        let imgForIcon3 = $("<img>")
                        imgForIcon3.attr("src", "http://openweathermap.org/img/w/" + icon3 + ".png")
                        let wind3 = data.list[20].wind.speed;
                        let humidity3 = data.list[20].main.humidity;

                        dayThree.append(`
                        <div class="cardDate">
                        <p>${unix3Date}</p>
                        </div>
                        <div id="container">
                            <div class="div3">
                            
                                <p>${unix3Time}</p>
                                <p>${tempFahrenheit3.toFixed(2)} F</p>
                                <div class="column">
                                    <img src="http://openweathermap.org/img/w/${icon3}.png" alt="${descr3}" style="width: 50px; height: 50px; display: inline;">
                                    <p>${descr3}</p>
                                    <p>${wind3} mph wind</p>
                                    <p>${humidity3} % humidity</p>
                                </div>
                            </div>
                        </div>
                        `);
                        //! DAY FOUR
                        let unix4 = parseInt(data.list[28].dt)
                        let unix4Formatted = new Date(unix4 * 1000)
                        let unix4Date = unix4Formatted.toDateString()
                        let unix4Time = unix4Formatted.toLocaleTimeString()
                        let tempKelvin4 = data.list[28].main.temp;
                        let tempFahrenheit4 = kelvinToFahrenheit(tempKelvin4);
                        let descr4 = data.list[28].weather[0].description
                        let icon4 = data.list[28].weather[0].icon
                        let imgForIcon4 = $("<img>")
                        imgForIcon4.attr("src", "http://openweathermap.org/img/w/" + icon3 + ".png")
                        let wind4 = data.list[28].wind.speed;
                        let humidity4 = data.list[28].main.humidity;
                        dayFour.append(`
                        <div class="cardDate">
                        <p>${unix4Date}</p>
                        </div>
                        <div id="container">
                            <div class="div4">
                            
                                <p>${unix4Time}</p>
                                <p>${tempFahrenheit4.toFixed(2)} F</p>
                                <div class="column">
                                    <img src="http://openweathermap.org/img/w/${icon4}.png" alt="${descr4}" style="width: 50px; height: 50px; display: inline;">
                                    <p>${descr4}</p>
                                    <p>${wind4} mph wind</p>
                                    <p>${humidity4} % humidity</p>
                                </div>
                            </div>
                        </div>
                        `);
                        //! DAY FIVE
                        let unix5 = parseInt(data.list[36].dt)
                        let unix5Formatted = new Date(unix5 * 1000)
                        let unix5Date = unix5Formatted.toDateString()
                        let unix5Time = unix5Formatted.toLocaleTimeString()
                        let tempKelvin5 = data.list[36].main.temp;
                        let tempFahrenheit5 = kelvinToFahrenheit(tempKelvin5);
                        let descr5 = data.list[36].weather[0].description
                        let icon5 = data.list[36].weather[0].icon
                        let imgForIcon5 = $("<img>")
                        imgForIcon5.attr("src", "http://openweathermap.org/img/w/" + icon5 + ".png")
                        let wind5 = data.list[36].wind.speed;
                        let humidity5 = data.list[36].main.humidity;
                        dayFive.append(`
                        <div class="cardDate">
                        <p>${unix5Date}</p>
                        </div>
                        <div id="container">
                            <div class="div5">
                            
                                <p>${unix5Time}</p>
                                <p>${tempFahrenheit5.toFixed(2)} F</p>
                                <div class="column">
                                    <img src="http://openweathermap.org/img/w/${icon5}.png" alt="${descr5}" style="width: 50px; height: 50px; display: inline;">
                                    <p>${descr5}</p>
                                    <p>${wind5} mph wind</p>
                                    <p>${humidity5} % humidity</p>
                                </div>
                            </div>
                        </div>
                        `);

                    })
            })
    }



    console.log(searchArray)
    $("#searchButton").on("click", function () {
        $("#cardContainer").empty()
        $("#nameSection").remove()
        
        // grab city and state so we can use it in getData() by getting the latitude and longitude
        // of each city, which can be used to get the weather from the seperate api.
        let city = $("#searchCity").val()
        let state = $("#searchState").val()
        if (!city || !state) {
            alert("Please enter both city and state.");
            return; // Stop execution if either city or state is missing
        }
        
        searchArray.push(`${city}, ${state}`)
        localStorage.setItem('searchArray', JSON.stringify(searchArray));
        
        getData(city, state)

    })
})
// 6 9 12 3 6

