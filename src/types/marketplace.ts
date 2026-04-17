export type Role = 'admin' | 'user'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
  address: string
  suspended?: boolean
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface WebsiteListing {
  id: string
  slug: string
  title: string
  category: string
  techStack: string[]
  tags: string[]
  description: string
  price: number
  currency: string
  rating: number
  downloads: number
  sales: number
  image: string
  gallery: string[]
  videoPreview?: string
  demoUrl: string
  accessModel: 'download' | 'access-link'
  featured?: boolean
}

export interface CartItem {
  listingId: string
  quantity: number
}

export type OrderStatus = 'pending' | 'paid' | 'delivered'

export interface OrderItem {
  listingId: string
  title: string
  price: number
  deliveryType: 'download' | 'access-link'
}

export interface Order {
  id: string
  createdAt: string
  total: number
  status: OrderStatus
  paymentReference: string
  customerName: string
  items: OrderItem[]
}

export interface NotificationMessage {
  id: string
  senderName: string
  senderEmail: string
  message: string
  createdAt: string
  read: boolean
}

export interface DailySalesPoint {
  label: string
  sales: number
  profit: number
}
