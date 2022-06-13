import { LayerGroup } from '../main';

export const chooseLayer = (e: Event) => {
  const baseLayerElementChecked = e.target as HTMLInputElement;
  const baseLayerClassName = baseLayerElementChecked.value;
  LayerGroup.getLayers().forEach(layer => {
    if (layer.getClassName() === baseLayerClassName) {
      layer.setVisible(true);
    } else {
      layer.setVisible(false);
    }
  });
};
