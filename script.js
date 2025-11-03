mapboxgl.accessToken = 'pk.eyJ1IjoicGFtdG9uZyIsImEiOiJjbWg5Y2Jka2MwbjFwMm9vb2FrZnZsc3J5In0.iqRw1Ebsq6UA8hTxQPP1Pg';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/pamtong/cmh9cfcei00ap01sqfzts1h9y',
  center: [-122.2748, 37.8725], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
});

map.on('load', function () {
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/ZhexinTong/183GeoData/refs/heads/main/data/183data.geojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#FF5C00',
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

  // Add click event for popups
  map.on('click', 'points-layer', (e) => {
    //Copy coordinates array
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    //Create popup content using the actual data
    const popupContent = `
            <div>
                <h3>${properties["original_*Landmark*"]}</h3>
                <p><strong>Address:</strong> ${properties["original_*Address*"]}</p>
                <p><strong>Architect & Date:</strong> ${properties["original_*Architect & Date*"]}</p>
                <p><strong>Designated:</strong> ${properties["original_*  Designated  *"]}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties["original_*Notes*"]}</p>` : ''}
            </div>
        `;
  });
});