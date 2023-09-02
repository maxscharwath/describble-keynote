<script lang="ts" setup>
import { generatePrivateKey, getPublicKey } from '@describble/ddnet'
import { Document } from '@describble/ddnet/src/document/Document'
import { ref } from 'vue'

const createDocument = () => {
  const privateKey = generatePrivateKey()
  const publicKeys = Array.from({ length: 2 }, () => getPublicKey(generatePrivateKey()))
  const document = Document.create(privateKey, publicKeys, {
    emoji: '🐶',
  })

  return {
    header: document.header,
    privateKey,
  }
}

const document = ref(createDocument())

const updateAllowedClients = (replace: string) => {
  const { header, privateKey } = document.value
  const allowedClientKeys = header.allowedClients.map((client) => {
    return client.base58 !== replace ? client.bytes : getPublicKey(generatePrivateKey())
  })
  document.value = {
    header: header.update({
      allowedClientKeys,
    }, privateKey),
    privateKey,
  }
}

const updateMetadata = () => {
  const { header, privateKey } = document.value
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁']
  document.value = {
    header: header.update({
      metadata: {
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }
    }, privateKey),
    privateKey,
  }
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-col items-center gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
      <div class="w-full flex flex-col gap-2">
        <div class="flex items-center gap-1">
          <label class="w-1/3 text-gray-600 dark:text-gray-400 text-sm">Address <Badge>ArrayBuffer</Badge></label>
          <span class="flex-1 border border-purple-500 dark:border-purple-600 rounded p-1 text-sm dark:text-white">
          {{ document.header.address.base58 }}
          </span>
        </div>

        <div class="flex items-center gap-1">
          <label class="w-1/3 text-gray-600 dark:text-gray-400 text-sm">Owner <Badge>ArrayBuffer</Badge></label>
          <span class="flex-1 border border-blue-500 dark:border-blue-600 rounded p-1 text-sm dark:text-white">
          {{ document.header.owner.base58 }}
          </span>
        </div>

        <div class="flex items-start gap-1">
          <label class="w-1/3 text-gray-600 dark:text-gray-400 text-sm align-top">Allowed Clients <Badge>ArrayBuffer[]</Badge></label>
          <div class="flex-1 flex flex-col gap-1">
            <div v-for="allowed in document.header.allowedClients" :key="allowed.base58" class="flex items-center gap-1">
                <span class="w-full border border-red-500 dark:border-red-600 rounded p-1 text-sm dark:text-white">
                  {{ allowed.base58 }}
                </span>
              <RefreshButton @click="updateAllowedClients(allowed.base58)"/>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-1">
          <label class="w-1/3 text-gray-600 dark:text-gray-400 text-sm align-top">Metadata <Badge>Object</Badge></label>
          <pre class="flex-1 border border-teal-500 dark:border-teal-600 rounded p-1 text-sm dark:text-white">{{ JSON.stringify(document.header.metadata, null, 2) }}</pre>
          <RefreshButton class="self-end" @click="updateMetadata"/>
        </div>

        <div class="flex items-center gap-1">
          <label class="w-1/3 text-gray-600 dark:text-gray-400 text-sm">Version <Badge>number</Badge></label>
          <span class="flex-1 border border-yellow-500 dark:border-yellow-600 rounded p-1 text-sm dark:text-white">
          {{ document.header.version }}
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-gray-600 dark:text-gray-400 text-sm mb-1">Signature <Badge>ArrayBuffer</Badge></label>
          <span class="flex-1 border border-green-500 dark:border-green-600 rounded p-1 text-sm break-all dark:text-white">
          {{ document.header.signature.base58 }}
          </span>
        </div>
      </div>
    </div>
    <RefreshButton class="self-end" @click="document = createDocument()"/>
  </div>
</template>

<style scoped>
</style>
