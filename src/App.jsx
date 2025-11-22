import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  Server, 
  GitBranch, 
  CheckCircle, 
  Play, 
  Box,
  Layers,
  Code,
  ArrowDown,
  ExternalLink,
  Command,
  Hash,
  Container,       // Docker
  Network,         // Kubernetes
  CloudLightning,  // AWS
  Settings,        // Jenkins
  GitGraph,        // Git
  FileCode,        // Python
  Leaf             // MongoDB
} from 'lucide-react';

/**
 * Aaditya Desai - The DevOps Pipeline Portfolio
 * Concept: The user scrolls through a "Continuous Delivery" pipeline.
 * Visuals: Neon Green/Cyan on Deep Void Black.
 */

// --- Icons & Assets ---

const TechIcon = ({ name, color }) => {
  // Icon Mapping with specific animations
  const iconMap = {
    'Docker': { Icon: Container, animation: 'animate-float' },
    'Kubernetes': { Icon: Network, animation: 'animate-pulse-slow' },
    'AWS': { Icon: CloudLightning, animation: 'animate-pulse' },
    'Jenkins': { Icon: Settings, animation: 'animate-spin-slow' },
    'Git': { Icon: GitGraph, animation: '' },
    'Python': { Icon: FileCode, animation: 'animate-float-delayed' },
    'NodeJS': { Icon: Cpu, animation: 'animate-pulse-slow' },
    'MySQL': { Icon: Database, animation: '' },
    'MongoDB': { Icon: Leaf, animation: 'animate-float' },
  };

  const { Icon, animation } = iconMap[name] || { Icon: Hash, animation: '' };

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-${color}-500 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-${color}-500/20`}>
      <div className={`text-${color}-500 mb-3 group-hover:scale-110 transition-transform duration-500 ${animation}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <span className="text-xs font-mono text-slate-400 group-hover:text-white tracking-wider">{name}</span>
    </div>
  );
};

// --- Components ---

const PipelineNode = ({ active }) => (
  <div className="relative flex items-center justify-center w-8 h-8 z-10">
    <div className={`absolute inset-0 rounded-full bg-slate-900 border-2 ${active ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'border-slate-700'}`}></div>
    <div className={`w-3 h-3 rounded-full ${active ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`}></div>
  </div>
);

const StatusBadge = ({ status }) => (
  <div className="flex items-center space-x-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs font-mono">
    <span className={`w-2 h-2 rounded-full ${status === 'Running' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
    <span className={status === 'Running' ? 'text-green-400' : 'text-yellow-400'}>{status}</span>
  </div>
);

const TerminalBlock = ({ title, children }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
    <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
      </div>
      <div className="text-slate-500 text-xs">{title}</div>
    </div>
    <div className="p-4 text-slate-300 space-y-2">
      {children}
    </div>
  </div>
);

// --- Main App ---

export default function DevOpsPortfolio() {
  const [activeStage, setActiveStage] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate Scroll Progress (0 to 1)
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);

      // 2. Detect Active Section
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Trigger slightly before the middle of the screen
          return rect.top >= -200 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (current) {
        setActiveStage(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
      
      {/* Fixed Background Grid */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none"></div>

      {/* Navigation / HUD */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <div className="p-1.5 bg-cyan-500/10 rounded text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Terminal size={20} />
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg">
              <span className="text-cyan-400">~/</span>aaditya-desai
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-mono">
             <button onClick={() => scrollTo('about')} className={`transition-colors ${activeStage === 'about' ? 'text-cyan-400' : 'text-slate-600 hover:text-cyan-400'}`}>01. init</button>
             <button onClick={() => scrollTo('skills')} className={`transition-colors ${activeStage === 'skills' ? 'text-cyan-400' : 'text-slate-600 hover:text-cyan-400'}`}>02. build</button>
             <button onClick={() => scrollTo('projects')} className={`transition-colors ${activeStage === 'projects' ? 'text-cyan-400' : 'text-slate-600 hover:text-cyan-400'}`}>03. deploy</button>
             <button onClick={() => scrollTo('contact')} className={`transition-colors ${activeStage === 'contact' ? 'text-cyan-400' : 'text-slate-600 hover:text-cyan-400'}`}>04. ping</button>
             <a href="assets/Aaditya_Desai_CV.pdf" className="px-4 py-2 border border-cyan-500/30 text-cyan-400 rounded hover:bg-cyan-500/10 transition-all">
               View Logs (CV)
             </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-400">
                <Command size={24} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0c] pt-20 px-6 md:hidden">
          <div className="flex flex-col space-y-6 font-mono text-xl">
             <button onClick={() => scrollTo('about')} className="text-left border-b border-slate-800 pb-4"><span className="text-cyan-500">01.</span> Initialize</button>
             <button onClick={() => scrollTo('skills')} className="text-left border-b border-slate-800 pb-4"><span className="text-cyan-500">02.</span> Build Stack</button>
             <button onClick={() => scrollTo('projects')} className="text-left border-b border-slate-800 pb-4"><span className="text-cyan-500">03.</span> Deployments</button>
             <button onClick={() => scrollTo('contact')} className="text-left border-b border-slate-800 pb-4"><span className="text-cyan-500">04.</span> Ping Me</button>
          </div>
        </div>
      )}

      {/* --- HERO SECTION: THE INFINITY LOOP --- */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          
          {/* Animated Infinity Symbol Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] md:w-[800px] md:h-[400px] pointer-events-none opacity-30 md:opacity-40">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* The Infinity Path */}
              <path 
                d="M50,50 C20,50 20,90 50,90 C80,90 80,50 100,50 C120,50 120,10 150,10 C180,10 180,50 150,50 C120,50 120,90 100,90 C80,90 80,50 50,50 C20,50 20,10 50,10 C80,10 80,50 100,50" 
                fill="none" 
                stroke="#1e293b" 
                strokeWidth="4" 
              />
              {/* The Glowing Active Path */}
              <path 
                className="animate-dash"
                d="M50,50 C20,50 20,90 50,90 C80,90 80,50 100,50 C120,50 120,10 150,10 C180,10 180,50 150,50 C120,50 120,90 100,90 C80,90 80,50 50,50 C20,50 20,10 50,10 C80,10 80,50 100,50" 
                fill="none" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Main Hero Content */}
          <div className="relative space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur border border-cyan-500/30 rounded-full px-4 py-1.5 mb-4">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
               <span className="text-xs font-mono text-cyan-400">System Operational</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
              Aaditya Desai
            </h1>
            <div className="text-xl md:text-2xl font-mono text-slate-400 h-8 overflow-hidden">
              <span className="animate-typing block whitespace-nowrap border-r-2 border-cyan-500 overflow-hidden w-full">
                Automating CI/CD Pipelines...
              </span>
            </div>
            
            <p className="max-w-xl mx-auto text-slate-400 leading-relaxed">
              Bridging the gap between development and operations. 
              Designing autonomous infrastructure that scales infinitely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button onClick={() => scrollTo('projects')} className="group relative px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono rounded overflow-hidden transition-all">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="flex items-center gap-2"><Play size={16} fill="currentColor" /> START PIPELINE</span>
              </button>
              <a href="https://github.com/aaditya-desai1" target="_blank" rel="noreferrer" className="px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-900 text-slate-300 font-mono rounded transition-all flex items-center gap-2">
                <Github size={18} /> :: REPO
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Initialize</span>
        </div>
      </section>

      {/* --- THE MAIN PIPELINE --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vertical Connection Line (The Pipeline) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 z-0 hidden md:block">
           <div 
             className="absolute w-2 h-32 -ml-[3px] bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0 blur-sm transition-all duration-100 ease-out"
             style={{ top: `${scrollProgress * 100}%`, transform: 'translateY(-50%)' }}
           ></div>
        </div>

        {/* Section 1: ABOUT (INIT) */}
        <section id="about" className="py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            
            {/* Left Side Content */}
            <div className="md:w-5/12 order-2 md:order-1 text-right md:pr-12">
               <div className="inline-block mb-4">
                  <span className="text-cyan-500 font-mono text-sm font-bold">01. INITIALIZATION</span>
                  <h2 className="text-3xl font-bold text-white mt-1">About Me</h2>
               </div>
               <p className="text-slate-400 leading-relaxed mb-6">
                 I'm a DevOps engineer based in India, obsessed with the space where code meets infrastructure. 
                 Since 2023, I've been architecting systems that reduce deployment friction and increase reliability.
               </p>
               <div className="flex flex-wrap justify-end gap-2">
                 {['Trekking', 'Singing', 'Riding', 'Cooking'].map(hobby => (
                   <span key={hobby} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400 font-mono">
                     {hobby}
                   </span>
                 ))}
               </div>
            </div>

            {/* Center Node */}
            <div className="hidden md:flex md:w-2/12 justify-center pt-4">
               <PipelineNode active={activeStage === 'about'} />
            </div>

            {/* Right Side Terminal */}
            <div className="md:w-5/12 order-1 md:order-2 pl-0 md:pl-12 w-full">
               <TerminalBlock title="aaditya@devops:~/profile">
                 <p><span className="text-green-400">➜</span> <span className="text-cyan-300">whoami</span></p>
                 <p className="text-slate-400">
                   Aaditya Desai<br/>
                   Role: DevOps Engineer<br/>
                   Status: Active<br/>
                   Location: India<br/>
                 </p>
                 <p className="mt-4"><span className="text-green-400">➜</span> <span className="text-cyan-300">cat mission.txt</span></p>
                 <p className="text-slate-400">
                   To deliver seamless automation experiences and help businesses scale efficiently.
                 </p>
               </TerminalBlock>
            </div>

          </div>
        </section>

        {/* Section 2: SKILLS (BUILD) */}
        <section id="skills" className="py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left: Skills Grid */}
            <div className="md:w-5/12 order-2 text-left md:pr-12 w-full">
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TechIcon name="Docker" color="blue" />
                  <TechIcon name="Kubernetes" color="blue" />
                  <TechIcon name="AWS" color="yellow" />
                  <TechIcon name="Jenkins" color="red" />
                  <TechIcon name="Git" color="orange" />
                  <TechIcon name="Python" color="yellow" />
                  <TechIcon name="NodeJS" color="green" />
                  <TechIcon name="MySQL" color="blue" />
                  <TechIcon name="MongoDB" color="green" />
               </div>
            </div>

            {/* Center Node */}
            <div className="hidden md:flex md:w-2/12 justify-center">
               <PipelineNode active={activeStage === 'skills'} />
            </div>

            {/* Right: Title */}
            <div className="md:w-5/12 order-1 pl-0 md:pl-12">
               <div className="inline-block mb-6">
                  <span className="text-purple-500 font-mono text-sm font-bold">02. BUILD & DEPENDENCIES</span>
                  <h2 className="text-3xl font-bold text-white mt-1">Tech Stack</h2>
               </div>
               <p className="text-slate-400 mb-6">
                 My arsenal includes industry-standard tools for containerization, orchestration, and cloud infrastructure. 
                 I treat infrastructure as code and automation as a lifestyle.
               </p>
               <ul className="space-y-2 font-mono text-sm text-slate-500">
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Automated Pipelines</li>
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Cloud Native Arch</li>
                 <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Zero Downtime Deploys</li>
               </ul>
            </div>

          </div>
        </section>

        {/* Section 3: PROJECTS (DEPLOY) */}
        <section id="projects" className="py-20 md:py-32 relative z-10">
           <div className="text-center mb-16 md:hidden">
              <span className="text-cyan-500 font-mono text-sm font-bold">03. DEPLOYMENTS</span>
              <h2 className="text-3xl font-bold text-white">Featured Work</h2>
           </div>

           {/* Project 1 */}
           <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
             <div className="md:w-5/12 order-2 md:order-1 md:pr-12 text-right">
                {/* Desktop Title */}
                <div className="hidden md:block mb-8">
                   <span className="text-cyan-500 font-mono text-sm font-bold">03. DEPLOYMENTS</span>
                   <h2 className="text-3xl font-bold text-white mt-1">Featured Work</h2>
                </div>

                <StatusBadge status="Running" />
                <h3 className="text-2xl font-bold text-white mt-3 mb-2">ClothLoop</h3>
                <p className="text-slate-400 mb-4">
                  A modern clothing rental platform connecting people for short-term garment use. 
                  Full-stack architecture with robust database management.
                </p>
                <div className="flex flex-wrap justify-end gap-2 mb-6">
                   <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">PHP</span>
                   <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">MySQL</span>
                   <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">Web</span>
                </div>
                <button className="text-sm font-mono border-b border-cyan-500 text-cyan-400 hover:text-cyan-300 pb-1">View Deployment</button>
             </div>
             
             <div className="hidden md:flex md:w-2/12 justify-center relative">
                <PipelineNode active={activeStage === 'projects'} />
                {/* Branch line */}
                <div className="absolute top-1/2 right-1/2 w-1/2 h-0.5 bg-slate-800"></div>
             </div>

             <div className="md:w-5/12 order-1 md:order-2 md:pl-12">
                <div className="relative rounded-lg overflow-hidden border border-slate-800 group">
                   <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" alt="ClothLoop" className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                </div>
             </div>
           </div>

           {/* Project 2 */}
           <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-5/12 order-1 md:order-1 md:pr-12">
                <div className="relative rounded-lg overflow-hidden border border-slate-800 group">
                   <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="DataVizPro" className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                </div>
             </div>
             
             <div className="hidden md:flex md:w-2/12 justify-center relative">
                <PipelineNode active={activeStage === 'projects'} />
                {/* Branch line */}
                <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-slate-800"></div>
             </div>

             <div className="md:w-5/12 order-2 md:order-2 md:pl-12 text-left">
                <StatusBadge status="Scaled" />
                <h3 className="text-2xl font-bold text-white mt-3 mb-2">DataVizPro</h3>
                <p className="text-slate-400 mb-4">
                  Automated data visualization tool creating meaningful insights from raw datasets. 
                  Uses D3.js for rendering and Node.js for backend processing.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                   <span className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded">D3.js</span>
                   <span className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded">Node</span>
                   <span className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded">Mongo</span>
                </div>
                <button className="text-sm font-mono border-b border-purple-500 text-purple-400 hover:text-purple-300 pb-1">View Deployment</button>
             </div>
           </div>

        </section>

        {/* Section 4: CONTACT (MONITOR) */}
        <section id="contact" className="py-20 md:py-32 relative z-10">
           <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-green-500 font-mono text-sm font-bold">04. MONITORING & LOGS</span>
              <h2 className="text-4xl font-bold text-white mt-2 mb-6">Establish Connection</h2>
              <p className="text-slate-400">
                The pipeline is open. Whether you have a question about infrastructure, 
                want to collaborate on a project, or just want to say hi, I'll try my best to get back to you!
              </p>
           </div>

           <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
              
              {/* Contact Options */}
              <div className="flex-1 space-y-4">
                 <a href="mailto:desaiadity2710@gmail.com" className="block p-6 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-slate-800 rounded-full text-cyan-400 group-hover:scale-110 transition-transform">
                          <Mail size={20} />
                       </div>
                       <div>
                          <h4 className="text-white font-medium">Email</h4>
                          <p className="text-slate-500 text-sm group-hover:text-cyan-400 transition-colors">desaiadity2710@gmail.com</p>
                       </div>
                    </div>
                 </a>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <a href="https://linkedin.com/in/aaditya-desai1" className="p-6 bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-lg transition-all flex flex-col items-center justify-center gap-3 group">
                       <Linkedin className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                       <span className="text-sm text-slate-500">LinkedIn</span>
                    </a>
                    <a href="https://x.com/imrusheez" className="p-6 bg-slate-900/50 border border-slate-800 hover:border-white/50 rounded-lg transition-all flex flex-col items-center justify-center gap-3 group">
                       <Twitter className="text-slate-400 group-hover:text-white transition-colors" />
                       <span className="text-sm text-slate-500">X / Twitter</span>
                    </a>
                 </div>
              </div>

              {/* Simple Terminal Output Form Simulation */}
              <div className="flex-1 bg-black border border-slate-800 rounded-lg p-6 font-mono text-sm shadow-2xl">
                 <div className="text-slate-500 mb-4"># Send a message directly to my inbox</div>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                       <label className="block text-cyan-500 mb-1">var Name =</label>
                       <input type="text" className="w-full bg-slate-900 border-none text-white focus:ring-1 focus:ring-cyan-500 rounded px-3 py-2" placeholder='"John Doe"' />
                    </div>
                    <div>
                       <label className="block text-cyan-500 mb-1">var Email =</label>
                       <input type="email" className="w-full bg-slate-900 border-none text-white focus:ring-1 focus:ring-cyan-500 rounded px-3 py-2" placeholder='"john@example.com"' />
                    </div>
                    <div>
                       <label className="block text-cyan-500 mb-1">func Message() {`{`}</label>
                       <textarea rows="3" className="w-full bg-slate-900 border-none text-white focus:ring-1 focus:ring-cyan-500 rounded px-3 py-2 mt-1" placeholder="// Type your message here..." ></textarea>
                       <div className="text-cyan-500 mt-1">{`}`}</div>
                    </div>
                    <button className="w-full bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 py-2 hover:bg-cyan-500 hover:text-black transition-all uppercase tracking-wider font-bold text-xs">
                       Execute Send()
                    </button>
                 </form>
              </div>

           </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#050507] py-8 mt-20 text-center relative z-10">
         <p className="text-slate-600 text-sm font-mono">
            System Status: <span className="text-green-500">Normal</span> | Uptime: 99.9%
         </p>
         <p className="text-slate-700 text-xs mt-2">
            © {new Date().getFullYear()} Aaditya Desai. CI/CD Pipeline v2.0
         </p>
      </footer>

      <style>{`
        @keyframes dash {
          from {
            stroke-dasharray: 10;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dasharray: 20;
            stroke-dashoffset: 0;
          }
        }
        .animate-dash {
          animation: dash 3s linear infinite;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        .animate-typing {
          animation: typing 3.5s steps(40, end);
        }
        /* New Animations for Icons */
        @keyframes float {
           0%, 100% { transform: translateY(0); }
           50% { transform: translateY(-5px); }
        }
        .animate-float {
           animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
           animation: float 3s ease-in-out 1.5s infinite;
        }
        .animate-spin-slow {
           animation: spin 8s linear infinite;
        }
        @keyframes spin {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}