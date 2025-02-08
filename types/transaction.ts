export interface Transaction {
  _id?: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
