var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");



var handleSearch = function () {
    var searchedPlant = searchBox.value;
    console.log(searchBox.value);

    var requestUrl = 'https://perenual.com/api/species-list?key=sk-VfPS655d61aa10f743067&q=' + searchedPlant;

    fetch(requestUrl)
        .
        then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})
