import type {
  Trade,
  SubCategory,
  ServiceItem,
  Handyman,
  Review
} from '@/lib/types';

// ─── Trades (4) ──────────────────────────────────────────────────────
export const trades: Trade[] = [
  {
    id: 't1',
    slug: 'gasfiteria',
    name: { es: 'Gasfitería', en: 'Plumbing' },
    description: {
      es: 'Fugas, desagües, instalaciones y reparaciones de agua.',
      en: 'Leaks, drains, installations and water repairs.'
    },
    icon: '🔧',
    color: '#2563EB'
  },
  {
    id: 't2',
    slug: 'electricidad',
    name: { es: 'Electricidad', en: 'Electrical' },
    description: {
      es: 'Tomacorrientes, tableros, luminarias y cableado seguro.',
      en: 'Outlets, panels, lighting and safe wiring.'
    },
    icon: '⚡',
    color: '#D97706'
  },
  {
    id: 't3',
    slug: 'pintura',
    name: { es: 'Pintura', en: 'Painting' },
    description: {
      es: 'Interiores, exteriores, goteras y acabados.',
      en: 'Interiors, exteriors, damp patches and finishes.'
    },
    icon: '🎨',
    color: '#16A34A'
  },
  {
    id: 't4',
    slug: 'carpinteria',
    name: { es: 'Carpintería', en: 'Carpentry' },
    description: {
      es: 'Muebles, puertas, melamina y reparaciones de madera.',
      en: 'Furniture, doors, melamine and woodwork repairs.'
    },
    icon: '🪚',
    color: '#9333EA'
  }
];

// ─── Sub-categories (12, 3 per trade) ────────────────────────────────
export const subCategories: SubCategory[] = [
  // Gasfitería
  { id: 'sc1', tradeId: 't1', name: { es: 'Fugas y filtraciones', en: 'Leaks & seepage' } },
  { id: 'sc2', tradeId: 't1', name: { es: 'Desagües y atoros', en: 'Drains & blockages' } },
  { id: 'sc3', tradeId: 't1', name: { es: 'Instalaciones', en: 'Installations' } },
  // Electricidad
  { id: 'sc4', tradeId: 't2', name: { es: 'Tomacorrientes e interruptores', en: 'Outlets & switches' } },
  { id: 'sc5', tradeId: 't2', name: { es: 'Iluminación', en: 'Lighting' } },
  { id: 'sc6', tradeId: 't2', name: { es: 'Tableros y cableado', en: 'Panels & wiring' } },
  // Pintura
  { id: 'sc7', tradeId: 't3', name: { es: 'Interiores', en: 'Interiors' } },
  { id: 'sc8', tradeId: 't3', name: { es: 'Exteriores', en: 'Exteriors' } },
  { id: 'sc9', tradeId: 't3', name: { es: 'Humedad y goteras', en: 'Damp & leaks' } },
  // Carpintería
  { id: 'sc10', tradeId: 't4', name: { es: 'Muebles a medida', en: 'Custom furniture' } },
  { id: 'sc11', tradeId: 't4', name: { es: 'Puertas y cerraduras', en: 'Doors & locks' } },
  { id: 'sc12', tradeId: 't4', name: { es: 'Reparaciones', en: 'Repairs' } }
];

// ─── Service items (36, 3 per sub-category) ──────────────────────────
export const serviceItems: ServiceItem[] = [
  // sc1 Fugas
  { id: 'si1', subCategoryId: 'sc1', tradeId: 't1', name: { es: 'Reparación de fuga en caño', en: 'Faucet leak repair' }, description: { es: 'Diagnóstico y reparación de fuga en grifería.', en: 'Diagnose and fix a leaking faucet.' }, basePrice: 80, durationMin: 60 },
  { id: 'si2', subCategoryId: 'sc1', tradeId: 't1', name: { es: 'Cambio de empaquetadura', en: 'Washer replacement' }, description: { es: 'Reemplazo de empaques y sellos gastados.', en: 'Replace worn washers and seals.' }, basePrice: 60, durationMin: 45 },
  { id: 'si3', subCategoryId: 'sc1', tradeId: 't1', name: { es: 'Sellado de filtración en pared', en: 'Wall seepage sealing' }, description: { es: 'Detección y sellado de filtración en tubería empotrada.', en: 'Find and seal seepage in embedded piping.' }, basePrice: 150, durationMin: 120 },
  // sc2 Desagües
  { id: 'si4', subCategoryId: 'sc2', tradeId: 't1', name: { es: 'Destape de lavadero', en: 'Sink unclogging' }, description: { es: 'Desatoro de lavadero de cocina o baño.', en: 'Clear a blocked kitchen or bathroom sink.' }, basePrice: 90, durationMin: 60 },
  { id: 'si5', subCategoryId: 'sc2', tradeId: 't1', name: { es: 'Destape de inodoro', en: 'Toilet unclogging' }, description: { es: 'Desatoro de inodoro con equipo profesional.', en: 'Unclog a toilet with professional tools.' }, basePrice: 100, durationMin: 60 },
  { id: 'si6', subCategoryId: 'sc2', tradeId: 't1', name: { es: 'Limpieza de tubería principal', en: 'Main drain cleaning' }, description: { es: 'Limpieza de desagüe principal con sonda.', en: 'Snake-clean the main drain line.' }, basePrice: 220, durationMin: 150 },
  // sc3 Instalaciones
  { id: 'si7', subCategoryId: 'sc3', tradeId: 't1', name: { es: 'Instalación de grifería', en: 'Faucet installation' }, description: { es: 'Instalación de grifo nuevo en lavatorio.', en: 'Install a new faucet on a basin.' }, basePrice: 120, durationMin: 75 },
  { id: 'si8', subCategoryId: 'sc3', tradeId: 't1', name: { es: 'Instalación de inodoro', en: 'Toilet installation' }, description: { es: 'Retiro e instalación de inodoro completo.', en: 'Remove and install a complete toilet.' }, basePrice: 180, durationMin: 120 },
  { id: 'si9', subCategoryId: 'sc3', tradeId: 't1', name: { es: 'Instalación de termoeléctrica', en: 'Electric heater install' }, description: { es: 'Instalación de terma eléctrica para ducha.', en: 'Install an electric shower heater.' }, basePrice: 200, durationMin: 120 },
  // sc4 Tomacorrientes
  { id: 'si10', subCategoryId: 'sc4', tradeId: 't2', name: { es: 'Cambio de tomacorriente', en: 'Outlet replacement' }, description: { es: 'Reemplazo de tomacorriente dañado.', en: 'Replace a damaged power outlet.' }, basePrice: 70, durationMin: 45 },
  { id: 'si11', subCategoryId: 'sc4', tradeId: 't2', name: { es: 'Instalación de interruptor', en: 'Switch installation' }, description: { es: 'Instalación o cambio de interruptor de luz.', en: 'Install or replace a light switch.' }, basePrice: 65, durationMin: 45 },
  { id: 'si12', subCategoryId: 'sc4', tradeId: 't2', name: { es: 'Punto nuevo de tomacorriente', en: 'New outlet point' }, description: { es: 'Instalación de un punto eléctrico adicional.', en: 'Run wiring for an additional outlet point.' }, basePrice: 140, durationMin: 90 },
  // sc5 Iluminación
  { id: 'si13', subCategoryId: 'sc5', tradeId: 't2', name: { es: 'Instalación de luminaria', en: 'Light fixture install' }, description: { es: 'Montaje de lámpara o spot en techo.', en: 'Mount a ceiling lamp or spotlight.' }, basePrice: 80, durationMin: 60 },
  { id: 'si14', subCategoryId: 'sc5', tradeId: 't2', name: { es: 'Cambio a luces LED', en: 'Switch to LED lighting' }, description: { es: 'Reemplazo de focos por paneles LED.', en: 'Replace bulbs with LED panels.' }, basePrice: 110, durationMin: 75 },
  { id: 'si15', subCategoryId: 'sc5', tradeId: 't2', name: { es: 'Instalación de dimmer', en: 'Dimmer installation' }, description: { es: 'Instalación de regulador de intensidad de luz.', en: 'Install a light dimmer control.' }, basePrice: 95, durationMin: 60 },
  // sc6 Tableros
  { id: 'si16', subCategoryId: 'sc6', tradeId: 't2', name: { es: 'Cambio de llave térmica', en: 'Breaker replacement' }, description: { es: 'Reemplazo de llave termomagnética del tablero.', en: 'Replace a circuit breaker in the panel.' }, basePrice: 130, durationMin: 75 },
  { id: 'si17', subCategoryId: 'sc6', tradeId: 't2', name: { es: 'Revisión de tablero eléctrico', en: 'Panel inspection' }, description: { es: 'Diagnóstico y orden del tablero general.', en: 'Diagnose and tidy the main panel.' }, basePrice: 150, durationMin: 90 },
  { id: 'si18', subCategoryId: 'sc6', tradeId: 't2', name: { es: 'Instalación de pozo a tierra', en: 'Ground rod installation' }, description: { es: 'Instalación de sistema de puesta a tierra.', en: 'Install a grounding system.' }, basePrice: 380, durationMin: 240 },
  // sc7 Interiores
  { id: 'si19', subCategoryId: 'sc7', tradeId: 't3', name: { es: 'Pintado de habitación', en: 'Room painting' }, description: { es: 'Pintado completo de una habitación estándar.', en: 'Full painting of a standard room.' }, basePrice: 280, durationMin: 360 },
  { id: 'si20', subCategoryId: 'sc7', tradeId: 't3', name: { es: 'Pintado de sala-comedor', en: 'Living-dining painting' }, description: { es: 'Pintado de ambiente amplio interior.', en: 'Paint a large interior living area.' }, basePrice: 420, durationMin: 480 },
  { id: 'si21', subCategoryId: 'sc7', tradeId: 't3', name: { es: 'Empaste y lijado de pared', en: 'Wall filling & sanding' }, description: { es: 'Preparación de pared con empaste y lijado.', en: 'Prep walls with filler and sanding.' }, basePrice: 160, durationMin: 180 },
  // sc8 Exteriores
  { id: 'si22', subCategoryId: 'sc8', tradeId: 't3', name: { es: 'Pintado de fachada', en: 'Facade painting' }, description: { es: 'Pintado de fachada con pintura para exteriores.', en: 'Paint a facade with exterior paint.' }, basePrice: 650, durationMin: 600 },
  { id: 'si23', subCategoryId: 'sc8', tradeId: 't3', name: { es: 'Pintado de reja metálica', en: 'Metal gate painting' }, description: { es: 'Lijado y pintado anticorrosivo de rejas.', en: 'Sand and anti-rust paint metal gates.' }, basePrice: 240, durationMin: 240 },
  { id: 'si24', subCategoryId: 'sc8', tradeId: 't3', name: { es: 'Impermeabilizado de azotea', en: 'Rooftop waterproofing' }, description: { es: 'Aplicación de impermeabilizante en azotea.', en: 'Apply waterproof coating on the rooftop.' }, basePrice: 480, durationMin: 360 },
  // sc9 Humedad
  { id: 'si25', subCategoryId: 'sc9', tradeId: 't3', name: { es: 'Tratamiento de humedad', en: 'Damp treatment' }, description: { es: 'Tratamiento de pared con humedad y moho.', en: 'Treat a damp, mouldy wall.' }, basePrice: 220, durationMin: 240 },
  { id: 'si26', subCategoryId: 'sc9', tradeId: 't3', name: { es: 'Reparación de gotera de techo', en: 'Ceiling leak repair' }, description: { es: 'Sellado de gotera y repintado del techo.', en: 'Seal a ceiling leak and repaint.' }, basePrice: 260, durationMin: 240 },
  { id: 'si27', subCategoryId: 'sc9', tradeId: 't3', name: { es: 'Sellado de juntas', en: 'Joint sealing' }, description: { es: 'Sellado de juntas y fisuras con masilla.', en: 'Seal joints and cracks with sealant.' }, basePrice: 130, durationMin: 120 },
  // sc10 Muebles
  { id: 'si28', subCategoryId: 'sc10', tradeId: 't4', name: { es: 'Closet de melamina a medida', en: 'Custom melamine closet' }, description: { es: 'Diseño e instalación de closet a medida.', en: 'Design and install a custom closet.' }, basePrice: 900, durationMin: 600 },
  { id: 'si29', subCategoryId: 'sc10', tradeId: 't4', name: { es: 'Repisas flotantes', en: 'Floating shelves' }, description: { es: 'Fabricación e instalación de repisas.', en: 'Build and mount floating shelves.' }, basePrice: 180, durationMin: 150 },
  { id: 'si30', subCategoryId: 'sc10', tradeId: 't4', name: { es: 'Mueble de cocina', en: 'Kitchen cabinet' }, description: { es: 'Mueble bajo o alto de cocina a medida.', en: 'Custom lower or upper kitchen cabinet.' }, basePrice: 750, durationMin: 540 },
  // sc11 Puertas
  { id: 'si31', subCategoryId: 'sc11', tradeId: 't4', name: { es: 'Cambio de cerradura', en: 'Lock replacement' }, description: { es: 'Reemplazo de cerradura de puerta.', en: 'Replace a door lock.' }, basePrice: 90, durationMin: 60 },
  { id: 'si32', subCategoryId: 'sc11', tradeId: 't4', name: { es: 'Instalación de puerta', en: 'Door installation' }, description: { es: 'Instalación de puerta de interior con marco.', en: 'Install an interior door with frame.' }, basePrice: 320, durationMin: 240 },
  { id: 'si33', subCategoryId: 'sc11', tradeId: 't4', name: { es: 'Ajuste de puerta descuadrada', en: 'Sticking door fix' }, description: { es: 'Ajuste y cepillado de puerta que roza.', en: 'Adjust and plane a sticking door.' }, basePrice: 110, durationMin: 90 },
  // sc12 Reparaciones
  { id: 'si34', subCategoryId: 'sc12', tradeId: 't4', name: { es: 'Reparación de cajón', en: 'Drawer repair' }, description: { es: 'Reparación de rieles y estructura de cajón.', en: 'Fix drawer rails and structure.' }, basePrice: 80, durationMin: 60 },
  { id: 'si35', subCategoryId: 'sc12', tradeId: 't4', name: { es: 'Reparación de mueble de melamina', en: 'Melamine furniture repair' }, description: { es: 'Reparación de mueble dañado o despegado.', en: 'Repair damaged or unglued furniture.' }, basePrice: 140, durationMin: 120 },
  { id: 'si36', subCategoryId: 'sc12', tradeId: 't4', name: { es: 'Lacado de mueble de madera', en: 'Wood furniture lacquering' }, description: { es: 'Lijado y lacado de mueble de madera.', en: 'Sand and lacquer a wooden piece.' }, basePrice: 260, durationMin: 300 }
];

// ─── Handymen (5) ────────────────────────────────────────────────────
export const handymen: Handyman[] = [
  {
    id: 'h1',
    name: 'Carlos Mendoza',
    tradeId: 't1',
    avatar: 'https://i.pravatar.cc/240?img=12',
    bio: {
      es: 'Gasfitero certificado con 15 años atendiendo Miraflores y San Isidro. Especialista en fugas difíciles y termas.',
      en: 'Certified plumber with 15 years serving Miraflores and San Isidro. Specialist in tricky leaks and water heaters.'
    },
    specialties: [
      { es: 'Detección de fugas', en: 'Leak detection' },
      { es: 'Termas eléctricas', en: 'Electric heaters' },
      { es: 'Instalaciones', en: 'Installations' }
    ],
    district: 'Miraflores',
    serviceAreas: ['Miraflores', 'San Isidro', 'Barranco', 'Surquillo'],
    yearsExperience: 15,
    rating: 4.9,
    reviewCount: 213,
    jobsDone: 540,
    respondsInMin: 8,
    verified: true
  },
  {
    id: 'h2',
    name: 'Rosa Huamán',
    tradeId: 't2',
    avatar: 'https://i.pravatar.cc/240?img=45',
    bio: {
      es: 'Electricista colegiada. Experta en tableros, pozos a tierra e iluminación LED en La Molina y Surco.',
      en: 'Licensed electrician. Expert in panels, grounding and LED lighting across La Molina and Surco.'
    },
    specialties: [
      { es: 'Tableros eléctricos', en: 'Electrical panels' },
      { es: 'Pozo a tierra', en: 'Grounding systems' },
      { es: 'Iluminación LED', en: 'LED lighting' }
    ],
    district: 'Santiago de Surco',
    serviceAreas: ['Santiago de Surco', 'La Molina', 'San Borja', 'Surco Viejo'],
    yearsExperience: 11,
    rating: 4.8,
    reviewCount: 167,
    jobsDone: 389,
    respondsInMin: 12,
    verified: true
  },
  {
    id: 'h3',
    name: 'Julio Ramírez',
    tradeId: 't3',
    avatar: 'https://i.pravatar.cc/240?img=33',
    bio: {
      es: 'Pintor profesional con acabados finos. Especialista en humedad, goteras e impermeabilizado en toda Lima.',
      en: 'Professional painter with fine finishes. Specialist in damp, leaks and waterproofing across Lima.'
    },
    specialties: [
      { es: 'Acabados finos', en: 'Fine finishes' },
      { es: 'Tratamiento de humedad', en: 'Damp treatment' },
      { es: 'Impermeabilizado', en: 'Waterproofing' }
    ],
    district: 'Jesús María',
    serviceAreas: ['Jesús María', 'Lince', 'Pueblo Libre', 'Magdalena'],
    yearsExperience: 18,
    rating: 4.9,
    reviewCount: 298,
    jobsDone: 612,
    respondsInMin: 15,
    verified: true
  },
  {
    id: 'h4',
    name: 'Manuel Quispe',
    tradeId: 't4',
    avatar: 'https://i.pravatar.cc/240?img=51',
    bio: {
      es: 'Carpintero de melamina y madera. Closets, cocinas y muebles a medida en San Borja y alrededores.',
      en: 'Melamine and wood carpenter. Closets, kitchens and custom furniture in San Borja and nearby.'
    },
    specialties: [
      { es: 'Melamina a medida', en: 'Custom melamine' },
      { es: 'Muebles de cocina', en: 'Kitchen cabinets' },
      { es: 'Closets', en: 'Closets' }
    ],
    district: 'San Borja',
    serviceAreas: ['San Borja', 'Surco', 'La Victoria', 'San Luis'],
    yearsExperience: 13,
    rating: 4.7,
    reviewCount: 142,
    jobsDone: 305,
    respondsInMin: 20,
    verified: true
  },
  {
    id: 'h5',
    name: 'Pedro Salazar',
    tradeId: 't1',
    avatar: 'https://i.pravatar.cc/240?img=68',
    bio: {
      es: 'Gasfitero de emergencia 24/7. Rápido en destapes y desagües en los Olivos y Lima Norte.',
      en: '24/7 emergency plumber. Fast on unclogs and drains in Los Olivos and North Lima.'
    },
    specialties: [
      { es: 'Emergencias 24/7', en: '24/7 emergencies' },
      { es: 'Destape de desagües', en: 'Drain unclogging' },
      { es: 'Reparación de fugas', en: 'Leak repair' }
    ],
    district: 'Los Olivos',
    serviceAreas: ['Los Olivos', 'San Martín de Porres', 'Independencia', 'Comas'],
    yearsExperience: 9,
    rating: 4.6,
    reviewCount: 188,
    jobsDone: 421,
    respondsInMin: 5,
    verified: true
  }
];

// ─── Reviews ─────────────────────────────────────────────────────────
export const reviews: Review[] = [
  { id: 'r1', handymanId: 'h1', author: 'Ana Q.', rating: 5, comment: { es: 'Llegó puntual y resolvió la fuga en una hora. Muy recomendado.', en: 'Arrived on time and fixed the leak in an hour. Highly recommended.' }, date: '2026-05-28' },
  { id: 'r2', handymanId: 'h1', author: 'Diego R.', rating: 5, comment: { es: 'Instaló mi terma sin problemas. Trabajo limpio y prolijo.', en: 'Installed my water heater with no fuss. Clean, tidy work.' }, date: '2026-05-14' },
  { id: 'r3', handymanId: 'h1', author: 'María L.', rating: 4, comment: { es: 'Buen servicio, aunque llegó 15 minutos tarde. Resolvió todo.', en: 'Good service, though 15 min late. Solved everything.' }, date: '2026-04-30' },
  { id: 'r4', handymanId: 'h2', author: 'Luis P.', rating: 5, comment: { es: 'Ordenó todo mi tablero y explicó cada llave. Excelente.', en: 'Tidied my whole panel and explained every breaker. Excellent.' }, date: '2026-06-02' },
  { id: 'r5', handymanId: 'h2', author: 'Carmen V.', rating: 5, comment: { es: 'Instaló el pozo a tierra rapidísimo. Muy profesional.', en: 'Installed the grounding super fast. Very professional.' }, date: '2026-05-19' },
  { id: 'r6', handymanId: 'h3', author: 'Jorge M.', rating: 5, comment: { es: 'Acabado impecable en la sala. Se nota la experiencia.', en: 'Flawless finish in the living room. The experience shows.' }, date: '2026-06-05' },
  { id: 'r7', handymanId: 'h3', author: 'Sofía T.', rating: 5, comment: { es: 'Eliminó la humedad que tenía hace años. Gracias!', en: 'Got rid of damp I had for years. Thank you!' }, date: '2026-05-22' },
  { id: 'r8', handymanId: 'h4', author: 'Rocío F.', rating: 5, comment: { es: 'Mi closet quedó tal como lo imaginé. Buen acabado.', en: 'My closet turned out exactly as I imagined. Nice finish.' }, date: '2026-05-30' },
  { id: 'r9', handymanId: 'h4', author: 'Andrés C.', rating: 4, comment: { es: 'Buen trabajo en la cocina, demoró un día más de lo previsto.', en: 'Good work on the kitchen, took a day longer than planned.' }, date: '2026-05-08' },
  { id: 'r10', handymanId: 'h5', author: 'Gabriela N.', rating: 5, comment: { es: 'Vino de emergencia un domingo. Salvó mi baño inundado.', en: 'Came for an emergency on a Sunday. Saved my flooded bathroom.' }, date: '2026-06-08' },
  { id: 'r11', handymanId: 'h5', author: 'Raúl E.', rating: 4, comment: { es: 'Rápido y efectivo con el atoro. Precio justo.', en: 'Fast and effective with the clog. Fair price.' }, date: '2026-05-25' }
];
