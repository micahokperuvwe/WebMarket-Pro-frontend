import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { dailySales, listingReviews, notificationMessages, sampleOrders, sampleUsers, websiteListings } from '../data/mockMarketplace'

export const useMarketplaceStore = defineStore('marketplace', () => {
  const listings = ref(websiteListings)
  const orders = ref(sampleOrders)
  const users = ref(sampleUsers)
  const notifications = ref(notificationMessages)
  const salesSeries = ref(dailySales)
  const likes = ref<string[]>(['site-1', 'site-4'])

  const totalSales = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0))
  const totalProfit = computed(() => salesSeries.value.reduce((sum, point) => sum + point.profit, 0))
  const totalUsers = computed(() => users.value.length)
  const totalWebsites = computed(() => listings.value.length)
  const totalOrders = computed(() => orders.value.length)
  const featuredListings = computed(() => listings.value.filter((listing) => listing.featured))

  function toggleLike(listingId: string) {
    likes.value = likes.value.includes(listingId)
      ? likes.value.filter((id) => id !== listingId)
      : [...likes.value, listingId]
  }

  function getListingBySlug(slug: string) {
    return listings.value.find((listing) => listing.slug === slug)
  }

  function getReviews(listingId: string) {
    return listingReviews[listingId as keyof typeof listingReviews] ?? []
  }

  function updateOrderStatus(orderId: string, status: 'pending' | 'paid' | 'delivered') {
    orders.value = orders.value.map((order) => (order.id === orderId ? { ...order, status } : order))
  }

  function toggleUserSuspension(userId: string) {
    users.value = users.value.map((user) =>
      user.id === userId ? { ...user, suspended: !user.suspended } : user,
    )
  }

  function markNotificationRead(id: string) {
    notifications.value = notifications.value.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
  }

  return {
    listings,
    orders,
    users,
    notifications,
    salesSeries,
    likes,
    totalSales,
    totalProfit,
    totalUsers,
    totalWebsites,
    totalOrders,
    featuredListings,
    toggleLike,
    getListingBySlug,
    getReviews,
    updateOrderStatus,
    toggleUserSuspension,
    markNotificationRead,
  }
})
