// ol
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
// types
import { shopType } from '../vite-env';

// getAllPointShopsByData
export const getAllPointShopsByData = (data: shopType[]) => {
  const allPointShops: Feature<Point>[] = [];

  data.forEach(shop => {
    const pointShop = new Feature({
      geometry: new Point(fromLonLat([shop.longitude, shop.latitude])),
    });
    pointShop.setStyle(
      new Style({
        image: new Icon({
          src: '../../src/data/starbucks-logo.png',
          scale: 0.1,
          opacity: 0.75,
        }),
      })
    );
    pointShop.setProperties({
      id_: shop.store_id,
      name: shop.name,
      city: shop.city,
      longitude: shop.longitude,
      latitude: shop.latitude,
    });

    allPointShops.push(pointShop);
  });

  return allPointShops;
};
