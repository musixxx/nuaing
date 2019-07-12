const Url = axios.create({
  baseURL: 'http://localhost:3000/'
});

// Sign In

Url.post('/users/signin', req.body)
  .then((found) => {
    console.log(found);
  })
  .catch((err) => {
    console.log(err);
  })

// Events

Url.get('/api/events')
  .then((result) => {
    // console.log('balik lagi ke jquery');
    const event = result.data.data
    event.forEach((val) => {
      let content = `
      <div class="col-md-4" style="padding-bottom: 20px;">
        <div class="card" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">${val.displayName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${val.venue.displayName}</h6>
            <span class="card-link">${val.location.city}</span>

            <div class="card-info artist">

            </div>

            <div class="card-info time">
              <span class="card-link">${val.start.date}</span>
              <span class="card-link">${val.start.time}</span>
            </div>
          </div>
        </div>
      </div>
      `
      $('#get-result').append(content)
    });
  })
  .catch((err) => {
    console.log(err);
  })

// '/api/evevnts -- search'
// 'media'
// 'lyrics'
