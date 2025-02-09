# GoGoMarket - Documentation Technique

## 1. Vue d'ensemble

GoGoMarket est une plateforme de commerce électronique innovante dédiée aux produits agricoles en Afrique de l'Ouest. Elle connecte directement les producteurs aux acheteurs tout en offrant une expérience utilisateur moderne et sécurisée.

### Technologies Principales
- Frontend: Nuxt 3 (Vue.js)
- Backend: Nhost BaaS (PostgreSQL, Auth, Storage)
- UI: Tailwind CSS
- State Management: Pinia
- Authentification: Nhost Auth
- Base de données: PostgreSQL (via Nhost)
- Stockage: Nhost Storage
- Paiements: MTN Money, Orange Money

## 2. Installation

### Prérequis
- Node.js 16.x ou supérieur
- npm ou yarn
- Compte Nhost (pour le backend)

### Configuration

1. Cloner le projet :
```bash
git clone https://github.com/votre-compte/gogomarket.git
cd gogomarket
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```

Remplir les variables suivantes dans le fichier `.env` :
```
NHOST_SUBDOMAIN=votre-subdomain
NHOST_REGION=votre-region
NHOST_ADMIN_SECRET=votre-secret
```

4. Démarrer le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

## 3. Architecture

### 3.1 Structure du Projet
```
gogomarket/
├── components/        # Composants réutilisables
├── composables/      # Logique métier réutilisable
├── layouts/          # Layouts de l'application
├── pages/            # Pages de l'application
├── plugins/          # Plugins Nuxt
├── public/           # Assets statiques
├── stores/           # Stores Pinia
└── types/            # Types TypeScript
```

### 3.2 Composants Principaux

#### Auth
- `LoginForm.vue` - Formulaire de connexion
- `RegisterForm.vue` - Formulaire d'inscription
- `UserProfile.vue` - Profil utilisateur

#### Dashboard
- `AdminDashboard.vue` - Dashboard administrateur
- `SellerDashboard.vue` - Dashboard vendeur
- `BuyerDashboard.vue` - Dashboard acheteur

#### Marketplace
- `ProductList.vue` - Liste des produits
- `ProductCard.vue` - Carte produit
- `ShoppingCart.vue` - Panier d'achat

## 4. Fonctionnalités

### 4.1 Authentification
- Inscription/Connexion par email/mot de passe
- Gestion des rôles (Admin, Vendeur, Acheteur)
- Profils utilisateurs personnalisés

### 4.2 Gestion des Produits
- CRUD complet des produits
- Upload d'images multiples
- Catégorisation
- Gestion des stocks

### 4.3 Système de Paiement
- Intégration MTN Money
- Intégration Orange Money
- Historique des transactions
- Portefeuille électronique

### 4.4 Chat & Messagerie
- Chat en temps réel entre acheteurs et vendeurs
- Notifications
- Support client

## 5. API & Intégrations

### 5.1 Nhost
- Authentication
- Storage
- Database
- Functions

### 5.2 Paiements
- MTN Mobile Money API
- Orange Money API

## 6. Déploiement

### 6.1 Production
```bash
# Build de l'application
npm run build

# Démarrer en production
npm run start
```

### 6.2 Configuration Serveur
- Node.js 16.x
- PM2 pour la gestion des processus
- Nginx comme reverse proxy

## 7. Sécurité

### 7.1 Authentification
- JWT via Nhost Auth
- Sessions sécurisées
- Protection CSRF

### 7.2 Données
- Chiffrement des données sensibles
- Validation des entrées
- Rate limiting

## 8. Performance

### 8.1 Optimisations
- SSR (Server-Side Rendering)
- Lazy loading des composants
- Compression des images
- Mise en cache

### 8.2 Monitoring
- Logs d'erreurs
- Métriques de performance
- Alertes

## 9. Support & Maintenance

### Contact
- Email: support@gogomarket.com
- Téléphone: +225 07 58 96 61 56

### Documentation
- [API Reference](./api.md)
- [Guide Utilisateur](./user-guide.md)
- [FAQ](./faq.md)

## 10. Contribution

### Guide de Contribution
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- ESLint pour le linting
- Prettier pour le formatage
- Tests unitaires avec Vitest
- Tests E2E avec Cypress