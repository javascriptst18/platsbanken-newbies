//definera variabler
const url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&antalrader=50';
let platsannonser = [];
let filtreradPaYrken = [];
const container = document.querySelector('#allaAnnonser');
const yrkesFilter = document.querySelector('#yrkesFilter');

//lägg till eventlistener på yrkesfilter
yrkesFilter.addEventListener('change', visaYrkesFilter);


//yrkesfilter function
async function visaYrkesFilter(event) {
  const value = event.target.value;
  const yrkesUrl = url + '&yrkesomradeid=' + value;
  fetch(yrkesUrl)
  .then((response) => response.json())
  .then((filtreradPaYrken) => {
    createCards(filtreradPaYrken);
  })
}

//function get all ads
async function getAnnonser() {
  fetch(url)
    .then((response) => response.json())
    .then((platsannonser) => {
      createCards(platsannonser);
    })
}

//kalla på funktionen getannonser
getAnnonser();

//skapa html lista
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

