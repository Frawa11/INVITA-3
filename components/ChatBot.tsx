"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message {
    text: string;
    isBot: boolean;
    timestamp: Date;
}

interface ClientRequest {
    id: string;
    name: string;
    phone: string;
    eventType: string;
    eventDate: string;
    plan: string;
    photoUrls: string[];
    additionalInfo: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: Date;
}

const PLANS_INFO = `💎 **Nuestros Diseños y Precios**

Tenemos 4 diseños modernos para tu invitación:

📱 **Classic Glass**
• Sin video: S/30
• Con video: S/35

🎬 **Cinematic** (con video)
• Precio: S/40

📄 **Minimalista** (elegante y simple)
• Sin video: S/30
• Con video: S/35

⚡ **Neon Party** (moderno y llamativo)
• Con efectos: S/40

---

✨ **Todos los diseños incluyen:**
✅ Música personalizada
✅ Cuenta regresiva
✅ Galería de fotos
✅ Link de ubicación
✅ Código de vestimenta
✅ Mesa de regalos
✅ Confirmación por WhatsApp

---

También contamos con planes premium:
🥉 **Plan Bronce** - S/91
🥈 **Plan Plata** - S/139
🥇 **Plan Oro** - S/229
💎 **Plan Premium** - S/325

¿Quieres conocer los detalles de algún plan premium?`;

const PLAN_BRONCE = `🥉 **Plan Bronce - S/91**

✅ Video con 1 foto
✅ Video (media pantalla, sin animación)
✅ Música que elijas
✅ Mensajes y frases
✅ Cuenta regresiva
✅ Link de ubicación
✅ Galería con 3 Fotos
✅ Dress Code
✅ Mesa de regalos
✅ Confirmación por WhatsApp`;

const PLAN_PLATA = `🥈 **Plan Plata - S/139**

✅ Video con 2 fotos
✅ Video Full (pantalla completa, sin animación)
✅ Música que elijas
✅ Mensajes y frases
✅ Cuenta regresiva
✅ Itinerario
✅ Link de ubicación
✅ Galería con 6 Fotos
✅ Dress Code
✅ Mesa de regalos
✅ Confirmación por WhatsApp`;

const PLAN_ORO = `🥇 **Plan Oro - S/229**

✅ Video con 3 fotos
✅ Video Full (pantalla completa)
✅ Música que elijas
✅ Mensajes y frases
✅ Cuenta regresiva
✅ Itinerario
✅ Link de ubicación
✅ Galería con hasta 10 Fotos
✅ Dress Code
✅ Mesa de regalos
✅ PDF de recuerdo
✅ Confirmación por WhatsApp`;

const PLAN_PREMIUM = `💎 **Plan Premium - S/325**

✅ Diseño exclusivo y animado
✅ Video con 4 fotos
✅ Video Full con animación
✅ Video con animaciones especiales
✅ Música que elijas
✅ Mensajes y frases
✅ Cuenta regresiva
✅ Itinerario
✅ Link de ubicación
✅ Galería con hasta 15 Fotos
✅ Dress Code
✅ Sugerencias
✅ Mesa de regalos
✅ Video de recuerdo
✅ Confirmación de asistencia personalizada`;

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "¡Hola! 👋 Soy tu asistente virtual de Invita. ¿En qué puedo ayudarte hoy?", isBot: true, timestamp: new Date() }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (text: string, isBot: boolean) => {
        setMessages(prev => [...prev, { text, isBot, timestamp: new Date() }]);
    };

    const getAutomatedResponse = (userMessage: string): string => {
        const lowerMsg = userMessage.toLowerCase();

        // Planes específicos
        if (lowerMsg.includes("bronce")) {
            return PLAN_BRONCE;
        }

        if (lowerMsg.includes("plata") || lowerMsg.includes("estandar") || lowerMsg.includes("estándar")) {
            return PLAN_PLATA;
        }

        if (lowerMsg.includes("oro") || lowerMsg.includes("gold")) {
            return PLAN_ORO;
        }

        if (lowerMsg.includes("premium")) {
            return PLAN_PREMIUM;
        }

        // Precio
        if (lowerMsg.includes("precio") || lowerMsg.includes("costo") || lowerMsg.includes("cuánto") || lowerMsg.includes("cuanto")) {
            return PLANS_INFO;
        }

        // Tiempo de entrega
        if (lowerMsg.includes("tiempo") || lowerMsg.includes("entrega") || lowerMsg.includes("cuándo") || lowerMsg.includes("cuando") || lowerMsg.includes("demora")) {
            return "⏱️ Las invitaciones se entregan en **24-48 horas** después de recibir toda la información y confirmación del pago.";
        }

        // Tipos de eventos
        if (lowerMsg.includes("tipo") || lowerMsg.includes("evento") || lowerMsg.includes("qué eventos") || lowerMsg.includes("que eventos")) {
            return "🎉 Creamos invitaciones digitales para:\n\n• 15 Años\n• Bodas\n• Bautizos\n• Baby Shower\n• Cumpleaños Infantiles\n• 50 Años\n• Graduación\n• Eventos Corporativos\n\n¡Y muchos más!";
        }

        // Pago
        if (lowerMsg.includes("pago") || lowerMsg.includes("pagar") || lowerMsg.includes("forma")) {
            return "💳 Aceptamos:\n\n• Transferencia bancaria\n• Yape / Plin\n• Efectivo\n\nEl pago se realiza al confirmar tu pedido.";
        }

        // Crear invitación o elegir plan
        if (lowerMsg.includes("crear") || lowerMsg.includes("hacer") || lowerMsg.includes("quiero") || lowerMsg.includes("solicitar") || lowerMsg.includes("pedir") || lowerMsg.includes("ese") || lowerMsg.includes("esa") || lowerMsg.includes("elegir") || lowerMsg.includes("escoger")) {
            // Enviar notificación inmediata
            const notificationMessage = `🔔 *Cliente Interesado en Crear Invitación*

📅 Fecha: ${new Date().toLocaleString('es-PE')}
💬 Último mensaje: "${userMessage}"

El cliente mostró interés en crear una invitación. Por favor, espera su contacto.`;

            const whatsappUrl = `https://wa.me/51996001280?text=${encodeURIComponent(notificationMessage)}`;
            window.open(whatsappUrl, '_blank');

            return "¡Perfecto! 🎊 Me encantaría ayudarte a crear tu invitación.\n\n📲 **Para continuar, por favor envía tus datos por:**\n\n• WhatsApp: 996001280\n• Correo: aameztm@gmail.com\n\nNecesitaremos:\n✅ Tu nombre\n✅ Tipo de evento\n✅ Fecha del evento\n✅ Plan que te interesa\n✅ Fotos para la invitación\n\n📋 Te enviaremos una vista previa del diseño antes del pago.\n\n💰 Pago por Yape: 996001280 (después de aprobar)\n\n¡Te esperamos! 😊";
        }

        // Ver ejemplos
        if (lowerMsg.includes("ejemplo") || lowerMsg.includes("muestra") || lowerMsg.includes("ver")) {
            return "📱 Puedes ver ejemplos de nuestras invitaciones en la galería principal de la página.\n\n¿Te gustaría crear tu propia invitación?";
        }

        // Default
        return "🤔 Puedo ayudarte con:\n\n• Información de precios y planes\n• Tipos de eventos\n• Tiempos de entrega\n• Formas de pago\n• Crear tu invitación\n\n¿Sobre qué te gustaría saber más?";
    };


    const handleSend = () => {
        if (!input.trim()) return;

        addMessage(input, false);

        const response = getAutomatedResponse(input);
        setTimeout(() => addMessage(response, true), 500);

        setInput("");
    };

    return (
        <>
            {/* Botón flotante */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 animate-pulse"
                >
                    <MessageCircle className="w-8 h-8" />
                </button>
            )}

            {/* Ventana de chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            <div>
                                <h3 className="font-bold">Asistente Invita</h3>
                                <p className="text-xs opacity-90">Siempre en línea</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isBot ? 'bg-white text-gray-800 shadow-sm' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}`}>
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                    <p className="text-[10px] mt-1 opacity-60">{msg.timestamp.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:scale-105 transition-transform"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
