import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useMarketplaceStore } from './marketplace'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<{ listingId: string; quantity: number }>>([{ listingId: 'site-1', quantity: 1 }])
  const isSidebarOpen = ref(false)
  const marketplace = useMarketplaceStore()

  const detailedItems = computed(() =>
    items.value
      .map((item) => {
        const listing = marketplace.listings.find((entry) => entry.id === item.listingId)
        if (!listing) {
          return null
        }

        return {
          ...item,
          listing,
          subtotal: listing.price * item.quantity,
        }
      })
      .filter(Boolean),
  )

  const subtotal = computed(() =>
    detailedItems.value.reduce((sum, item) => sum + (item?.subtotal ?? 0), 0),
  )

  function addToCart(listingId: string) {
    const existingItem = items.value.find((item) => item.listingId === listingId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ listingId, quantity: 1 })
    }
    
    isSidebarOpen.value = true
  }

  function removeFromCart(listingId: string) {
    items.value = items.value.filter((item) => item.listingId !== listingId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    detailedItems,
    subtotal,
    isSidebarOpen,
    addToCart,
    removeFromCart,
    clearCart,
  }
})
