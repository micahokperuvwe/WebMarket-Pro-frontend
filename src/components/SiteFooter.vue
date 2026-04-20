<template>
  <footer class="border-t border-primary/5 bg-canvas px-6 py-20 backdrop-blur-3xl lg:px-14">
    <div class="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
      <div class="max-w-md space-y-6">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-gradient-premium"></div>
          <p class="font-display text-2xl font-black tracking-tight text-primary">Apex<span class="text-gradient">Retail</span></p>
        </div>
        <p class="text-lg font-medium leading-relaxed text-secondary">
          The industry standard for high-performance website marketplaces. 
          Launch, scale, and manage your digital asset empire with elite infrastructure.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-24">
        <div class="space-y-6">
          <h4 class="font-display text-xs font-black uppercase tracking-[0.2em] text-gold-500">Ecosystem</h4>
          <ul class="space-y-4 text-sm font-bold text-secondary">
            <li><a href="https://supabase.com" target="_blank" class="transition-colors hover:text-primary">Supabase</a></li>
            <li><a href="https://cloudinary.com" target="_blank" class="transition-colors hover:text-primary">Cloudinary</a></li>
            <li><a href="https://paystack.com" target="_blank" class="transition-colors hover:text-primary">Paystack</a></li>
          </ul>
        </div>

        <div class="space-y-6">
          <h4 class="font-display text-xs font-black uppercase tracking-[0.2em] text-gold-500">Enterprise</h4>
          <ul class="space-y-4 text-sm font-bold text-secondary">
            <li><a href="#" class="transition-colors hover:text-primary">API Docs</a></li>
            <li><a href="#" class="transition-colors hover:text-primary">Security</a></li>
            <li><a href="#" class="transition-colors hover:text-primary">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-primary/5 pt-10 text-xs font-black uppercase tracking-[0.2em] text-secondary/30 md:flex-row">
      <p>&copy; 2024 ApexRetail. All Rights Reserved.</p>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-gold-500">Twitter</a>
        <a href="#" class="hover:text-gold-500">Discord</a>
        <a href="#" class="hover:text-gold-500">GitHub</a>
      </div>
    </div>
  </footer>
</template>
