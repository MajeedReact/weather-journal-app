/* Global Variables */

//Api key with imperial units
const apiKey = '166c3342d85d211eea6ee5f63b6d0cff&units=imperial&zip=';

//api url
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?appid='




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//add an event listener to the button
document.querySelector("#generate").addEventListener('click', result)

async function result(e) {
    //get zip code from input field
    const zipCode = document.getElementById("zip").value
    //get user response from input 
    const userResponse = document.getElementById("feelings").value

    /*
1- Call OpenWeatherMapAPI
2- Then Post Data
3- Then Update UI with the retrieved data
*/

    //chaining promises
    //calling weather api function
    try {
        const res = getWeather(apiUrl, apiKey, zipCode)
            .then(function (data) {
                //Create an object to pass it to post function
                const postObject = {
                    temp: data.main.temp,
                    date: newDate,
                    userResponse: userResponse,
                    name: data.name
                }
                //post data
                postWeather('/postWeather', postObject)
            }).then(
                //update UI
                updateRecentEntry
            )
    } catch (error) {
        console.log(`An Error occured while generating data ${error}`);
    }

}


//function to call weather api
const getWeather = async (baseUrl, apiCred, zipCode) => {
    const response = await fetch(baseUrl + apiCred + zipCode);
    try {
        const result = await response.json();
        //get not found element
        const notFound = document.getElementById('not-found');
        //update element if there is no result
        if (result.cod == 404) {
            notFound.classList.remove('not-found');
        } else {
            notFound.classList.add('not-found')
        }
        return result;
    } catch (error) {
        console.log(`An Error occured while retriving weather info from API ${error}`);
    }
}

//post function
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const newData = await response.json();
        return newData;

    } catch (error) {
        console.log("An error occured " + error);
    }
}


//retrieve data function
const getAllData = async (url = '') => {
    const response = await fetch(url);
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("An error occured while getting data " + error);
    }

}

//update UI with retrieved data
const updateRecentEntry = async () => {
    const allData = await getAllData('/all')
        .then(function (allData) {
            try {
                document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
                document.getElementById('content').innerHTML = `User response: ${allData.userResponse}`;
                document.getElementById("date").innerHTML = `Date: ${allData.date}`;
                document.getElementById("name").innerHTML = `City name: ${allData.name}`;
            } catch (error) {
                console.log('An Error occured while updating the UI' + error);
            }
        })

}







