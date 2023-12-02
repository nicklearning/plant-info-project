var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")
var carousel = document.querySelector("#carousel")




var handleSearch = function () {

    var searchedPlant = searchBox.value;
    console.log(searchBox.value);
    clearCarousel(); // onlu display the images of the most recent search

    var requestUrl = 'https://perenual.com/api/species-list?key=sk-Um6J656a8237133673265&q=' + searchedPlant; // e.g. asparagus

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
                elementImgURL = element["default_image"]?.regular_url || ""; //  element["default_image"]?.regular_url will safely handle cases where default_image is null or undefined, providing a default empty string if it's the case.

                console.log(elementImgURL);

                if (elementImgURL != "" && elementImgURL != "https://perenual.com/storage/image/upgrade_access.jpg") { // filter out unwanted image url's 
                    var elementID = element.id;

                    // create the structe of the carousel
                    var aTag = document.createElement("a");
                    var carousel = document.getElementById("carousel")
                    var imgTag = document.createElement("img");

                    aTag.classList.add("carousel-item");

                    imgTag.setAttribute("src", elementImgURL);
                    imgTag.setAttribute("data-id", elementID);

                    console.log(imgTag.dataset);

                    aTag.append(imgTag);
                    carousel.append(aTag);
                }

            }
            var options = {
                fullWidth: true,
                indicators: true
            };


            var elems = document.querySelector('.carousel');
            var carouselSection = document.getElementById("carousel-section");
            carouselSection.style.display = "block";
            var instances = M.Carousel.init(elems, options);

        })
};

var getPlantInfo = function (plantId) {
    var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-Um6J656a8237133673265";
    console.log(requestDetailsURL);

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)

        })
    displayPlantDetails(requestDetailsURL); 
}


var displayPlantDetails = function (url) { // argument is "https://perenual.com/api/species/details/" + plantId + "?key=sk-Um6J656a8237133673265";

    fetch(url)
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


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})

function clearCarousel() {
    carousel.innerHTML = ""
}


carousel.addEventListener("click", function (event) {
    // TODO add event delegation
    console.log(event);
    var plantId = event.target.dataset.id; // set the data attribute of the selected image to the id of the plant
    getPlantInfo(plantId); // makes an API call to get the information about a specific plant
})

// TODO clear out the plant details if details are already being displayed
/* function clearPlantDetails() {
    var featurePlantSection = document.querySelector("#feature-plant");
    featurePlantSection.innerHTML = ""
} */