var searchBox = document.querySelector("#search-box");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#plant-search");
var listItemsUl = document.querySelector("#list-Items-Ul")
var carousel = document.querySelector("#carousel")
var saveButton = document.getElementById("save-btn");

var key1 = "sk-VfPS655d61aa10f743067" // Jesse's first key Used for presentation only
var key2 = "sk-irI665693a01c0c353234" // Jesse's second key
var key3 = 'sk-Um6J656a8237133673265'; // Nick's key
var key4 = "sk-D6mD656d07bf610723296" // Jesse's third key
var key5 = "sk-Vyib656fc94da51b03344";
var apiKey = key5;

var currentPlant = {
    id: "",
    imgSrc: "",
    plantName: "",
    details: "",
}


var dialog = document.createElement("dialog");
// Function that displays modal 
function createModal() {

    var body = document.querySelector("body")
    dialog.setAttribute("id", "dialog-alert");

    var dialogText = document.createElement("p");
    dialogText.textContent = "Plant not found. Please try again!";
    console.log(dialogText.textContent)

    var tryAgainBtn = document.createElement("button");
    tryAgainBtn.setAttribute("id", "try-again-btn");
    tryAgainBtn.setAttribute("type", "cancel");
    tryAgainBtn.textContent = "Try Again";
    console.log(tryAgainBtn.textContent)

    body.appendChild(dialog)
    dialog.appendChild(dialogText);
    dialog.appendChild(tryAgainBtn);
}

function closeModal() {
    dialog.close();
}

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
            // Code if user searches for a string that does not return a plant. 
            if (data.data.length == 0) {
                dialog.innerHTML = ""
                createModal();
                dialog.showModal();

                var tryAgain = document.querySelector("#try-again-btn");
                tryAgain.addEventListener("click", closeModal);
            }
            else {
                displayCarousel(data.data)
            }; //create the carousel
        })
};

function displayCarousel(data) {

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        var elementImgURL = element["default_image"]?.regular_url || ""; //  element["default_image"]?.regular_url will safely handle cases where default_image is null or undefined, providing a default empty string if it's the case.

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

    var carouselSection = document.getElementById("carousel-section");
    carouselSection.style.display = "flex";

    // initialize the carousel
    var elems = document.querySelectorAll('.carousel');
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
                plantImg.classList.add("responsive-img");
                plantImg.setAttribute("id", "currentPlantImg");
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

                currentPlant.id = data.id;
                console.log(data);
                console.log(currentPlant.id);

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



saveButton.addEventListener("click", function () {
    var localStorageData = JSON.parse(localStorage.getItem('plants')) || []; // variable is equal to the current items in local storage or it is an empty array.
    var selectedPlantImg = document.getElementById("currentPlantImg");

    var selectedPlantName = document.getElementById("name-search");
    var selectedPlantDetails = document.getElementById("description-search");
    currentPlant.imgSrc = selectedPlantImg.src;
    currentPlant.plantName = selectedPlantName.textContent;
    currentPlant.details = selectedPlantDetails.textContent;


    if (localStorageData.some(plant => plant.id === currentPlant.id)) {
        console.log("Plant already in local storage");
    } else {
        localStorageData.push(currentPlant); // pushes the saved plant object into the array
        localStorage.setItem("plants", JSON.stringify(localStorageData));
    }

    displaySavedPlants();
})

function deleteItemFromLocal(plantId) {
    var localStorageData = JSON.parse(localStorage.getItem('plants'));
    for (var i = 0; i < localStorageData.length; i++) {
        if (localStorageData[i].id === plantId) {
            localStorageData.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("plants", JSON.stringify(localStorageData));
};

function displaySavedPlants() {
    var savedPlantSection = document.getElementById("saved-plants");
    savedPlantSection.style.display = "flex";
    savedPlantSection.style.flexDirection = "column";
    var localStorageData = JSON.parse(localStorage.getItem('plants'));

    // Clear existing content in savedPlantSection
    savedPlantSection.innerHTML = '';


    for (let index = 0; index < localStorageData.length; index++) {
        const element = localStorageData[index];

        var savedPlantCard = document.createElement("section");
        savedPlantCard.setAttribute("id", `plant-card-${element.id}`);
        savedPlantCard.classList.add("col", "s11", "plant-card");


        var savedPlantImg = document.createElement("img");
        savedPlantImg.setAttribute("src", localStorageData[index].imgSrc);
        savedPlantImg.setAttribute("id", "saved-plant-img");

        var savedPlantName = document.createElement("h4");
        savedPlantName.setAttribute("id", "sav-plant-name");
        savedPlantName.textContent = localStorageData[index].plantName;

        var descriptionAndButtonSection = document.createElement("section");

        var savedPlantDescription = document.createElement("p");
        savedPlantDescription.setAttribute("id", "sav-plant-details");
        savedPlantDescription.textContent = localStorageData[index].details;



        // Remove button for each card
        var removeBtn = document.createElement("button");
        removeBtn.setAttribute("data-id", currentPlant.id);
        removeBtn.textContent = "Remove Plant";
        removeBtn.classList.add("waves-effect", "waves-light", "btn", "remove-btn")

        descriptionAndButtonSection.append(savedPlantDescription);
        descriptionAndButtonSection.append(removeBtn)

        descriptionAndButtonSection.style.display = "flex";
        descriptionAndButtonSection.style.flexDirection = "column";

        removeBtn.addEventListener("click", function () {
            deleteItemFromLocal(element.id)
            displaySavedPlants();
        })


        savedPlantCard.append(savedPlantImg);
        savedPlantCard.append(savedPlantName);
        savedPlantCard.append(descriptionAndButtonSection);


        savedPlantSection.append(savedPlantCard);
    }

}


