"use client";

import { useState, useEffect } from "react";
import { Calendar, Music, Image as ImageIcon, User, MapPin, Phone, MessageCircle, Plus, Trash2, Utensils, Wine, PartyPopper, Camera, Users, Star, Palette, Type, Layout, Video, FileText, Zap, Shirt } from "lucide-react";

export interface ItineraryItem {
    title: string;
    time: string;
    icon: 'users' | 'music' | 'wine' | 'utensils' | 'party-popper' | 'camera' | 'star';
}

export interface EventData {
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
    galleryUrl1: string;
    galleryUrl2: string;
    musicUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
    quote?: string;
    dressCode?: string; // Nuevo campo
    itinerary?: ItineraryItem[];
    titleFont?: string;
    bodyFont?: string;
    primaryColor?: string;
    textColor?: string;
    isPublic?: boolean;
    category?: string;
    views?: number;
    layoutTemplate?: 'classic' | 'video' | 'minimal' | 'neon';
}

interface EditorPanelProps {
    initialData?: EventData | null;
    onSubmit: (data: EventData) => void;
    onCancel: () => void;
}

const FONT_OPTIONS = [
    { label: "--- Cursivas / Elegantes ---", value: "disabled", disabled: true },
    { label: "Great Vibes (Elegante Clásica)", value: "font-great-vibes" },
    { label: "Dancing Script (Dinámica)", value: "font-dancing" },
    { label: "Pacifico (Gruesa y Divertida)", value: "font-pacifico" },
    { label: "Sacramento (Fina y Delicada)", value: "font-sacramento" },
    { label: "Parisienne (Romántica)", value: "font-parisienne" },
    { label: "Allura (Fluida)", value: "font-allura" },
    { label: "Alex Brush (Pincel Elegante)", value: "font-alex-brush" },
    { label: "Pinyon Script (Aristocrática)", value: "font-pinyon" },
    { label: "Petit Formal (Muy Formal)", value: "font-petit-formal" },
    { label: "Tangerine (Alta y Fina)", value: "font-tangerine" },
    { label: "Satisfy (Moderna)", value: "font-satisfy" },
    { label: "Courgette (Gruesa)", value: "font-courgette" },
    { label: "Herr Von Muellerhoff (Compleja)", value: "font-herrvon" },
    { label: "Mr De Haviland (Caligrafía)", value: "font-mrdehaviland" },
    { label: "Aguafina Script (Artística)", value: "font-aguafina" },
    { label: "Meddon (Manuscrita Real)", value: "font-meddon" },
    { label: "La Belle Aurore (Casual)", value: "font-labelle" },
    { label: "Homemade Apple (Lápiz)", value: "font-homemade" },
    { label: "Zeyada (Desordenada)", value: "font-zeyada" },
    { label: "Indie Flower (Juvenil)", value: "font-indie" },
    { label: "Shadows Into Light (Marcador)", value: "font-shadows" },
    { label: "Caveat (Anotación)", value: "font-caveat" },
    
    { label: "--- Serif / Clásicas ---", value: "disabled", disabled: true },
    { label: "Playfair Display (Editorial)", value: "font-playfair" },
    { label: "Cinzel (Romana/Épica)", value: "font-cinzel" },
    { label: "Cormorant Garamond (Elegante)", value: "font-cormorant" },
    { label: "Merriweather (Lectura)", value: "font-merriweather" },
    { label: "Lora (Caligráfica)", value: "font-lora" },
    { label: "Roboto Slab (Sólida)", value: "font-roboto-slab" },
    
    { label: "--- Sans / Modernas ---", value: "disabled", disabled: true },
    { label: "Montserrat (Geométrica)", value: "font-montserrat" },
    { label: "Lato (Equilibrada)", value: "font-lato" },
    { label: "Raleway (Elegante Fina)", value: "font-raleway" },
    { label: "Poppins (Redonda)", value: "font-poppins" },
    { label: "Quicksand (Suave)", value: "font-quicksand" },
    { label: "Inter (Estándar)", value: "font-inter" },
    { label: "Oswald (Condensada)", value: "font-oswald" },
    
    { label: "--- Display / Impacto ---", value: "disabled", disabled: true },
    { label: "Abril Fatface (Gruesa Curva)", value: "font-abril" },
    { label: "Bebas Neue (Alta y Fuerte)", value: "font-bebas" },
    { label: "Lobster (Retro)", value: "font-lobster" },
    { label: "Amatic SC (Dibujada)", value: "font-amatic" },
];

export default function EditorPanel({ initialData, onSubmit, onCancel }: EditorPanelProps) {
    const [formData, setFormData] = useState<EventData>({
        type: "MIS 15 AÑOS",
        celebrantName: "",
        date: "",
        parents: "",
        godparents: "",
        address: "",
        mapsUrl: "",
        backgroundUrl: "",
        heroImageUrl: "", 
        videoUrl: "", 
        galleryUrl1: "",
        galleryUrl2: "",
        musicUrl: "",
        whatsappNumber: "",
        whatsappMessage: "Hola, confirmo mi asistencia...",
        quote: "",
        dressCode: "", // Nuevo
        itinerary: [],
        titleFont: "font-great-vibes",
        bodyFont: "font-serif",
        primaryColor: "#a855f7", 
        textColor: "#ffffff",
        isPublic: false,
        views: 0,
        category: "15 Años",
        layoutTemplate: 'classic' 
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                heroImageUrl: initialData.heroImageUrl || "",
                videoUrl: initialData.videoUrl || "",
                itinerary: initialData.itinerary || [],
                dressCode: initialData.dressCode || "",
                titleFont: initialData.titleFont || "font-great-vibes",
                bodyFont: initialData.bodyFont || "font-serif",
                primaryColor: initialData.primaryColor || "#a855f7",
                textColor: initialData.textColor || "#ffffff",
                isPublic: initialData.isPublic || false,
                views: initialData.views || 0,
                category: initialData.category || "15 Años",
                layoutTemplate: initialData.layoutTemplate || 'classic'
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addItineraryItem = () => {
        setFormData(prev => ({
            ...prev,
            itinerary: [
                ...(prev.itinerary || []),
                { title: "Nueva Actividad", time: "00:00 PM", icon: "star" }
            ]
        }));
    };

    const removeItineraryItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            itinerary: prev.itinerary?.filter((_, i) => i !== index)
        }));
    };

    const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: string) => {
        setFormData(prev => ({
            ...prev,
            itinerary: prev.itinerary?.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm placeholder-gray-400";

    return (
        <div className="flex-1 p-6 flex flex-col gap-6 h-full overflow-y-auto bg-white">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-deep-violet">
                    {initialData ? "Editar Invitación" : "Crear Nueva Invitación"}
                </h2>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
                >
                    Regresar al Panel
                </button>
            </div>

            <div className="space-y-6 pb-10">

                {/* SELECCIÓN DE PLANTILLA */}
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 space-y-4">
                    <h3 className="text-md font-semibold text-purple-800 flex items-center gap-2">
                        <Layout className="w-5 h-5" /> Elige tu Diseño
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div 
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.layoutTemplate === 'classic' ? 'border-purple-600 bg-white shadow-md' : 'border-transparent hover:bg-purple-100/50'}`}
                            onClick={() => setFormData(prev => ({ ...prev, layoutTemplate: 'classic' }))}
                        >
                            <div className="w-full h-16 bg-gradient-to-b from-purple-200 to-pink-200 rounded-md flex items-center justify-center text-purple-800 font-bold text-xs uppercase">
                                Classic
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center">Classic Glass</span>
                        </div>
                        <div 
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.layoutTemplate === 'video' ? 'border-purple-600 bg-white shadow-md' : 'border-transparent hover:bg-purple-100/50'}`}
                            onClick={() => setFormData(prev => ({ ...prev, layoutTemplate: 'video' }))}
                        >
                            <div className="w-full h-16 bg-gray-800 rounded-md flex items-center justify-center text-white font-bold text-xs uppercase relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 z-10"></div>
                                <Video className="w-5 h-5 relative z-20 opacity-80" />
                                <span className="relative z-20 ml-1">Video</span>
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center">Cinematic</span>
                        </div>
                        <div 
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.layoutTemplate === 'minimal' ? 'border-purple-600 bg-white shadow-md' : 'border-transparent hover:bg-purple-100/50'}`}
                            onClick={() => setFormData(prev => ({ ...prev, layoutTemplate: 'minimal' }))}
                        >
                            <div className="w-full h-16 bg-stone-100 border border-stone-200 rounded-md flex items-center justify-center text-stone-600 font-bold text-xs uppercase">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center">Minimalista</span>
                        </div>
                        <div 
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.layoutTemplate === 'neon' ? 'border-purple-600 bg-white shadow-md' : 'border-transparent hover:bg-purple-100/50'}`}
                            onClick={() => setFormData(prev => ({ ...prev, layoutTemplate: 'neon' }))}
                        >
                            <div className="w-full h-16 bg-black border-2 border-cyan-400 rounded-md flex items-center justify-center text-cyan-400 font-bold text-xs uppercase shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center">Neon Party</span>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN DE ESTILO Y DISEÑO */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-4">
                    <h3 className="text-md font-semibold text-blue-800 flex items-center gap-2">
                        <Palette className="w-5 h-5" /> Personalización de Diseño
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Type className="w-4 h-4" /> Tipografía Títulos
                            </label>
                            <select
                                name="titleFont"
                                value={formData.titleFont}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {FONT_OPTIONS.map((opt, i) => (
                                    <option key={i} value={opt.value} disabled={opt.disabled} className={opt.disabled ? "font-bold bg-gray-100 text-gray-500" : ""}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Type className="w-4 h-4" /> Tipografía Texto
                            </label>
                            <select
                                name="bodyFont"
                                value={formData.bodyFont}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {FONT_OPTIONS.map((opt, i) => (
                                    <option key={i} value={opt.value} disabled={opt.disabled} className={opt.disabled ? "font-bold bg-gray-100 text-gray-500" : ""}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Color Principal</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    name="primaryColor"
                                    value={formData.primaryColor}
                                    onChange={handleChange}
                                    className="w-12 h-10 rounded cursor-pointer border border-gray-300 p-1 bg-white"
                                />
                                <span className="text-sm text-gray-500">{formData.primaryColor}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Color de Texto</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    name="textColor"
                                    value={formData.textColor}
                                    onChange={handleChange}
                                    className="w-12 h-10 rounded cursor-pointer border border-gray-300 p-1 bg-white"
                                />
                                <span className="text-sm text-gray-500">{formData.textColor}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATOS DEL EVENTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tipo de Evento (Ej: MIS QUINCE AÑOS)</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    
                    {formData.layoutTemplate === 'video' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                <Video className="w-4 h-4 text-purple-600" /> URL de Video de Fondo (mp4)
                            </label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                placeholder="https://...video.mp4"
                                className={inputClass}
                            />
                            <p className="text-xs text-gray-500">Recomendado: Enlace directo a archivo .mp4</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Imagen de Fondo (Obligatorio)</label>
                        <input
                            type="url"
                            name="backgroundUrl"
                            value={formData.backgroundUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputClass}
                        />
                        <p className="text-xs text-gray-500">Esta imagen se verá de fondo en toda la invitación.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombre del Celebrante</label>
                        <input
                            type="text"
                            name="celebrantName"
                            value={formData.celebrantName}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {formData.layoutTemplate === 'classic' ? 'URL Foto Principal (Círculo)' : 'URL Foto Principal (Cuadrada/Vertical)'}
                        </label>
                        <input
                            type="url"
                            name="heroImageUrl"
                            value={formData.heroImageUrl}
                            onChange={handleChange}
                            placeholder="https://... (Opcional)"
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Foto 1 de la Galería</label>
                        <input
                            type="url"
                            name="galleryUrl1"
                            value={formData.galleryUrl1}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Foto 2 de la Galería</label>
                        <input
                            type="url"
                            name="galleryUrl2"
                            value={formData.galleryUrl2}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Fecha y Hora del Evento</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Canción</label>
                        <input
                            type="url"
                            name="musicUrl"
                            value={formData.musicUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombres de los Padres</label>
                        <textarea
                            name="parents"
                            value={formData.parents}
                            onChange={handleChange}
                            rows={2}
                            className={`${inputClass} resize-none`}
                        ></textarea>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombres de los Padrinos</label>
                        <textarea
                            name="godparents"
                            value={formData.godparents}
                            onChange={handleChange}
                            rows={2}
                            className={`${inputClass} resize-none`}
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Número de WhatsApp</label>
                        <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            placeholder="+51 999 999 999"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Dirección del Evento</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Av. Abancay cdra. 2, Lima"
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Enlace de Google Maps (Opcional)</label>
                        <input
                            type="url"
                            name="mapsUrl"
                            value={formData.mapsUrl}
                            onChange={handleChange}
                            placeholder="https://maps.app.goo.gl/..."
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Frase o Cita (Opcional)</label>
                        <textarea
                            name="quote"
                            value={formData.quote || ""}
                            onChange={handleChange}
                            rows={1}
                            placeholder="A ustedes que formaron parte..."
                            className={`${inputClass} resize-none`}
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Shirt className="w-4 h-4 text-purple-600" /> Código de Vestimenta (Opcional)
                        </label>
                        <input
                            type="text"
                            name="dressCode"
                            value={formData.dressCode}
                            onChange={handleChange}
                            placeholder="Ej: Formal, Etiqueta, Sport Elegante"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* ITINERARIO */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Itinerario / Cronograma</h3>
                        <button 
                            onClick={addItineraryItem}
                            className="flex items-center gap-1 text-sm text-electric-blue hover:text-deep-violet font-medium"
                        >
                            <Plus className="w-4 h-4" /> Agregar Actividad
                        </button>
                    </div>

                    <div className="space-y-4">
                        {(!formData.itinerary || formData.itinerary.length === 0) && (
                            <p className="text-sm text-gray-400 italic text-center py-4">No hay actividades agregadas aún.</p>
                        )}
                        {formData.itinerary?.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Título</label>
                                        <input 
                                            type="text" 
                                            value={item.title} 
                                            onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border rounded bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Hora</label>
                                        <input 
                                            type="text" 
                                            value={item.time} 
                                            onChange={(e) => updateItineraryItem(index, 'time', e.target.value)}
                                            placeholder="00:00 PM"
                                            className="w-full px-3 py-1.5 text-sm border rounded bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Icono</label>
                                        <select 
                                            value={item.icon} 
                                            onChange={(e) => updateItineraryItem(index, 'icon', e.target.value as any)}
                                            className="w-full px-3 py-1.5 text-sm border rounded bg-white text-gray-900"
                                        >
                                            <option value="star">⭐ General / Otro</option>
                                            <option value="users">👥 Invitados</option>
                                            <option value="music">🎵 Música/Vals</option>
                                            <option value="wine">🥂 Brindis</option>
                                            <option value="utensils">🍽️ Cena</option>
                                            <option value="party-popper">🎉 Fiesta</option>
                                            <option value="camera">📸 Fotos</option>
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeItineraryItem(index)}
                                    className="text-red-500 hover:text-red-700 mt-6"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mensaje de Confirmación de WhatsApp</label>
                        <textarea
                            name="whatsappMessage"
                            value={formData.whatsappMessage}
                            onChange={handleChange}
                            rows={2}
                            className={`${inputClass} resize-none`}
                        ></textarea>
                    </div>
                </div>

            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end gap-3 pb-4">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-electric-blue to-deep-violet rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                    {initialData ? "Guardar Cambios" : "Crear Invitación"}
                </button>
            </div>
        </div>
    );
}
