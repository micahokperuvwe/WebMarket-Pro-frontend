<template>
  <footer class="border-t border-primary/5 bg-canvas section-padding">
    <div class="container-wide">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-4">
        <!-- Brand Section -->
        <div class="space-y-8">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-gradient-premium shadow-lg shadow-gold-500/20"></div>
            <p class="font-display text-2xl font-black tracking-tight text-primary">Apex<span class="text-gradient">Retail</span></p>
          </div>
          <p class="text-sm font-medium leading-relaxed text-secondary opacity-80">
            The elite standard for digital asset trading. We provide the infrastructure for individuals and enterprises to acquire, scale, and exit high-performance web projects safely.
          </p>
          <div class="flex items-center gap-5">
            <a href="#" class="text-secondary hover:text-gold-500 transition-all transform hover:scale-110"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.3-2.1.3-4.3 2-6l3-1 5 1z"/></svg></a>
            <a href="#" class="text-secondary hover:text-gold-500 transition-all transform hover:scale-110"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.149 6.839 9.465.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A12.001 12.001 0 0012 2z"/></svg></a>
            <a href="#" class="text-secondary hover:text-gold-500 transition-all transform hover:scale-110"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
          </div>
        </div>

        <!-- Inventory Links -->
        <div class="lg:ml-auto">
          <h4 class="mb-8 font-display text-sm font-black uppercase tracking-[0.2em] text-primary">Inventory</h4>
          <ul class="space-y-4 text-xs font-bold text-secondary">
            <li><RouterLink to="/home" class="transition-colors hover:text-gold-400">SaaS Products</RouterLink></li>
            <li><RouterLink to="/home" class="transition-colors hover:text-gold-400">Ecommerce Sites</RouterLink></li>
            <li><RouterLink to="/home" class="transition-colors hover:text-gold-400">Portfolio Gems</RouterLink></li>
            <li><RouterLink to="/home" class="transition-colors hover:text-gold-400">Mobile Apps</RouterLink></li>
            <li><RouterLink to="/home" class="transition-colors hover:text-gold-400">Premium Domains</RouterLink></li>
          </ul>
        </div>

        <!-- Company Links -->
        <div class="lg:ml-auto">
          <h4 class="mb-8 font-display text-sm font-black uppercase tracking-[0.2em] text-primary">Company</h4>
          <ul class="space-y-4 text-xs font-bold text-secondary">
            <li><RouterLink to="/contact" class="transition-colors hover:text-gold-400">Contact Support</RouterLink></li>
            <li><RouterLink to="/welcome" class="transition-colors hover:text-gold-400">How it Works</RouterLink></li>
            <li><a href="#" class="transition-colors hover:text-gold-400">Security Audit</a></li>
            <li><a href="#" class="transition-colors hover:text-gold-400">Terms of Service</a></li>
            <li><a href="#" class="transition-colors hover:text-gold-400">Privacy Protocol</a></li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div class="space-y-8">
          <h4 class="font-display text-sm font-black uppercase tracking-[0.2em] text-primary">Intel Report</h4>
          <p class="text-xs font-medium leading-relaxed text-secondary opacity-70">
            Get exclusive early access to premium listings before they hit the public market.
          </p>
          <form class="flex flex-col gap-3">
             <input 
               type="email" 
               placeholder="Email Address" 
               class="w-full rounded-xl border border-primary/10 bg-primary/5 px-5 py-3.5 text-xs font-bold text-primary outline-none transition-all focus:border-gold-500/30"
             />
             <button class="w-full rounded-xl bg-primary py-3.5 text-[10px] font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95">
               Subscribe Now
             </button>
          </form>
        </div>
      </div>

      <div class="mt-20 flex flex-col items-center justify-between gap-6 border-t border-primary/5 pt-10 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 md:flex-row">
        <p>&copy; 2024 ApexRetail Ecosystem. Powered by Elite Infrastructure.</p>
        <div class="flex items-center gap-8">
          <a href="#" class="hover:text-primary">Status</a>
          <a href="#" class="hover:text-primary">Engineering</a>
          <a href="#" class="hover:text-primary">Uptime</a>
        </div>
      </div>
    </div>
  </footer>
</template>
