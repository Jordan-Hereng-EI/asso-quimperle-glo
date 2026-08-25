# Association Quimperlé-Glo — monorepo

Deux applications Next.js et leur infrastructure de déploiement :

| Dossier                | Rôle                                                          | Port (prod) |
| ---------------------- | ------------------------------------------------------------- | ----------- |
| [`site/`](site)        | Site vitrine public de l'association (voir son README dédié). | 3000        |
| [`admin/`](admin)      | Espace d'administration (connexion seule pour l'instant).     | 3001        |
| —                      | PostgreSQL 17 (aucune table pour l'instant).                  | interne     |

## Développement local

```bash
# Site public — http://localhost:3000
cd site && npm install && npm run dev
```

```bash
# Admin — http://localhost:3001
cd admin && npm install && npm run dev
```

L'admin exige trois variables d'environnement (dans `admin/.env.local` en dev) :

```bash
ADMIN_EMAIL=vous@exemple.fr
ADMIN_PASSWORD_HASH=…   # cd admin && npm run hash-password -- "VotreMotDePasse"
SESSION_SECRET=…        # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Test avec Docker

`docker-compose.yml` build les trois conteneurs depuis les sources, avec des
valeurs par défaut de développement (admin : `admin@example.com` / `admin`) :

```bash
docker compose up --build
```

Site sur http://localhost:3000, admin sur http://localhost:3001.

## Production

Chaque push sur `master` déclenche la GitHub Action du dossier modifié
(`.github/workflows/deploy-site.yml` et `deploy-admin.yml`, filtrées par
chemin). Chacune :

1. build l'image Docker et la pousse sur GHCR
   (`ghcr.io/jordan-hereng-ei/asso-quimperle-glo-{site,admin}`) ;
2. copie `docker-compose.prod.yml` sur le VPS dans `/opt/quimperle-glo/` ;
3. y écrit le `.env` depuis les secrets GitHub, tire la nouvelle image et
   redémarre le service concerné.

Rien à faire sur le VPS au fil de l'eau : le déploiement est entièrement
automatique. Les deux workflows peuvent aussi être lancés à la main
(`workflow_dispatch`).

### Secrets GitHub à renseigner (une seule fois)

Dans *Settings → Secrets and variables → Actions* du dépôt :

| Secret                | Contenu                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| `VPS_HOST`            | IP ou nom d'hôte du VPS                                                  |
| `VPS_USER`            | Utilisateur SSH de déploiement                                           |
| `VPS_SSH_KEY`         | Clé privée SSH (OpenSSH, la clé publique étant dans `authorized_keys`)   |
| `VPS_PORT`            | Port SSH — optionnel, 22 par défaut                                      |
| `POSTGRES_PASSWORD`   | Mot de passe PostgreSQL (alphanumérique conseillé)                       |
| `ADMIN_EMAIL`         | E-mail du compte administrateur                                          |
| `ADMIN_PASSWORD_HASH` | Sortie de `cd admin && npm run hash-password -- "VotreMotDePasse"`       |
| `SESSION_SECRET`      | 64 caractères hexadécimaux aléatoires (commande dans `.env.example`)     |

`.env.example` documente les variables applicatives ; le fichier `.env` du VPS
est réécrit à chaque déploiement depuis ces secrets — inutile de le gérer à la
main.

### Préparation du VPS (une seule fois)

```bash
# 1. Installer Docker (avec le plugin compose)
curl -fsSL https://get.docker.com | sh

# 2. Créer le dossier de déploiement, appartenant à l'utilisateur SSH
sudo mkdir -p /opt/quimperle-glo
sudo chown "$USER" /opt/quimperle-glo

# 3. Autoriser l'utilisateur à parler au démon Docker
sudo usermod -aG docker "$USER"
# (se déconnecter / reconnecter pour que le groupe prenne effet)
```

Ensuite, le premier push sur `master` (ou un lancement manuel des deux
workflows) déploie tout : site, admin et base de données.

Les ports 3000 (site) et 3001 (admin) sont exposés en direct. Pour servir des
domaines en HTTPS, placez un reverse proxy (Caddy, Nginx…) devant — hors
périmètre de ce dépôt pour l'instant.

## Origine

Le site public provient d'un handoff [Claude Design](https://claude.com) porté
en Next.js — détails, choix et écarts documentés dans [`site/README.md`](site/README.md).
