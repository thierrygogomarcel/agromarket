export interface User {
  id?: string;
  email: string;
  fullName: string;
  userType: "admin" | "producer" | "buyer" | "transport";
  role: string;
  status: "active" | "inactive";
  avatarUrl?: string;
  phone?: string;
  entityType?: string;
  createdAt?: string | Date;
}

export interface UserStats {
  totalOrders: number
  totalRevenue: number
  activeProducts: number
  lastOrderDate?: string
  // Add any other user statistics you want to track
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalTransactions: number;
  totalRevenue: number;
}
