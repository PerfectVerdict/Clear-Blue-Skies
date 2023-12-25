const key = "78c13c7d14026703c4632a7298ef5634"

let bodyEl = $('body')

let divForSearch = $('<div>')
 
bodyEl.append(divForSearch)


function getData(city, state) {
//& Get Coords
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=1&appid=${key}`
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
 
    })
    .then(function (data) {
        console.log(data)
        let long = data[0].lon
        let lat = data[0].lat
        let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            let cardContainer = $('<div>').attr("id", "cardContainer")
            let dayOneDateText = (data.city.name)
            console.log(dayOneDateText)
            let dayOne = $('<div>').text(dayOneDateText)
            cardContainer.append(dayOne)
            bodyEl.append(cardContainer)
        })
    })
    
}


//TODO save search history in local storage
$("#searchButton").on("click", function(){
    let city = $("#searchCity").val()
    let state = $("#searchState").val()
    getData(city, state)

})
