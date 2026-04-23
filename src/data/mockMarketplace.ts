import type {
  DailySalesPoint,
  NotificationMessage,
  Order,
  UserProfile,
  WebsiteListing,
} from '../types/marketplace'

export const sampleUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Ada Nwosu',
    email: 'ada@example.com',
    role: 'admin',
    address: 'Lekki Phase 1, Lagos',
  },
  {
    id: 'user-2',
    name: 'David Mensah',
    email: 'david@example.com',
    role: 'user',
    address: 'East Legon, Accra',
  },
  {
    id: 'user-3',
    name: 'Sarah Okafor',
    email: 'sarah@example.com',
    role: 'user',
    address: 'Abuja, FCT',
    suspended: true,
  },
]

export const websiteListings: WebsiteListing[] = [
  {
    id: 'site-1',
    slug: 'fintech-saas-dashboard',
    title: 'Fintech SaaS Dashboard',
    category: 'SaaS',
    techStack: ['Vue 3', 'Supabase', 'Tailwind CSS'],
    tags: ['analytics', 'finance', 'admin'],
    description:
      'A polished dashboard starter for billing, team management, KPI tracking, and investor-facing admin workflows.',
    price: 420,
    currency: 'USD',
    rating: 4.9,
    downloads: 74,
    sales: 96,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    ],
    videoPreview: 'Cloudinary hosted preview',
    demoUrl: 'https://demo.example.com/fintech-saas-dashboard',
    accessModel: 'download',
    featured: true,
  },
  {
    id: 'site-2',
    slug: 'luxury-real-estate-showcase',
    title: 'Luxury Real Estate Showcase',
    category: 'Portfolio',
    techStack: ['Vue 3', 'Node.js', 'PostgreSQL'],
    tags: ['premium', 'landing page', 'sales funnel'],
    description:
      'A cinematic property showcase with inquiry flows, neighborhood highlights, and immersive galleries.',
    price: 650,
    currency: 'USD',
    rating: 4.8,
    downloads: 41,
    sales: 52,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.example.com/luxury-real-estate-showcase',
    accessModel: 'access-link',
  },
  {
    id: 'site-3',
    slug: 'creator-course-marketplace',
    title: 'Creator Course Marketplace',
    category: 'Marketplace',
    techStack: ['Vue 3', 'Express', 'Paystack'],
    tags: ['courses', 'e-learning', 'creator'],
    description:
      'Multi-vendor education storefront with bundled products, ratings, and creator dashboards.',
    price: 530,
    currency: 'USD',
    rating: 4.7,
    downloads: 58,
    sales: 83,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.example.com/creator-course-marketplace',
    accessModel: 'download',
    featured: true,
  },
  {
    id: 'site-4',
    slug: 'restaurant-ordering-suite',
    title: 'Restaurant Ordering Suite',
    category: 'E-commerce',
    techStack: ['Vue 3', 'Supabase', 'Cloudinary'],
    tags: ['food', 'ordering', 'dark mode'],
    description:
      'A conversion-focused restaurant site with online orders, CMS-friendly menus, and local SEO sections.',
    price: 310,
    currency: 'USD',
    rating: 4.6,
    downloads: 66,
    sales: 79,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    ],
    demoUrl: 'https://demo.example.com/restaurant-ordering-suite',
    accessModel: 'download',
  },
]

export const listingReviews = {
  'site-1': [
    {
      id: 'rev-1',
      userName: 'Amina Yusuf',
      rating: 5,
      comment: 'The dashboard quality is excellent and the handoff structure is easy to extend.',
      createdAt: '2026-04-02',
    },
    {
      id: 'rev-2',
      userName: 'Michael Obi',
      rating: 4,
      comment: 'Strong analytics layout. I only had to adjust branding colors before launch.',
      createdAt: '2026-03-28',
    },
  ],
  'site-2': [
    {
      id: 'rev-3',
      userName: 'Grace Arthur',
      rating: 5,
      comment: 'Premium feel throughout and the gallery interaction sold the entire package.',
      createdAt: '2026-04-04',
    },
  ],
  'site-3': [
    {
      id: 'rev-4',
      userName: 'Femi Ojo',
      rating: 4,
      comment: 'The marketplace flow is great for course launches and affiliate campaigns.',
      createdAt: '2026-04-06',
    },
  ],
  'site-4': [
    {
      id: 'rev-5',
      userName: 'Joy Eze',
      rating: 5,
      comment: 'Our restaurant client approved this in one review cycle.',
      createdAt: '2026-03-29',
    },
  ],
} satisfies Record<string, Array<{ id: string; userName: string; rating: number; comment: string; createdAt: string }>>

export const sampleOrders: Order[] = [
  {
    id: 'ORD-1001',
    createdAt: '2026-04-09',
    total: 950,
    status: 'processing',
    paymentReference: 'PSK-839200',
    customerName: 'David Mensah',
    items: [
      { listingId: 'site-1', title: 'Fintech SaaS Dashboard', price: 420, deliveryType: 'download' },
      { listingId: 'site-3', title: 'Creator Course Marketplace', price: 530, deliveryType: 'download' },
    ],
  },
  {
    id: 'ORD-1002',
    createdAt: '2026-04-10',
    total: 650,
    status: 'processed',
    paymentReference: 'PSK-839215',
    customerName: 'Sarah Okafor',
    items: [
      { listingId: 'site-2', title: 'Luxury Real Estate Showcase', price: 650, deliveryType: 'access-link' },
    ],
  },
]

export const notificationMessages: NotificationMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Daniel Adebayo',
    senderEmail: 'daniel@studiox.io',
    message: 'Can you bundle two websites for an agency purchase and include white-label onboarding?',
    createdAt: '2026-04-10 09:45',
    read: false,
  },
  {
    id: 'msg-2',
    senderName: 'Rita Blankson',
    senderEmail: 'rita@orionlabs.dev',
    message: 'I need a VAT invoice after checkout for the fintech dashboard template.',
    createdAt: '2026-04-09 16:10',
    read: true,
  },
]

export const dailySales: DailySalesPoint[] = [
  { label: 'Mon', sales: 980, profit: 680 },
  { label: 'Tue', sales: 640, profit: 420 },
  { label: 'Wed', sales: 1320, profit: 990 },
  { label: 'Thu', sales: 870, profit: 540 },
  { label: 'Fri', sales: 1480, profit: 1110 },
  { label: 'Sat', sales: 920, profit: 610 },
  { label: 'Sun', sales: 730, profit: 510 },
]
