import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Shield,
  Sparkles,
  Gauge,
  CircleDot,
  Zap,
  Wind,
  Sofa,
  Trash2,
  Layers,
  Diamond,
  Award,
  Clock,
  Navigation as NavigationIcon,
  Car,
  X,
} from 'lucide-react';

// Reviews data - 25 detailed realistic reviews
const reviewsData = [
  { id: 1, name: 'Marcus T.', rating: 5, text: 'These guys are on another level. My M4 came back looking better than when I picked it up from the dealer. The paint correction is absolutely insane - mirror finish throughout.', date: '2 weeks ago' },
  { id: 2, name: 'Jennifer K.', rating: 5, text: 'Finally found a detailer who actually cares. They spent 6 hours on my SUV and the results speak for themselves. Worth every penny.', date: '1 month ago' },
  { id: 3, name: 'David R.', rating: 5, text: 'The ceramic coating they applied has made washing my car so much easier. Water just beads right off. Professional work all around.', date: '3 weeks ago' },
  { id: 4, name: 'Angela M.', rating: 5, text: 'Brought my classic Mustang here for a full detail before a car show. Won first place. These guys know their craft.', date: '1 month ago' },
  { id: 5, name: 'Robert J.', rating: 5, text: 'I was skeptical about the price at first but after seeing the results, I understand. Quality work that lasts.', date: '2 months ago' },
  { id: 6, name: 'Shanice W.', rating: 5, text: 'The interior shampooing removed stains I thought were permanent. My 10-year-old leather looks brand new. Incredible attention to detail.', date: '1 month ago' },
  { id: 7, name: 'Michael C.', rating: 5, text: 'Been coming here for 3 years now. Consistency is key and they never disappoint. My go-to for all my vehicles.', date: '3 months ago' },
  { id: 8, name: 'Patricia L.', rating: 5, text: 'The perfume oil treatment is unique - never experienced anything like it. Car smells like a luxury boutique now.', date: '2 months ago' },
  { id: 9, name: 'Christopher B.', rating: 5, text: 'They worked on my Tesla Model S and knew exactly how to handle the paint. No swirl marks, just pure gloss.', date: '1 month ago' },
  { id: 10, name: 'Tamika S.', rating: 5, text: 'The clay bar treatment made my paint feel like glass. Can\'t stop touching it. Super professional team.', date: '3 months ago' },
  { id: 11, name: 'James H.', rating: 5, text: 'Engine detailing was immaculate. They got into every crevice. My engine bay looks showroom fresh.', date: '2 weeks ago' },
  { id: 12, name: 'Linda P.', rating: 5, text: 'Got the full package for my Mercedes. Paint correction plus ceramic. The shine is unreal. Neighbors keep asking who did it.', date: '1 month ago' },
  { id: 13, name: 'Antonio G.', rating: 5, text: 'Best decision I made this year. The scratch removal was seamless. Can\'t even tell where they were.', date: '2 months ago' },
  { id: 14, name: 'Stephanie D.', rating: 5, text: 'My husband surprised me with a detail for my birthday. Car looks stunning. Thank you Pro Auto!', date: '1 month ago' },
  { id: 15, name: 'William M.', rating: 5, text: 'Third time back. They remember my preferences and always deliver. That\'s rare these days.', date: '3 months ago' },
  { id: 16, name: 'Karen F.', rating: 5, text: 'The steam cleaning got out years of kid messes. Minivan looks and smells new again. Life saver!', date: '2 months ago' },
  { id: 17, name: 'Darius J.', rating: 5, text: 'Wheel cleaning was insane. Brake dust gone, rims gleaming. These folks take pride in their work.', date: '1 month ago' },
  { id: 18, name: 'Rebecca N.', rating: 5, text: 'Brought in my grandmother\'s vintage Cadillac. They treated it with the respect it deserved. She would\'ve been proud.', date: '3 months ago' },
  { id: 19, name: 'Steven A.', rating: 5, text: 'The attention to door jambs and hidden areas shows they care about the details others ignore. True professionals.', date: '2 months ago' },
  { id: 20, name: 'Monica R.', rating: 5, text: 'Exhaust tips came out mirror finish. Didn\'t know they could look this good. Full recommendation.', date: '1 month ago' },
  { id: 21, name: 'Tyler E.', rating: 5, text: 'Drove from Oak Lawn just to try them. Worth the trip. Will be back for ceramic coating.', date: '3 weeks ago' },
  { id: 22, name: 'Denise W.', rating: 5, text: 'The glass treatment makes night driving so much clearer. No more streaky windows. Thank you!', date: '2 months ago' },
  { id: 23, name: 'Kevin O.', rating: 5, text: 'Watched them work on a Lamborghini while waiting. If they trust these guys, so do I. Great results.', date: '1 month ago' },
  { id: 24, name: 'Brenda H.', rating: 5, text: 'Interior panel dressing is subtle but makes everything pop. Love the finished look.', date: '3 months ago' },
  { id: 25, name: 'Carlos M.', rating: 5, text: 'Best detailing in the south suburbs, hands down. Tried others before finding Pro Auto. Night and day difference.', date: '1 month ago' },
];

// Services data
const exteriorServices = [
  { icon: Sparkles, title: 'Paint Correction', desc: 'Multi-stage machine polishing to remove swirls, scratches, and oxidation resulting in mirror-like clarity.' },
  { icon: Shield, title: 'Ceramic Coating', desc: 'Professional-grade SiO2 coating providing 2-5 years of protection with hydrophobic properties.' },
  { icon: Layers, title: 'Clay Bar Treatment', desc: 'Deep decontamination removing embedded rail dust, industrial fallout, and bonded contaminants.' },
  { icon: Gauge, title: 'Engine Detailing', desc: 'Safe cleaning and dressing of engine bay components with protectants for lasting shine.' },
  { icon: CircleDot, title: 'Wheel Washing', desc: 'Deep clean of wheel faces, barrels, and calipers using pH-balanced solutions.' },
  { icon: Zap, title: 'Scratch & Defect Removal', desc: 'Targeted correction of isolated deep scratches and paint defects using precision techniques.' },
];

const interiorServices = [
  { icon: Wind, title: 'Steam Cleaning', desc: 'High-temperature steam sanitation killing bacteria and lifting stubborn stains from all surfaces.' },
  { icon: Sofa, title: 'Seat Shampooing', desc: 'Deep extraction cleaning of fabric and leather seats removing oils, stains, and odors.' },
  { icon: Trash2, title: 'Vehicle Interior Vacuuming', desc: 'Full vacuum with crevice tool attention reaching every corner, pocket, and compartment.' },
  { icon: Layers, title: 'Car Interior Panel Dress', desc: 'Non-greasy dressing applied to all plastic, vinyl, and trim surfaces for OEM finish.' },
  { icon: Diamond, title: 'Exhaust Tips & Metal', desc: 'Polishing of stainless steel exhaust tips and metal accents to mirror finish.' },
  { icon: Droplets, title: 'Glass Clear Treatment', desc: 'Streak-free glass cleaning inside and out applied with water-beading technology.' },
];

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-carbon/95 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-neon" strokeWidth={1.5} />
            <span className="font-display font-bold text-lg sm:text-xl tracking-wider">PRO AUTO DETAILS</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 text-neon" />
              <span>Evergreen Park, IL</span>
            </div>
          </div>

          <a
            href="tel:708-475-2557"
            className="flex items-center gap-2 bg-neon hover:bg-neon-500 px-4 py-2.5 rounded text-sm font-semibold transition-all duration-300 hover:shadow-neon"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">708-475-2557</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </div>
      <div className="precision-line" />
    </nav>
  );
}

// Modal Component
function SlotAccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-carbon/90 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative bg-carbon border border-white/[0.08] rounded-lg max-w-lg w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-3">SLOT ACCESS</h3>
          <p className="text-white/50 text-sm">Choose your preferred contact method</p>
        </div>

        {/* Action cards */}
        <div className="space-y-4">
          {/* Option 1: Call Hotline */}
          <a
            href="tel:708-475-2557"
            className="flex items-center gap-4 p-6 bg-obsidian border border-neon/30 hover:border-neon rounded-lg transition-all duration-300 hover:shadow-neon group"
          >
            <div className="w-14 h-14 bg-neon/20 rounded-lg flex items-center justify-center group-hover:bg-neon/30 transition-colors">
              <Phone className="w-7 h-7 text-neon" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-lg tracking-wide">CALL HOTLINE NOW</p>
              <p className="text-neon text-xl font-semibold mt-1">708-475-2557</p>
            </div>
          </a>

          {/* Option 2: Launch Radar Navigation */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Pro+Auto+Detail+9121+S+Kedzie+Ave+Evergreen+Park+IL+60805"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-obsidian border border-white/[0.08] hover:border-neon/50 rounded-lg transition-all duration-300 hover:shadow-neon group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-neon/20 transition-colors">
              <NavigationIcon className="w-7 h-7 text-white/70 group-hover:text-neon transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-lg tracking-wide">LAUNCH RADAR NAVIGATION</p>
              <p className="text-white/50 text-sm mt-1">9121 S Kedzie Ave, Evergreen Park, IL 60805</p>
            </div>
            <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-neon transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Hero Section
function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-obsidian to-carbon" />

      {/* Cinematic lighting effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-white/[0.02] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-neon/[0.03] blur-[80px]" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Authority badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full mb-8 animate-fade-in">
          <Star className="w-4 h-4 text-neon fill-neon" />
          <span className="text-sm font-medium">4.9 Stars</span>
          <span className="text-white/30">|</span>
          <span className="text-sm text-white/70">557 Verified Google Reviews</span>
        </div>

        {/* Main title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-ultra-tight leading-none mb-6">
          RESTORING{' '}
          <span className="text-gradient-neon">REFLECTION.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed mb-12 font-light">
          Museum-grade surface correction and interior optimization engineered for luxury, exotic, and daily vehicles in Evergreen Park.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary w-full sm:w-auto rounded"
          >
            Request Slot Access
          </button>
          <button className="btn-outline w-full sm:w-auto rounded">
            Explore Spec Sheets
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent" />

      {/* Modal */}
      <SlotAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

// Marquee Component
function Marquee() {
  const phrases = [
    'PREMIUM CERAMIC COATING',
    'MUSEUM-GRADE DETAILING',
    'SWIRL-FREE FINISH',
    'EXOTIC CAR SPECIALISTS',
    '557+ FIVE STAR REVIEWS',
    'LUXURY VEHICLE CARE',
    'PAINT CORRECTION EXPERTS',
    'INTERIOR RESTORATION',
  ];

  return (
    <div className="relative py-8 bg-carbon border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-transparent to-carbon z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...phrases, ...phrases].map((phrase, i) => (
          <span key={i} className="mx-8 text-xl sm:text-2xl font-display font-bold text-white/20 tracking-wider">
            {phrase} <span className="text-neon/40">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Before/After Slider
function PaintInspectionSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => (isDragging.current = true);
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseMove = (e: React.MouseEvent) => isDragging.current && handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="py-20 sm:py-32 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-widest mb-3">SURFACE ANALYSIS</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">PAINT INSPECTION</h2>
        </div>

        {/* Slider container */}
        <div
          ref={sliderRef}
          className="relative h-[300px] sm:h-[450px] lg:h-[550px] rounded overflow-hidden cursor-ew-res select-none panel-border"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {/* Before (Left side - dull) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm tracking-widest text-gray-400 mb-2">PRE-TREATED</p>
                <p className="text-xs text-gray-500 max-w-xs">Oxidized surface with webbing, swirl marks, and contaminant buildup</p>
              </div>
            </div>
          </div>

          {/* After (Right side - glossy) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            {/* Gloss effect */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1 bg-white/30 blur-sm" />
              <div className="absolute top-1/3 left-1/3 w-1/4 h-[200px] bg-gradient-to-b from-white/10 to-transparent blur-md" />
            </div>

            {/* Light reflection strokes */}
            <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="reflection" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="30%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="url(#reflection)" strokeWidth="2" />
              <line x1="5%" y1="40%" x2="95%" y2="40%" stroke="url(#reflection)" strokeWidth="1" />
              <line x1="15%" y1="60%" x2="85%" y2="60%" stroke="url(#reflection)" strokeWidth="1.5" />
              <line x1="8%" y1="80%" x2="92%" y2="80%" stroke="url(#reflection)" strokeWidth="1" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm tracking-widest text-white mb-2">PRO AUTO HIGH CORRECTION</p>
                <p className="text-xs text-white/70 max-w-xs">Liquid glass mirror finish with 99% defect removal</p>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-neon z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-carbon border border-neon rounded-full flex items-center justify-center shadow-neon">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-neon rounded-full" />
                <div className="w-1 h-3 bg-neon rounded-full" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 bg-carbon/80 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            <p className="text-xs text-white/60">BEFORE</p>
          </div>
          <div className="absolute bottom-4 right-4 bg-carbon/80 backdrop-blur-sm px-3 py-1.5 rounded border border-neon/30">
            <p className="text-xs text-neon">AFTER</p>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">Drag to inspect surface transformation</p>
      </div>
    </section>
  );
}

// Services Tabs
function ServicesMenu() {
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>('exterior');

  return (
    <section className="py-20 sm:py-32 bg-carbon relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-widest mb-3">TECHNICAL ARCHITECTURE</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-8">SERVICE MENU</h2>

          {/* Tab buttons */}
          <div className="inline-flex bg-white/[0.03] border border-white/[0.08] rounded p-1">
            <button
              onClick={() => setActiveTab('exterior')}
              className={`px-6 py-3 rounded text-sm font-semibold transition-all duration-300 ${
                activeTab === 'exterior'
                  ? 'bg-neon text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              01 / EXTERIOR PRECISION
            </button>
            <button
              onClick={() => setActiveTab('interior')}
              className={`px-6 py-3 rounded text-sm font-semibold transition-all duration-300 ${
                activeTab === 'interior'
                  ? 'bg-neon text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              02 / INTERIOR RESTORATION
            </button>
          </div>
        </div>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(activeTab === 'exterior' ? exteriorServices : interiorServices).map((service, i) => {
            const IconComponent = service.icon;
            return (
              <div key={i} className="service-card p-6 sm:p-8 rounded-lg">
                <IconComponent className="w-8 h-8 text-neon mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Wildcard differentiator */}
        <div className="mt-12 p-6 sm:p-10 bg-gradient-to-r from-neon/10 via-neon/5 to-transparent border border-neon/20 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon/10 blur-[100px] rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-neon" />
              <span className="text-neon text-xs font-bold tracking-widest">EXCLUSIVE DIFFERENTIATOR</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">
              Custom Perfume Oil Interior Architecture
            </h3>
            <p className="text-white/60 text-sm max-w-2xl">
              Sourced directly from Dubai, France, and Switzerland. Premium fragrance oils infused into your vehicle&apos;s interior for a signature scent experience that lasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reviews Carousel
function ReviewsConsole() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = reviewsData.length;

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % totalReviews);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);

  return (
    <section className="py-20 sm:py-32 bg-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-widest mb-3">CLIENT VERIFICATION</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">THE VERIFIED 25</h2>
        </div>

        {/* Review carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex justify-center">
              <div
                key={currentIndex}
                className="max-w-2xl w-full bg-carbon border border-white/[0.08] rounded-lg p-6 sm:p-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-neon fill-neon" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 text-center sm:text-left">
                  &ldquo;{reviewsData[currentIndex].text}&rdquo;
                </p>

                {/* Reviewer info */}
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
                  <div>
                    <p className="font-semibold">{reviewsData[currentIndex].name}</p>
                    <p className="text-sm text-white/40">{reviewsData[currentIndex].date}</p>
                  </div>
                  <div className="text-sm text-white/30">
                    {currentIndex + 1} / {totalReviews}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 border border-white/20 rounded flex items-center justify-center hover:border-neon hover:text-neon transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 border border-white/20 rounded flex items-center justify-center hover:border-neon hover:text-neon transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap max-w-md mx-auto">
            {reviewsData.slice(0, 10).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-neon w-4' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Panel
function IntakePanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    services: [] as string[],
  });

  const serviceOptions = [
    'Paint Correction',
    'Ceramic Coating',
    'Full Detail',
    'Interior Only',
    'Engine Detailing',
  ];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  return (
    <section className="py-20 sm:py-32 bg-carbon relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-widest mb-3">OPERATIONAL HUB</p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">SCHEDULE SERVICE</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left panel - Contact info */}
          <div>
            {/* Status indicator */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-green-400 font-semibold text-sm">OPERATIONAL STATUS</p>
                <p className="text-white/60 text-sm">Accepting new appointments</p>
              </div>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-neon" />
                <span className="font-semibold">OPERATING HOURS</span>
              </div>
              <div className="space-y-2 text-white/60">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Hotline */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-neon" />
                <span className="font-semibold">DIRECT HOTLINE</span>
              </div>
              <a href="tel:708-979-9995" className="text-2xl font-display hover:text-neon transition-colors">
                708-979-9995
              </a>
            </div>

            {/* Address */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-neon" />
                <span className="font-semibold">LOCATION</span>
              </div>
              <p className="text-white/60">
                9121 S Kedzie Ave<br />
                Evergreen Park, IL 60805
              </p>
            </div>

            {/* Navigation button */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pro+Auto+Detail+9121+S+Kedzie+Ave+Evergreen+Park+IL+60805"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-neon hover:bg-neon-500 px-6 py-4 rounded font-semibold transition-all duration-300 hover:shadow-neon-lg hover-glow"
            >
              <NavigationIcon className="w-5 h-5" />
              <span>LAUNCH RADAR NAVIGATION</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right panel - Service request form */}
          <div className="bg-obsidian border border-white/[0.06] rounded-lg p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl mb-6">SERVICE REQUEST SHEET</h3>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="text-sm text-white/40 mb-2 block">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-raw"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-white/40 mb-2 block">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-raw"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm text-white/40 mb-2 block">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-raw"
                  placeholder="(XXX) XXX-XXXX"
                />
              </div>

              <div>
                <label htmlFor="vehicle" className="text-sm text-white/40 mb-2 block">Vehicle Make &amp; Model</label>
                <input
                  id="vehicle"
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicle: e.target.value }))}
                  className="input-raw"
                  placeholder="e.g., 2023 BMW M4"
                />
              </div>

              <div>
                <label className="text-sm text-white/40 mb-3 block">Service Selection</label>
                <div className="space-y-3">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="checkbox-custom"
                      />
                      <span className="text-white/70 group-hover:text-white transition-colors">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full rounded mt-8">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-carbon border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-neon" strokeWidth={1.5} />
            <span className="font-display font-bold tracking-wider">PRO AUTO DETAILS</span>
          </div>

          {/* Info */}
          <div className="text-center sm:text-right text-sm text-white/40">
            <p>9121 S Kedzie Ave, Evergreen Park, IL 60805</p>
            <p className="mt-1">708-979-9995</p>
          </div>
        </div>

        {/* Divider */}
        <div className="precision-line my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Pro Auto Details. All rights reserved.</p>
          <p>Secure Server Environment | Museum-Grade Detailing Systems</p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-carbon min-h-screen">
      <Navigation />
      <Hero />
      <Marquee />
      <PaintInspectionSlider />
      <ServicesMenu />
      <ReviewsConsole />
      <IntakePanel />
      <Footer />
    </div>
  );
}

export default App;
