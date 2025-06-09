export interface IProduct {
  id: string;
  img?: string;
  category: string;
  title: string;
  qty: number;
  description?: string;
  isFavorite: boolean;
  rate?: number;
  sales: number;
  tag?: number;
  price: number;
}

export enum PromotionTag {
  FRETE_GRATIS = 1,
  COMBO = 2,
}
