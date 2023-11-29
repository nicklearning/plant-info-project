var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")
var carousel = document.querySelector(".carousel");




var handleSearch = function () {
    var searchedPlant = searchBox.value;
    console.log(searchBox.value);

    var requestUrl = 'https://perenual.com/api/species-list?key=sk-VfPS655d61aa10f743067&q=' + searchedPlant;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];

                elementImgURL = element["default_image"].regular_url;
                console.log(elementImgURL);
                var options = {
                    fullWidth: true,
                    indicators: true
                 };
                

                var elems = document.querySelector('.carousel');
                var instances = M.Carousel.init(elems, options);
                console.log(instances);

            }
        })
};


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})


document.addEventListener('DOMContentLoaded', function () {

});