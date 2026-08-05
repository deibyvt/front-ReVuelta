import { Garment, Transaction, RewardCoupon, Review } from '../types';

export const MOCK_GARMENTS: Garment[] = [
  {
    id: 'g1',
    title: 'Blazer Lino Vintage Oversize',
    price: 45000,
    type: 'Compra',
    size: 'M',
    condition: 'Como nuevo',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Laura Vintage',
      handle: '@laura_vintage',
      rating: 4.8,
      salesCount: 15
    },
    category: 'Women',
    brand: 'Zara Eco',
    ecoBadge: 'Eco-Certificado',
    description: 'Blazer corte clásico en lino 100% natural, color beige neutro. Excelente estado sin imperfecciones.',
    co2SavedKg: 12.4,
    isFavorite: false
  },
  {
    id: 'g2',
    title: 'Chaqueta Denim 90s Raw',
    price: 80000,
    type: 'Trueque',
    size: 'L',
    condition: 'Buen estado',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Carlos R.',
      handle: '@carlos_closet',
      rating: 4.9,
      salesCount: 28
    },
    category: 'Men',
    brand: 'Levi\'s Authentic',
    ecoBadge: 'Algodón Reciclado',
    description: 'Chaqueta rígida estilo noventero. Costuras reforzadas y lavado azul medio tradicional.',
    co2SavedKg: 18.2,
    isFavorite: true
  },
  {
    id: 'g3',
    title: 'Suéter Punto Grueso Lana',
    price: 65000,
    type: 'Ambos',
    size: 'S',
    condition: 'Como nuevo',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Elena M.',
      handle: '@elena_circular',
      rating: 5.0,
      salesCount: 9
    },
    category: 'Women',
    brand: 'Mango Sustainable',
    ecoBadge: 'Lana Ética',
    description: 'Suéter de tejido grueso súper suave y abrigador. Tono crema off-white.',
    co2SavedKg: 9.5,
    isFavorite: false
  },
  {
    id: 'g4',
    title: 'Vestido Seda Floral Midi',
    price: 95000,
    type: 'Compra',
    size: 'S',
    condition: 'Nuevo con etiquetas',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Laura Vintage',
      handle: '@laura_vintage',
      rating: 4.8,
      salesCount: 15
    },
    category: 'Women',
    brand: 'H&M Conscious',
    ecoBadge: 'Seda Reciclada',
    description: 'Vestido midi fluido estampado con flores botánicas. Nunca usado, conserva etiqueta original.',
    co2SavedKg: 8.1,
    isFavorite: true
  },
  {
    id: 'g5',
    title: 'Botas Cuero Vegano Estilo Combat',
    price: 120000,
    type: 'Ambos',
    size: 'M',
    condition: 'Excelente estado',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Sofia B.',
      handle: '@sofi_eco',
      rating: 4.7,
      salesCount: 12
    },
    category: 'Women',
    brand: 'Dr. Martens Eco',
    ecoBadge: 'Material Cruelty-Free',
    description: 'Botas negras de plataforma ligera en cuero vegano de alta resistencia. Suela antideslizante.',
    co2SavedKg: 14.8,
    isFavorite: false
  },
  {
    id: 'g6',
    title: 'Camisa Blanca Básica Algodón Orgánico',
    price: 35000,
    type: 'Compra',
    size: 'L',
    condition: 'Buen estado',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Mateo K.',
      handle: '@mateo_m',
      rating: 4.6,
      salesCount: 6
    },
    category: 'Men',
    brand: 'Uniqlo Eco',
    ecoBadge: '100% Algodón Orgánico',
    description: 'Imprescindible de armario. Corte regular impecable y tejido transpirable de fibra natural.',
    co2SavedKg: 6.0,
    isFavorite: false
  },
  {
    id: 'g7',
    title: 'Gabardina Clásica Beige Waterproof',
    price: 110000,
    type: 'Ambos',
    size: 'M',
    condition: 'Como nuevo',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Laura Vintage',
      handle: '@laura_vintage',
      rating: 4.8,
      salesCount: 15
    },
    category: 'Women',
    brand: 'Burberry Vintage Edition',
    ecoBadge: 'Timeless Piece',
    description: 'Trench coat elegante resistente al agua. Abotonadura doble y cinturón de ajuste.',
    co2SavedKg: 22.0,
    isFavorite: true
  },
  {
    id: 'g8',
    title: 'Chaqueta Bomber Verde Oliva',
    price: 52000,
    type: 'Trueque',
    size: 'S',
    condition: 'Buen estado',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    seller: {
      name: 'Andrés G.',
      handle: '@andres_style',
      rating: 4.8,
      salesCount: 20
    },
    category: 'Men',
    brand: 'Pull&Bear Eco',
    ecoBadge: 'Poliéster Reciclado',
    description: 'Chaqueta bomber unisex ligera con forro naranja icónico y puños acanalados.',
    co2SavedKg: 11.3,
    isFavorite: false
  }
];

export const MOCK_USER_CLOSET: Garment[] = [
  {
    id: 'uc1',
    title: 'Blusa de Seda Verde Esmeralda',
    price: 32000,
    type: 'Trueque',
    size: 'S',
    condition: 'Como nuevo',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop',
    seller: { name: 'Mi Armario', handle: '@mi_armario' },
    category: 'Women',
    ecoBadge: 'Seda Reciclada',
    description: 'Blusa fluida escote en V.'
  },
  {
    id: 'uc2',
    title: 'Pantalón Chino Beige',
    price: 40000,
    type: 'Trueque',
    size: 'M',
    condition: 'Buen estado',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
    seller: { name: 'Mi Armario', handle: '@mi_armario' },
    category: 'Men',
    description: 'Pantalón chino cómodo de fibra elástica.'
  },
  {
    id: 'uc3',
    title: 'Cardigan Tejido Mostaza',
    price: 28000,
    type: 'Trueque',
    size: 'S',
    condition: 'Como nuevo',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    seller: { name: 'Mi Armario', handle: '@mi_armario' },
    category: 'Women',
    description: 'Cardigan de botones de madera.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    orderNumber: 'REV-4821',
    type: 'Trueque',
    status: 'Completado',
    title: 'Vintage Denim Jacket',
    detail: 'Intercambiado por Blusa de Lino Blanca',
    date: '12 Oct 2023',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop',
    shipmentNumber: '#4821',
    trackingCode: 'ECO993821004',
    carrier: 'EcoLogistics express',
    co2SavedKg: 12.4,
    pickupPoint: {
      name: 'Punto de Acopio - Chapinero Hub',
      address: 'Calle 63 #13-45, Local 102',
      city: 'Bogotá D.C.',
      hours: 'Lun a Sáb 9:00 AM - 7:00 PM'
    },
    timeline: [
      { step: 'Pedido realizado', date: '10 Oct, 09:30 AM', completed: true },
      { step: 'En preparación & control de calidad', date: '10 Oct, 02:15 PM', completed: true },
      { step: 'En camino / Entregado al punto', date: '11 Oct, 11:00 AM', completed: true },
      { step: 'Entregado & Confirmado', date: '12 Oct, 04:20 PM', completed: true }
    ]
  },
  {
    id: 't2',
    orderNumber: 'RV-8472-A',
    type: 'Compra',
    status: 'En camino',
    title: 'Botas de Cuero Vegano Estilo Combat',
    detail: 'Pago procesado - En tránsito al punto de acopio',
    date: '14 Oct 2023',
    amountCOP: 120000,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    shipmentNumber: '#4822',
    trackingCode: 'ECO993821005',
    carrier: 'EcoLogistics Bici-Mensajería',
    co2SavedKg: 14.8,
    pickupPoint: {
      name: 'Punto de Acopio - ReVuelta Chapinero',
      address: 'Calle 63 #13-45, Chapinero',
      city: 'Bogotá',
      hours: 'Lun - Sáb: 9:00 - 19:00'
    },
    timeline: [
      { step: 'Pedido realizado', date: '14 Oct, 10:15 AM', completed: true },
      { step: 'En preparación en taller vendedor', date: '14 Oct, 03:00 PM', completed: true },
      { step: 'En camino al punto de recogida', date: '15 Oct, 08:30 AM', completed: true, current: true },
      { step: 'Listo para reclamar en Chapinero', date: 'Estimado Hoy, 05:00 PM', completed: false }
    ]
  },
  {
    id: 't3',
    orderNumber: 'REV-4823',
    type: 'Trueque',
    status: 'Rechazado',
    title: 'Vestido de Seda Floral Midi',
    detail: 'Propuesta de Trueque declinada por la vendedora',
    rejectionReason: 'El usuario prefiere intercambio por abrigos o venta directa.',
    date: '05 Oct 2023',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_REWARDS: RewardCoupon[] = [
  {
    id: 'r1',
    title: '10% de Descuento',
    description: 'Aplica en tu próxima compra de prendas verificadas.',
    pointsCost: 400,
    icon: 'percent',
    isHighlighted: true
  },
  {
    id: 'r2',
    title: 'Envío Gratis',
    description: 'Válido para envíos a puntos de acopio o domicilio nacional.',
    pointsCost: 250,
    icon: 'local_shipping'
  },
  {
    id: 'r3',
    title: 'Bono $20.000 COP',
    description: 'Descuento directo en compras superiores a $60.000 COP.',
    pointsCost: 800,
    icon: 'redeem'
  },
  {
    id: 'r4',
    title: 'Pase Swap Premium',
    description: 'Acceso anticipado a prendas exclusivas y tarifa de comisión $0.',
    pointsCost: 1500,
    icon: 'workspace_premium',
    isLocked: true
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev1',
    author: 'Camila Torres',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: 'Hace 3 días',
    comment: '¡Súper recomendada! La chaqueta llegó exactamente como en la descripción y limpia. El empaque 100% reciclable.',
    itemName: 'Chaqueta Denim 90s Raw'
  },
  {
    id: 'rev2',
    author: 'Andrés Felipe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'Hicimos un trueque directo. Muy amable en la comunicación y rápida para coordinar la entrega en el punto de acopio Chapinero.',
    itemName: 'Blazer Lino Vintage'
  },
  {
    id: 'rev3',
    author: 'Mariana Gomez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 4,
    date: 'Hace 2 semanas',
    comment: 'La prenda está en gran estado. Solo demoró 1 día adicional el mensajero pero todo perfecto.',
    itemName: 'Suéter Punto Grueso'
  }
];
