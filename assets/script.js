const key = "78c13c7d14026703c4632a7298ef5634"


function getCoords(city, state) {

    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}"&limit=5&appid=${key}`
    fetch(requestUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    

}
$("#searchButton").on("click", function(){
    let city = $("#searchCity").val()
    let state = $("#searchState").val()
    console.log(city)
    console.log(state)
    getCoords(city, state)
})