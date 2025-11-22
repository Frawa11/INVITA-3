"use client";

import { useState, useEffect } from "react";
import { Calendar, Music, Image as ImageIcon, User, MapPin, Phone, MessageCircle } from "lucide-react";

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
    galleryUrl1: string;
    galleryUrl2: string;
    musicUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
}

interface EditorPanelProps {
    initialData?: EventData | null;
    onSubmit: (data: EventData) => void;
    onCancel: () => void;
}

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
        galleryUrl1: "",
        galleryUrl2: "",
        musicUrl: "",
        whatsappNumber: "",
        whatsappMessage: "Hola, confirmo mi asistencia...",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form for new event
            setFormData({
                type: "MIS 15 AÑOS",
                celebrantName: "",
                date: "",
                parents: "",
                godparents: "",
                address: "",
                mapsUrl: "",
                backgroundUrl: "",
                galleryUrl1: "",
                galleryUrl2: "",
                musicUrl: "",
                whatsappNumber: "",
                whatsappMessage: "Hola, confirmo mi asistencia...",
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <div className="flex-1 p-6 flex flex-col gap-6">
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

            {/* Form Groups */}
            <div className="space-y-6">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tipo de Evento (Ej: MIS QUINCE AÑOS)</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Imagen de Fondo</label>
                        <input
                            type="url"
                            name="backgroundUrl"
                            value={formData.backgroundUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombre del Celebrante</label>
                        <input
                            type="text"
                            name="celebrantName"
                            value={formData.celebrantName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
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
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Fecha y Hora del Evento</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Foto 2 de la Galería</label>
                        <input
                            type="url"
                            name="galleryUrl2"
                            value={formData.galleryUrl2}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombres de los Padres</label>
                        <textarea
                            name="parents"
                            value={formData.parents}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm resize-none text-gray-900"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">URL de Canción</label>
                        <input
                            type="url"
                            name="musicUrl"
                            value={formData.musicUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombres de los Padrinos</label>
                        <textarea
                            name="godparents"
                            value={formData.godparents}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm resize-none text-gray-900"
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
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Dirección del Evento</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Av. Abancay cdra. 2, Lima"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
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
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* Row 7 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mensaje de Confirmación de WhatsApp</label>
                        <textarea
                            name="whatsappMessage"
                            value={formData.whatsappMessage}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Hola, confirmo mi asistencia..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-sm resize-none text-gray-900"
                        ></textarea>
                    </div>
                </div>

            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end gap-3">
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
