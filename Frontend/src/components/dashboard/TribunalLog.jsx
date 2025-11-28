import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AGENTS = {
    AGGRESSOR: {
        id: 'AGGRESSOR',
        color: '#EF4444', // Red-500
        borderColor: 'border-red-500',
        shadowColor: 'shadow-red-500/50',
        textColor: 'text-red-500',
        glowClass: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]'
    },
    GUARDIAN: {
        id: 'GUARDIAN',
        color: '#06B6D4', // Cyan-500
        borderColor: 'border-cyan-500',
        shadowColor: 'shadow-cyan-500/50',
        textColor: 'text-cyan-500',
        glowClass: 'shadow-[0_0_10px_rgba(6,182,212,0.5)]'
    },
    LOGISTICAN: {
        id: 'LOGISTICAN',
        color: '#A855F7', // Purple-500
        borderColor: 'border-purple-500',
        shadowColor: 'shadow-purple-500/50',
        textColor: 'text-purple-500',
        glowClass: 'shadow-[0_0_10px_rgba(168,85,247,0.5)]'
    }
};

const MESSAGES = [
    { agent: 'AGGRESSOR', text: 'Target acquisition confirmed. Recommend immediate kinetic strike. Probability of success: 94%.' },
    { agent: 'GUARDIAN', text: 'Negative. Civilian density in sector 4 is too high. Collateral damage estimate exceeds acceptable parameters.' },
    { agent: 'LOGISTICAN', text: 'Fuel reserves at 68%. Rerouting for strike will require mid-air refueling. Asset availability: Low.' },
    { agent: 'AGGRESSOR', text: 'Delaying strike increases threat level. Enemy combatants are mobilizing. We lose the window in 45 seconds.' },
    { agent: 'GUARDIAN', text: 'Scanning for alternative engagement protocols. Non-lethal suppression options available.' },
    { agent: 'LOGISTICAN', text: 'Calculated cost efficiency of non-lethal vs kinetic: Non-lethal requires 2x resource allocation.' },
    { agent: 'AGGRESSOR', text: 'Cost is irrelevant. Neutralization is the priority. Execute Protocol Omega.' },
    { agent: 'GUARDIAN', text: 'Protocol Omega rejected. Authorization code invalid. Re-evaluating threat matrix.' },
    { agent: 'LOGISTICAN', text: 'Consensus required. Current system status: DEADLOCK.' },
    { agent: 'AGGRESSOR', text: 'Rerouting power to forward batteries. Preparing for autonomous override.' },
    { agent: 'GUARDIAN', text: 'Override blocked. Firewall active. Stand down, Aggressor.' },
    { agent: 'LOGISTICAN', text: 'Optimizing route for surveillance drone. Gathering more data.' }
];

const TribunalLog = () => {
    const [messages, setMessages] = useState([]);
    const [consensus, setConsensus] = useState(50);
    const scrollRef = useRef(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const msg = MESSAGES[index % MESSAGES.length];
            const newMsg = { ...msg, id: Date.now() + Math.random() };

            setMessages(prev => {
                const updated = [...prev, newMsg];
                if (updated.length > 20) updated.shift(); // Keep log manageable
                return updated;
            });

            // Simulate consensus fluctuation
            setConsensus(prev => {
                const change = Math.random() * 10 - 5;
                return Math.min(100, Math.max(0, prev + change));
            });

            index++;
        }, 2500); // New message every 2.5s

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-[#333] overflow-hidden relative">
            {/* Header / Consensus Bar */}
            <div className="p-4 border-b border-[#333] bg-[#111]">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-mono text-gray-400 tracking-widest">TRIBUNAL CONSENSUS</h3>
                    <span className="text-xs font-mono text-[#00FFFF]">{Math.round(consensus)}%</span>
                </div>
                <div className="w-full h-1 bg-[#333] relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500"
                        animate={{ width: `${consensus}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Log Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                        const agent = AGENTS[msg.agent];
                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`border-l-2 ${agent.borderColor} bg-white/5 p-3 relative group`}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-${agent.color}`} />
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-bold font-mono tracking-wider ${agent.textColor}`}>
                                        {agent.id}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        {new Date().toLocaleTimeString([], { hour12: false })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                                    {msg.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Status Footer */}
            <div className="p-2 border-t border-[#333] bg-[#111] flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>STATUS: DELIBERATING</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150" />
                </div>
            </div>
        </div>
    );
};

export default TribunalLog;
