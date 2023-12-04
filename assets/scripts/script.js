var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")
var carousel = document.querySelector("#carousel")

var key1 = "sk-Um6J656a8237133673265" // Jesse's first key
var key2 = "sk-irI665693a01c0c353234" // Jesse's second key
//var key3 = 'sk-Um6J656a8237133673265'; // Nick's key
var key4 = "sk-D6mD656d07bf610723296" // Jesse's third key
var apiKey = key4;


var handleSearch = function () {
    var searchedPlant = searchBox.value;
    console.log(searchBox.value);
    clearCarousel(); // only display the images of the most recent search

    var requestUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${searchedPlant}`

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
    var requestDetailsURL = `https://perenual.com/api/species/details/${plantId}?key=${apiKey}`;
    console.log(requestDetailsURL);

    fetch(requestDetailsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)

        })
    displayPlantDetails(requestDetailsURL); // display the plant details
}


var displayPlantDetails = function (url) { // argument is "https://perenual.com/api/species/details/" + plantId + "?key=sk-Um6J656a8237133673265";
    var plantDetailSection = document.getElementById("feature-plant");

    if (plantDetailSection.style.display == "flex") {
        clearPlantDetails();
        displayPlantDetails(url)
    } else {

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

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
                
                var plantTypeEl = document.querySelector("#type-search");
                plantTypeEl.textContent = data.type + ", " + data.cycle;
                
                var plantFamilyEl = document.querySelector("#family-search");
                plantFamilyEl.textContent = data.family;

                var plantDescriptionEl = document.querySelector("#description-search");
                plantDescriptionEl.textContent = data.description;


                // This adds descriptive text for the watering details.
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

                var sizeDetailsEl = document.querySelector("#size-details");
                sizeDetailsEl.textContent = "In the correct conditions, this plant can grow to be " + data.dimension;


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

