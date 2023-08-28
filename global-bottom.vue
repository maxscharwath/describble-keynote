<template>
  <footer v-if="!['cover', 'image'].includes($slidev.nav.currentLayout)">
    <div class="absolute z-10 bottom-0 left-0 px-4 py-2 text-sm space-x-2">
      <span>Maxime Scharwath</span>
      <span>-</span>
      <span>06.09.2023</span>
    </div>
    <div class="absolute bottom-0 right-0 px-4 py-2">
      {{ $slidev.nav.currentPage }}
      <!-- / {{ $slidev.nav.total }} -->
    </div>
  </footer>
</template>
