//defining variables
const url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?antalrader=8';
let areaURL;
let yrkesURL;
let platsannonser = [];
let filterJobs = [];
let filterCity = [];
let pageNumber = 1;
const showResult = document.querySelector('#allAds');
const filterByJobs = document.querySelector('#yrkesFilter');
const filterByCity = document.querySelector('#areaID');
const loadMore = document.querySelector('#showMore');

//add eventlisteners
filterByJobs.addEventListener('change', showJobFilter);
filterByCity.addEventListener('change', showAreaFilter);
loadMore.addEventListener('click', showMoreAds);


//add cityfilter function
async function showAreaFilter(event) {
  const value = event.target.value;
  areaURL = url + '&lanid=' + value;
  fetch(areaURL)
    .then((response) => response.json())
    .then((filterCity) => {
      createCards(filterCity);
    })
}

//add jobfilter function
async function showJobFilter(event) {
  const value = event.target.value;
  yrkesURL = areaURL + '&yrkesomradeid=' + value;
  fetch(yrkesURL)
    .then((response) => response.json())
    .then((filterJobs) => {
      createCards(filterJobs);
    })
}

//load more function
async function showMoreAds() {
pageNumber = pageNumber + 1;
 const showMoreResponse = yrkesURL + '&sida=' + pageNumber;
 fetch(showMoreResponse)
 .then((response) => response.json())
 .then((platsannonser) => {
    createCards(platsannonser);
 })
}


//all adds
async function getAnnonser() {
  fetch(url)
    .then((response) => response.json())
    .then((platsannonser) => {
      createCards(platsannonser);
    })
}

//call the function getAds
getAnnonser();

//create html
function createCards(platsannonser) {
  let html = '';
  for (let annonser of platsannonser.matchningslista.matchningdata) {
    html += `
    <div class="card-body">
    <h5><a href="${annonser.annonsurl}">${annonser.annonsrubrik}</a></h5>
    <p><strong>Yrkesbenämning: </strong>${annonser.yrkesbenamning}</p>
    <p><strong>Arbetsplats: </strong>${annonser.arbetsplatsnamn}</p>
    <p><strong>Kommun: </strong>${annonser.kommunnamn}</p>
    <p><strong>Sista ansökningsdag: </strong>${utility.formatDate(annonser.sista_ansokningsdag)}</p>
    <p><strong>Anställningstyp: </strong>${annonser.anstallningstyp}</p>
    </div>`;
  };
  showResult.innerHTML = html;
}


//Utility functions (formatting etc) - tack grupp 4

utility = {
  //Formats inputdate from json from UTC to 'en-gb'
  formatDate(platsannonser) {
    //Converts input from string to Date and then formats date as 'en-gb' (dd/mm/yyyy)
    let formattedDate = new Date(platsannonser).toLocaleDateString('en-gb');
    //Return the formatted date
    return formattedDate;
  }
}