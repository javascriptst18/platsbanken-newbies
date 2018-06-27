/*async function searchByCriteria(searchCriteria) {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  console.log(matches);
}

searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');
*/

const itURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30';
const url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&antalrader=50';

let platsannonser = [];
let itAnnonser = [];

const container = document.querySelector('#allaAnnonser');
const filteredIT = document.querySelector('#filterIT');
filteredIT.addEventListener('change', showITAnnonser);

//filter function
async function showITAnnonser() {
  fetch(itURL)
  .then((response) => response.json())
  .then((itAnnonser) => {
    console.log(itAnnonser);
  })
}

showITAnnonser();

//function get all ads
async function getAnnonser() {
  fetch(url)
    .then((response) => response.json())
    .then((platsannonser) => {
      createCards(platsannonser);
    })
}

getAnnonser();


function createCards(platsannonser) {
  let html = '';
  for (let annonser of platsannonser.matchningslista.matchningdata) {
    html += `
    <div class="card" style="background-color: lightgrey">
    <h5><a href="${annonser.annonsurl}">${annonser.annonsrubrik}</a></h5>
    <p><strong>Yrkesbenämning: </strong>${annonser.yrkesbenamning}</p>
    <p><strong>Arbetsplats: </strong>${annonser.arbetsplatsnamn}</p>
    <p><strong>kommun: </strong>${annonser.kommunnamn}</p>
    <p><strong>Sista ansökningsdag: </strong>${annonser.sista_ansokningsdag}</p>
    <p><strong>Anställningstyp: </strong>${annonser.anstallningstyp}</p>
   
    </div>`; 
  };
  container.innerHTML = html; 
}

