import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Group, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
// Type
import { shopType, countryGeoDataType } from './vite-env';
// helper function
import { fetchStarbucksShops } from './utils/fetchStarbucksShops';
import { getAllPointShopsByData } from './utils/getAllPointShopsByData';
import { chooseCountry } from './utils/chooseCountry';
import { fetchGeoJsonCountry } from './utils/fetchGeoJsonCountry';
import { chooseLayer } from './utils/changeLayer';
// helper Data
import countries from './data/countryAlpha2.json';

// fetch data
export const shopsData: shopType[] = await fetchStarbucksShops();
export const countryGeoData: countryGeoDataType = await fetchGeoJsonCountry();

// get all countries shops
const allCountriesShops: string[] = shopsData.map(shop => shop.country);
const allCountriesShopsUnique = [...new Set(allCountriesShops)].sort();

const listCountries = document.getElementById('list-countries');

// add option for each country to select
allCountriesShopsUnique.forEach(countryCode => {
  const country = countries.filter(
    country1 => country1.code === countryCode
  )[0];
  const option = document.createElement('option');
  option.value = countryCode;
  option.innerText = country.name;
  listCountries!.appendChild(option);
});

// add event listener to select tag
listCountries!.addEventListener('change', chooseCountry);

// get all point shops by data
const starbucksAllPointShops: Feature<Point>[] =
  getAllPointShopsByData(shopsData);

// Change layer
const baseLayerElements: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('.div-choose-layer > div > input[type="radio"]');

baseLayerElements.forEach(baseLayerElement => {
  baseLayerElement.addEventListener('change', chooseLayer);
});

// * * * create map * * *

const starbucksShopSource = new VectorSource({
  features: starbucksAllPointShops,
});

export const starbucksShopLayer = new VectorLayer({
  source: starbucksShopSource,
});

const rasterLayer = new TileLayer({
  source: new OSM(),
  className: 'OSMStandard',
});

const OSMHumanitarian = new TileLayer({
  source: new OSM({
    url: 'https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    attributions:
      '&copy; Openstreetmap contributors, <a href="http://www.openstreetmap.org/copyright">ODbL</a>',
    crossOrigin: 'anonymous',
  }),
  className: 'OSMHumanitarian',
});

const StamenTerrain = new TileLayer({
  source: new OSM({
    url: 'https://stamen-tiles-{a-c}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg',
    attributions:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    crossOrigin: 'anonymous',
  }),
  className: 'StamenTerrain',
});

export const LayerGroup = new Group({
  layers: [OSMHumanitarian, StamenTerrain, rasterLayer],
});

export const view = new View({
  center: fromLonLat([38.896372, 33.6024]),
  zoom: 4,
  minZoom: 3,
});

export const map = new Map({
  target: 'map',
  layers: [LayerGroup, starbucksShopLayer],
  view: view,
});

// * * * create map * * *

//  * * * Add Popup Shop * * *
const shopInfo = document.getElementById('shop-info');

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }

  const pixel = map.getEventPixel(evt.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';

  if (hit) {
    const feature = map.forEachFeatureAtPixel(pixel, function (feature: any) {
      return feature;
    });

    if (feature) {
      const shop = shopsData.filter(
        shop => shop.store_id === feature.values_.id_
      )[0];

      if (shop) {
        shopInfo!.innerHTML = `
        <div>
          <span>name: ${shop.name}</span>
          <span>city: ${shop.city}</span>
        </div>`;

        shopInfo!.style.visibility = 'visible';
        shopInfo!.style.top = `${evt.pixel[1] + 80}px`;
        shopInfo!.style.left = `${evt.pixel[0] + 10}px`;
      } else {
        shopInfo!.style.visibility = 'hidden';
      }
    }
  } else {
    shopInfo!.style.visibility = 'hidden';
  }
});
//  * * * Add Popup Shop * * *
