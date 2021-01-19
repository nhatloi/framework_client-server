import React from 'react'
import GoogleMapReact from 'google-map-react';


function Test() {
    const center= {
        lat: 0,
        lng: 0,
    }
    const zoom = 18
      
      const success = (pos) =>{
        var crd = pos.coords;
        center.lat = crd.latitude;
        center.lng = crd.longitude;
      }
      
      const error = (err) =>{
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error);


    return (
        <div className='container'>
            <div style={{ height: '500px', width: '500px' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDgaev2xgHUTf5DQ_ICTcwz2CCWa1i5TNs' }}
                defaultCenter={center}
                defaultZoom={zoom}
                >
            </GoogleMapReact>
            </div>
        </div>
        
    )
}

export default Test
