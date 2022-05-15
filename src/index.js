import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry (evt) {
    const inputCountry = (evt.target.value).trim();

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    
    if (inputCountry) {
        fetchCountries(inputCountry)
            .then(countries => {
                if (countries.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                }
                else if (countries.length >= 2 && countries.length <= 10) {
                    countriesMarkup(countries);
                }
                else if (countries.length === 1) {
                    countryMarkup(countries);
                }console.log(countries)})
                .catch(error => {
                    Notiflix.Notify.failure("Oops, there is no country with that name")
                });
}

}

function countriesMarkup (countries) {
    const markupCountries = countries
    .map((country) => {
        return `<li class="country-list">
        <img src="${country.flags.svg}" width="20" height="10">
        ${country.name.official}
        </li>`
    }).join("");
    countryList.innerHTML = markupCountries;
}

function countryMarkup (countries) {
    const countryMarkup = countries
    .map((data) => {
        return `<h1><span>
        <img src="${data.flags.svg}" width="65" height="35"></span>
        ${data.name.official}</h1>
        <p><b>Capital:</b> ${data.capital}</p>
        <p><b>Population:</b> ${data.population}</p>
        <p><b>Languages:</b> ${Object.values(data.languages)}</p>`
    }).join('');
    countryInfo.innerHTML = countryMarkup;
}




