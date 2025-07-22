import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Panel from './Panel';
import L from 'leaflet';

// Fix default icon path issue in Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const sites = [
  { id: 1, name: 'Jonican',  pos: [37.4, -82.5] },
  { id: 2, name: 'Biggs',    pos: [37.45, -82.2] },
  { id: 3, name: 'Regina',   pos: [37.25, -82.4] },
  { id: 4, name: 'Gateway Motel', pos: [37.27, -82.3] },
];

export default function MapSection({ onClickSite }) {
  return (
    <Panel title="Project Site Alpha" sx={{ height: '100%' }}>
      <div style={{ height: 320, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
        <MapContainer center={[37.35, -82.35]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {sites.map(s => (
            <Marker key={s.id} position={s.pos} eventHandlers={{ click: () => onClickSite(s) }}>
              <Popup>{s.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Weather bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12 }}>
        <span>🌡️ 23°C</span>
        <span>💨 12km/h</span>
        <span>☀️ Clear</span>
      </div>

      {/* Capacity & progress */}
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase' }}>Total Capacity</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>150 MM</div>
          <div style={{ fontSize: 11, color: '#10b981' }}>+15% from planned</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase' }}>Progress</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>40%</div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginTop: 6 }}>
            <div style={{ height: '100%', width: '40%', background: '#10b981', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
