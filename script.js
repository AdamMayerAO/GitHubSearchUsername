
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
  console.log(responseJson[0])
  const userURL = responseJson[0].owner.html_url
  const userName = responseJson[0].name
    $('#results-list').append(`<li><a href="${userURL}" target="_blank">${userName}</a></li>`);
    $('#results').removeClass('hidden');
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