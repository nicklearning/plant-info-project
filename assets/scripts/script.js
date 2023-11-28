function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://trefle.io/api/v1/plants?token=WIrN0cBGeIRYljVwTZYH4GXKB3pNcMuGekVycwbYbts';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
};

getApi();