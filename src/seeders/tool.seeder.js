import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Tool from "../models/Tool.js";

const tools = [
  {
    name: "Notion",
    category: "Productividad",
    description: "Docs, wikis y gestión de proyectos en un solo workspace colaborativo.",
    pricing: "Freemium",
    rating: 4.8,
    website: "https://notion.so",
    image: "https://picsum.photos/300/400?random=1",
    featured: true,
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Gestión de clientes, ventas y marketing automatizado en una sola plataforma.",
    pricing: "De pago",
    rating: 4.6,
    website: "https://hubspot.com",
    image: "https://picsum.photos/300/400?random=2",
    featured: true,
  },
  {
    name: "Datadog",
    category: "DevOps",
    description: "Monitorización de infraestructura, logs y APM en tiempo real para equipos técnicos.",
    pricing: "Freemium",
    rating: 4.7,
    website: "https://datadog.com",
    image: "https://picsum.photos/300/400?random=3",
    featured: false,
  },
  {
    name: "Mailchimp",
    category: "Marketing",
    description: "Email marketing y automatización de campañas para equipos de cualquier tamaño.",
    pricing: "Freemium",
    rating: 4.3,
    website: "https://mailchimp.com",
    image: "https://picsum.photos/300/400?random=4",
    featured: false,
  },
  {
    name: "Mixpanel",
    category: "Analytics",
    description: "Analítica de producto centrada en el comportamiento y retención de usuarios.",
    pricing: "Freemium",
    rating: 4.5,
    website: "https://mixpanel.com",
    image: "https://picsum.photos/300/400?random=5",
    featured: true,
  },
  {
    name: "Slack",
    category: "Productividad",
    description: "Comunicación en equipo organizada por canales, con integraciones para todo tu stack.",
    pricing: "Freemium",
    rating: 4.7,
    website: "https://slack.com",
    image: "https://picsum.photos/300/400?random=6",
    featured: true,
  },
  {
    name: "Figma",
    category: "Diseño",
    description: "Herramienta de diseño colaborativo en tiempo real para equipos de producto.",
    pricing: "Freemium",
    rating: 4.9,
    website: "https://figma.com",
    image: "https://picsum.photos/300/400?random=7",
    featured: false,
  },
  {
    name: "Linear",
    category: "Productividad",
    description: "Gestión de proyectos e incidencias pensada para equipos de desarrollo modernos.",
    pricing: "Freemium",
    rating: 4.8,
    website: "https://linear.app",
    image: "https://picsum.photos/300/400?random=8",
    featured: false,
  },
  {
    name: "Stripe",
    category: "Pagos",
    description: "Infraestructura de pagos online para empresas de cualquier tamaño a nivel global.",
    pricing: "De pago",
    rating: 4.9,
    website: "https://stripe.com",
    image: "https://picsum.photos/300/400?random=9",
    featured: true,
  },
];

const seedTool = async () => {
  try {
    await connectDB();

    await Tool.deleteMany();
    await Tool.insertMany(tools);

    console.log("Herramientas cargadas correctamente");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedTool();