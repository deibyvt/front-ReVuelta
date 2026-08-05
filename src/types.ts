export type ViewMode = 
  | 'catalog' 
  | 'cart' 
  | 'transactions' 
  | 'shipment_detail' 
  | 'loyalty' 
  | 'profile';

export type Category = 'Women' | 'Men' | 'Kids' | 'Swap Zone' | 'Top Brands' | 'Points Offers';

export type ListingType = 'Compra' | 'Trueque' | 'Ambos';

export type GarmentSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Talla 32' | 'Talla S' | 'Talla M' | 'Talla L';

export type GarmentCondition = 'Nuevo con etiquetas' | 'Como nuevo' | 'Buen estado' | 'Usado' | 'Vintage' | 'Excelente estado';

export interface Garment {
  id: string;
  title: string;
  price: number;
  type: ListingType;
  size: GarmentSize;
  condition: GarmentCondition;
  image: string;
  seller: {
    name: string;
    handle: string;
    avatar?: string;
    rating?: number;
    salesCount?: number;
  };
  category: 'Women' | 'Men' | 'Kids';
  brand?: string;
  ecoBadge?: string;
  description?: string;
  co2SavedKg?: number;
  isFavorite?: boolean;
}

export interface CartItem {
  garment: Garment;
  selectedForPurchase: boolean;
}

export interface SwapOffer {
  desiredGarment: Garment;
  offeredGarment: Garment | null;
  message: string;
  status: 'Pendiente' | 'Aceptado' | 'Rechazado';
}

export type TransactionStatus = 'Completado' | 'Pendiente' | 'Rechazado' | 'En camino';

export interface Transaction {
  id: string;
  orderNumber: string;
  type: 'Compra' | 'Trueque';
  status: TransactionStatus;
  title: string;
  detail: string;
  date: string;
  amountCOP?: number;
  image: string;
  shipmentNumber?: string;
  trackingCode?: string;
  rejectionReason?: string;
  carrier?: string;
  co2SavedKg?: number;
  pickupPoint?: {
    name: string;
    address: string;
    city: string;
    hours: string;
  };
  timeline?: {
    step: string;
    date: string;
    detail?: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface RewardCoupon {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
  isLocked?: boolean;
  isHighlighted?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  itemName: string;
}
