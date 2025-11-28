import { useState, useEffect } from 'react';

const THREAT_TYPES = ['DRONE_SWARM', 'INFANTRY', 'SEISMIC_ANOMALY'];
const SECTORS = ['Sector-1', 'Sector-2', 'Sector-3', 'Sector-4', 'Sector-5'];

export const useThreatSimulation = () => {
    const [activeThreats, setActiveThreats] = useState([]);
    const [systemStatus, setSystemStatus] = useState('ONLINE');
    const [recentLogs, setRecentLogs] = useState([]);

    useEffect(() => {
        // Initial threats
        setActiveThreats([
            { id: 'T-INITIAL-01', type: 'INTRUSION', coordinates: [28.61, 77.20], sector: 'Sector-4', isZyndVerified: true, timestamp: new Date(), status: 'ACTIVE' },
            { id: 'T-INITIAL-02', type: 'ANOMALY', coordinates: [28.55, 77.25], sector: 'Sector-2', isZyndVerified: true, timestamp: new Date(), status: 'TRACKING' }
        ]);

        const interval = setInterval(() => {
            const id = `T-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            const type = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
            const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)];

            // Random coordinates around New Delhi (28.61, 77.20)
            // Variance approx +/- 0.1 degrees
            const lat = 28.61 + (Math.random() - 0.5) * 0.2;
            const lng = 77.20 + (Math.random() - 0.5) * 0.2;

            const isZyndVerified = Math.random() > 0.1; // 90% chance true

            const newThreat = {
                id,
                type,
                coordinates: [lat, lng],
                sector,
                isZyndVerified,
                timestamp: new Date(),
                status: isZyndVerified ? 'ACTIVE' : 'BLOCKED'
            };

            if (isZyndVerified) {
                setActiveThreats(prev => {
                    const updated = [...prev, newThreat];
                    if (updated.length > 10) updated.shift(); // Keep max 10 threats
                    return updated;
                });
                setRecentLogs(prev => [`[${new Date().toLocaleTimeString()}] Threat ${id} verified. Engaging.`, ...prev].slice(0, 50));
            } else {
                setRecentLogs(prev => [`[${new Date().toLocaleTimeString()}] SPOOF DETECTED: Threat ${id} rejected by Zynd Protocol.`, ...prev].slice(0, 50));
            }

        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return { activeThreats, systemStatus, recentLogs };
};
