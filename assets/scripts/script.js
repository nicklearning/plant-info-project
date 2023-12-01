var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")




var handleSearch = function () {
    var searchedPlant = searchBox.value;
    console.log(searchBox.value);

    var requestUrl = 'https://perenual.com/api/species-list?key=sk-irI665693a01c0c353234&q=' + searchedPlant;

    fetch(requestUrl)
        .
        then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.data);

            // TODO for each array element: 1) create an a tag and add the class "carousel-item" 2) set the href equal to the plantID API 3) append the a tag to the .carousel class 4) create an img tag with the elementImgUrl as a source 5) append the img to the a tag
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                elementImgURL = element["default_image"]?.regular_url || ""; //  element["default_image"]?.regular_url will safely handle cases where default_image is null or undefined, providing a default empty string if it's the case.
                console.log(elementImgURL);

                if (elementImgURL != "") {

                    var aTag = document.createElement("a");
                    var carousel = document.getElementById("carousel")
                    var imgTag = document.createElement("img");

                    aTag.classList.add("carousel-item");
                    aTag.setAttribute("href", "index");
                    imgTag.setAttribute("src", elementImgURL);

                    aTag.append(imgTag);
                    carousel.append(aTag);
                }

            }
            var options = {
                fullWidth: true,
                indicators: true
            };


            var elems = document.querySelector('.carousel');
            var instances = M.Carousel.init(elems, options);
            console.log(instances);
        })
};

var getPlantInfo = function (plantId) {
    var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-irI665693a01c0c353234";

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // TODO: get the PLant ID from the selected plant from the carousel. 
            console.log(data)

        })
    displayPlantDetails();
}



var plantId = "1026"
var displayPlantDetails = function () {
    var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-irI665693a01c0c353234";

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var plantPic = document.querySelector("#plant-pic")
            var plantImg = document.createElement("img");
            plantImg.src = data.default_image.small_url;
            plantImg.alt = "Photo of a " + capitalizedPlantName;

            plantPic.appendChild(plantImg)

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
displayPlantDetails();

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})


document.addEventListener('DOMContentLoaded', function () {

});