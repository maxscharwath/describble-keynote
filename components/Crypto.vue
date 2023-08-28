<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { base58, generateMnemonic, generatePrivateKey, getPublicKey, mnemonicToSeedSync } from '@describble/ddnet'
import Badge from './Badge.vue'

const srp = ref('')

onMounted(() => {
  srp.value = generateMnemonic()
})

const seed = computed(() => {
  return mnemonicToSeedSync(srp.value)
})

const privateKey = computed(() => {
  const buffer = generatePrivateKey(seed.value)
  return {
    buffer,
    base58: base58.encode(buffer)
  }
})

const publicKey = computed(() => {
  const buffer = getPublicKey(privateKey.value.buffer)
  return {
    buffer,
    base58: base58.encode(buffer)
  }
})

</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="flex flex-col gap-4">

      <div class="flex items-center gap-4"
           v-motion
           :key="srp"
           :initial="{ opacity: 0, y: -20 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: 0 } }"
      >
        <h4 class="w-1/3">Génération de la phrase secrète <Badge>SRP</Badge></h4>
        <div class="flex-wrap flex gap-2 border-2 border-gray-200 rounded p-2 border-dashed w-2/3">
          <span
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded"
              v-for="word in srp.split(' ')" :key="word">{{ word }}</span>
        </div>
      </div>

      <div class="flex items-center w-full justify-center"
           v-motion
           :key="`arrow1-${srp}`"
           :initial="{ opacity: 0, y: -20 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      >⬇️</div>

      <div class="flex items-center gap-4"
           v-motion
           :key="privateKey.base58"
           :initial="{ opacity: 0, y: -20 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      >
        <h4 class="w-1/3">Génération de la clé privée <Badge>secp256k1</Badge></h4>
        <div class="flex gap-2 border-2 border-gray-200 rounded p-2 border-dashed w-2/3">
          {{ privateKey.base58 }}
        </div>
      </div>

      <div class="flex items-center w-full justify-center"
           v-motion
           :key="`arrow2-${srp}`"
           :initial="{ opacity: 0, y: -20 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
      >⬇️</div>

      <div class="flex items-center gap-4"
           v-motion
           :key="publicKey.base58"
           :initial="{ opacity: 0, y: -20 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
      >
        <h4 class="w-1/3">Génération de la clé publique</h4>
        <div class="flex gap-2 border-2 border-gray-200 rounded p-2 border-dashed w-2/3">
          {{ publicKey.base58 }}
        </div>
      </div>

    </div>
    <RefreshButton @click="srp = generateMnemonic()" class="self-end" />
  </div>
</template>
