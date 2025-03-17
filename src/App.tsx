import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Shield, Code, Brain, Zap, Network, Lock, Activity, Power, Home, Settings, Database, Users } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [networkStatus, setNetworkStatus] = useState<number[]>(Array(9).fill(0));
  const [securityLevel, setSecurityLevel] = useState(0);
  const [activeNav, setActiveNav] = useState('home');
  const fullText = '> SYSTEM INITIALIZED_';

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME' },
    { id: 'network', icon: Network, label: 'NETWORK' },
    { id: 'database', icon: Database, label: 'DATABASE' },
    { id: 'users', icon: Users, label: 'USERS' },
    { id: 'settings', icon: Settings, label: 'SETTINGS' },
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(prev => 
        prev.map(() => Math.floor(Math.random() * 100))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value > 80) return 'text-neon-green';
    if (value > 40) return 'text-neon-cyan';
    return 'text-neon-pink';
  };

  const incrementSecurity = () => {
    setSecurityLevel(prev => (prev + 1) % 4);
  };

  const getSecurityStatus = () => {
    switch (securityLevel) {
      case 0: return { text: 'MINIMAL', color: 'text-neon-pink' };
      case 1: return { text: 'MODERATE', color: 'text-neon-purple' };
      case 2: return { text: 'HIGH', color: 'text-neon-cyan' };
      case 3: return { text: 'MAXIMUM', color: 'text-neon-green' };
      default: return { text: 'UNKNOWN', color: 'text-white' };
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      {/* Header */}
      <header className="cyber-container mb-8 md:mb-12">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Power 
              className="w-8 h-8 text-neon-purple cursor-pointer hover:text-neon-cyan transition-colors"
              onClick={() => setText(prev => prev ? '' : fullText)}
            />
            <h1 className="cyber-text text-neon-purple text-4xl md:text-6xl neon-glow">CYBER_OS</h1>
          </div>
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-neon-cyan animate-pulse" />
            <Terminal className="w-6 h-6 text-neon-green" />
            <Cpu className="w-6 h-6 text-neon-pink" />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="cyber-container mb-8">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-4 gap-4">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                activeNav === id
                  ? 'text-neon-cyan border-b-2 border-neon-cyan'
                  : 'text-neon-purple hover:text-neon-cyan'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="cyber-container">
          <div className="bg-black/80 p-4 md:p-6">
            <h2 className="cyber-text text-neon-cyan mb-4 glitch">[SYSTEM_STATUS]</h2>
            <div className="font-mono text-neon-green">
              <p className="mb-2">{text}<span className="animate-terminal-blink">█</span></p>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4" />
                <p>CPU: OPERATIONAL</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4" />
                <p>MEMORY: 98.2% AVAILABLE</p>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <p>SECURITY: <span className={getSecurityStatus().color}>{getSecurityStatus().text}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-container">
          <div className="bg-black/80 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="cyber-text text-neon-pink">[NEURAL_NETWORK]</h2>
              <Network className="w-6 h-6 text-neon-purple animate-pulse" />
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {networkStatus.map((status, i) => (
                <div
                  key={i}
                  className={`aspect-square border-2 border-neon-purple/30 flex flex-col items-center justify-center p-2 transition-all duration-300 hover:border-neon-purple cursor-pointer ${
                    status > 60 ? 'bg-neon-purple/10' : ''
                  }`}
                >
                  <Code className={`w-5 h-5 mb-1 ${getStatusColor(status)}`} />
                  <span className={`text-xs ${getStatusColor(status)}`}>
                    {status}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cyber-container md:col-span-2">
          <div className="bg-black/80 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="cyber-text text-neon-green">[TERMINAL_ACCESS]</h2>
              <Zap className="w-6 h-6 text-neon-green" />
            </div>
            <button 
              className="cyber-button mb-4 w-full md:w-auto"
              onClick={incrementSecurity}
            >
              ENHANCE SECURITY
            </button>
            <div className="font-mono text-sm text-neon-green/70 space-y-1">
              <p>{'>'} Running security protocols...</p>
              <p>{'>'} Establishing secure connection...</p>
              <p>{'>'} Neural network optimization: {Math.max(...networkStatus)}% efficiency</p>
              <p>{'>'} Security level: {getSecurityStatus().text}</p>
              <p>{'>'} Access granted...</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 md:mt-12 text-center">
        <p className="text-neon-purple/50 cyber-text">
          © 2025 CYBER_OS | ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}

export default App;