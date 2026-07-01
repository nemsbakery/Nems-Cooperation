import React, { useState, useEffect } from "react";
import {
  Shield,
  Cpu,
  Layers,
  Globe,
  ArrowRight,
  CheckCircle2,
  Lock,
  RefreshCw,
  Send,
  Download,
  Check,
  Building,
  Mail,
  FileCheck,
  AlertCircle,
  QrCode,
  FileText,
  User,
  Activity,
  Terminal,
  ExternalLink,
  ChevronRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for structural clarity
interface TelemetryLog {
  timestamp: string;
  source: string;
  event: string;
  status: "SECURE" | "ROUTED" | "INIT";
}

export default function App() {
  // Navigation active state tracker
  const [activeSection, setActiveSection] = useState("hero");

  // Solutions Modal selection
  const [selectedSolutionIdx, setSelectedSolutionIdx] = useState<number | null>(null);

  // Partner Portal Credentials Modal
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalPasscode, setPortalPasscode] = useState("");
  const [portalUnlocked, setPortalUnlocked] = useState(false);
  const [portalError, setPortalError] = useState("");
  const [portalActiveTab, setPortalActiveTab] = useState("live-node-feed");

  // Corporate Brief download overlay
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefEmail, setBriefEmail] = useState("");
  const [briefOrg, setBriefOrg] = useState("");
  const [briefSubmitted, setBriefSubmitted] = useState(false);

  // TransitLink Interactive Simulator tab ("wallet" | "inspector" | "router")
  const [simTab, setSimTab] = useState<"wallet" | "inspector" | "router">("wallet");
  
  // Wallet state
  const [walletBalance, setWalletBalance] = useState(380.0);
  const [rotatingToken, setRotatingToken] = useState("NEMS-AUTH-92X7");
  const [countdown, setCountdown] = useState(15);
  
  // Inspector state
  const [inspectorScanState, setInspectorScanState] = useState<"idle" | "scanning" | "validated">("idle");
  const [scanMessage, setScanMessage] = useState("Ready for commuter token handshake");

  // Route optimizer state
  const [startPoint, setStartPoint] = useState("JHB-PARK");
  const [endPoint, setEndPoint] = useState("PTA-CENTRAL");
  const [isRouting, setIsRouting] = useState(false);
  const [routedPath, setRoutedPath] = useState<string[]>(["Johannesburg Park Hub", "Centurion Intermediate", "Pretoria Central Terminus"]);

  // Telemetry real-time dynamic logs list
  const [telemetryList, setTelemetryList] = useState<TelemetryLog[]>([
    { timestamp: "22:38:01", source: "Auth-Edge-01", event: "Decoupled signature token ROTATED", status: "SECURE" },
    { timestamp: "22:38:15", source: "GeoRouter-GP", event: "Auto-computed sub-millisecond hops", status: "ROUTED" },
    { timestamp: "22:38:32", source: "SecurityTrigger", event: "Structural caching integrity CHECKED", status: "SECURE" },
    { timestamp: "22:38:45", source: "ProcurementPortal", event: "Dynamic handshake token initialized", status: "INIT" }
  ]);

  // Contact Procurement Form state
  const [formData, setFormData] = useState({
    fullName: "",
    org: "",
    email: "",
    message: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketID, setTicketID] = useState("");

  // Footer Document Viewer modal
  const [activeDoc, setActiveDoc] = useState<{ title: string; paragraphs: string[] } | null>(null);

  // Solutions definition
  const solutions = [
    {
      title: "Geospatial Vector Mapping",
      subtitle: "Mapbox & Google Platform Integration",
      icon: <Globe className="w-8 h-8 text-brand-accent" />,
      tagline: "Ultra-Low Request Latency for Enterprise Fleets",
      description: "Custom Mapbox and Google API integrations optimized to minimize network request overhead while delivering fluid, low-latency asset tracking.",
      technicalSpecs: [
        "Vector-tile over-the-air binary compression routines.",
        "Passive offline GPS queuing algorithm protecting against packet drops.",
        "Custom bounding queries minimizing costly third-party API execution paths.",
        "Dynamic high-density graphics rendering supporting 40,000 continuous vectors."
      ],
      metrics: "73% reduction in raw cellular payload sizes across pilot vehicles."
    },
    {
      title: "High-Load Serverless Architecture",
      subtitle: "High-Concurrency Cloud Sharding",
      icon: <Cpu className="w-8 h-8 text-brand-accent" />,
      tagline: "Uncompromising Peak Concurrency Autoscaling",
      description: "Cloud-native architectures built on automated sharding and serverless autoscaling pipelines, engineered to withstand heavy peak concurrency without service degradation.",
      technicalSpecs: [
        "Distributed edge caching & regional API proxies minimizing latency.",
        "Automated database write-sharding protecting core ledger integrity.",
        "Dynamic backpressure mechanisms throttling malicious bot-driven spikes.",
        "Auto-scaling containers built on instant cold-start container profiles."
      ],
      metrics: "99.999% proven infrastructure uptime under simulated million-user peaks."
    },
    {
      title: "Passive Hardware Integration",
      subtitle: "Cryptographic Physical Tag Ecosystems",
      icon: <Layers className="w-8 h-8 text-brand-accent" />,
      tagline: "Industrial-Grade Physical-Digital Bridges",
      description: "End-to-end deployment of ultra-thin, anti-metal NFC and cryptographic micro-tag ecosystems, bridging physical assets smoothly into secure digital ledgers.",
      technicalSpecs: [
        "Anti-metal shielding configurations for durable mounting on heavy transit metals.",
        "Encrypted revolving handshakes preventing physical RFID reproduction attacks.",
        "Energy-harvesting passive tag chips operating with zero physical power lines.",
        "Industrial ruggedized housing certified for extreme outdoor environments."
      ],
      metrics: "Tag operation verified across extreme climates (-35°C to +80°C)."
    }
  ];

  // Rotate commuter token and countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Generate a new secure token code
          const hex = "ABCDEF0123456789";
          let code = "NEMS-AUTH-";
          for (let i = 0; i < 4; i++) {
            code += hex[Math.floor(Math.random() * hex.length)];
          }
          setRotatingToken(code);

          // Append telemetry log
          const now = new Date();
          const timeStr = now.toTimeString().split(" ")[0];
          setTelemetryList((prevLogs) => [
            { timestamp: timeStr, source: "Auth-Edge-01", event: `Rotating transit handshake key generated: ${code}`, status: "SECURE" },
            ...prevLogs.slice(0, 4)
          ]);

          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Inspector scan simulation trigger
  const triggerInspectorScan = () => {
    setInspectorScanState("scanning");
    setScanMessage("Decrypting security token signatures...");
    setTimeout(() => {
      setInspectorScanState("validated");
      setScanMessage(`Commuter token [${rotatingToken}] parsed and signed securely! Zero-PII approved.`);
      
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      setTelemetryList((prevLogs) => [
        { timestamp: timeStr, source: "Validator-V2", event: `Secure QR handshake successfully authenticated (${rotatingToken})`, status: "SECURE" },
        ...prevLogs.slice(0, 4)
      ]);
    }, 1200);
  };

  // Route optimization calculation simulator
  const handleRouteCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRouting(true);
    setTimeout(() => {
      setIsRouting(false);
      let path: string[] = [];
      if (startPoint === endPoint) {
        path = [getNodeLabel(startPoint)];
      } else if (startPoint === "JHB-PARK" && endPoint === "PTA-CENTRAL") {
        path = ["Johannesburg Park Hub", "Midrand Telemetry Center", "Centurion Interchange", "Pretoria Central Terminus"];
      } else if (startPoint === "JHB-PARK" && endPoint === "OR-TAMBO") {
        path = ["Johannesburg Park Hub", "Sandton Hub Terminal", "OR Tambo Air-Rail Express"];
      } else if (startPoint === "PTA-CENTRAL" && endPoint === "OR-TAMBO") {
        path = ["Pretoria Central Terminus", "Centurion Interchange", "Sandton Hub Terminal", "OR Tambo Air-Rail Express"];
      } else {
        path = [getNodeLabel(startPoint), "Optimized Transit Link Waypoint", getNodeLabel(endPoint)];
      }
      setRoutedPath(path);
      
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      setTelemetryList((prevLogs) => [
        { timestamp: timeStr, source: "GeoRouter-GP", event: `Re-routed transit matrix: ${startPoint} to ${endPoint}`, status: "ROUTED" },
        ...prevLogs.slice(0, 4)
      ]);
    }, 800);
  };

  const getNodeLabel = (val: string) => {
    if (val === "JHB-PARK") return "Johannesburg Park Hub";
    if (val === "PTA-CENTRAL") return "Pretoria Central Terminus";
    if (val === "OR-TAMBO") return "OR Tambo Air-Rail Express";
    return val;
  };

  // Submit Partner Portal Passcode
  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalPasscode.toUpperCase() === "NEMS-ENTERPRISE" || portalPasscode.toLowerCase() === "admin") {
      setPortalUnlocked(true);
      setPortalError("");
    } else {
      setPortalError("Invalid partner credentials. Reference error: [SEC-AUTH-FAIL].");
    }
  };

  // Submit contact procurement form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.org || !formData.email || !formData.message) {
      alert("Please fulfill all inquiry parameters.");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      const ticketNum = `NEMS-PRC-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketID(ticketNum);
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ fullName: "", org: "", email: "", message: "" });
    setFormSubmitted(false);
  };

  // Brief Form Submit
  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefEmail || !briefOrg) return;
    setBriefSubmitted(true);
  };

  // Show static regulatory and policy documents
  const handleViewDoc = (docType: string) => {
    if (docType === "privacy") {
      setActiveDoc({
        title: "Nems Corporation Privacy Standard Policy",
        paragraphs: [
          "Operational Telemetry Decoupling Framework: Nems Corporation prioritizes local commuter privacy. Client-side state repositories leverage localized caching, limiting communication to secure token validations.",
          "Zero-PII Targeting: User identities, billing addresses, and transit histories are structurally separated. High-concurrency operations utilize cryptographic hashes representing tickets without passing physical names across open networks.",
          "Regulatory Compliances: Databases comply with physical territorial sovereignty regulations. Multi-region backups remain stored within approved governmental boundaries utilizing banking-grade isolation protocols."
        ]
      });
    } else if (docType === "terms") {
      setActiveDoc({
        title: "Terms of Municipal Engagement",
        paragraphs: [
          "Service Level Commitments: All infrastructure services managed by Nems Corporation operate under strict 99.999% availability SLAs. Custom backup triggers guarantee system protection under sudden peak congestion.",
          "Municipal Transparency Sandboxes: During active regional pilots (e.g., Gauteng Region), technical teams provide read-only diagnostic audits to Municipal Transit Directors and procurement stakeholders.",
          "Liability and Intellectual Property: Customized integration models (e.g., dedicated serverless Mapbox modules or passive tags) are certified locally prior to active deployments."
        ]
      });
    } else if (docType === "cipc") {
      setActiveDoc({
        title: "CIPC Documentation & Structural Regulatory Credentials",
        paragraphs: [
          "Nems Corporation (Pty) Ltd. is a registered High-Tech Digital Product Studio and Municipal Infrastructure Provider certified to execute municipal-level transit pilot systems and state-grade data logistics integrations.",
          "Capitalisation and Auditing Metrics: Nems Corporation maintains strict internal compliance auditing. Financial verification reports are accessible to procurement managers upon NDA signature.",
          "National Sandboxing Clearances: Certified under Gauteng Transit Sandbox Directives (Sec. 12-A) covering offline-first micro-ticketing, physical-digital tokenization, and passive security triggers."
        ]
      });
    }
  };

  const triggerScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans antialiased selection:bg-brand-accent selection:text-white">
      
      {/* SECTION A: HERO HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => triggerScroll("hero")}>
            <div className="w-10 h-10 border-2 border-brand-accent rounded-sm flex items-center justify-center bg-brand-accent-light relative overflow-hidden">
              <Shield className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider text-brand-dark">NEMS</span>
              <span className="block text-[9px] font-mono tracking-widest text-brand-accent uppercase -mt-1 font-semibold">CORPORATION</span>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => triggerScroll("solutions")}
              className={`transition-colors duration-200 cursor-pointer ${
                activeSection === "solutions" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-dark"
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => triggerScroll("ventures")}
              className={`transition-colors duration-200 cursor-pointer ${
                activeSection === "ventures" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-dark"
              }`}
            >
              Ventures
            </button>
            <button
              onClick={() => triggerScroll("infrastructure")}
              className={`transition-colors duration-200 cursor-pointer ${
                activeSection === "infrastructure" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-dark"
              }`}
            >
              Infrastructure
            </button>
            <button
              onClick={() => triggerScroll("corporate-brief")}
              className={`transition-colors duration-200 cursor-pointer ${
                activeSection === "corporate-brief" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-dark"
              }`}
            >
              Corporate Brief
            </button>
          </nav>

          {/* Partner Portal Trigger */}
          <div className="flex items-center space-x-4">
            <button
              id="partner-portal-btn"
              onClick={() => {
                setPortalOpen(true);
                setPortalPasscode("");
                setPortalUnlocked(false);
                setPortalError("");
              }}
              className="px-4 py-2 bg-brand-bg-soft hover:bg-brand-accent-light border border-brand-accent/30 text-brand-accent text-xs font-mono font-bold rounded transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>PARTNER PORTAL</span>
            </button>
          </div>

        </div>
      </header>

      {/* SECTION A: HERO HERO BODY */}
      <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border bg-white overflow-hidden">
        
        {/* Crisp grid pattern lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70b_1px,transparent_1px),linear-gradient(to_bottom,#0284c70b_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Info Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Trust Standard Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-accent-light border border-brand-accent/20 text-xs font-mono font-semibold tracking-wide text-brand-accent">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span>Closed Pilot Operational Matrix: v3.4</span>
            </div>

            {/* Headline with vibrant Light Blue highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-brand-dark tracking-tight leading-[1.1]">
              Engineering <span className="text-brand-accent">High-Concurrency</span> Enterprise Infrastructure.
            </h1>

            {/* Sub-headline */}
            <p className="text-brand-secondary text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              We architect serverless digital solutions, geospatial tracking layers, and passive hardware ecosystems optimized for high-volume operational efficiency.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="cta-brief"
                onClick={() => {
                  setBriefOpen(true);
                  setBriefSubmitted(false);
                  setBriefEmail("");
                  setBriefOrg("");
                }}
                className="px-8 py-4 bg-brand-dark hover:bg-brand-navy text-white font-bold tracking-wide rounded-sm transition-all shadow-md flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-brand-accent" />
                <span>Request Corporate Brief</span>
              </button>

              <button
                id="cta-ventures"
                onClick={() => triggerScroll("ventures")}
                className="px-8 py-4 bg-white hover:bg-brand-accent-light border-2 border-brand-accent/40 hover:border-brand-accent text-brand-accent font-bold tracking-wide rounded-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Ventures</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Real Stats Metrics Row for CIO confidence */}
            <div className="pt-8 border-t border-brand-border grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-brand-dark">99.999%</p>
                <p className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-wider mt-1">SYSTEM UPTIME SLA</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-brand-dark">&lt; 150ms</p>
                <p className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-wider mt-1">DECOUPLED HANDSHAKE</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-brand-dark">12-A PILOT</p>
                <p className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-wider mt-1">REGULATORY COMPLIANT</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column - Represents real-time infrastructure state */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            
            {/* Visual presentation card showcasing network sharding */}
            <div className="w-full max-w-md bg-white border-2 border-brand-border rounded shadow-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-accent" />
              
              {/* Terminal-like Title bar */}
              <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-[10px] font-mono font-bold text-brand-secondary tracking-widest uppercase">NEMS PILOT LOGS</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono font-semibold text-emerald-600 uppercase">ONLINE</span>
                </div>
              </div>

              {/* Graphical Network representation */}
              <div className="space-y-4">
                
                <div className="p-3 bg-brand-bg-soft rounded border border-brand-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-brand-dark uppercase">Concurrently Optimized Nodes</span>
                    <span className="text-[9px] font-mono text-brand-accent font-semibold">Gauteng Gateway</span>
                  </div>

                  <div className="h-24 flex items-center justify-center bg-white rounded border border-brand-border relative overflow-hidden">
                    <svg className="w-full h-full p-2" viewBox="0 0 200 100">
                      {/* Lines */}
                      <line x1="30" y1="50" x2="100" y2="25" stroke="#E2E8F0" strokeWidth="2" />
                      <line x1="30" y1="50" x2="100" y2="75" stroke="#E2E8F0" strokeWidth="2" />
                      <line x1="100" y1="25" x2="170" y2="50" stroke="#0284C7" strokeWidth="1.5" />
                      <line x1="100" y1="75" x2="170" y2="50" stroke="#0284C7" strokeWidth="1.5" />
                      
                      {/* Flying packets */}
                      <circle cx="65" cy="37.5" r="3" fill="#0284C7" />
                      <circle cx="135" cy="62.5" r="3" fill="#0284C7" />

                      {/* Node dots */}
                      <circle cx="30" cy="50" r="5" fill="#475569" />
                      <circle cx="100" cy="25" r="5" fill="#0F172A" />
                      <circle cx="100" cy="75" r="5" fill="#0F172A" />
                      <circle cx="170" cy="50" r="6" fill="#0284C7" />
                    </svg>
                    
                    <div className="absolute bottom-1 right-2 text-[9px] font-mono text-brand-secondary">
                      Active Requests: 14,281 /s
                    </div>
                  </div>
                </div>

                {/* Sub-system Status Matrix */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono font-bold text-brand-secondary uppercase px-1">
                    <span>Decoupled Micro-services</span>
                    <span>State</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-brand-bg-soft rounded border border-brand-border text-xs font-mono">
                    <span className="font-semibold text-brand-dark">GPS-Telemetry-Caching</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">PASSIVE</span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-brand-bg-soft rounded border border-brand-border text-xs font-mono">
                    <span className="font-semibold text-brand-dark">AES-256-Key-Rotation</span>
                    <span className="text-brand-accent font-bold bg-brand-accent-light px-1.5 py-0.5 rounded text-[10px]">ROTATING</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION B: OUR CORE SOLUTIONS (The Problem-Solver Matrix) */}
      <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-bg-soft border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          
          {/* Headline block */}
          <div className="max-w-3xl text-left space-y-4 mb-16">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase font-bold">SECTION B: THE PROBLEM-SOLVER MATRIX</p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-brand-dark tracking-tight">
              Our Core Solutions
            </h2>
            <p className="text-brand-secondary text-base sm:text-lg font-normal leading-relaxed">
              We eliminate technical waste, bloated network payloads, and vulnerable offline tracking models through three core high-concurrency architectures.
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((sol, index) => (
              <div
                id={`sol-card-${index}`}
                key={index}
                className="bg-white border-2 border-brand-border hover:border-brand-accent/50 p-8 rounded shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="p-3.5 bg-brand-accent-light rounded-sm w-fit group-hover:bg-brand-accent group-hover:text-white transition-colors duration-200">
                    {sol.icon}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-brand-secondary uppercase font-bold">{sol.subtitle}</span>
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                      {sol.title}
                    </h3>
                  </div>

                  <p className="text-brand-secondary text-sm leading-relaxed font-normal">
                    {sol.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border">
                  <button
                    onClick={() => setSelectedSolutionIdx(index)}
                    className="text-xs font-mono font-bold tracking-wider text-brand-accent hover:text-brand-dark flex items-center space-x-2 cursor-pointer"
                  >
                    <span>VIEW ARCHITECTURE SPECS</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION C: VENTURES IN DEPLOYMENT (The Product Portfolio) */}
      <section id="ventures" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-border bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Header block */}
          <div className="max-w-3xl text-left space-y-4 mb-16">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase font-bold">SECTION C: VENTURES IN DEPLOYMENT</p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-brand-dark tracking-tight">
              TransitLink (Private Beta)
            </h2>
            <p className="text-brand-secondary text-base sm:text-lg font-normal">
              A real-world manifestation of Nems high-concurrency design philosophy. TransitLink manages physical-digital fare transactions entirely offline-first.
            </p>
          </div>

          {/* Product Showcase box with interactive simulator */}
          <div className="bg-brand-bg-soft border-2 border-brand-border rounded p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info side (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="flex flex-wrap gap-2.5">
                <span className="text-xs font-mono font-bold px-3 py-1 bg-brand-accent-light border border-brand-accent/20 text-brand-accent rounded">
                  TRANSITLINK PLATFORM
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-brand-dark text-white rounded">
                  [ Closed Pilot Status: Gauteng Region ]
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-brand-dark leading-tight">
                A unified, offline-first navigation, route optimization, and digital fare verification ecosystem.
              </h3>

              <p className="text-brand-secondary text-sm sm:text-base leading-relaxed font-normal">
                TransitLink eliminates physical paper ticketing overhead, introduces paperless inspector enforcement via secure rotating QR tokens, and streamlines over-the-air commuter wallet onboarding. Built specifically for mass-transit networks experiencing peak passenger surges.
              </p>

              {/* Functional benefits checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-brand-dark">Eliminates physical paper ticketing overhead seamlessly</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-brand-dark">Paperless inspector enforcement via secure rotating QR tokens</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-brand-dark">Streamlined over-the-air commuter wallet onboarding</span>
                </div>
              </div>

            </div>

            {/* Interactive Simulator Side (lg:col-span-6) */}
            <div className="lg:col-span-6 w-full">
              
              <div className="bg-white border-2 border-brand-border rounded overflow-hidden shadow-lg">
                
                {/* Simulator header selector tabs */}
                <div className="flex border-b border-brand-border bg-brand-bg-soft font-mono text-xs font-bold">
                  <button
                    onClick={() => setSimTab("wallet")}
                    className={`flex-1 py-3 text-center transition-colors cursor-pointer border-r border-brand-border ${
                      simTab === "wallet" ? "bg-white text-brand-accent border-t-2 border-t-brand-accent" : "text-brand-secondary hover:text-brand-dark"
                    }`}
                  >
                    1. COMMUTER
                  </button>
                  <button
                    onClick={() => setSimTab("inspector")}
                    className={`flex-1 py-3 text-center transition-colors cursor-pointer border-r border-brand-border ${
                      simTab === "inspector" ? "bg-white text-brand-accent border-t-2 border-t-brand-accent" : "text-brand-secondary hover:text-brand-dark"
                    }`}
                  >
                    2. INSPECTOR
                  </button>
                  <button
                    onClick={() => setSimTab("router")}
                    className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                      simTab === "router" ? "bg-white text-brand-accent border-t-2 border-t-brand-accent" : "text-brand-secondary hover:text-brand-dark"
                    }`}
                  >
                    3. ROUTER
                  </button>
                </div>

                {/* Simulator Screen Container */}
                <div className="p-6 h-[320px] flex flex-col justify-between text-left">
                  
                  {/* TAB 1: COMMUTER WALLET CONTAINER */}
                  {simTab === "wallet" && (
                    <div className="space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Balance Block */}
                        <div className="flex justify-between items-center bg-brand-bg-soft p-3 rounded border border-brand-border">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-brand-secondary uppercase">Transit Fare Balance</span>
                            <p className="text-xl font-mono font-bold text-brand-dark">R {walletBalance.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => {
                              setWalletBalance((prev) => prev + 100);
                              const now = new Date();
                              const timeStr = now.toTimeString().split(" ")[0];
                              setTelemetryList((prevLogs) => [
                                { timestamp: timeStr, source: "Wallet-Sync", event: "Top-up R100 added securely", status: "INIT" },
                                ...prevLogs.slice(0, 4)
                              ]);
                            }}
                            className="px-3 py-1.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                          >
                            + R100
                          </button>
                        </div>

                        {/* Interactive Rotating Token Widget */}
                        <div className="bg-brand-bg-soft p-3 rounded border border-brand-border grid grid-cols-12 gap-3 items-center">
                          {/* Render Fake QR Token block */}
                          <div className="col-span-4 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white border border-brand-border p-1 rounded-sm flex items-center justify-center">
                              {/* Custom aesthetic mini binary map to mimic secure high-tech QR code */}
                              <div className="w-full h-full grid grid-cols-4 gap-0.5">
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`rounded-sm transition-colors duration-300 ${
                                      (i + rotatingToken.charCodeAt(i % rotatingToken.length)) % 2 === 0
                                        ? "bg-brand-dark"
                                        : "bg-slate-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[8px] font-mono font-bold text-brand-secondary mt-1 tracking-wider">ROTATING QR</span>
                          </div>

                          <div className="col-span-8 space-y-1">
                            <div className="flex items-center space-x-1 text-brand-dark font-mono text-xs">
                              <Shield className="w-4 h-4 text-brand-accent" />
                              <span className="font-bold">Active Crypto Token</span>
                            </div>
                            <div className="bg-white px-2 py-1 rounded border border-brand-border font-mono text-xs font-bold text-brand-dark flex justify-between">
                              <span>{rotatingToken}</span>
                              <span className="text-brand-accent">{countdown}s</span>
                            </div>
                            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-accent transition-all duration-1000 ease-linear"
                                style={{ width: `${(countdown / 15) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-brand-secondary flex justify-between">
                        <span>Status: 🟢 Structural Cache Safe</span>
                        <span>Protocol: AES-256</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: INSPECTOR VERIFICATION CONTAINER */}
                  {simTab === "inspector" && (
                    <div className="space-y-4 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono font-bold text-brand-accent uppercase">Security Handshake Validation</span>
                        <p className="text-xs text-brand-secondary leading-relaxed font-normal">
                          Transit inspectors use Nems offline cryptographic handshakes to verify the traveler's rotating token without calling municipal cellular links.
                        </p>
                      </div>

                      <div className="bg-brand-bg-soft border border-brand-border rounded p-4 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]">
                        {inspectorScanState === "idle" && (
                          <div className="space-y-2">
                            <QrCode className="w-8 h-8 text-brand-secondary mx-auto" />
                            <button
                              onClick={triggerInspectorScan}
                              className="px-4 py-2 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                            >
                              EXECUTE ENFORCEMENT SCAN
                            </button>
                          </div>
                        )}

                        {inspectorScanState === "scanning" && (
                          <div className="space-y-2">
                            <RefreshCw className="w-8 h-8 text-brand-accent animate-spin mx-auto" />
                            <p className="text-xs font-mono font-bold text-brand-dark animate-pulse">
                              AUTHENTICATING SIGNATURE HASH...
                            </p>
                          </div>
                        )}

                        {inspectorScanState === "validated" && (
                          <div className="space-y-2">
                            <Check className="w-8 h-8 text-emerald-600 bg-emerald-50 rounded-full p-1 border border-emerald-300 mx-auto" />
                            <p className="text-xs font-mono font-bold text-emerald-700">
                              DECOUPLED TOKEN VALIDATED
                            </p>
                            <p className="text-[10px] font-mono text-brand-secondary max-w-xs mx-auto">
                              {scanMessage}
                            </p>
                            <button
                              onClick={() => setInspectorScanState("idle")}
                              className="text-[10px] text-brand-accent underline font-semibold cursor-pointer"
                            >
                              Scan Another Token
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] font-mono text-brand-secondary flex justify-between">
                        <span>Offline Validation Delta: 0.12s</span>
                        <span>Verification Mode: Decoupled</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ROUTE OPTIMIZATION GRAPH */}
                  {simTab === "router" && (
                    <div className="space-y-4 h-full flex flex-col justify-between">
                      <form onSubmit={handleRouteCalc} className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase mb-1">Origin Node</label>
                          <select
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            className="w-full bg-brand-bg-soft border border-brand-border p-2 rounded text-xs text-brand-dark font-semibold font-mono"
                          >
                            <option value="JHB-PARK">JHB Park Hub</option>
                            <option value="PTA-CENTRAL">Pretoria Central</option>
                            <option value="OR-TAMBO">OR Tambo Air</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono font-bold text-brand-secondary uppercase mb-1">Destination Node</label>
                          <select
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)}
                            className="w-full bg-brand-bg-soft border border-brand-border p-2 rounded text-xs text-brand-dark font-semibold font-mono"
                          >
                            <option value="PTA-CENTRAL">Pretoria Central</option>
                            <option value="JHB-PARK">JHB Park Hub</option>
                            <option value="OR-TAMBO">OR Tambo Air</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <button
                            type="submit"
                            disabled={isRouting}
                            className="w-full py-2 bg-brand-accent hover:bg-brand-dark text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer flex items-center justify-center space-x-1"
                          >
                            {isRouting ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>COMPUTING SUB-MS HOPS...</span>
                              </>
                            ) : (
                              <span>OPTIMIZE TRANSIT HOPS</span>
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Path visualization */}
                      <div className="bg-brand-bg-soft p-2.5 rounded border border-brand-border space-y-1.5 flex-1 overflow-y-auto">
                        <span className="text-[9px] font-mono font-bold text-brand-secondary uppercase block">Optimized Hops:</span>
                        <div className="flex flex-wrap items-center gap-1">
                          {routedPath.map((hop, hidx) => (
                            <React.Fragment key={hidx}>
                              <span className="text-[10px] font-mono font-bold bg-white text-brand-dark px-1.5 py-0.5 rounded border border-brand-border shadow-xs">
                                {hop}
                              </span>
                              {hidx < routedPath.length - 1 && (
                                <ChevronRight className="w-3 h-3 text-brand-accent" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION D: INFRASTRUCTURE & SECURITY STANDARDS */}
      <section id="infrastructure" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-bg-soft border-b border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Security Standard Bullets (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            <div className="space-y-4">
              <p className="text-brand-accent text-xs font-mono tracking-widest uppercase font-bold">SECTION D: INFRASTRUCTURE & SECURITY STANDARDS</p>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-brand-dark tracking-tight">
                Structural Compliance & Banking-Grade Telemetry
              </h2>
              <p className="text-brand-secondary text-base leading-relaxed font-normal">
                To put procurement officers and enterprise CIOs at ease, Nems maintains compliance targets that eliminate cellular dependency and protect regional transactions.
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-6">
              
              {/* Bullet 1 */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-accent-light rounded-sm shrink-0 border border-brand-accent/20">
                  <Globe className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark">Offline-First Data Persistence</h4>
                  <p className="text-sm text-brand-secondary font-normal mt-1">
                    Our client-side repositories leverage localized structural caching, minimizing cellular data dependency for everyday end-users.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-accent-light rounded-sm shrink-0 border border-brand-accent/20">
                  <Shield className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark">Server-Side Token Authentication</h4>
                  <p className="text-sm text-brand-secondary font-normal mt-1">
                    Financial values and user identities are decoupled using secure cryptographic signatures hosted across distributed banking-grade cloud datacenters.
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-brand-accent-light rounded-sm shrink-0 border border-brand-accent/20">
                  <Activity className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark">Real-Time Anomaly Detection</h4>
                  <p className="text-sm text-brand-secondary font-normal mt-1">
                    Automated database triggers monitor network logs instantly to catch velocity deviations and prevent credential duplication.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Interactive Security Telemetry stream log (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full">
            
            <div className="bg-brand-dark text-slate-100 rounded p-6 shadow-xl border border-slate-800 relative">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-brand-accent" />
                  <span className="font-bold tracking-wider text-slate-300">ANOMALY DETECTOR FEED</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] text-emerald-400">ACTIVE</span>
                </div>
              </div>

              <p className="text-[11px] font-mono text-slate-400 leading-relaxed mb-4">
                Live simulated trigger log tracking edge synchronization payloads and security handshakes across the Gauteng Transit Gateway network:
              </p>

              {/* Dynamic Logs Output */}
              <div className="space-y-2 font-mono text-xs">
                {telemetryList.map((log, index) => (
                  <div key={index} className="p-2 bg-brand-navy/60 rounded border border-slate-800 flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-accent text-[10px]">{log.timestamp}</span>
                      <span className="bg-brand-accent/10 text-brand-accent px-1.5 py-0.2 rounded text-[8px] font-bold">
                        {log.status}
                      </span>
                    </div>
                    <div className="text-slate-200 text-[11px]">
                      <span className="text-slate-400 font-semibold">[{log.source}]</span> {log.event}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sub-system details */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                <span>BUFFER: 100% SECURE</span>
                <span>DECOUPLING: OPERATIONAL</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION E: CORPORATE PROCUREMENT & INQUIRIES */}
      <section id="corporate-brief" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column Text (lg:col-span-5) */}
          <div className="lg:col-span-5 text-left space-y-6 self-center">
            <p className="text-brand-accent text-xs font-mono tracking-widest uppercase font-bold">SECTION E: CORPORATE PROCUREMENT</p>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-brand-dark tracking-tight leading-tight">
              Partner with Nems Corporation.
            </h2>
            <p className="text-brand-secondary text-base sm:text-lg font-normal leading-relaxed">
              We collaborate with corporate logistics networks and public transit groups to eliminate resource waste and digitize legacy workflows. Our teams integrate bespoke secure layers and hardware assets into municipal transit matrices under strict pilot sandboxes.
            </p>

            <div className="p-4 bg-brand-bg-soft rounded border-2 border-brand-border space-y-3">
              <div className="flex items-center space-x-2.5 text-brand-dark">
                <Building className="w-5 h-5 text-brand-accent" />
                <span className="text-sm font-bold">Nems Infrastructure Sandbox Office</span>
              </div>
              <p className="text-xs text-brand-secondary leading-relaxed font-normal">
                Procurement inquiries are routed securely to authorized enterprise support directors. Average consultation initialization latency is &lt; 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column Form (lg:col-span-7) */}
          <div className="lg:col-span-7 w-full">
            
            <div className="bg-brand-bg-soft border-2 border-brand-border rounded p-6 sm:p-10 shadow-sm relative">
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-brand-accent-light text-brand-accent rounded-full flex items-center justify-center mx-auto border border-brand-accent/20">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-brand-dark">Consultation Initiated</h3>
                    <p className="text-sm text-brand-secondary max-w-md mx-auto">
                      Your procurement ticket has been structurally signed and generated. Nems consultation team will initiate standard corporate verification protocols.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded border border-brand-border font-mono text-xs text-brand-dark max-w-sm mx-auto space-y-1">
                    <p className="font-bold text-[10px] text-brand-secondary uppercase">Secure Consultation Ticket</p>
                    <p className="text-base text-brand-accent font-bold">{ticketID}</p>
                    <p className="text-[9px] text-slate-400 mt-1">STATUS: ROUTED TO PUBLIC INFRASTRUCTURE DESK</p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                  >
                    Initiate Another Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  
                  <div className="text-left border-b border-brand-border pb-4">
                    <h3 className="text-lg font-bold text-brand-dark">Initiate Corporate Consultation</h3>
                    <p className="text-xs text-brand-secondary mt-1 font-normal">
                      Fulfill the parameters below to configure your custom regional pilot integration inquiry.
                    </p>
                  </div>

                  {/* Form fields layout grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name field */}
                    <div className="text-left space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-brand-dark uppercase">
                        Full Name <span className="text-brand-accent">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-secondary text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Thomas Nemukula"
                          className="w-full bg-white border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none rounded pl-10 pr-4 py-3 text-sm text-brand-dark font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* Corporate Organization field */}
                    <div className="text-left space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-brand-dark uppercase">
                        Corporate Organization <span className="text-brand-accent">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-secondary text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.org}
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                          placeholder="e.g. Gauteng Mobility Group"
                          className="w-full bg-white border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none rounded pl-10 pr-4 py-3 text-sm text-brand-dark font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* Official Email field */}
                    <div className="text-left space-y-1.5 sm:col-span-2">
                      <label className="block text-xs font-mono font-bold text-brand-dark uppercase">
                        Official Email <span className="text-brand-accent">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-secondary text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. tnemukula063@gmail.com"
                          className="w-full bg-white border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none rounded pl-10 pr-4 py-3 text-sm text-brand-dark font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Brief field */}
                    <div className="text-left space-y-1.5 sm:col-span-2">
                      <label className="block text-xs font-mono font-bold text-brand-dark uppercase">
                        Message Brief <span className="text-brand-accent">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your high-concurrency transit constraints or physical tagging objectives..."
                        className="w-full bg-white border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none rounded p-4 text-sm text-brand-dark font-medium transition-all resize-none"
                      />
                    </div>

                  </div>

                  {/* Submit Consultation Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 bg-brand-dark hover:bg-brand-accent text-white font-bold tracking-wider rounded transition-colors shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {formSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>STRUCTURING CONSULTATION BRIEF...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-brand-accent" />
                        <span>Initiate Consultation</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-brand-secondary font-mono text-center leading-tight">
                    🔒 Protected under municipal non-disclosure parameters. Digital signatures are decoupled instantly.
                  </p>

                </form>
              )}

            </div>

          </div>

         </div>
      </section>

      {/* SECTION F: FOOTER */}
      <footer className="bg-brand-dark text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Footer Branding */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2.5">
              <div className="w-7 h-7 bg-brand-accent text-brand-dark rounded-sm flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-wider text-white">NEMS CORPORATION</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              © 2026 Nems Corporation. All Rights Reserved. Enterprise Infrastructure Solutions.
            </p>
          </div>

          {/* Right Footer Legal Docs Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-semibold">
            <button
              onClick={() => handleViewDoc("privacy")}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleViewDoc("terms")}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleViewDoc("cipc")}
              className="hover:text-brand-accent transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>CIPC Documentation</span>
              <ExternalLink className="w-3 h-3 text-brand-accent" />
            </button>
          </div>

        </div>
      </footer>

      {/* DETAILED SPECIFICATIONS OVERLAY MODAL (Solutions detail) */}
      <AnimatePresence>
        {selectedSolutionIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-brand-accent rounded shadow-2xl w-full max-w-2xl overflow-hidden text-left"
            >
              {/* Header */}
              <div className="bg-brand-bg-soft border-b border-brand-border p-6 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-brand-accent font-bold uppercase block">
                    {solutions[selectedSolutionIdx].subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-brand-dark">
                    {solutions[selectedSolutionIdx].title} — Architecture
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSolutionIdx(null)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-brand-dark transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {solutions[selectedSolutionIdx].description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-brand-dark uppercase tracking-widest">
                    TECHNICAL COMPLIANCE METRICS & SPECIFICATIONS
                  </h4>
                  <ul className="space-y-2">
                    {solutions[selectedSolutionIdx].technicalSpecs.map((spec, sidx) => (
                      <li key={sidx} className="flex items-start text-xs text-brand-secondary">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5 mr-2" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-brand-accent-light rounded border border-brand-accent/20 flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-brand-accent shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-dark block uppercase">FIELD BENCHMARK</span>
                    <span className="text-xs text-brand-navy font-semibold">{solutions[selectedSolutionIdx].metrics}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-brand-bg-soft border-t border-brand-border p-4 flex justify-end">
                <button
                  onClick={() => setSelectedSolutionIdx(null)}
                  className="px-4 py-2 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded cursor-pointer"
                >
                  DISMISS SYSTEM SPEC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REGULATORY LEGAL DOCS OVERLAY MODAL */}
      <AnimatePresence>
        {activeDoc !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-brand-dark rounded shadow-2xl w-full max-w-2xl overflow-hidden text-left"
            >
              {/* Header */}
              <div className="bg-brand-bg-soft border-b border-brand-border p-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-brand-accent" />
                  <span>{activeDoc.title}</span>
                </h3>
                <button
                  onClick={() => setActiveDoc(null)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-brand-dark transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto">
                {activeDoc.paragraphs.map((para, pidx) => (
                  <p key={pidx} className="text-brand-secondary text-xs sm:text-sm leading-relaxed font-normal">
                    {para}
                  </p>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-brand-bg-soft border-t border-brand-border p-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-brand-secondary">
                  NEMS COMPLIANCE DESK — v2026.1
                </span>
                <button
                  onClick={() => setActiveDoc(null)}
                  className="px-4 py-2 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded cursor-pointer"
                >
                  DISMISS DOCUMENT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CORPORATE BRIEF REQUEST OVERLAY MODAL */}
      <AnimatePresence>
        {briefOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-brand-accent rounded shadow-2xl w-full max-w-md overflow-hidden text-left"
            >
              {/* Header */}
              <div className="bg-brand-bg-soft border-b border-brand-border p-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                  <Download className="w-5 h-5 text-brand-accent" />
                  <span>Download Corporate Brief</span>
                </h3>
                <button
                  onClick={() => setBriefOpen(false)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-brand-dark transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {briefSubmitted ? (
                  <div className="text-center py-6 space-y-4">
                    <Check className="w-12 h-12 text-emerald-600 bg-emerald-50 rounded-full p-2 mx-auto border border-emerald-300" />
                    <div>
                      <h4 className="font-bold text-brand-dark">Brief Link Generated Successfully</h4>
                      <p className="text-xs text-brand-secondary mt-1">
                        An official secure reference brief has been generated for organization <strong className="text-brand-dark">{briefOrg || "Enterprise Partner"}</strong>. Check your inbox ({briefEmail}) or download the CIPC and infrastructure deck directly.
                      </p>
                    </div>

                    <div className="bg-brand-bg-soft p-3 rounded border border-brand-border flex items-center justify-between font-mono text-xs text-brand-dark">
                      <span>NEMS_BRIEF_2026.PDF</span>
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Commencing cryptographic safe document transmission... Saved to local downloads folder.");
                        }}
                        className="text-brand-accent font-bold hover:underline"
                      >
                        DOWNLOAD FILE
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBriefSubmit} className="space-y-4">
                    <p className="text-xs text-brand-secondary leading-relaxed font-normal">
                      Provide your official corporate credentials to access the complete structural sandbox compliance brief, registrant logs, and active Gauteng pilot metrics.
                    </p>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-brand-dark">OFFICIAL CORPORATE EMAIL</label>
                      <input
                        type="email"
                        required
                        value={briefEmail}
                        onChange={(e) => setBriefEmail(e.target.value)}
                        placeholder="e.g. procurement@mobilitygauteng.gov.za"
                        className="w-full bg-brand-bg-soft border border-brand-border p-3 rounded text-sm text-brand-dark outline-none focus:border-brand-accent"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-brand-dark">MUNICIPAL OR CORPORATE DEPT</label>
                      <input
                        type="text"
                        required
                        value={briefOrg}
                        onChange={(e) => setBriefOrg(e.target.value)}
                        placeholder="e.g. Gauteng Department of Roads & Transport"
                        className="w-full bg-brand-bg-soft border border-brand-border p-3 rounded text-sm text-brand-dark outline-none focus:border-brand-accent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      GENERATE DIRECT BRIEF LINK
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECURE PARTNER PORTAL DIALOG */}
      <AnimatePresence>
        {portalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-brand-accent rounded shadow-2xl w-full max-w-3xl overflow-hidden text-left"
            >
              {/* Header */}
              <div className="bg-brand-bg-soft border-b border-brand-border p-6 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <Lock className="w-5 h-5 text-brand-accent" />
                  <h3 className="text-lg font-bold text-brand-dark">Nems Authorized Partner Portal</h3>
                </div>
                <button
                  onClick={() => setPortalOpen(false)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-brand-dark transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {!portalUnlocked ? (
                  <form onSubmit={handlePortalLogin} className="max-w-md mx-auto py-8 space-y-6 text-center">
                    <div className="w-12 h-12 bg-brand-accent-light text-brand-accent rounded-full flex items-center justify-center mx-auto border border-brand-accent/20">
                      <Shield className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-brand-dark">Enter Authorized Partner Passcode</h4>
                      <p className="text-xs text-brand-secondary font-normal">
                        Municipal managers can preview the partner portal using standard sandbox code <strong className="text-brand-dark font-mono">"admin"</strong> or <strong className="text-brand-dark font-mono">"NEMS-ENTERPRISE"</strong>.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="password"
                        required
                        value={portalPasscode}
                        onChange={(e) => setPortalPasscode(e.target.value)}
                        placeholder="Input SEC-AUTH key code..."
                        className="w-full bg-brand-bg-soft border border-brand-border text-center p-3 font-mono text-sm tracking-widest text-brand-dark uppercase outline-none focus:border-brand-accent"
                      />
                      {portalError && (
                        <p className="text-xs text-rose-600 font-mono flex items-center justify-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{portalError}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded cursor-pointer"
                    >
                      Authenticate Credentials
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {/* Logged in sandbox screen view */}
                    <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-3 rounded border border-emerald-200 text-xs">
                      <span>✓ Secure sandbox session initialized. Welcome municipal administrator.</span>
                      <button
                        onClick={() => setPortalUnlocked(false)}
                        className="font-mono text-[10px] uppercase font-bold text-emerald-950 underline cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Left Navigation Tabs */}
                      <div className="space-y-2 flex md:flex-col">
                        <button
                          onClick={() => setPortalActiveTab("live-node-feed")}
                          className={`flex-1 md:flex-none text-left px-3 py-2 text-xs font-mono font-bold rounded ${
                            portalActiveTab === "live-node-feed" ? "bg-brand-accent text-white" : "bg-slate-100 hover:bg-slate-200"
                          }`}
                        >
                          LIVE NODE STATUS
                        </button>
                        <button
                          onClick={() => setPortalActiveTab("pilot-stats")}
                          className={`flex-1 md:flex-none text-left px-3 py-2 text-xs font-mono font-bold rounded ${
                            portalActiveTab === "pilot-stats" ? "bg-brand-accent text-white" : "bg-slate-100 hover:bg-slate-200"
                          }`}
                        >
                          PILOT STATS
                        </button>
                      </div>

                      {/* Right Detail Pane */}
                      <div className="md:col-span-3 bg-brand-bg-soft p-4 rounded border border-brand-border min-h-[220px]">
                        {portalActiveTab === "live-node-feed" && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-mono font-bold text-brand-dark block uppercase border-b pb-2">
                              Transit Node Connection Map status
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs p-2 bg-white rounded border">
                                <span className="font-semibold text-brand-dark">Node JHB-Park-H1</span>
                                <span className="text-emerald-600 font-mono text-[10px] font-bold">🟢 ONLINE (99.999%)</span>
                              </div>
                              <div className="flex justify-between items-center text-xs p-2 bg-white rounded border">
                                <span className="font-semibold text-brand-dark">Node Sandton-H2</span>
                                <span className="text-emerald-600 font-mono text-[10px] font-bold">🟢 ONLINE (99.998%)</span>
                              </div>
                              <div className="flex justify-between items-center text-xs p-2 bg-white rounded border">
                                <span className="font-semibold text-brand-dark">Node Pretoria-C3</span>
                                <span className="text-emerald-600 font-mono text-[10px] font-bold">🟢 ONLINE (99.999%)</span>
                              </div>
                              <div className="flex justify-between items-center text-xs p-2 bg-white rounded border">
                                <span className="font-semibold text-brand-dark">Node OR-Tambo-H4</span>
                                <span className="text-emerald-600 font-mono text-[10px] font-bold">🟢 ONLINE (100.000%)</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {portalActiveTab === "pilot-stats" && (
                          <div className="space-y-4">
                            <h4 className="text-xs font-mono font-bold text-brand-dark block uppercase border-b pb-2">
                              Gauteng Transit Link Sandbox metrics
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div className="p-3 bg-white rounded border">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Commuters Registered</span>
                                <p className="text-lg font-mono font-bold text-brand-dark">142,892</p>
                              </div>
                              <div className="p-3 bg-white rounded border">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Offline Inspections</span>
                                <p className="text-lg font-mono font-bold text-brand-dark">12,189</p>
                              </div>
                              <div className="p-3 bg-white rounded border">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Paper Tickets Prevented</span>
                                <p className="text-lg font-mono font-bold text-brand-dark">1,029,481</p>
                              </div>
                              <div className="p-3 bg-white rounded border">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Revenue leakage</span>
                                <p className="text-lg font-mono font-bold text-emerald-600">0.02% (Target MET)</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-brand-bg-soft border-t border-brand-border p-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-brand-secondary">
                  SECURE PORTAL SANDBOX FEED
                </span>
                <button
                  onClick={() => setPortalOpen(false)}
                  className="px-4 py-2 bg-brand-dark hover:bg-brand-accent text-white font-mono text-xs font-bold rounded cursor-pointer"
                >
                  Close Partner Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
