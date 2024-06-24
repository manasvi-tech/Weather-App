const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById("submitBtn");
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const city_name = document.getElementById("city_name");
const data_hide = document.querySelector('.middle_layer')

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = "Please write the name of the city";
        data_hide.classList.add('data_hide')
    } else {
        const urlCordinates = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityVal)}&key=${OpenCageAPIkey}`;

        try {
            const response = await fetch(urlCordinates);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            if (data.results.length > 0) {
                const location = data.results[0].geometry;
                let lat = location.lat;
                let lon = location.lng;

                const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}&units=metric`;
                const response2 = await fetch(urlWeather);
                if (!response2.ok) {
                    throw new Error('Network response was not ok ' + response2.statusText);
                }
                const data2 = await response2.json();

                temp.innerHTML = `<span>${data2.main.temp}</span><sup>o</sup>C`; 
                let country = data2.sys.country;
                city_name.innerText = `${cityVal}, ${country} `;

                const tempMood = data2.weather[0].main;

                //condition to check sunny or cloudy
                if(tempMood==="Clear"){
                    temp_status.innerHTML=
                    '<i class="fa-solid fa-sun" style="color:#eccc68" ></i>'
                } else if(tempMood==="Clouds"){
                    temp_status.innerHTML=
                    '<i class="fa-solid fa-cloud" style="color:f1f2f6"></i>'
                
                } else if(tempMood==="Rain"){
                    temp_status.innerHTML=
                    '<i class="fa-solid fa-cloud-rain" style="color:#a4b0be"></i>'
                
                } else {
                    temp_status.innerHTML=
                    '<i class="fa-solid fa-sun" style="color:f1f2f6"></i>'
                }

                data_hide.classList.remove('data_hide')




            } else {
                city_name.innerText = "No results found";
            }
        } catch (error) {
            console.error('Error fetching the data:', error);
            city_name.innerText = "Error fetching the data";
            data_hide.classList.add('data_hide')
        }
    }
};

submitBtn.addEventListener('click', getInfo);