import { MapBrowserEvent } from 'ol';
import { map, shopsData } from '../main';

const shopInfo = document.getElementById('shop-info');

export const createPopUpShop = (evt: MapBrowserEvent<any>) => {
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

    // check if have feature
    if (feature) {
      const shop = shopsData.filter(
        shop => shop.store_id === feature.values_.id_
      )[0];

      // check if feature is shop (maybe have other feature)
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
};
