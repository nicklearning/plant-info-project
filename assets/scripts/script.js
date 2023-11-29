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
        .
        then(function (response) {
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

var plantId = "352"
var getPlantInfo = function () {
    var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-VfPS655d61aa10f743067";

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // Added function that will capitolize the first letter of the Name
            var plantNameEl = document.querySelector("#name-search");
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            var capitalizedPlantName = capitalizeFirstLetter(data.common_name);
            plantNameEl.textContent = capitalizedPlantName;

            var scientificNameEl = document.querySelector("#latin-search");
            scientificNameEl.textContent = data.scientific_name;

            var plantTypeEl = document.querySelector("#type-search");
            plantTypeEl.textContent = data.type + ", " + data.cycle;

            var plantFamilyEl = document.querySelector("#family-search");
            plantFamilyEl.textContent = data.family;

            var plantDescriptionEl = document.querySelector("#description-search");
            plantDescriptionEl.textContent = data.description;

            var wateringDetailsEl = document.querySelector("#watering-details");
            wateringDetailsEl.textContent = data.watering;

            var sunDetailsEl = document.querySelector("#sun-details");
            sunDetailsEl.textContent = data.sunlight;

            var sunDetailsEl = document.querySelector("#maturity-details");
            sunDetailsEl.textContent = data.dimension;




            console.log(data);

        })
};
getPlantInfo();

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})


document.addEventListener('DOMContentLoaded', function () {

});