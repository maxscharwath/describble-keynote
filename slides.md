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
hideInToc: true
---

# Le Paysage Actuel

- **Ère numérique** : L'édition et la collaboration en temps réel sont cruciales.
- **Plateformes centralisées dominent** : Google Docs, MS 365, etc.
    - Limitations :
        - **Dépendance** : Être lié aux géants technologiques.
        - **Souveraineté des données** : Où sont stockées nos informations ? Qui peut y accéder ?
        - **Connectivité** : Besoin constant d'une connexion Internet stable.

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/undraw_cloud_hosting.svg" />
</div>

---
layout: two-cols
hideInToc: true
---

# Contexte du Projet

- **Mission initiale** : Créer un démonstrateur pour la startup Condensation.
- **Complications** : Des problèmes ont surgi, rendant la collaboration avec Condensation non viable.
- **Défi** : Nécessité d'adapter et de repenser le démonstrateur initial pour une nouvelle solution.

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/undraw_warning.svg" />
</div>

---
layout: two-cols
hideInToc: true
---

# Naissance de Describble et DDNet

- **Describble** : Une adaptation plus poussée du démonstrateur initial.
- **DDNet (Decentralized Document Network)** : Un système alternatif à Condensation.
    - **Local First** : Travaillez hors ligne, synchronisez quand vous le souhaitez.
    - **Décentralisé & Chiffré** : Sécurité, confidentialité et pas de point central de défaillance.
    - **WEB** : Pas de téléchargement, pas d'installation, pas de configuration.
    - **Open Source** : Pensé pour être accessible à tous.

::right::

<div class="flex flex-col items-center justify-center w-full h-full">
    <img src="/undraw_lightbulb.svg" />
</div>

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
hideInToc: true
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
hideInToc: true
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
hideInToc: true
---
# Optimisation du Rendu

## Memoization
**Caching** des résultats de fonctions pour éviter les traitements **redondants**. 

De même, les composants React sont mis en cache pour éviter les **re-renders** inutiles.

## Framer Motion
Librairie d'animation pour React. Permet de créer des animations fluides et performantes en **dehors** du cycle de rendu de React.

Cette technique a été utilisée pour le rendu des **curseurs**.

::right::

<div class="flex flex-col items-center justify-center h-full w-full">
    <img src="/developer-tool.png" />
</div>

---
layout: cover
background: https://images.unsplash.com/photo-1644088379091-d574269d422f
---

# Développement

---
layout: two-cols
hideInToc: true
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
hideInToc: true
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

# Ce que j'ai appris

- **Technique**:
    - Maîtrise de nouvelles technologies et outils.
    - Compréhension approfondie de l'édition collaborative et du chiffrement de bout en bout.
    - Optimisation du rendu et des performances avec des techniques avancées.

- **Gestion de Projet**:
    - Adaptabilité face à des obstacles imprévus.
    - Importance de la planification et de la réévaluation régulière des objectifs.
    - Collaboration et communication avec une startup externe.
  
- **Développement Personnel**:
    - Patience et persévérance face aux défis.
    - Importance de l'auto-apprentissage en tech.

---
layout: cover
class: text-center
hideInToc: true
---

# Du Concret !
## Place aux démonstrations en direct !
