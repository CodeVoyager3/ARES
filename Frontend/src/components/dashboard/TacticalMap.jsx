import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const TacticalMap = ({ threats = [] }) => {
    const center = [28.61, 77.20]; // New Delhi

    // Custom Icon for Threats
    const threatIcon = new L.DivIcon({
        className: 'custom-icon',
        html: `<div style="
            width: 24px;
            height: 24px;
            border: 2px solid #FF0000;
            border-radius: 50%;
            background-color: rgba(255, 0, 0, 0.2);
            box-shadow: 0 0 10px #FF0000;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        ">
            <div style="
                width: 4px;
                height: 4px;
                background-color: #FF0000;
                border-radius: 50%;
            "></div>
            <div style="
                position: absolute;
                top: -4px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 4px;
                background-color: #FF0000;
            "></div>
            <div style="
                position: absolute;
                bottom: -4px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 4px;
                background-color: #FF0000;
            "></div>
            <div style="
                position: absolute;
                left: -4px;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 2px;
                background-color: #FF0000;
            "></div>
            <div style="
                position: absolute;
                right: -4px;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 2px;
                background-color: #FF0000;
            "></div>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });

    return (
        <div className="w-full h-full relative border border-[#333] overflow-hidden">
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: '100%', width: '100%', background: '#000' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                    style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                />

                {threats.map((threat, index) => (
                    <Marker
                        key={index}
                        position={[threat.lat, threat.lng]}
                        icon={threatIcon}
                    >
                        <Popup className="tactical-popup">
                            <div className="bg-black text-[#00FFFF] border border-[#00FFFF] p-2 font-mono text-xs">
                                <h3 className="font-bold border-b border-[#00FFFF]/30 mb-1">{threat.id}</h3>
                                <p>TYPE: {threat.type}</p>
                                <p>STATUS: {threat.status}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Overlay Elements */}
            <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
                <div className="text-[#00FFFF] font-mono text-xs bg-black/50 px-2 py-1 border border-[#00FFFF]/30 backdrop-blur-sm">
                    COORDS: 28.61° N, 77.20° E
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FFFF] z-[1000] pointer-events-none" />

            <style>{`
                .leaflet-container {
                    background: #000 !important;
                }
                .map-tiles {
                    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
                }
                .tactical-popup .leaflet-popup-content-wrapper {
                    background: transparent;
                    box-shadow: none;
                    padding: 0;
                    border-radius: 0;
                }
                .tactical-popup .leaflet-popup-tip {
                    background: #000;
                    border: 1px solid #00FFFF;
                }
            `}</style>
        </div>
    );
};

export default TacticalMap;
