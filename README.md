# Pilates Journal

Application PWA (Progressive Web App) pour gérer vos séances de pilates. Créée avec Astro, React et Tailwind CSS.

## Fonctionnalités

- ✅ **Gestion de séances** : Créez, modifiez et supprimez vos séances personnalisées
- ✅ **Séances pré-définies** : Importez des séances pré-configurées (débutant, intermédiaire, avancé)
- ✅ **Banque d'exercices** : Gérez votre bibliothèque d'exercices personnalisée
  - Ajoutez, modifiez et supprimez des exercices
  - Recherche d'exercices par nom ou description
  - Catégorisation automatique (abdominaux, dos, jambes, fessiers, épaules/bras, hanches, corps entier, échauffement, étirement)
  - Organisation par catégories avec codes couleur
  - Sélection rapide depuis la banque lors de la création de séances
  - Réinitialisation de la banque
- ✅ **Timer interactif** : Lancez une séance avec timer automatique pour chaque exercice et temps de repos
- ✅ **Instructions détaillées** : Chaque exercice inclut une description et des instructions
- ✅ **Historique** : Consultez toutes vos séances complétées avec date et durée
- ✅ **Animations** : Confetti de célébration à la fin d'une séance
- ✅ **PWA** : Installable sur mobile et fonctionne hors ligne
- ✅ **Design moderne** : Interface élégante avec animations fluides

## Technologies

- **Astro** - Framework web moderne
- **React** - Composants interactifs
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations fluides
- **Heroicons** - Icônes SVG
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
│   │   ├── views/        # Vues organisées par fonctionnalité
│   │   │   ├── forms/    # Composants de formulaires
│   │   │   ├── history/  # Composants d'historique
│   │   │   ├── preview/  # Composants de prévisualisation
│   │   │   ├── sessions/ # Composants de séances
│   │   │   └── timer/    # Composants de timer (exercice, repos, confetti)
│   ├── data/             # Données statiques (presets, exercices)
│   ├── layouts/          # Layouts Astro
│   ├── pages/            # Pages Astro
│   │   ├── index.astro   # Page principale (séances)
│   │   ├── exercises.astro # Page banque d'exercices
│   │   ├── history.astro # Page historique
│   │   └── session/[id].astro # Page timer de séance
│   ├── styles/           # Styles CSS globaux
│   └── utils/            # Utilitaires
│       ├── storage.ts    # Gestion LocalStorage
│       ├── types.ts     # Types TypeScript
│       ├── calculations.ts # Calculs (durées, etc.)
│       ├── presets.ts   # Gestion des presets
│       ├── exerciseBank.ts # Gestion de la banque d'exercices
│       └── categoryColors.ts # Couleurs et labels des catégories
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
      "restTime": 30,
      "category": "abdominaux"
    }
  ]
}
```

Les catégories disponibles sont :

- `warmup` - Échauffement
- `stretch` - Étirement
- `abdominaux` - Abdominaux
- `dos` - Dos
- `jambes` - Jambes
- `fessiers` - Fessiers
- `epaules-bras` - Épaules/Bras
- `hanches` - Hanches
- `corps-entier` - Corps entier

Si la catégorie n'est pas spécifiée, elle sera automatiquement détectée à partir du nom et de la description de l'exercice.

## Banque d'exercices

La banque d'exercices est automatiquement initialisée avec tous les exercices des séances pré-définies et des exercices pré-configurés. Vous pouvez :

- **Ajouter des exercices** : Créez vos propres exercices avec nom, description, durée et temps de repos
- **Modifier des exercices** : Mettez à jour les informations d'un exercice existant
- **Supprimer des exercices** : Retirez des exercices de votre banque
- **Rechercher** : Utilisez la barre de recherche pour trouver rapidement un exercice
- **Catégoriser** : Les exercices sont automatiquement organisés par catégorie avec des codes couleur
- **Sélectionner depuis la banque** : Lors de la création d'une séance, ajoutez rapidement des exercices depuis votre banque

La banque d'exercices est stockée localement dans le navigateur et persiste entre les sessions.

## Notes

- Les données sont stockées localement dans le navigateur (LocalStorage)

## Licence

ISC
