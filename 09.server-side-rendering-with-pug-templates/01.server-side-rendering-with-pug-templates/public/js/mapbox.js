/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibWttb25pciIsImEiOiJjbDBnemgyMnkwMm1wM2NubWs3am5yZ3YzIn0.ztxtZO5zprJP4x4AjqXQOA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  scrollZoom: false,
  // center: [-118.113491, 34.11745],
  // zoom: 5,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // note: 1) Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // note: 2) Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .setPopup(
      new mapboxgl.Popup({
        offset: 30,
      }).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    )
    .addTo(map);

  // note: 3) Add Popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // note: 4) Extend map bounds to include current locations
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
