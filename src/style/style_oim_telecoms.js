import {text_paint, operator_text} from './style_oim_common.js';

const layers = [
  {
    zorder: 40,
    id: 'telecoms_line',
    type: 'line',
    source: 'openinframap',
    minzoom: 3,
    'source-layer': 'telecoms_communication_line',
    paint: {
      'line-color': '#61637A',
      'line-width': ['interpolate', ['linear'], ['zoom'],
        3, 0.3,
        11, 2
      ],
      'line-dasharray': [3, 2],
    },
  },
  {
    zorder: 140,
    id: 'telecoms_sites',
    type: 'fill',
    source: 'openinframap',
    minzoom: 10,
    'source-layer': 'telecoms_sites',
    paint: {
      'fill-opacity': 0.3,
      'fill-color': '#7D59AB',
      'fill-outline-color': 'rgba(0, 0, 0, 1)',
    },
  },
  {
    zorder: 141,
    id: 'telecoms_sites_points',
    type: 'circle',
    source: 'openinframap',
    minzoom: 10,
    'source-layer': 'telecoms_sites_points',
    paint: {
      'circle-radius': 6,
      'circle-color': "#00FF00",
      'circle-stroke-width': ['interpolate', ['linear'], ['zoom'],
          5, 0,
          6, 0.01,
          12, 0.7,
      ]
    },
  },
  {
    zorder: 142,
    id: 'telecoms_mast',
    type: 'symbol',
    source: 'openinframap',
    minzoom: 10,
    'source-layer': 'telecoms_mast',
    paint: text_paint,
    layout: {
      'icon-image': 'comms_tower',
      'icon-anchor': 'bottom',
      'icon-size': ['interpolate', ["linear"], ["zoom"],
        10, 0.6,
        14, 1
      ],
      'text-field': operator_text,
      'text-size': {
        "stops": [
          [11, 0],
          [12, 0],
          [12.01, 10]
        ],
      },
      'text-anchor': 'top',
      'text-offset': {
        'stops': [
          [11, [0, 1]],
          [16, [0, 2]]
        ]
      },
      'text-optional': true
    },
  },
  {
    id: 'telecoms_sites_symbol',
    type: 'symbol',
    source: 'openinframap',
    minzoom: 11,
    'source-layer': 'telecoms_sites',
    paint: text_paint,
    layout: {
      'text-field': operator_text,
      'text-size': {
        "stops": [
          [11, 0],
          [13, 0],
          [13.01, 10]
        ],
      },
      'text-offset': [0, 1],
      'text-anchor': 'top',
    },
  },
  {
    id: 'telecoms_line_label',
    type: 'symbol',
    source: 'openinframap',
    minzoom: 9,
    'source-layer': 'telecoms_communication_line',
    paint: text_paint,
    layout: {
      'text-field': '{name}',
      'symbol-placement': 'line',
      'symbol-spacing': 400,
      'text-size': 10,
      'text-offset': [0, 1],
      'text-max-angle': 10
    }
  },

];

export default layers;
