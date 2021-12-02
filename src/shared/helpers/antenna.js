import { fetchConToken } from "./fetch";

// TODO : Hacer los DocsStrings/Documentacion de las funciones

export const antenna_model = ( antennas, antennaId ) => {
  // console.log( 'antennas: ',antennas)
  // console.log( 'antenna ID: ',antennaId)
  // console.log(antennas.find( antenna => antenna.id === antennaId ));
  return antennas.find( antenna => antenna.id === antennaId ).name ;
};


export const typeHeight = ( antennas, antennaId, antennaHeightTypeId ) => {
  const antenna_order = antennas.find( antenna => antenna.id === antennaId );
  return antenna_order.height_types.find( height_type => height_type.id === antennaHeightTypeId ).name;
};


export const movingPoints = async( orderId, antennas, username ) => {
  const res = await fetchConToken( `orders/${ orderId }`, username );
  const resOrders = await res.json ();

  return resOrders.data.order.movingPoints.map( movingPoint => ({
    url_rinex: movingPoint.file.id,
    base_name: movingPoint.name,
    antenna_model: antenna_model( antennas, movingPoint.antennaId ),
    antenna_height: movingPoint.heigth,
    antenna_type_height: typeHeight( antennas, movingPoint.antennaId, movingPoint.antennaHeightTypeId ),
  }));
};


