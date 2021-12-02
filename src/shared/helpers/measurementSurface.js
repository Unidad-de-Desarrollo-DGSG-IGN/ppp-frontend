export const measurementSurfaceModel = ( measurementSurfaceList, measurementSurfaceId ) => {
  return measurementSurfaceList.find( measurementSurfaceElement => measurementSurfaceElement.id === measurementSurfaceId )?.name ;
};