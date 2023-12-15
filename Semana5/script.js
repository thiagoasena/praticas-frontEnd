"use strict";

document.addEventListener("DOMContentLoaded", function () {
    loadNews();
    loadHighlight();
    loadWeather();
    setInterval(loadWeather, 30 * 60 * 1000);
});

function loadNews() {
    const newsContainer = document.getElementById("news-list");
    const apiUrl = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=YOUR_NYT_API_KEY";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && Array.isArray(data.results)) {
                for (let i = 0; i < 3 && i < data.results.length; i++) {
                    const newsItem = data.results[i];
                    const newsElement = document.createElement("div");
                    newsElement.innerHTML = `
                        <a class="item-news" href="${newsItem.url}">
                            <h3 class="title-news">${newsItem.title}</h3>                        
                        </a>
                        <p class="pubdate">${new Date(newsItem.published_date).toLocaleDateString()}</p>
                    `;
                    newsContainer?.appendChild(newsElement);
                }
            }
        })
        .catch(error => {
            console.log("Erro ao buscar notícias: ", error);
        });
}

function loadHighlight() {
    const highlightContainer = document.getElementById("highlights-list");
    const apiUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YOUR_NYT_API_KEY";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && Array.isArray(data.results)) {
                for (let i = 0; i < 4 && i < data.results.length; i++) {
                    const highlight = data.results[i];
                    if (highlight.multimedia && highlight.multimedia.length > 0) {
                        const imageUrl = highlight.multimedia[0].url;
                        const highlightElement = document.createElement("div");
                        highlightElement.innerHTML = `
                            <h3 class="title-highlight">${highlight.title}</h3>
                            <img class="image-highlight" src="${imageUrl}" />
                        `;
                        highlightContainer?.appendChild(highlightElement);
                    }
                }
            }
        })
        .catch(error => {
            console.log("Erro ao buscar destaques: ", error);
        });
}


function loadWeather() {
    const apiKey = "7fc91c2469796840169634db0fb6a0fa";
    const lat = "-14.796708";
    const lon = "-39.173384";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    const servicesContainer = document.getElementById("services");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather && data.weather.length > 0) {
                const temperature = data.main.temp;
                const description = capitalize(data.weather[0].description);
                const weatherElement = document.createElement("div");
                weatherElement.innerHTML = `
                    <h3 class="title-weather">Condições Meteorológicas da UESC</h3>
                    <p>Temperatura: ${temperature}°C</p>
                    <p>${description}</p>`;
                servicesContainer?.appendChild(weatherElement);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar clima:", error);
        });
}

function capitalize(text) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, match => match.toUpperCase());
}