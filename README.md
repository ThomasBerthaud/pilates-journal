# Pilates Journal

Application PWA (Progressive Web App) pour gérer vos séances de pilates. Créée avec Astro, React et Tailwind CSS.

## Fonctionnalités

- ✅ **Gestion de séances** : Créez, modifiez et supprimez vos séances personnalisées
- ✅ **Séances pré-définies** : Importez des séances pré-configurées (débutant, intermédiaire, avancé)
- ✅ **Timer interactif** : Lancez une séance avec timer automatique pour chaque exercice et temps de repos
- ✅ **Instructions détaillées** : Chaque exercice inclut une description et des instructions
- ✅ **Historique** : Consultez toutes vos séances complétées avec date et durée
- ✅ **PWA** : Installable sur mobile et fonctionne hors ligne
- ✅ **Design moderne** : Interface élégante avec animations fluides

## Technologies

- **Astro** - Framework web moderne
- **React** - Composants interactifs
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **LocalStorage** - Stockage local des données
- **Service Worker** - Fonctionnement hors ligne

## Installation

1. Assurez-vous d'avoir Node.js 20.18.0 ou supérieur (voir `.nvmrc`)
2. Installez les dépendances :

```bash
npm install
```

## Développement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:4321`

## Build

Pour créer une version de production :

```bash
npm run build
```

Pour prévisualiser la version de production :

```bash
npm run preview
```

## Déploiement

L'application peut être déployée sur Vercel, Netlify ou tout autre hébergeur statique.

### Vercel

1. Poussez votre code sur GitHub/GitLab/BitBucket
2. Importez le projet dans Vercel
3. Vercel détectera automatiquement Astro et configurera le déploiement

## Structure du projet

```
pilate-journal/
├── public/
│   ├── presets/          # Séances pré-définies en JSON
│   ├── icons/            # Icônes PWA
├── src/
│   ├── components/       # Composants React
│   ├── layouts/          # Layouts Astro
│   ├── pages/            # Pages Astro
│   ├── styles/           # Styles CSS globaux
│   └── utils/            # Utilitaires (storage, types, etc.)
└── package.json
```

## Ajout de séances pré-définies

Ajoutez des fichiers JSON dans `public/presets/` avec la structure suivante :

```json
{
  "name": "Nom de la séance",
  "exercises": [
    {
      "name": "Nom de l'exercice",
      "duration": 60,
      "description": "Description de l'exercice",
      "restTime": 30
    }
  ]
}
```

## Notes

- Les données sont stockées localement dans le navigateur (LocalStorage)
- L'application fonctionne hors ligne grâce au Service Worker
- Pour une vraie PWA, générez des icônes PNG (192x192 et 512x512) à partir des SVG fournis

## Licence

ISC
