const Url = axios.create({
  baseURL: 'http://localhost:3000/'
});

Url.get('/api/events')
  .then((result) => {
    console.log(result);
    let content = `
    
    `
    $('#get').append(content)
  })
  .catch((err) => {
    console.log(err);
  })

'/api/evevnts -- search'
'media'
'lyrics'
