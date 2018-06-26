/*async function searchByCriteria(searchCriteria) {
  *const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  *const responseObject = await fetch(baseURL + searchCriteria);
  *const matches = await responseObject.json();
  *console.log(matches);
}

searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');
*/


let platsannonser = [];

async function getAnnonser() {
  let url = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1';
  fetch(url)
  .then((response) => response.json())
  .then((platsannonser) => {
      console.log(platsannonser);
  })
}

getAnnonser();