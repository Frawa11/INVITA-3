"use client";

import Link from "next/link";
import { Search, Heart, Star, Music, Calendar, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { EventData } from "@/components/admin/EditorPanel";

// STATIC TEMPLATES CLEANED (Vacío)
const STATIC_TEMPLATES: any[] = [];

const CATEGORIES = ["Todos", "15 Años", "Bodas", "Bautizos", "Baby Shower", "Cumpleaños Infantiles", "50 Años", "Graduación", "Eventos Corporativos"];

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [publicEvents, setPublicEvents] = useState<any[]>([]);

    // Load Public Events from LocalStorage
    useEffect(() => {
        const savedEvents = localStorage.getItem('invita_events');
        if (savedEvents) {
            const allEvents: EventData[] = JSON.parse(savedEvents);
            // Filtrar solo los que tienen isPublic = true
            const published = allEvents.filter(e => e.isPublic).map(e => ({
                id: e.id,
                title: `${e.type} - ${e.celebrantName}`,
                category: e.category || "Varios",
                image: e.backgroundUrl || "https://images.unsplash.com/photo-1530103862676-de3c9da59af7", // Fallback
                color: "from-blue-500 to-purple-500",
                price: "Real",
                views: e.views || 0
            }));
            setPublicEvents(published);
        }
    }, []);

    // Combine (ahora solo publicEvents porque STATIC está vacío)
    const allItems = [...publicEvents, ...STATIC_TEMPLATES];

    const filteredTemplates = allItems.filter(template => {
        const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory;
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">

            {/* Header */}
            <header className="bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm z-50 relative sticky top-0">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}>
                    {/* Logo Icon */}
                    <div className="text-electric-blue">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-deep-violet tracking-tight">Invita</span>
                </div>

                <Link href="/admin" className="bg-deep-violet text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg">
                    Administración
                </Link>
            </header>

            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-100 py-4 overflow-x-auto sticky top-[72px] z-40 shadow-sm">
                <div className="container mx-auto px-6 flex items-center gap-2 md:gap-4 min-w-max">
                    {CATEGORIES.map((item) => (
                        <button
                            key={item}
                            onClick={() => setSelectedCategory(item)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                selectedCategory === item
                                    ? "bg-deep-violet text-white shadow-md scale-105"
                                    : "text-gray-600 hover:text-deep-violet hover:bg-gray-100"
                            )}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#6200EA] to-[#00C6FF] pt-16 pb-32 px-6 text-center text-white overflow-hidden">
                {/* Animated Background */}
                <ParticleBackground />

                <div className="container mx-auto relative z-10 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up drop-shadow-lg">
                        Explora nuestra galería de diseños
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 font-light animate-fade-in-up delay-100 drop-shadow-md">
                        Encuentra la plantilla perfecta para tu evento especial.
                        <br className="hidden md:block" /> Haz clic en un diseño para ver la invitación completa.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative animate-fade-in-up delay-200">
                        <input
                            type="text"
                            placeholder="Busca plantillas (ej: Boda, 15 Años)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl text-lg"
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                    </div>
                </div>

                {/* Curved Bottom Edge */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
                    </svg>
                </div>
            </section>

            {/* Results Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {selectedCategory === "Todos" ? "Todos los Diseños" : `Diseños de ${selectedCategory}`}
                    </h2>
                    <span className="text-gray-500 text-sm">{filteredTemplates.length} resultados</span>
                </div>

                {filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            // AÑADIDO: ?from=gallery
                            <Link href={`/invitation/${template.id}?from=gallery`} key={template.id} className="group block">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                                    {/* Image Placeholder with Gradient */}
                                    <div className={cn("h-48 w-full bg-gradient-to-br relative overflow-hidden", template.color)}>
                                        <img
                                            src={template.image}
                                            alt={template.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                                            {template.price}
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold text-electric-blue bg-blue-50 px-2 py-1 rounded-md">
                                                {template.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-deep-violet transition-colors">
                                            {template.title}
                                        </h3>
                                        <div className="mt-auto flex items-center gap-4 text-gray-500 text-sm pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-1">
                                                <Music className="w-4 h-4" />
                                                <span>Música</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Agenda</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
                        <p className="text-gray-500">Intenta con otra categoría o término de búsqueda.</p>
                        <button
                            onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}
                            className="mt-6 text-electric-blue font-medium hover:underline"
                        >
                            Ver todos los diseños
                        </button>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-[#333] text-white py-8 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">© 2025 Invita. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
