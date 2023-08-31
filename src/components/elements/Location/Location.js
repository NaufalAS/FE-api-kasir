import React from 'react';

const  LocationList = ({ transactionList }) => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const map = document.getElementById('map');
    map.innerHTML = `<iframe width="500" height="500" src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed"></iframe>`;
  });

  return (
    <div id="map">Lokasi outlet</div>
  )
}

export default LocationList