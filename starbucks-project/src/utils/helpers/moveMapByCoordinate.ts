import { fromLonLat } from 'ol/proj';
import { view } from '../../main';

export const moveMapByCoordinate = (longitude: number, latitude: number) => {
  // View the map to the country
  view.animate({
    center: fromLonLat([longitude, latitude]),
    duration: 2000,
    zoom: 6,
  });
};
