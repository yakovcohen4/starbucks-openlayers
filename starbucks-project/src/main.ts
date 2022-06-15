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
import { getAllPointShopsByData } from './utils/helpers/getAllPointShopsByData';
import { chooseCountry } from './utils/chooseCountry';
import { fetchGeoJsonCountry } from './utils/fetchGeoJsonCountry';
import { chooseLayer } from './utils/changeLayer';
// helper Data
import countries from './data/countryAlpha2.json';
import mapLayers from './data/mapLayers.json';
import { createPopUpShop } from './utils/createPopUpShop';

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
    url: mapLayers.OSMHumanitarian.url,
    attributions: mapLayers.OSMHumanitarian.attributions,
    crossOrigin: 'anonymous',
  }),
  className: 'OSMHumanitarian',
});

const StamenTerrain = new TileLayer({
  source: new OSM({
    url: mapLayers.StamenTerrain.url,
    attributions: mapLayers.StamenTerrain.attributions,
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
map.on('pointermove', createPopUpShop);
//  * * * Add Popup Shop * * *
