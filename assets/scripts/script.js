var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")
var carousel = document.querySelector("#carousel")

//var key1 = "" // Jessse add other API Key variable here
var key2 = "sk-irI665693a01c0c353234" // Jesse's second key
//var key3 = 'sk-Um6J656a8237133673265'; // Nick's key
var apiKey = key2;


var handleSearch = function () {
    var searchedPlant = searchBox.value;
    console.log(searchBox.value);
    clearCarousel(); // only display the images of the most recent search

<<<<<<< HEAD
    // Key 1
    // var requestUrl = 'https://perenual.com/api/species-list?key=sk-Um6J656a8237133673265&q=' + searchedPlant; // e.g. asparagus
    // Key 2
    var requestUrl = 'https://perenual.com/api/species-list?key=sk-VfPS655d61aa10f743067&q=' + searchedPlant; // e.g. asparagus
=======
    var requestUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${searchedPlant}`
>>>>>>> 942f0d33d268beb0dd43b071ebc55f81f36735e6

    fetch(requestUrl)
        .
        then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.data);
            displayCarousel(data.data); //create the carousel
        })
};

function displayCarousel(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
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
    carouselSection.style.display = "flex";
    var instances = M.Carousel.init(elems, options);

}

var getPlantInfo = function (plantId) {
<<<<<<< HEAD
    // Key 1
    // var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-Um6J656a8237133673265";
    // Key 2
    var requestDetailsURL = "https://perenual.com/api/species/details/" + plantId + "?key=sk-VfPS655d61aa10f743067";
=======
    var requestDetailsURL = `https://perenual.com/api/species/details/${plantId}?key=${apiKey}`;
>>>>>>> 942f0d33d268beb0dd43b071ebc55f81f36735e6
    console.log(requestDetailsURL);

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)

        })
<<<<<<< HEAD
    displayPlantDetails(requestDetailsURL);
=======
    displayPlantDetails(requestDetailsURL); // display the plant details
>>>>>>> 942f0d33d268beb0dd43b071ebc55f81f36735e6
}


var displayPlantDetails = function (url) { // argument is "https://perenual.com/api/species/details/" + plantId + "?key=sk-Um6J656a8237133673265";
    var plantDetailSection = document.getElementById("feature-plant");

    if (plantDetailSection.style.display == "flex") {
        clearPlantDetails();
        displayPlantDetails(url)
    } else {

<<<<<<< HEAD
            var plantPic = document.querySelector("#plant-pic")
            var plantImg = document.createElement("img");
            plantPic.innerHTML = "";
            plantImg.src = data.default_image.small_url;
            plantImg.alt = "Photo of a " + capitalizedPlantName;
=======
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
>>>>>>> 942f0d33d268beb0dd43b071ebc55f81f36735e6

                plantDetailSection.style.display = "flex";
                console.log(plantDetailSection)


                var plantPic = document.querySelector("#plant-pic-section")
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

<<<<<<< HEAD
            // TODO: Add splash text for these details based on results. 
            var wateringDetailsEl = document.querySelector("#watering-details");
            // frequent, average, minimum, none

            if (data.watering.toLowerCase() === "frequent") {

                wateringDetailsEl.textContent = "Frequent Watering: Requires regular watering for optimal growth and health, typically every 1-2 days.";
            }
            else if (data.watering.toLowerCase() === "average") {

                wateringDetailsEl.textContent = "Average Watering: Suggested watering intervals are moderate, usually every 3-4 days to keep the plant adequately hydrated.";
            } else if (data.watering.toLowerCase() === "minimum") {

                wateringDetailsEl.textContent = "Minimum Watering: Needs infrequent watering, approximately once a week to prevent overhydration and maintain its vitality.";
            } else if (data.watering.toLowerCase() === "none") {

                wateringDetailsEl.textContent = "No Watering Needed: Rarely requires watering, thriving well without additional moisture due to its natural resilience.";
            } else {
                wateringDetailsEl.textContent = "Watering details not specified for this plant.";
            }

            // var sunDetailsEl = document.querySelector("#sun-details");
            // sunDetailsEl.textContent = data.sunlight;
            // var sunDetails = data.sunlight;

            var sunDetailsEl = document.querySelector("#sun-details");
            // added function for capitolizing and formatting the results from the array for readability. 
            if (Array.isArray(data.sunlight)) {
                function formatSunDetails(sunDetails) {
                    return sunDetails.map(function (item) {
                        return capitalizeFirstLetter(item.trim());
                    }).join(', ');
                }

                var formattedSunDetails = formatSunDetails(data.sunlight);
                sunDetailsEl.textContent = formattedSunDetails;
            } else {
                sunDetailsEl.textContent = data.sunlight;
            }

            var maturityDetailsEl = document.querySelector("#maturity-details");
            maturityDetailsEl.textContent = data.dimension;
=======
                var plantTypeEl = document.querySelector("#type-search");
                plantTypeEl.textContent = data.type + ", " + data.cycle;

                var plantFamilyEl = document.querySelector("#family-search");
                plantFamilyEl.textContent = data.family;

                var plantDescriptionEl = document.querySelector("#description-search");
                plantDescriptionEl.textContent = data.description;
>>>>>>> 942f0d33d268beb0dd43b071ebc55f81f36735e6

                var wateringDetailsEl = document.querySelector("#watering-details");
                wateringDetailsEl.textContent = data.watering;

                var sunDetailsEl = document.querySelector("#sun-details");
                sunDetailsEl.textContent = data.sunlight;

                var sunDetailsEl = document.querySelector("#maturity-details");
                sunDetailsEl.textContent = data.dimension;

                console.log(data);

            })
    }
};


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch();
})

function clearCarousel() {
    carousel.innerHTML = ""
}


carousel.addEventListener("click", function (event) {

    console.log(event);
    if (event.target.tagName == "IMG") {

        var plantId = event.target.dataset.id; // set the data attribute of the selected image to the id of the plant
        getPlantInfo(plantId); // makes an API call to get the information about a specific plant

    }
})


function clearPlantDetails() {
    var featurePlantSection = document.querySelector("#feature-plant");
    var plantPicSection = document.querySelector("#plant-pic-section");
    plantPicSection.innerHTML = "";
    featurePlantSection.style.display = "none";
}

