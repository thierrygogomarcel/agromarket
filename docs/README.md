# GoGoMarket - Documentation Technique

## Vue d'ensemble

GoGoMarket est une plateforme de commerce électronique innovante dédiée aux produits agricoles en Afrique de l'Ouest, construite avec Nuxt 3 et Nhost.

### Technologies Principales

- Frontend: Nuxt 3 (Vue.js)
- Backend: Nhost BaaS
  - Auth: Nhost Auth
  - Database: PostgreSQL
  - Storage: Nhost Storage
  - Functions: Nhost Functions
- UI: Tailwind CSS
- State Management: Pinia
- Paiements: MTN Money, Orange Money

## Installation

### Prérequis

- Node.js 16.x ou supérieur
- npm ou yarn
- Compte Nhost

### Configuration

1. Cloner le projet :
\`\`\`bash
git clone https://github.com/votre-compte/gogomarket.git
cd gogomarket
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Configurer les variables d'environnement :
\`\`\`bash
cp .env.example .env
\`\`\`

Remplir les variables suivantes dans le fichier \`.env\` :
\`\`\`
NHOST_SUBDOMAIN=votre-subdomain
NHOST_REGION=votre-region
\`\`\`

4. Démarrer le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Architecture

### Structure du Projet
\`\`\`
gogomarket/
├── components/     # Composants réutilisables
├── composables/    # Logique métier réutilisable
├── layouts/        # Layouts de l'application
├── pages/         # Pages de l'application
├── plugins/       # Plugins Nuxt et Nhost
├── public/        # Assets statiques
└── stores/        # Stores Pinia
\`\`\`

### Fonctionnalités Principales

#### Authentification
- Inscription/Connexion par email/mot de passe
- Gestion des rôles (Admin, Vendeur, Acheteur)
- Profils utilisateurs personnalisés

#### Marketplace
- CRUD des produits
- Gestion des catégories
- Système de paiement mobile
- Chat en temps réel
- Notifications

#### Dashboards
- Admin: Gestion globale
- Vendeur: Gestion des produits et ventes
- Acheteur: Suivi des achats

### Base de données

La base de données PostgreSQL est gérée via Nhost. Voici les principales tables :

- users
- products
- categories
- orders
- transactions
- messages

### Sécurité

- Authentification via Nhost Auth
- Row Level Security (RLS) pour PostgreSQL
- Validation des données côté serveur
- Protection CSRF
- Rate limiting

### Déploiement

1. Build de l'application :
\`\`\`bash
npm run build
\`\`\`

2. Déploiement sur Netlify :
- Connectez votre repository
- Configurez les variables d'environnement
- Déployez !

## Contribution

1. Fork le projet
2. Créez une branche (\`git checkout -b feature/AmazingFeature\`)
3. Commit vos changements (\`git commit -m 'Add some AmazingFeature'\`)
4. Push vers la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrez une Pull Request

## Support

- Email: support@gogomarket.com
- Téléphone: +225 07 58 96 61 56