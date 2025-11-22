"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, MapPin, Calendar as CalendarIcon, Heart, Share2, Music2, ChevronLeft, ChevronRight, Utensils, PartyPopper, Users, Wine, Camera, Star, ArrowLeft, Volume2, VolumeX, Edit, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

interface ItineraryItem {
    title: string;
    time: string;
    icon: 'users' | 'music' | 'wine' | 'utensils' | 'party-popper' | 'camera' | 'star';
}

interface EventData {
    id?: number;
    type: string;
    celebrantName: string;
    date: string;
    parents: string;
    godparents: string;
    address: string;
    mapsUrl?: string;
    backgroundUrl: string;
    videoUrl?: string;
    heroImageUrl?: string;
    heroImageUrl?: string;
    gallery: string[]; // Changed to array
    musicUrl: string;
    musicUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
    quote?: string;
    itinerary?: ItineraryItem[];
    dressCode?: string; // <-- Nuevo campo para el código de vestimenta
    gifts?: string; // <-- Nuevo campo para regalos
    titleFont?: string;
    bodyFont?: string;
    primaryColor?: string;
    textColor?: string;
    isPublic?: boolean;
    views?: number;
    layoutTemplate?: 'classic' | 'video' | 'minimal' | 'neon';
}



const BowTieIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M21.88 6.18c-0.55-0.27-1.2-0.27-1.75 0L14 9.25V9c0-1.1-.9-2-2-2s-2 .9-2 2v.25L3.88 6.18c-0.55-0.27-1.2-0.27-1.75 0C1.5 6.49 1.11 7.12 1.11 7.82v8.36c0 .7.39 1.33 1.02 1.64 .55 .27 1.2 .27 1.75 0L10 14.75V15c0 1.1 .9 2 2 2s2-.9 2-2v-.25l6.12 3.06c.55 .27 1.2 .27 1.75 0 .63-.31 1.02-.94 1.02-1.64V7.82c0-.7-.39-1.33-1.01-1.64z" />
    </svg>
);

const DressIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M8 2v5" />
        <path d="M16 2v5" />
        <path d="M8 7c0 1.5 2 2 4 2s4-.5 4-2" />
        <path d="M8 7l-2 5" />
        <path d="M16 7l2 5" />
        <path d="M6 12l-3 9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1l-3-9" />
        <path d="M6 12h12" />
        <path d="M12 12v10" />
        <path d="M9 12l-2 10" />
        <path d="M15 12l2 10" />
    </svg>
);

export default function InvitationPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<EventData | null>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Música de fondo
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const hasCountedView = useRef(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Carousel Logic - MOVED HERE

    const searchParams = useSearchParams();
    const isPreview = searchParams.get('preview') === 'true';
    const fromGallery = searchParams.get('from') === 'gallery';

    const fadeInUp = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut" } }
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.5, delayChildren: 0.3 } }
    };

    useEffect(() => {
        const savedEvents = localStorage.getItem('invita_events');
        if (savedEvents) {
            const events: EventData[] = JSON.parse(savedEvents);
            const eventId = parseInt(params.id);
            const foundEvent = events.find(e => e.id === eventId);

            if (foundEvent) {
                // Simulación para la prueba, añadir un código de vestimenta si no existe
                const eventWithDressCode = { ...foundEvent, dressCode: foundEvent.dressCode || 'Formal' };
                setEvent(eventWithDressCode);

                if (!isPreview && !hasCountedView.current) {
                    hasCountedView.current = true;
                    const updatedEvents = events.map(e =>
                        e.id === eventId ? { ...e, views: (e.views || 0) + 1 } : e
                    );
                    localStorage.setItem('invita_events', JSON.stringify(updatedEvents));
                }
            }
        }
    }, [params.id, isPreview]);

    useEffect(() => {
        if (event && event.musicUrl) {
            const newAudio = new Audio(event.musicUrl);
            newAudio.loop = true;
            setAudio(newAudio);
            return () => { newAudio.pause(); setAudio(null); };
        }
    }, [event]);

    const toggleMusic = () => {
        if (audio) {
            if (isPlaying) audio.pause(); else audio.play();
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (!event) return;
        const targetDate = new Date(event.date).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else { clearInterval(interval); }
        }, 1000);
        return () => clearInterval(interval);
    }, [event]);

    const handleWhatsApp = () => {
        if (!event) return;
        const url = `https://wa.me/${event.whatsappNumber}?text=${encodeURIComponent(event.whatsappMessage)}`;
        window.open(url, '_blank');
    };

    const handleOpenMaps = () => {
        if (!event) return;
        const mapsUrl = event.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(`"${event.address}"`)}`;
        window.open(mapsUrl, '_blank');
    };

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'users': return <Users className="w-5 h-5" />;
            case 'music': return <Music2 className="w-5 h-5" />;
            case 'wine': return <Wine className="w-5 h-5" />;
            case 'utensils': return <Utensils className="w-5 h-5" />;
            case 'party-popper': return <PartyPopper className="w-5 h-5" />;
            case 'camera': return <Camera className="w-5 h-5" />;
            case 'star': return <Star className="w-5 h-5" />;
            default: return <Star className="w-5 h-5" />;
        }
    };

    const renderCalendarDays = () => {
        if (!event) return [];
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const selectedDay = eventDate.getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < startDayIndex; i++) days.push(<span key={`empty-${i}`} className="opacity-0"></span>);
        for (let d = 1; d <= daysInMonth; d++) {
            const isSelected = d === selectedDay;
            if (isSelected) {
                days.push(
                    <span key={d} className="relative flex items-center justify-center font-bold text-white">
                        <span className="absolute inset-0 rounded-full shadow-md" style={{ backgroundColor: event.primaryColor || '#a855f7' }}></span>
                        <span className="relative z-10">{d}</span>
                    </span>
                );
            } else { days.push(<span key={d}>{d}</span>); }
        }
        return days;
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-900 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-purple-200">Cargando invitación...</p>
                </div>
            </div>
        );
    }

    const gallery = event.gallery || [];

    // Handlers need access to gallery, so we define them here or ensure gallery is available.
    // Actually, handlers depend on 'gallery' which comes from 'event'. 
    // If 'event' is null, we return early. 
    // BUT hooks must be unconditional.
    // The state 'currentImageIndex' is fine at the top.
    // The handlers 'nextImage' and 'prevImage' are just functions, they can be defined anywhere or here.
    // Let's define them here, after the check, because they are not hooks.

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % (event.gallery?.length || 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + (event.gallery?.length || 1)) % (event.gallery?.length || 1));
    };

    const itinerary = event.itinerary || [];
    const titleFont = event.titleFont || "font-great-vibes";
    const bodyFont = event.bodyFont || "font-serif";
    const primaryColor = event.primaryColor || "#a855f7";
    const textColor = event.textColor || "#ffffff";

    const layout = event.layoutTemplate || 'classic';
    const isMinimal = layout === 'minimal';
    const isNeon = layout === 'neon';

    const containerClasses = `w-full max-w-md shadow-2xl overflow-hidden relative min-h-screen flex flex-col ${isMinimal ? 'bg-white' : 'bg-black'}`;
    const neonCardClass = isNeon
        ? "bg-black/60 border-2 backdrop-blur-md shadow-lg p-6 md:p-8 rounded-2xl"
        : "";
    const neonStyle = isNeon ? { borderColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}60` } : {};

    return (
        <div className={`min-h-screen bg-gray-900 flex justify-center ${bodyFont}`}>
            <div className={containerClasses}>
                <div className="fixed inset-0 z-0 w-full max-w-md mx-auto">
                    <img
                        src={event.backgroundUrl}
                        alt="Background"
                        className={`absolute inset-0 w-full h-full object-cover ${isMinimal ? 'brightness-[0.9] opacity-40' : isNeon ? 'brightness-[0.3] contrast-125' : 'brightness-[0.4]'}`}
                    />
                    <div className={`absolute inset-0 ${isMinimal ? 'bg-white/60' : 'bg-black/20'}`}></div>
                </div>

                {isPreview && (
                    <div className="fixed top-4 left-4 z-50">
                        <Link href="/admin" className="flex items-center gap-2 text-white/90 hover:text-white bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md px-4 py-2 rounded-full transition-all text-xs font-bold shadow-lg border border-white/10">
                            <Edit className="w-4 h-4" />
                            Volver a Edición
                        </Link>
                    </div>
                )}

                {/* Botón Volver a Galería - Solo si viene desde galería */}
                {fromGallery && (
                    <div className="fixed top-4 right-4 z-50 animate-fade-in">
                        <Link href="/" className="flex items-center gap-2 text-white/90 hover:text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 backdrop-blur-md px-4 py-2 rounded-full transition-all text-xs font-bold shadow-lg border border-white/10 hover:scale-105">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Galería
                        </Link>
                    </div>
                )}

                <div className="flex-grow relative z-10" style={{ color: textColor }}>
                    <motion.section initial="hidden" animate="visible" variants={fadeInUp} className="min-h-[90vh] flex flex-col items-center justify-center text-center p-6 pt-20">
                        <div className="flex flex-col items-center gap-2 w-full">
                            <motion.span variants={fadeInUp} className={`uppercase tracking-[0.2em] text-lg md:text-2xl font-bold drop-shadow-md mb-2 px-2 break-words w-full ${isNeon ? 'animate-pulse' : ''}`} style={{ color: primaryColor, textShadow: isNeon ? `0 0 10px ${primaryColor}` : 'none' }}>
                                {event.type}
                            </motion.span>
                            <motion.h1 variants={fadeInUp} className={`text-5xl md:text-7xl ${titleFont} drop-shadow-sm leading-tight py-2 px-2 w-full break-words`} style={{ color: textColor }}>
                                {event.celebrantName.split(' ')[0]} <br />
                                <span className="text-4xl md:text-6xl">{event.celebrantName.split(' ').slice(1).join(' ')}</span>
                            </motion.h1>
                            <motion.div variants={fadeInScale} className="mt-8 w-full flex flex-col items-center">
                                {layout === 'video' ? (
                                    <div className="w-full aspect-[4/5] md:aspect-square max-w-sm bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 relative mb-6">
                                        {event.videoUrl ? (
                                            <video controls className="w-full h-full object-cover" poster={event.heroImageUrl || event.backgroundUrl}>
                                                <source src={event.videoUrl} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900"><p>Video no disponible</p></div>
                                        )}
                                    </div>
                                ) : isMinimal ? (
                                    <>
                                        {event.heroImageUrl && (
                                            <div className="relative w-64 h-80 mt-4 mb-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                                                <div className="absolute inset-0 bg-white shadow-2xl p-3 transform -rotate-2">
                                                    <img src={event.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {event.heroImageUrl && (
                                            <div className="relative w-72 h-72 mt-4 mb-6 max-w-[80vw]">
                                                <div className={`absolute inset-0 rounded-full overflow-hidden bg-black/20 ${isNeon ? 'border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'border-4 shadow-2xl'}`} style={isNeon ? { borderColor: primaryColor, boxShadow: `0 0 20px ${primaryColor}` } : { borderColor: primaryColor }}>
                                                    <img src={event.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                                                </div>
                                                {!isNeon && <div className="absolute -inset-4 rounded-full border border-white/20 opacity-50 pointer-events-none"></div>}
                                            </div>
                                        )}
                                    </>
                                )}
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-xs font-light italic tracking-wider mb-1 animate-pulse" style={{ color: textColor, opacity: 0.9 }}>PRESIONA PARA REPRODUCIR</p>
                                    <button onClick={toggleMusic} className={`w-16 h-16 rounded-full backdrop-blur-md border flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg active:scale-95 ${isMinimal ? 'bg-white/80 border-gray-300 text-gray-800' : isNeon ? 'bg-black/50 text-white border-2' : 'bg-white/10 border-white/30 text-white'}`} style={isNeon ? { borderColor: primaryColor, color: primaryColor, boxShadow: `0 0 10px ${primaryColor}` } : { borderColor: isMinimal ? 'transparent' : primaryColor, color: isMinimal ? primaryColor : textColor }}>
                                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="py-12 px-6 text-center">
                        <div className={isNeon ? neonCardClass : isMinimal ? 'bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm' : 'bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl'} style={isNeon ? neonStyle : {}}>
                            <Heart className="w-6 h-6 mx-auto mb-4 opacity-80" style={{ color: primaryColor }} />
                            <p className="italic leading-relaxed text-base md:text-lg font-light" style={{ color: textColor }}>
                                "{event.quote || "A ustedes que formaron parte de tantos sueños e ilusiones, quiero invitarlos a compartir la magia de una noche que será única y sin duda inolvidable."}"
                            </p>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInScale} className="px-4 mb-8">
                        <div className={isNeon ? neonCardClass : isMinimal ? 'bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg' : 'bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg'} style={isNeon ? neonStyle : {}}>
                            <h2 className={`text-center text-2xl md:text-3xl ${titleFont} mb-6`} style={{ color: primaryColor, textShadow: isNeon ? `0 0 5px ${primaryColor}` : 'none' }}>Solo Falta</h2>
                            <div className="flex justify-center gap-2 md:gap-4 text-center flex-wrap">
                                {[{ label: "Días", value: timeLeft.days }, { label: "Horas", value: timeLeft.hours }, { label: "Minutos", value: timeLeft.minutes }, { label: "Segundos", value: timeLeft.seconds }].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center w-14 md:w-16">
                                        <div className="text-2xl md:text-3xl font-bold drop-shadow-sm mb-1 font-sans" style={{ color: textColor }}>{item.value}</div>
                                        <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-light" style={{ color: primaryColor }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-12 px-6 text-center">
                        <h2 className={`text-4xl md:text-5xl ${titleFont} mb-2 drop-shadow-md`} style={{ color: textColor }}>Save the Date</h2>
                        <p className="uppercase tracking-[0.3em] text-xs md:text-sm mb-8 font-medium" style={{ color: primaryColor }}>
                            {new Date(event.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </p>
                        <div className={isNeon ? neonCardClass : isMinimal ? 'bg-white/90 text-gray-800 shadow-md backdrop-blur-md p-6 rounded-3xl inline-block w-full max-w-xs' : 'bg-black/40 text-white shadow-2xl backdrop-blur-md p-6 rounded-3xl border border-white/10 inline-block w-full max-w-xs'} style={isNeon ? neonStyle : {}}>
                            <div className="grid grid-cols-7 gap-2 text-xs md:text-sm mb-4 font-medium border-b pb-2" style={{ color: primaryColor, borderColor: isNeon ? primaryColor : isMinimal ? '#e5e7eb' : 'rgba(255,255,255,0.1)' }}>
                                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 font-medium text-sm" style={{ color: textColor }}>{renderCalendarDays()}</div>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInScale} className="py-8 px-4 md:px-6">
                        <div className={isNeon ? neonCardClass + " text-center relative z-10" : isMinimal ? 'bg-white/90 shadow-lg backdrop-blur-md p-6 md:p-8 rounded-2xl text-center relative z-10' : 'bg-gradient-to-b from-purple-900/40 to-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl text-center relative z-10'} style={isNeon ? neonStyle : {}}>
                            <h3 className={`text-3xl ${titleFont} mb-6 drop-shadow-sm`} style={{ color: textColor }}>Recepción</h3>
                            <div className="space-y-6" style={{ color: textColor }}>
                                <div className="flex flex-col items-center gap-1">
                                    <CalendarIcon className="w-5 h-5 mb-1" style={{ color: primaryColor }} />
                                    <p className="font-light tracking-wide uppercase text-sm">{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                </div>
                                <div className="text-3xl font-light tracking-widest py-2 border-y" style={{ borderColor: isNeon ? primaryColor : `${textColor}20` }}>{new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className="flex flex-col items-center gap-2">
                                    <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                                    <p className="font-light px-4 leading-relaxed break-words">{event.address}</p>
                                </div>
                            </div>
                            <button onClick={handleOpenMaps} className={`mt-8 px-8 py-3 backdrop-blur-md border text-xs font-bold tracking-[0.15em] shadow-lg hover:bg-white/20 transition-all active:scale-95 w-full uppercase ${isNeon ? 'bg-black text-white border-2' : 'bg-white/10 text-white'}`} style={{ borderColor: primaryColor, color: isNeon ? primaryColor : textColor, boxShadow: isNeon ? `0 0 10px ${primaryColor}` : 'none' }}>
                                Ver Ubicación
                            </button>
                        </div>
                    </motion.section>

                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-8 px-6">
                        <div className={isNeon ? neonCardClass + " text-center space-y-10" : isMinimal ? 'bg-white/80 shadow-sm backdrop-blur-md rounded-2xl p-8 text-center space-y-10' : 'bg-black/30 shadow-xl backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center space-y-10'} style={isNeon ? neonStyle : {}}>
                            <div><h3 className={`text-2xl ${titleFont} mb-3`} style={{ color: primaryColor }}>Mis Padres</h3><p className="font-light leading-relaxed tracking-wide" style={{ color: textColor }}>{event.parents}</p></div>
                            <div className="w-1/2 mx-auto h-px bg-gradient-to-r from-transparent to-transparent" style={{ backgroundColor: isNeon ? primaryColor : isMinimal ? '#e5e7eb' : 'rgba(255,255,255,0.2)' }}></div>
                            <div><h3 className={`text-2xl ${titleFont} mb-3`} style={{ color: primaryColor }}>Mis Padrinos</h3><p className="font-light leading-relaxed tracking-wide" style={{ color: textColor }}>{event.godparents}</p></div>
                        </div>
                    </motion.section>

                    {/* Dress Code Section */}
                    {event.dressCode && (
                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-8 px-6 text-center">
                            <div className={isNeon ? neonCardClass : isMinimal ? 'bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm' : 'bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl'} style={isNeon ? neonStyle : {}}>
                                <div className="flex justify-center items-center gap-6 mb-4">
                                    <BowTieIcon className="w-12 h-12 opacity-90" style={{ color: primaryColor }} />
                                    <div className="w-1 h-12 rounded-full opacity-50" style={{ backgroundColor: primaryColor }}></div>
                                    <DressIcon className="w-10 h-10 opacity-90" style={{ color: primaryColor }} />
                                </div>
                                <h3 className={`text-2xl ${titleFont} mb-2`} style={{ color: primaryColor }}>Código de Vestimenta</h3>
                                <p className="font-light leading-relaxed tracking-wide" style={{ color: textColor }}>{event.dressCode}</p>
                            </div>
                        </motion.section>
                    )}

                    {/* Gifts Section */}
                    {event.gifts && (
                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-8 px-6 text-center">
                            <div className={isNeon ? neonCardClass : isMinimal ? 'bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm' : 'bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl'} style={isNeon ? neonStyle : {}}>
                                <Gift className="w-8 h-8 mx-auto mb-4 opacity-80" style={{ color: primaryColor }} />
                                <h3 className={`text-2xl ${titleFont} mb-2`} style={{ color: primaryColor }}>Regalos</h3>
                                <p className="font-light leading-relaxed tracking-wide" style={{ color: textColor }}>{event.gifts}</p>
                            </div>
                        </motion.section>
                    )}

                    {itinerary.length > 0 && (
                        <section className="py-12 px-4">
                            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className={`text-4xl ${titleFont} mb-10 text-center drop-shadow-md`} style={{ color: textColor }}>Itinerario</motion.h2>
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="relative w-full max-w-sm mx-auto">
                                <div className="absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 z-0 opacity-50" style={{ backgroundColor: primaryColor, boxShadow: isNeon ? `0 0 10px ${primaryColor}` : 'none' }}></div>
                                <div className="flex flex-col gap-6">
                                    {itinerary.map((item, index) => (
                                        <motion.div key={index} variants={fadeInUp} className="relative flex items-center justify-between w-full">
                                            <div className={`w-[42%] ${index % 2 === 0 ? 'text-right' : 'opacity-0'}`}>
                                                {index % 2 === 0 && (
                                                    <div className={`backdrop-blur-sm p-3 rounded-xl border shadow-lg ${isNeon ? 'bg-black/60 border-2' : isMinimal ? 'bg-white/90 border-gray-100' : 'bg-white/5 border-white/10'}`} style={isNeon ? { borderColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}40` } : {}}>
                                                        <h3 className={`text-lg md:text-xl ${titleFont} mb-1`} style={{ color: primaryColor }}>{item.title}</h3>
                                                        <p className="text-xs font-medium tracking-wider" style={{ color: textColor }}>{item.time}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center shadow-lg flex-shrink-0 mx-auto ${isNeon ? 'bg-black border-2' : isMinimal ? 'bg-white border-gray-200' : 'bg-black/60 border-white/20'}`} style={{ borderColor: isNeon ? primaryColor : isMinimal ? primaryColor : `${primaryColor}50`, boxShadow: `0 0 15px ${primaryColor}40` }}>
                                                <div style={{ color: primaryColor }}>{getIconComponent(item.icon)}</div>
                                            </div>
                                            <div className={`w-[42%] ${index % 2 !== 0 ? 'text-left' : 'opacity-0'}`}>
                                                {index % 2 !== 0 && (
                                                    <div className={`backdrop-blur-sm p-3 rounded-xl border shadow-lg ${isNeon ? 'bg-black/60 border-2' : isMinimal ? 'bg-white/90 border-gray-100' : 'bg-white/5 border-white/10'}`} style={isNeon ? { borderColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}40` } : {}}>
                                                        <h3 className={`text-lg md:text-xl ${titleFont} mb-1`} style={{ color: primaryColor }}>{item.title}</h3>
                                                        <p className="text-xs font-medium tracking-wider" style={{ color: textColor }}>{item.time}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </section>
                    )}

                    {gallery.length > 0 && (
                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="py-12 px-6 text-center">
                            <motion.h2 variants={fadeInUp} className={`text-4xl ${titleFont} mb-10 drop-shadow-md`} style={{ color: textColor }}>Galería de Fotos</motion.h2>

                            {/* Modern Carousel Gallery */}
                            <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
                                <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 ${isNeon ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'border-white/20'}`} style={isNeon ? { borderColor: primaryColor, boxShadow: `0 0 20px ${primaryColor}40` } : {}}>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImageIndex}
                                            src={gallery[currentImageIndex]}
                                            alt={`Gallery ${currentImageIndex}`}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    {gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    {/* Indicators */}
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                        {gallery.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </div>

                <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 1.5, duration: 1 }} className={`relative z-20 p-6 md:p-8 backdrop-blur-lg border-t mt-auto pb-8 ${isMinimal ? 'bg-white/90 border-gray-200' : 'bg-black/60 border-white/10'}`}>
                    <p className="text-center mb-4 text-sm font-light" style={{ color: textColor }}>Te esperamos para celebrar juntos este gran día</p>
                    <button onClick={handleWhatsApp} className={`w-full py-4 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all flex items-center justify-center gap-3 tracking-wide uppercase text-sm transform hover:-translate-y-1 active:scale-95 ${isNeon ? 'border-2' : ''}`} style={{ backgroundColor: '#16a34a', borderColor: isNeon ? '#4ade80' : 'transparent', boxShadow: isNeon ? '0 0 15px #16a34a' : 'none' }}>
                        CONFIRMAR ASISTENCIA
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
