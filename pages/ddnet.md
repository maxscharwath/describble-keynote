---
layout: cover
background: https://images.unsplash.com/photo-1644088379091-d574269d422f
---

# DDNet
## Decentralized Document Network

---
preload: false
hideInToc: true
---

# Cryptographie

Génération de la pair de clés via phrase mnémonique.

<Crypto />

---
layout: two-cols
hideInToc: true
---

# WebRTC et Serveur de Signalisation

- WebRTC: Communication entre navigateurs
- Nécessité: Se localiser sur le réseau
- **Serveur de Signalisation**:
    - Échange d'informations pour connexion directe
    - Cesse d'intervenir une fois la connexion établie
    - Utilise WebSocket pour une communication bidirectionnelle

::right::

![WebRTC](/signaling.svg)

---
layout: two-cols
hideInToc: true
---

# Sécurité et Authentification

- Serveur de signalisation: **Pas de données sensibles**
- **Open source**: Peut être autohébergé
- **Module d'authentification**:
    - Vérifie l’authenticité
    - Utilise un mécanisme de poignée de main basé sur défi-réponse
::right::

<div class="flex flex-col items-center justify-center h-full w-full items-stretch">

```mermaid
sequenceDiagram
    participant Server
    participant Client
    autonumber
    Server->>Client: Send Challenge
    Client->>Client: Generate Signature with Private Key
    Client->>Server: Send Challenge Response
    Server->>Server: Verify Signature with Public Key
    Server->>Client: Authentication Result (Success/Failure)
```

</div>

---
preload: false
hideInToc: true
---

# En-tête du document

Structure de données contenant les informations d'en-tête du document.

<Header />

---
preload: false
hideInToc: true
---

# Chiffrement des Messages : En Bref

- **ECDH** : Crée un secret partagé via les clés de l'expéditeur et du destinataire.
- **PBKDF2** : Dérive une clé AES à partir de ce secret.
- **AES-GCM** : Chiffre le message, garantissant confidentialité et intégrité.
- **ECDSA** : Signature pour certifier l'authenticité de l'expéditeur.

<Encryption />

---
layout: two-cols
hideInToc: true
---
# Synchronisation du Document

1. L'utilisateur **A** crée un document et ajoute l'utilisateur **B** à la liste des utilisateurs autorisés.
2. L'utilisateur **B** diffuse une demande de document sur le réseau.
3. L'utilisateur **A** reçoit la demande et répond avec l'en-tête du document.
4. L'utilisateur **A** initie une connexion de pair à pair avec l'utilisateur **B** en utilisant le Serveur de Signalisation.
5. L'utilisateur **A** et l'utilisateur **B** synchronisent les données du document via la connexion de pair à pair.

::right::

```mermaid
sequenceDiagram
    participant A as Utilisateur A
    participant S as Serveur de Signalisation
    participant B as Utilisateur B
    B->>S: Diffuse une demande de document sur le réseau
    S->>A: Transmet la demande à l'Utilisateur A
    A->>A: Vérifie les droits d'accès
    alt Accès autorisé
        A->>S: Répond avec l'en-tête du document
        S->>B: Transmet l'en-tête du document à l'Utilisateur B
        Note over A,B: Établissement de la Connexion de Pair à Pair
        loop until Connection Établie
            A->>S: Envoie un signal de connexion à l'Utilisateur B
            S->>B: Transmet le signal de connexion à l'Utilisateur B
            B->>S: Envoie une réponse de connexion à l'Utilisateur A
            S->>A: Transmet la réponse de connexion à l'Utilisateur A
        end
        Note over A,B: Synchronisation du Document
        loop while Modifications du Document
            A->>B: Synchronise les données du document avec l'Utilisateur B
            B->>A: Synchronise les données du document avec l'Utilisateur A
        end
    end

```
---
layout: two-cols
hideInToc: true
---
# Injection de Dépendances

Rendu possible grâce aux interfaces et aux classes abstraites de TypeScript.

- **Testabilité**: Il est simple d'intégrer des "mocks" ou des fausses implémentations pour les tests, grâce à l'injection.
- **Séparation des Préoccupations**: Chaque composant peut être développé, testé et modifié indépendamment.
- **Modularité et Adaptabilité**: L'architecture du système permet des substitutions rapides pour répondre à divers besoins.

::right::
Browser
```ts
const client = new DocumentSharingClient({
  sessionManager: new SessionManager(
    new KeyManager('keys-store'),
  ),
  network: new WebSocketNetworkAdapter(
    'wss://ddnet-server.fly.dev'
  ),
  storageProvider: new IDBStorageProvider(),
})
```

Node.js
```ts
const client = new DocumentSharingClient({
  sessionManager: new SessionManager(
    new LocalKeyManager(),
  ),
  network: new TCPNetworkAdapter(
    'ddnet-server.fly.dev', 443
  ),
  storageProvider: new NodeStorageProvider()
})
```

---
hideInToc: true
---
# Framework Agnostic

DDNet a été conçu pour être **indépendant** de tout framework.

<div class="flex gap-4 items-center justify-center w-full items-stretch">
  <div>
    <h3 class="flex items-center gap-2"><div class="i-logos-react text-4xl"></div>React Hooks</h3>

```ts
import { useState, useEffect } from 'react'
function useDocument<T>(document: Document<T>) {
  const [data, setData] = useState<T>(document.data)
  useEffect(() => {
    const unsub = document.on('change', ({ data }) => {
      setData(data)
    })
    return unsub;
  }, [document])
  return data;
}
```
  </div>
  <div>
    <h3 class="flex items-center gap-2"><div class="i-logos-vue text-4xl"></div>Vue 3 Composition API</h3>

```ts
import { ref, watchEffect } from 'vue'
function useDocument<T>(document: Document<T>) {
  const data = ref<T>(document.data)
  watchEffect((onCleanup) => {
    const unsub = document.on('change', ({ data }) => {
      data.value = data;
    })
    onCleanup(unsub);
  })
  return data;
}
```
  </div>
</div>
