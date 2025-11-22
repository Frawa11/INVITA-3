"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, User, Edit, Trash2, Share2, Eye, Plus, Link as LinkIcon, Image as ImageIcon, Sparkles, Globe, X } from "lucide-react";
import Link from "next/link";
import ParticleBackground from "@/components/ui/ParticleBackground";
import EditorPanel, { EventData } from "@/components/admin/EditorPanel";

// Glass Panel Component
function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 ${className}`}>
            {children}
        </div>
    );
}

// Categorías disponibles para la galería
const CATEGORIES = ["15 Años", "Bodas", "Bautizos", "Baby Shower", "Cumpleaños Infantiles", "50 Años", "Graduación", "Eventos Corporativos"];

// Initial Mock Data
const INITIAL_EVENTS: EventData[] = [];

export default function AdminDashboard() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Modal State
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [eventToPublish, setEventToPublish] = useState<EventData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("15 Años");

    // Load events from localStorage on mount
    useEffect(() => {
        const savedEvents = localStorage.getItem('invita_events');
        if (savedEvents) {
            try {
                setEvents(JSON.parse(savedEvents));
            } catch (e) {
                console.error("Error parsing events", e);
                setEvents([]);
            }
        } else {
            setEvents(INITIAL_EVENTS);
        }
        setIsLoaded(true); 
    }, []);

    // Save events to localStorage whenever they change
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem('invita_events', JSON.stringify(events));
    }, [events, isLoaded]);

    const handleCreateNew = () => {
        setSelectedEvent(null);
        setIsEditing(true);
    };

    const handleEdit = (event: EventData) => {
        setSelectedEvent(event);
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        const updatedEvents = events.filter(e => e.id !== id);
        setEvents(updatedEvents);
        
        if (selectedEvent?.id === id) {
            setIsEditing(false);
            setSelectedEvent(null);
        }
    };

    const handleSave = (data: EventData) => {
        let updatedEvents;
        if (selectedEvent) {
            // Update existing
            updatedEvents = events.map(e => e.id === selectedEvent.id ? { ...data, id: selectedEvent.id } : e);
        } else {
            // Create new
            const newEvent = { ...data, id: Date.now(), views: 0, isPublic: false };
            updatedEvents = [...events, newEvent];
        }
        setEvents(updatedEvents);
        setIsEditing(false);
        setSelectedEvent(null);
    };

    const handleCopyLink = (event: EventData) => {
        const invitationUrl = `${window.location.origin}/invitation/${event.id}`;
        navigator.clipboard.writeText(invitationUrl).then(() => {
            // Toast o silencio
        }).catch(() => {
            console.error("Error copiando enlace");
        });
    };

    // --- Lógica de Publicación ---
    const initiatePublish = (event: EventData) => {
        if (event.isPublic) {
            // CASO: QUITAR DE GALERÍA
            const updatedEvents = events.map(e => 
                e.id === event.id ? { ...e, isPublic: false } : e
            );
            setEvents(updatedEvents);
        } else {
            // CASO: AGREGAR A GALERÍA (Abrir modal)
            setEventToPublish(event);
            setSelectedCategory(event.category || "15 Años");
            setShowCategoryModal(true);
        }
    };

    const confirmPublish = () => {
        if (!eventToPublish) return;

        // CASO: CONFIRMAR AGREGAR
        const updatedEvents = events.map(e => 
            e.id === eventToPublish.id ? { ...e, isPublic: true, category: selectedCategory } : e
        );
        setEvents(updatedEvents);
        
        // Cerrar modal y limpiar selección
        setShowCategoryModal(false);
        setEventToPublish(null);
    };
    // ---------------------------

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    if (!isLoaded) return null; 

    return (
        <div className="min-h-screen relative flex flex-col">
            <ParticleBackground />

            {/* Top Bar */}
            <header className="z-10 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="md:hidden">
                        <Menu className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Invita <span className="text-xs font-normal opacity-70 bg-white/10 px-2 py-1 rounded-full ml-2">Admin</span></h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Botón Ir a Galería Pública */}
                    <Link href="/" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
                        <Globe className="w-4 h-4" />
                        Ver Galería Pública
                    </Link>

                    <div className="flex items-center gap-4 text-white/80">
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-white hover:text-white transition-colors border border-white/30 px-4 py-1.5 rounded-full hover:bg-white/10 backdrop-blur-sm"
                        >
                            Cerrar Sesión
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-deep-violet border border-white/20 flex items-center justify-center shadow-md">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 z-10 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden h-[calc(100vh-73px)]">

                {/* Left Panel: Editor */}
                <section className={`lg:col-span-7 flex flex-col h-full overflow-y-auto pb-20 lg:pb-0 transition-all duration-300 ${isEditing ? 'opacity-100 translate-x-0' : 'hidden lg:flex lg:opacity-100 lg:pointer-events-auto'}`}>
                    {isEditing ? (
                        <GlassPanel className="flex-1 flex flex-col h-full overflow-hidden">
                            <EditorPanel
                                initialData={selectedEvent}
                                onSubmit={handleSave}
                                onCancel={() => setIsEditing(false)}
                            />
                        </GlassPanel>
                    ) : (
                        <div className="flex-1 flex items-center justify-center p-8 h-full">
                            <div className="bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center max-w-lg w-full border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-2xl group-hover:bg-blue-100 transition-colors duration-500"></div>
                                
                                <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    <Sparkles className="w-10 h-10 text-blue-600" />
                                </div>
                                
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido a tu Panel</h2>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    Selecciona un evento de la lista para editarlo o crea una nueva invitación digital para sorprender a tus invitados.
                                </p>
                                
                                <button
                                    onClick={handleCreateNew}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 w-full"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Plus className="w-6 h-6" />
                                        Crear Nuevo Evento
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Right Panel: Manager */}
                <section className={`${isEditing ? 'hidden lg:flex' : 'flex'} lg:col-span-5 flex-col h-full overflow-hidden`}>
                    <GlassPanel className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
                            <h2 className="text-xl font-semibold text-deep-violet">Mis Eventos</h2>
                            <button
                                onClick={handleCreateNew}
                                className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Nuevo
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 p-0 bg-white/30">
                            {/* Desktop Table */}
                            <table className="w-full text-left border-collapse hidden md:table">
                                <thead className="bg-gray-50/80 sticky top-0 backdrop-blur-sm border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Evento</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Visitas</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white/50">
                                    {events.map((event) => (
                                        <tr key={event.id} className={`hover:bg-blue-50 transition-colors group cursor-pointer ${selectedEvent?.id === event.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`} onClick={() => handleEdit(event)}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">
                                                        {event.type.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 text-sm">{event.type}</p>
                                                        <p className="text-xs text-gray-500">{event.celebrantName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1 text-gray-500 font-medium">
                                                    <Eye className="w-3 h-3" /> {event.views || 0}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-1">
                                                    {/* AQUÍ EL CAMBIO IMPORTANTE: ?preview=true */}
                                                    <button 
                                                        onClick={() => window.open(`/invitation/${event.id}?preview=true`, '_blank')} 
                                                        className="p-2 hover:bg-white rounded-full text-gray-500 hover:text-blue-600 transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-100" 
                                                        title="Vista Previa"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    
                                                    {/* Botón Agregar a Galería */}
                                                    <button 
                                                        onClick={() => initiatePublish(event)} 
                                                        className={`p-2 rounded-full transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-100 ${event.isPublic ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'hover:bg-white text-gray-500 hover:text-yellow-600'}`} 
                                                        title={event.isPublic ? "Quitar de Galería" : "Agregar a Galería"}
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                    </button>

                                                    <button onClick={() => handleCopyLink(event)} className="p-2 hover:bg-white rounded-full text-gray-500 hover:text-purple-600 transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-100" title="Copiar Enlace">
                                                        <LinkIcon className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(event.id!)} className="p-2 hover:bg-white rounded-full text-gray-500 hover:text-red-600 transition-all shadow-sm hover:shadow border border-transparent hover:border-gray-100" title="Eliminar">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {events.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="p-12 text-center text-gray-400">
                                                No tienes eventos creados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Mobile Cards */}
                            <div className="md:hidden p-4 space-y-4 pb-20">
                                {events.map((event) => (
                                    <div key={event.id} onClick={() => handleEdit(event)} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 active:scale-[0.98] transition-transform">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {event.type.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{event.type}</h3>
                                                <p className="text-sm text-gray-600">{event.celebrantName}</p>
                                            </div>
                                            <div className="text-xs font-medium text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                                                <Eye className="w-3 h-3" /> {event.views || 0}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex gap-2 ml-auto w-full justify-end">
                                                <button onClick={() => initiatePublish(event)} className={`p-2 rounded-lg ${event.isPublic ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-50 text-gray-600'}`}>
                                                    <ImageIcon className="w-4 h-4" />
                                                </button>
                                                {/* AQUÍ TAMBIÉN: ?preview=true */}
                                                <button onClick={() => window.open(`/invitation/${event.id}?preview=true`, '_blank')} className="p-2 bg-gray-50 rounded-lg text-gray-600">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(event.id!)} className="p-2 bg-red-50 rounded-lg text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </GlassPanel>
                </section>
            </main>

            {/* MODAL SELECCIÓN DE CATEGORÍA */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Publicar en Galería</h3>
                            <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">
                            Elige la categoría donde aparecerá esta invitación en la página principal.
                        </p>

                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-white"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setShowCategoryModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmPublish}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-md"
                            >
                                Publicar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
