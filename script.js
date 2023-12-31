"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map, mapEvent;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coords = [latitude, longitude];
            map = L.map("map").setView(coords, 13);

            L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            // handling clicking on the map
            map.on("click", function (mapE) {
                mapEvent = mapE;
                form.classList.remove("hidden");
                inputDistance.focus();
            });
        },
        function () {
            alert("Could not get your location");
        }
    );
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    // clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = "";
    // display marker
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup",
            })
        )
        .setPopupContent("workout")
        .openPopup();
});
inputType.addEventListener("change", function () {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
});
