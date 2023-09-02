---
theme: seriph
background: https://images.unsplash.com/photo-1644088379091-d574269d422f
highlighter: shiki
class: text-left
lineNumbers: truer
info: >
  ## Soutenance travail de Bachelor

  Edition collaborative de documents structurés avec un chiffrement de
  bout-en-bout et un stockage distribué


  Maxime Scharwath - 06.09.2023
transition: slide-left
title: Describble
fonts:
  sans: Roboto
hideInToc: true
---

# Soutenance travail de Bachelor

## Edition collaborative de documents structurés avec un chiffrement de bout-en-bout et un stockage distribué

<footer class="flex items-center justify-between w-full absolute left-0 bottom-0">
  <span>Maxime Scharwath</span>
  <span>06.09.2023</span>
</footer>

<style>

h1 {
    font-size: 4rem !important;;
}

h1 + p {
    opacity: 1 !important;
    font-size: 1.75rem !important;
    margin-top: 1rem !important;
}

footer {
    padding: 0 3.5rem 2.5rem 3.5rem;
}
</style>


---
layout: two-cols
hideInToc: true
---

# Sommaire

<Toc></Toc>
::right::
<img src="/undraw_reading_list.svg" class="h-full" />


---
layout: cover
background: https://images.unsplash.com/photo-1644088379091-d574269d422f
---

# Contexte


---
layout: two-cols
---

# Pourquoi ce projet ?

- Ère numérique : besoin d'édition & collaboration en temps réel.
- Plateformes centralisées (Google Docs, MS 365) dominent.
    - Problèmes :
        - Dépendance aux grandes entreprises.
        - Souveraineté des données compromise.
        - Besoin constant d'Internet.
        - Pas de contrôle sur ses données.

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/undraw_cloud_hosting.svg" />
</div>


---

# Solution : Describble

- **Plan Initial**: Utiliser le système tout fait "~~Condensation~~" 🚫.
- **Pivot**: Création d'un système propre "DDNet" ✅.
- **Chiffrement de bout-en-bout**: Sécurité avant tout.
- **Stockage distribué**: Pas de point central de défaillance.
- **Local First**: Travaillez n'importe où, synchronisez plus tard.
- **Open Source**: Accessible à tous, pour être amélioré par la communauté.


---
src: ./pages/ddnet.md
hide: false
---

---
layout: cover
background: https://images.unsplash.com/photo-1644088379091-d574269d422f
---

# Optimisation


---
layout: two-cols
preload: false
---

# Utilisation des Throttle

Technique limitant l'exécution d'une fonction sur un temps donné.

## Pourquoi l'utiliser ?
- **Eviter la surcharge :** Limiter les appels inutiles.
- **Performance :** Accélérer la réponse du système.
- **Sauvegardes :** Éviter les sauvegardes redondantes.

## Résultat :
**Efficacité** et **économie de ressources** grâce à des appels moins fréquents.

::right::
<div class="flex flex-col items-center justify-center h-full w-full">
    <Throttle class="w-full" />
</div>


---
layout: two-cols
preload: false
---

# Utilisation des QuadTrees

**QuadTrees** : Structure 2D pour diviser un espace en quadrants.

## Pourquoi les QuadTrees ?
- **Rapidité** : Recherche et accès spatial plus rapides, évitant les traitements inutiles.
- **Efficacité** : Limite le rendu aux données pertinentes, réduisant la surcharge.
- **Adaptabilité** : S'ajuste selon la densité des données, permettant une gestion dynamique.

::right::
<div class="flex flex-col items-center justify-center h-full w-full">
    <QuadTree />
</div>

<!--
Grâce aux QuadTrees, nous optimisons le rendu des layers du viewport, assurant un affichage fluide même avec de vastes datasets.
-->

---
layout: two-cols
---

# Recoder des modules existants
Pourquoi recoder des paquets?
- Mieux **comprendre** comment cela fonctionne
- **Adapter** au mieux à mon projet
- **Amélioration** du code par exemple en utilisation de **TypeScript**

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/npm.png"/>
</div>


---
layout: two-cols
---

# Publication et Open Source
Un point important pour moi est de **partager** mon travail et de le rendre **accessible** à tous.

- **Documentation** propre et complète
- Repository **publiques** sur GitHub
- **Publication** sur npm

<div class="flex flex-col items-center justify-center w-full">

</div>

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/github.png" />
</div>


---
layout: center
class: text-center
hideInToc: true
---

# MERCI DE VOTRE ATTENTION
## Place aux démos !
