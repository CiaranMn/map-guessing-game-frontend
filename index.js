const style = '&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:administrative.locality%7Celement:labels.text%7Cvisibility:off&style=feature:administrative.neighborhood%7Celement:labels.text%7Cvisibility:off&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.business%7Celement:labels%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:poi.place_of_worship%7Celement:labels%7Cvisibility:off&style=feature:poi.school%7Celement:labels.text%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.station.rail%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d'

const getMapUrl = (lat, lon, zoom) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=720x720&key=AIzaSyAvxJnHObvekYNouYlu3hOxPAG-nB17vC4${style}`

const updateMap = (lat, lon, zoom) => {
  displaySquares()
  const imgEl = document.querySelector('#map')
  imgEl.onload = fadeRandomSquare
  imgEl.src = getMapUrl(lat, lon, zoom)
}

// MANUAL CHECK - updateMap(51.52089, -0.08649, 15)

// toggle mapContainer & welcomeContainer display
const mapContainer = document.getElementById('map-container')
let welcomeContainer = document.getElementById('welcome-container')
mapContainer.style.display = 'none'
welcomeContainer.style.display = 'flex'

function mapOffWelcomeOn () {
  mapContainer.style.display = 'none'
  welcomeContainer.style.display = 'flex'
}
function mapOnWelcomeOff () {
  mapContainer.style.display = 'flex'
  welcomeContainer.style.display = 'none'
}

// submit username button - triggers mapOnWelcomeOff(), captures game difficulty, gets lat/lon from Heroku 

const usernameSubmit = document.getElementById('submit-un-btn')
usernameSubmit.addEventListener('click', () => {

  mapOnWelcomeOff()
  let selectedDif = document.querySelector('input[name="difficulty"]:checked').value
  API.getRandomLocation()
    .then(data => {
      let lat = data.latitude
      let lon = data.longitude
      let zoom 
      switch (selectedDif) {
        case "easy":
          zoom = 14 
          break
        case "medium":
          zoom = 15 
          break
        case "hard":
          zoom = 16 
          break
      }
      updateMap(lat, lon, zoom)
    })
})

// Full URL with style guide
// &format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:administrative.locality%7Celement:labels.text%7Cvisibility:off&style=feature:administrative.neighborhood%7Celement:labels.text%7Cvisibility:off&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.business%7Celement:labels%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:poi.place_of_worship%7Celement:labels%7Cvisibility:off&style=feature:poi.school%7Celement:labels.text%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.station.rail%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d
