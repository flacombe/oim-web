import './index.css';
import mapboxgl from 'mapbox-gl';

import {mount} from 'redom';

import EditButton from './editbutton.js';
import URLHash from './urlhash.js';
import InfoBox from './infobox.js';
import InfoPopup from './infopopup.js';
import KeyControl from './key/key.js';
import LayerSwitcher from './layerswitcher/layerswitcher.js';

import map_style from './style/style.json';
import style_base from './style/style_base.js';
import style_labels from './style/style_labels.js';
import style_oim_power from './style/style_oim_power.js';
import style_oim_power_heatmap from './style/style_oim_power_heatmap.js';
import style_oim_telecoms from './style/style_oim_telecoms.js';
import style_oim_petroleum from './style/style_oim_petroleum.js';
import style_oim_water from './style/style_oim_water.js';

function init() {
  if (!mapboxgl.supported({failIfMajorPerformanceCaveat: true})) {
    const infobox = new InfoBox('Warning');
    infobox.update(
      'Your browser may have performance or functionality issues with OpenInfraMap.<br/>' +
        '<a href="http://webglreport.com">WebGL</a> with hardware acceleration is required for this site ' +
        'to perform well.',
    );
    mount(document.body, infobox);
  }

  mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true, // Lazy load the plugin
  );

  var oim_layers = style_oim_power.concat(
    style_oim_power_heatmap,
    style_oim_petroleum,
    style_oim_telecoms,
    style_oim_water,
  );

  oim_layers.sort((a, b) => {
    if (a['zorder'] < b['zorder']) return -1;
    if (a['zorder'] > b['zorder']) return 1;
    return 0;
  });

  const layers = {
    Power: 'power_',
    'Solar Generation': 'heatmap_',
    Telecoms: 'telecoms_',
    'Oil & Gas': 'petroleum_',
    Water: 'water_',
    Labels: 'place_',
  };
  const layers_enabled = ['Power', 'Telecoms', 'Labels'];
  const layer_switcher = new LayerSwitcher(layers, layers_enabled);
  var url_hash = new URLHash(layer_switcher);
  layer_switcher.urlhash = url_hash;

  map_style.layers = style_base.concat(oim_layers, style_labels);

  layer_switcher.setInitialVisibility(map_style);

  if (DEV) {
    map_style['sprite'] = 'http://map.infos-reseaux.com/style/sprite';
    //map_style['sources']['openinframap']['url'] = 'http://localhost:8081/capabilities/openinframap.json'
  }

  var map = new mapboxgl.Map(Object.assign({
    container: 'map',
    style: map_style,
    hash: false,
    minZoom: 2,
    maxZoom: 17.9,
    center: [2.727, 46.125],
    zoom:4.9
  }, url_hash.getPosition()));

  url_hash.onAdd(map);
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
  );
  map.addControl(new KeyControl(), 'top-right');
  map.addControl(layer_switcher, 'top-right');
  map.addControl(new EditButton(), 'bottom-right');
  new InfoPopup(oim_layers.map(layer => layer['id']), 9).add(map);
}

if (document.readyState != 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
