"use client";

import { useState, useEffect } from "react";
import { Play, Pause, MapPin, Calendar as CalendarIcon, Heart, Share2, Music2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
    galleryUrl1: string;
    galleryUrl2: string;
    musicUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
}

export default function InvitationPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<EventData | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Load event data from localStorage
    useEffect(() => {
        const savedEvents = localStorage.getItem('invita_events');
        if (savedEvents) {
            const events: EventData[] = JSON.parse(savedEvents);
            const foundEvent = events.find(e => e.id === parseInt(params.id));
            if (foundEvent) {
                setEvent(foundEvent);
            }
        }
    }, [params.id]);

    // Initialize audio when event is loaded
    useEffect(() => {
        if (event && event.musicUrl) {
            const newAudio = new Audio(event.musicUrl);
            newAudio.loop = true;
            setAudio(newAudio);

            return () => {
                newAudio.pause();
                setAudio(null);
            };
        }
    }, [event]);

    const togglePlay = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
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
            } else {
                clearInterval(interval);
            }
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
        // Si hay un enlace directo de Google Maps, usarlo
        if (event.mapsUrl) {
            window.open(event.mapsUrl, '_blank');
            return;
        }
        // Usar comillas para búsqueda EXACTA sin interpretaciones de Google
        const exactSearch = `"${event.address}"`;
        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(exactSearch)}`;
        window.open(mapsUrl, '_blank');
    };

    // --- Lógica del Calendario Dinámico ---
    const renderCalendarDays = () => {
        if (!event) return [];

        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const selectedDay = eventDate.getDate();

        // Primer día del mes (0 = Domingo, 1 = Lunes, etc.)
        // En JS getDay() devuelve Domingo=0. 
        // En el diseño el calendario empieza Lunes (L, M, M, J, V, S, D).
        // Ajustamos para que Lunes sea 0 y Domingo sea 6.
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // Ajuste: Si es domingo (0) -> se vuelve 6. Si es lunes (1) -> se vuelve 0.
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        
        // Rellenar espacios vacíos antes del día 1
        for (let i = 0; i < startDayIndex; i++) {
            days.push(<span key={`empty-${i}`} className="opacity-0"></span>);
        }

        // Rellenar días del mes
        for (let d = 1; d <= daysInMonth; d++) {
            const isSelected = d === selectedDay;
            if (isSelected) {
                days.push(
                    <span key={d} className="relative flex items-center justify-center text-white font-bold">
                        <span className="absolute inset-0 bg-purple-600 rounded-full shadow-md"></span>
                        <span className="relative z-10">{d}</span>
                    </span>
                );
            } else {
                days.push(<span key={d}>{d}</span>);
            }
        }

        return days;
    };
    // -------------------------------------


    // Show loading state while event is being loaded
    if (!event) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando invitación...</p>
                </div>
            </div>
        );
    }

    // Create gallery array from individual URLs
    const gallery = [event.galleryUrl1, event.galleryUrl2].filter(url => url);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Mobile Container */}
            <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative font-serif text-gray-800">

                {/* Hero Section */}
                <section className="relative h-[80vh] flex flex-col items-center justify-center text-center text-white p-6">
                    <div className="absolute inset-0 z-0">
                        <img src={event.backgroundUrl} alt="Background" className="w-full h-full object-cover brightness-50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-purple-900/60 mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in-up">
                        <span className="uppercase tracking-[0.2em] text-sm opacity-90">{event.type}</span>
                        <h1 className="text-6xl font-great-vibes text-gold-400 drop-shadow-lg leading-tight py-2">
                            {event.celebrantName.split(' ')[0]} <br />
                            <span className="text-5xl">{event.celebrantName.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <div className="mt-8 flex flex-col items-center gap-2">
                            <p className="text-sm font-light italic opacity-90">Dale Play para escuchar mi canción</p>
                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                            >
                                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                            </button>
                        </div>
                    </div>

                    {/* Curved Bottom */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                        </svg>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-12 px-8 text-center bg-white relative">
                    <p className="text-gray-600 italic leading-relaxed text-lg">
                        "A ustedes que formaron parte de tantos sueños e ilusiones, quiero invitarlos a compartir la magia de una noche que será única y sin duda inolvidable."
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6 opacity-50"></div>
                </section>

                {/* Countdown Section */}
                <section className="py-8 px-4 bg-purple-50/50">
                    <h2 className="text-center text-2xl font-great-vibes text-purple-800 mb-8">Solo Falta</h2>
                    <div className="flex justify-center gap-3 text-center">
                        {[
                            { label: "Días", value: timeLeft.days },
                            { label: "Horas", value: timeLeft.hours },
                            { label: "Minutos", value: timeLeft.minutes },
                            { label: "Segundos", value: timeLeft.seconds }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-purple-900 text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
                                    {item.value}
                                </div>
                                <span className="text-xs uppercase tracking-wider text-purple-900/70 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Calendar Section */}
                <section className="py-12 px-6 text-center">
                    <h2 className="text-3xl font-great-vibes text-purple-900 mb-2">Save the Date</h2>
                    <p className="uppercase tracking-widest text-sm text-gray-500 mb-8">
                        {new Date(event.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </p>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 inline-block w-full max-w-xs">
                        <div className="grid grid-cols-7 gap-2 text-sm text-gray-400 mb-4 font-medium">
                            <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-gray-700 font-medium">
                            {renderCalendarDays()}
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="py-12 px-6 bg-gradient-to-b from-white to-purple-50 text-center space-y-12">

                    {/* Parents */}
                    <div>
                        <h3 className="text-2xl font-great-vibes text-purple-800 mb-4">Mis Padres</h3>
                        <p className="text-gray-700 leading-relaxed">{event.parents}</p>
                    </div>

                    {/* Godparents */}
                    <div>
                        <h3 className="text-2xl font-great-vibes text-purple-800 mb-4">Mis Padrinos</h3>
                        <p className="text-gray-700 leading-relaxed">{event.godparents}</p>
                    </div>

                    {/* Reception */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        <h3 className="text-3xl font-great-vibes text-purple-900 mb-6">Recepción</h3>

                        <div className="space-y-4 text-gray-600">
                            <div className="flex flex-col items-center gap-2">
                                <CalendarIcon className="w-6 h-6 text-purple-500" />
                                <p>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-px bg-gray-200 my-2"></div>
                                <p className="font-bold text-2xl text-gray-800">
                                    {new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <div className="w-12 h-px bg-gray-200 my-2"></div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <MapPin className="w-6 h-6 text-purple-500" />
                                <p>{event.address}</p>
                            </div>
                        </div>

                        <button onClick={handleOpenMaps} className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full text-sm font-medium tracking-wider shadow-lg hover:bg-purple-700 transition-colors w-full">
                            VER UBICACIÓN
                        </button>
                    </div>
                </section>

                {/* Gallery Section */}
                {gallery.length > 0 && (
                    <section className="py-12 px-6 text-center">
                        <h2 className="text-4xl font-great-vibes text-purple-900 mb-8">Galería de Fotos</h2>
                        <div className="grid grid-cols-1 gap-8">
                            {gallery.map((img, index) => (
                                <div key={index} className="relative mx-auto w-64 h-64">
                                    <div className="absolute inset-0 rounded-full border-4 border-gold-400 shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                                        <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-2 rounded-full border border-purple-200 opacity-50 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer / RSVP */}
                <div className="sticky bottom-0 z-50 p-4 bg-white/80 backdrop-blur-lg border-t border-purple-100">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full py-3.5 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 animate-pulse-slow"
                    >
                        <Share2 className="w-5 h-5" />
                        CONFIRMAR ASISTENCIA
                    </button>
                </div>

            </div>
        </div>
    );
}
