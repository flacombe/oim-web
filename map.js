var base_carto = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

var base_osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var base_layers = {
  'Carto Positron': base_carto,
  'OSM': base_osm
};

var power = L.tileLayer('https://tiles-{s}.openinframap.org/power/{z}/{x}/{y}.png');
var overlay_layers = {
  'Power': power
}

var map = L.map('map', {
  center: [0,0],
  zoom: 4,
  layers: [base_carto, power]
});

L.control.layers(base_layers, overlay_layers).addTo(map);

var locator = L.Mapzen.locator();
locator.setPosition('topleft');
locator.addTo(map);
L.Mapzen.hash({
  map: map
})

var geocoder = L.Mapzen.geocoder('mapzen-h6pU6jc');
geocoder.addTo(map);