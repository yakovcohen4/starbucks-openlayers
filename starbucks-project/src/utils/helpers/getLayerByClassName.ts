import BaseLayer from 'ol/layer/Base';

export const getLayerByClassName = (
  allMapLayers: BaseLayer[],
  className: string
) => {
  return allMapLayers.filter(
    (layer: BaseLayer) => layer.getClassName() === className
  )[0];
};
