// Format meteorite data 

// input: data, lat, lon
// output: [{ name, mass, year, distance } ... ]

const formatData = (data, refLat, refLon) => {
  const calcDistance = (lat1, lon1, lat2, lon2) => {
    // credit: https://www.geodatasource.com/developers/javascript
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515 * 1.609344;
      return dist;
    }
  }

  let newArr = [];

  data.forEach(item => {
    newArr.push({
      name: item.name, 
      mass: parseInt(item.mass) ? parseInt(item.mass) : 1, // scaleLog can't handle zero so if the number is not set, set it 1
      year: new Date(item.year).getFullYear(),
      distance: calcDistance(item.reclat? parseFloat(item.reclat) : 0, item.reclong ? parseFloat(item.reclong) : 0, refLat, refLon)
    });
  });

  return newArr;
}
export default formatData;
