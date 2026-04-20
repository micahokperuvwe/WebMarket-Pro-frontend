<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/format'

const cartStore = useCartStore()
const router = useRouter()

const isCartEmpty = computed(() => cartStore.items.length === 0)

function handleCheckout() {
  cartStore.isSidebarOpen = false
  router.push('/cart') // or '/checkout' depending on routing
}
</script>

<template>
  <div class="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" :class="{ 'pointer-events-none': !cartStore.isSidebarOpen }">
    <!-- Backdrop overlay -->
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500"
      :class="cartStore.isSidebarOpen ? 'opacity-100' : 'opacity-0'"
      @click="cartStore.isSidebarOpen = false"
    ></div>

    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
          <!-- Sidebar -->
          <div 
            class="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out"
            :class="cartStore.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
          >
            <div class="flex h-full flex-col overflow-y-scroll bg-[#0a0a0a] border-r border-white/10 shadow-2xl">
              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-6 border-b border-white/10">
                <h2 class="text-xl font-display font-black text-white" id="slide-over-title">Your Cart</h2>
                <button
                  type="button"
                  class="relative -m-2 p-2 text-white/50 hover:text-white transition-colors"
                  @click="cartStore.isSidebarOpen = false"
                >
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Close panel</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Cart Items -->
              <div class="flex-1 overflow-y-auto px-6 py-6 sm:px-6">
                <div v-if="isCartEmpty" class="flex flex-col items-center justify-center h-full text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p class="text-lg font-medium text-white/50">Your cart is empty</p>
                  <button 
                    @click="cartStore.isSidebarOpen = false"
                    class="mt-6 font-display text-sm font-black uppercase tracking-widest text-gold-400 hover:text-gold-300"
                  >
                    Continue Browsing
                  </button>
                </div>
                
                <ul v-else role="list" class="-my-6 divide-y divide-white/10">
                  <li v-for="item in cartStore.detailedItems" :key="item?.listingId" class="flex py-6">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      <img :src="item?.listing?.image" :alt="item?.listing?.title" class="h-full w-full object-cover object-center" />
                    </div>

                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-white">
                          <h3 class="font-display font-bold"><a href="#">{{ item?.listing?.title }}</a></h3>
                          <p class="ml-4 text-gold-400">{{ formatCurrency(item?.listing?.price ?? 0, item?.listing?.currency ?? 'USD') }}</p>
                        </div>
                        <p class="mt-1 text-sm text-white/50">{{ item?.listing?.category }}</p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-white/50">Qty {{ item?.quantity }}</p>

                        <div class="flex">
                          <button 
                            type="button" 
                            class="font-medium text-red-400 hover:text-red-300 transition-colors"
                            @click="item?.listingId && cartStore.removeFromCart(item.listingId)"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Footer (Subtotal & Actions) -->
              <div v-if="!isCartEmpty" class="border-t border-white/10 px-6 py-6 sm:px-6">
                <div class="flex justify-between text-lg font-bold text-white mb-4">
                  <p>Subtotal</p>
                  <p class="text-gold-400">{{ formatCurrency(cartStore.subtotal, 'USD') }}</p>
                </div>
                
                <div class="mt-6">
                  <button
                    @click="handleCheckout"
                    class="flex w-full items-center justify-center rounded-2xl bg-gradient-premium px-6 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black shadow-xl shadow-gold-500/10 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-white/50">
                  <p>
                    or
                    <button type="button" class="font-medium text-gold-400 hover:text-gold-300 pl-1" @click="cartStore.isSidebarOpen = false">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
