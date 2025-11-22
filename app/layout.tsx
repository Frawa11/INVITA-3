import type { Metadata } from "next";
import { 
  Inter, 
  Dancing_Script, 
  Playfair_Display, 
  Great_Vibes, 
  Pacifico, 
  Sacramento, 
  Parisienne, 
  Allura, 
  Alex_Brush, 
  Pinyon_Script, 
  Petit_Formal_Script, 
  Tangerine,
  Cinzel, 
  Cormorant_Garamond, 
  Merriweather, 
  Lora,
  Montserrat, 
  Lato, 
  Raleway, 
  Poppins, 
  Quicksand,
  Abril_Fatface, 
  Bebas_Neue, 
  Lobster,
  Oswald,
  Roboto_Slab,
  Satisfy,
  Courgette,
  Amatic_SC,
  Caveat,
  Shadows_Into_Light,
  Indie_Flower,
  Zeyada,
  Homemade_Apple,
  La_Belle_Aurore,
  Meddon,
  Mr_De_Haviland,
  Herr_Von_Muellerhoff,
  Aguafina_Script
} from "next/font/google";
import "./globals.css";

// --- Cursivas / Manuscritas ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const sacramento = Sacramento({ weight: "400", subsets: ["latin"], variable: "--font-sacramento" });
const parisienne = Parisienne({ weight: "400", subsets: ["latin"], variable: "--font-parisienne" });
const allura = Allura({ weight: "400", subsets: ["latin"], variable: "--font-allura" });
const alexBrush = Alex_Brush({ weight: "400", subsets: ["latin"], variable: "--font-alex-brush" });
const pinyonScript = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon" });
const petitFormal = Petit_Formal_Script({ weight: "400", subsets: ["latin"], variable: "--font-petit-formal" });
const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-tangerine" });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"], variable: "--font-satisfy" });
const courgette = Courgette({ weight: "400", subsets: ["latin"], variable: "--font-courgette" });
const amatic = Amatic_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-amatic" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const shadows = Shadows_Into_Light({ weight: "400", subsets: ["latin"], variable: "--font-shadows" });
const indie = Indie_Flower({ weight: "400", subsets: ["latin"], variable: "--font-indie" });
const zeyada = Zeyada({ weight: "400", subsets: ["latin"], variable: "--font-zeyada" });
const homemade = Homemade_Apple({ weight: "400", subsets: ["latin"], variable: "--font-homemade" });
const laBelle = La_Belle_Aurore({ weight: "400", subsets: ["latin"], variable: "--font-labelle" });
const meddon = Meddon({ weight: "400", subsets: ["latin"], variable: "--font-meddon" });
const mrDeHaviland = Mr_De_Haviland({ weight: "400", subsets: ["latin"], variable: "--font-mrdehaviland" });
const herrVon = Herr_Von_Muellerhoff({ weight: "400", subsets: ["latin"], variable: "--font-herrvon" });
const aguafina = Aguafina_Script({ weight: "400", subsets: ["latin"], variable: "--font-aguafina" });

// --- Serif (Clásicas) ---
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "600", "700"], subsets: ["latin"], variable: "--font-cormorant" });
const merriweather = Merriweather({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-merriweather" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto-slab" });

// --- Sans / Modernas ---
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const lato = Lato({ weight: ["100", "300", "400", "700"], subsets: ["latin"], variable: "--font-lato" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const poppins = Poppins({ weight: ["100", "200", "300", "400", "600", "800"], subsets: ["latin"], variable: "--font-poppins" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

// --- Display ---
const abril = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--font-abril" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const lobster = Lobster({ weight: "400", subsets: ["latin"], variable: "--font-lobster" });

export const metadata: Metadata = {
    title: "Invita - Plataforma de Eventos",
    description: "Crea invitaciones inolvidables",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`
                ${inter.variable} ${dancingScript.variable} ${playfair.variable} ${greatVibes.variable}
                ${pacifico.variable} ${sacramento.variable} ${parisienne.variable} ${allura.variable}
                ${alexBrush.variable} ${pinyonScript.variable} ${petitFormal.variable} ${tangerine.variable}
                ${satisfy.variable} ${courgette.variable} ${amatic.variable} ${caveat.variable}
                ${shadows.variable} ${indie.variable} ${zeyada.variable} ${homemade.variable}
                ${laBelle.variable} ${meddon.variable} ${mrDeHaviland.variable} ${herrVon.variable}
                ${aguafina.variable}
                ${cinzel.variable} ${cormorant.variable} ${merriweather.variable} ${lora.variable} ${robotoSlab.variable}
                ${montserrat.variable} ${lato.variable} ${raleway.variable} ${poppins.variable} ${quicksand.variable} ${oswald.variable}
                ${abril.variable} ${bebas.variable} ${lobster.variable}
                font-sans
            `}>
                {children}
            </body>
        </html>
    );
}
