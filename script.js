
function findUsername(searchUser){
  const url= `https://api.github.com/users/${searchUser}/repos`
  fetch (url)
   .then(response => {
     if(response.ok){
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => 
      displayResults(responseJson))
        .catch(err => alert('oops...something went wrong')); 
}

function displayResults(responseJson){
  $('#userName').append(`<a href="${responseJson[0].owner.html_url}" target="_blank">${responseJson[0].name}</a>`);
  for (let i=0; i<responseJson.length; i++){
  const userURL = `${responseJson[i].owner.html_url}/${responseJson[i].name}`
  const userName = responseJson[i].name
    $('#results-list').append(`<li><a href="${userURL}" target="_blank">${userName}</a></li>`);
    $('#results').removeClass('hidden');
  }
}


function handleForm(){
  $('form').submit(event => {
  event.preventDefault();
  $('#results-list').empty();
  const searchUser = $('#js-search-term').val();
  findUsername(searchUser);
  })

}

$(handleForm)