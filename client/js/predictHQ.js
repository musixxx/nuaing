const Url = axios.create({
  baseURL: 'http://localhost:3000'
});

$("#form-signin").submit(function (event) {
  event.preventDefault();
  let datasignin = $(this).serializeArray()
  console.log(datasignin)
  Url({
      url: '/users/signin',
      method: "POST",
      data: {
        email: datasignin[0].value,
        password: datasignin[1].value
      }
    })
    .then(({
      data
    }) => {
      console.log('balik ke jquery');
      console.log(data);
      localStorage.setItem('token', data.token)
      checkSignIn()
    })
    .catch((err) => {
      console.log(err);
    })
})

// Sign In

// Events

Url.get('api/events')
  .then((result) => {
    const event = result.data.data
    event.forEach((val) => {
      let content = `
      <div class="col-md-4" style="padding-bottom: 20px;">
        <div class="card" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">${val.displayName.split(' (')[0]}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${val.venue.displayName}</h6>
            <span class="card-link">${val.location.city}</span>

            <div class="card-info artist" id="info-${val.id}">
              <p>Artist</p>
            </div>

            <div class="card-info time">
              <span class="card-link">${val.start.date.split('-').reverse().join('-')}</span>
              <span class="card-link">${val.start.time}</span>
              <!-- Button Trigger Event Page -->
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="${val.id}">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      `
      if (val.performance[0]) {
        let x = `
        <div>
          <span>${val.performance[0].displayName}</span>
        </div>
        `
        $(`.artist`).append(x)
      } else {
        $(`.artist`).hide()
      }
      $('#get-result').append(content)
    });
  })
  .catch((err) => {
    console.log(err);
  })

// Artist Search

$('#formSearchArtist').submit(function (e) {
  e.preventDefault()
  let artistName = $('#searchArtist').val()
  console.log(artistName)
  searchArtist(artistName)
})

function searchArtist(artist) {

  Url.get(`/api/media?q=${artist}`)
    .then(({
      data
    }) => {
      console.log(data);
      $('#searchResult').empty()
      let found = `
    <div class="row" style="padding-top: 5vh">
      <div class="col-sm-4 result-img-art ">
        <img src="${data.picture_xl}" class="card-img-top" alt="${data.name}" id="img-${data.name}">
      </div>
      <div class="col-sm-8">
        <div style="padding-top: 8vh; margin-left: 5vh">
          <h1 class="card-title">${data.name}</h1>
          <h3 class="text-muted" style="margin-left:5px">${data.type}</h3>
        </div>
      </div>

      <div class="track">
        <div class="container tracklist">
        <p> kholis anjing</p>
        </div>
      </div>
    </div>
    `
      console.log(data.picture_medium);
      $('#searchResult').append(found)
      $('#result').show()

    })
    .catch((err) => {

    })
}



function onSignIn(googleUser) {
  if (!localStorage.getItem('token')) {
    const id_token = googleUser.getAuthResponse().id_token
    $.post('http://localhost:3000/users/g-sigin', {
        token: id_token
      })
      .done(response => {
        localStorage.setItem('token', id_token)
        localStorage.setItem('name', response.name)
        localStorage.setItem('email', response.email)
        localStorage.setItem('picture', response.picture)
      })
      .fail(err => {
        console.log(err)
      })
  }
  const profile = googleUser.getBasicProfile();


  $('.g-signin2').hide()
  $("#user").show()
  $(".container").show()

  let html = `<div class="navbar-brand">${profile.getName()}</div>
              <img src="${profile.getImageUrl()}" alt="userImage" style="border-radius: 8px; width: 50px;">
              <a href="#" onclick="signOut();" class="m-2 text-danger"><i class="fas fa-power-off"></i></a>`

  $('#user').empty()
  $('#user').append(html)

  let welcome = `<h2>Hi ${profile.getName()}!</h2>`

  $('#welcome').empty()
  $('#welcome').append(welcome)

  star()
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.clear()
  });

  $("#user").hide()
  $(".container").hide()
  $('.g-signin2').show()
}