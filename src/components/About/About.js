import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class About extends Component {


    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.760654, lng: -111.891096 }}
            >
                <Marker
                    position={{ lat: 40.760654, lng: -111.891096 }}
                />
            </GoogleMap>
        ));
        return (
            <div className='About'>
                <Header title={'About'} />
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDp-SRf_-MLK5CrBi3zzGjOrwgmjYVLbBo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <h3>Creado en Salt Lake City, Utah.</h3>
                <h3>¡DANDY esta fantástico!</h3>
            </div >
        )
    }
}
