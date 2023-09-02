<script setup lang="ts">
import { ref, watch } from 'vue';
import { base58, decryptMessage, encryptMessage, generateKeyPair } from '@describble/ddnet'

const alice = generateKeyPair();
const bob = generateKeyPair();

const message = ref('Hello World!');
let encryptedMessage = ref<Uint8Array>();
let decryptedMessage = ref<string>();

const handleEncrypt = async () => {
  encryptedMessage.value = undefined;
  decryptedMessage.value = undefined;
  encryptedMessage.value = await encryptMessage(new TextEncoder().encode(message.value), alice.privateKey, bob.publicKey);
  setTimeout(handleDecrypt, 1000);
};

const handleDecrypt = async () => {
  decryptedMessage.value = new TextDecoder().decode(
      await decryptMessage(encryptedMessage.value!, bob.privateKey, alice.publicKey)
  );
};

watch(message, handleEncrypt, { immediate: true });
</script>

<template>
  <div class="flex gap-4 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 items-center justify-center">
    <!-- Alice's section -->
    <div class="flex flex-col items-center gap-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg w-64">
      <h2 class="dark:text-white">Alice</h2>
      <textarea v-model="message" placeholder="Enter message..." class="border rounded p-2 w-full h-32 dark:bg-gray-800 dark:text-white"></textarea>
    </div>
    <div>➡️</div>
    <!-- Encrypted message section -->
    <div class="flex flex-col items-center gap-4 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg w-64">
      <h2 class="dark:text-white">Encrypted</h2>
      <div v-if="encryptedMessage" key="encrypted" class="border rounded p-2 w-full h-32 overflow-y-auto break-all dark:text-white">
        {{ base58.encode(encryptedMessage) }}
      </div>
      <div v-else key="wait" class="text-center text-gray-500 dark:text-gray-400 h-32 flex items-center justify-center">Encrypting...</div>
    </div>
    <div>➡️</div>
    <!-- Bob's section -->
    <div class="flex flex-col items-center gap-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg w-64">
      <h2 class="dark:text-white">Bob</h2>
      <div v-if="decryptedMessage" key="decrypted" class="border rounded p-2 w-full h-32 overflow-y-auto dark:text-white">
        {{ decryptedMessage }}
      </div>
      <div v-else key="wait" class="text-center text-gray-500 dark:text-gray-400 h-32 flex items-center justify-center">Decrypting...</div>
    </div>
  </div>
</template>

<style scoped>
</style>
