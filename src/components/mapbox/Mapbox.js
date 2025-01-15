import React, { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import './Mapbox.css'

const zoomLevels = {
    EARTH: 1,
    COUNTRY: 3,
    STATE: 5,
    CITY: 7,
    COUNTY: 9,
    AREA: 11,
    BLOCK: 13,
    STREET: 15
}

const mapboxOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0.0, 0, 0],
    zoom: zoomLevels.BLOCK
};

function MapboxComponent(props) {

    const [gloc, setGloc] = useState({ latitude: 0.0, longitude: 0.0 });
    // const [map, updateMap] = useState(null);

    useEffect(() => {
        const initializeMapbox = () => {
            mapboxOptions.center = [gloc['longitude'], gloc['latitude']];
            console.log(gloc);
            mapboxgl.accessToken = sessionStorage.getItem('MapToken');
            // updateMap();
            var map = new mapboxgl.Map(mapboxOptions)

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                `What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                `
            );

            const el = document.createElement('div');
            el.id = 'marker';
            el.classList.add('fui-location-marker');

            new mapboxgl.Marker(el)
                .setLngLat([gloc.longitude, gloc.latitude])
                .setPopup(popup)
                .addTo(map);

            // map.flyTo({
            //     center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
            //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
            //     });
        }

        const getGlocs = setInterval(() => {
            if (props.params.latitude !== 0.0 && props.params.longitude !== 0.0) {
                setGloc(props.params);
                clearInterval(getGlocs);
                initializeMapbox(props.params);
            }
        }, 1000);
    }, [gloc, props])

    return (
        <div id="map" className="fui-mapbox"></div>
    );
}

export default MapboxComponent;