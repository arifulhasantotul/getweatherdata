const searchLoader = document.getElementById('preloader');
searchLoader.style.color = 'white';

const searchError = document.getElementById('search_error');
const resultError = document.getElementById('result_error');
const searchWeatherData = () => {
    searchLoader.style.display = 'block';

    const inputId = document.getElementById('input_field');
    const inputValue = inputId.value;

    // document.getElementById('col_wrapper').innerHTML = '';

    if (inputId.value !== '') {
        searchError.style.display = 'none';
        // document.getElementById('search_error').style.display = 'none';
        // const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=04df987dc80d63ee450a495b0d02293b`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=04df987dc80d63ee450a495b0d02293b&units=metric`;
        fetch(url)
            .then(res => res.json())
            .then(data => showWeatherData(data));
        
    } else {
        searchLoader.style.display = 'none';
        resultError.style.display = 'none';
        searchError.style.display = 'block';
    }
    
    inputId.value = '';
}

const showWeatherData = place => {
    console.log(place);
    const row = document.getElementById('col_wrapper');
    row.textContent = '';
    
    if (place.cod !== '404') {
        searchLoader.style.display = 'none';
        resultError.style.display = 'none';
        // const row = document.getElementById('col_wrapper');
        // row.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-transparent text-white mx-auto mt-3" style="width: 25rem;">
                <img style="width:100px; margin: 0 auto" src="https://openweathermap.org/img/wn/${place.weather[0].icon}@2x.png" class="card-img-top" alt="...">
                <h4 class="card-title text-center"> City : ${place.name}</h4>
                <h4 class="card-title text-center">Country : ${place.sys.country}</h4>
                <div class="card-body">
                <p class="card-text text-center">${place.weather[0].main}</p>
                    <h5>Feels Like : ${place.main.feels_like}C</h5>
                    <h5>Temperature : ${place.main.temp}C</h5>
                    <h5>Max Temp : ${place.main.temp_max}C
                    <h5>Min Temp : ${place.main.temp_min}C</h5>
                    <h5>Humidity : ${place.main.humidity}%</h5>
                </div>
            </div>
        `;
        row.appendChild(div);
    } else {
        searchLoader.style.display = 'none';
        resultError.style.display = 'block';
    }
}