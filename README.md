# Association Quimperlé-Glo — monorepo

Deux applications Next.js, une base PostgreSQL et leur infrastructure de déploiement :

| Dossier           | Rôle                                                                                            | Port (prod) |
| ----------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| [`site/`](site)   | Site vitrine public. Lit en base les projets, actions et parrainages ; sert les photos uploadées. | 3000        |
| [`admin/`](admin) | Espace d'administration : photothèque, projets, actions, page Parrainages.                       | 3001        |
| —                 | PostgreSQL 17. Schéma et contenu initial créés automatiquement par l'admin (migrations).         | interne     |

Les photos déposées depuis l'admin vivent sur un **volume Docker partagé**
(`uploads`) : l'admin y écrit (converties en WebP, 1600 px max), le site le
monte en lecture seule et les sert sous `/uploads/…`.

## Ce que la cliente peut modifier depuis l'admin

- **Photos** : déposer (plusieurs à la fois, conversion et redimensionnement
  automatiques), décrire, supprimer.
- **Projets** : titre, lieu, état (à venir / en cours / réalisé), présentation,
  photo principale, article de presse, et la liste numérotée des réalisations
  avec une photo chacune. Le premier projet « en cours » est mis en avant sur
  l'accueil.
- **Actions** : au Bénin et en Bretagne — titre, description, photo, article.
- **Parrainages** : la liste des initiales des parrains et marraines et la
  galerie de photos de la page.

Tant qu'aucune photo n'est associée, le site affiche un cadre « Photo à venir ».

## Développement local

Une base locale en une commande (publiée sur `127.0.0.1:5432`) :

```bash
docker compose up -d db
```

```bash
# Site public — http://localhost:3000
cd site && npm install && npm run dev
```

```bash
# Admin — http://localhost:3001
cd admin && npm install && npm run dev
```

Variables attendues en dev (fichiers `.env.local`, non commités) :

```bash
# site/.env.local
DATABASE_URL=postgresql://quimperle:devpassword@localhost:5432/quimperle_glo
UPLOADS_DIR=../admin/uploads      # lit les photos déposées par l'admin en dev

# admin/.env.local
DATABASE_URL=postgresql://quimperle:devpassword@localhost:5432/quimperle_glo
UPLOADS_DIR=./uploads
ADMIN_EMAIL=vous@exemple.fr
ADMIN_PASSWORD_HASH=…   # cd admin && npm run hash-password -- "VotreMotDePasse"
SESSION_SECRET=…        # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Au premier démarrage, l'admin crée les tables et y charge le contenu rédigé
par la cliente (`admin/migrations/`). Le site fonctionne sans base : les pages
concernées affichent alors leurs états vides.

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
automatique, migrations comprises (jouées par l'admin à son démarrage). Les
deux workflows peuvent aussi être lancés à la main (`workflow_dispatch`).

### Secrets GitHub à renseigner (une seule fois)

Dans *Settings → Secrets and variables → Actions* du dépôt :

| Secret                | Contenu                                                                |
| --------------------- | ---------------------------------------------------------------------- |
| `VPS_HOST`            | IP ou nom d'hôte du VPS                                                |
| `VPS_USER`            | Utilisateur SSH de déploiement                                         |
| `VPS_SSH_KEY`         | Clé privée SSH (OpenSSH, la clé publique étant dans `authorized_keys`) |
| `VPS_PORT`            | Port SSH — optionnel, 22 par défaut                                    |
| `POSTGRES_PASSWORD`   | Mot de passe PostgreSQL (alphanumérique conseillé)                     |
| `ADMIN_EMAIL`         | E-mail du compte administrateur                                        |
| `ADMIN_PASSWORD_HASH` | Sortie de `cd admin && npm run hash-password -- "VotreMotDePasse"`     |
| `SESSION_SECRET`      | 64 caractères hexadécimaux aléatoires (commande dans `.env.example`)   |
| `DOZZLE_USERS_YML`    | Fichier utilisateurs de Dozzle (voir « Logs »), collé tel quel          |

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

# 4. Journal système persistant et sans limite de durée (voir « Logs »)
sudo mkdir -p /var/log/journal
sudo sed -i 's/^#\?Storage=.*/Storage=persistent/; s/^#\?SystemMaxUse=.*/SystemMaxUse=10G/' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald
```

Ensuite, le premier push sur `master` (ou un lancement manuel des deux
workflows) déploie tout : site, admin, base de données et Dozzle.

### Logs

Les conteneurs de production écrivent dans le **journal système du VPS**
(driver Docker `journald`) et non dans des fichiers qui leur seraient propres.
L'historique survit donc aux redéploiements et aux redémarrages, et n'est
jamais effacé automatiquement tant que le plafond `SystemMaxUse` (10 Go
ci-dessus, soit des années de logs pour ce site) n'est pas atteint. Les
fichiers vivent dans `/var/log/journal/` : à inclure dans les sauvegardes.

Deux façons de les consulter :

- **Dozzle**, sur le port 8080 du VPS (`http://<vps>:8080`) : tous les
  conteneurs en temps réel, recherche, filtres, téléchargement — réservé au
  compte défini dans le secret `DOZZLE_USERS_YML`. Pour générer ce fichier
  (mot de passe haché en bcrypt, jamais stocké en clair) :

  ```bash
  docker run --rm amir20/dozzle generate dev --email vous@exemple.fr --name "Votre nom"
  ```

  La commande demande le mot de passe puis affiche le YAML : collez-le
  intégralement dans le secret. Dozzle ne stocke rien lui-même ; il lit le
  socket Docker en lecture seule.

- **En SSH**, par service et par période, y compris pour les conteneurs déjà
  remplacés :

  ```bash
  journalctl CONTAINER_TAG=admin -f                       # en direct
  journalctl CONTAINER_TAG=site --since "2026-09-01"      # depuis une date
  journalctl CONTAINER_TAG=db -p err                      # erreurs seules
  ```

  `docker compose logs` fonctionne aussi, limité au conteneur en cours.

En test local (`docker-compose.yml`), Dozzle est disponible sur
http://localhost:8080 avec `admin` / `admin` ; le driver `journald` n'y est
pas utilisé car il n'existe pas sous Docker Desktop.

### Sauvegardes

Deux volumes Docker portent toutes les données : `pgdata` (base) et `uploads`
(photos). Ils survivent aux redéploiements ; ce sont eux qu'il faut inclure
dans les sauvegardes du VPS.

Les ports 3000 (site), 3001 (admin) et 8080 (Dozzle) sont exposés en direct.
Pour servir des domaines en HTTPS, placez un reverse proxy (Caddy, Nginx…)
devant — hors périmètre de ce dépôt pour l'instant. Si vous préférez ne pas
exposer Dozzle publiquement, remplacez `"8080:8080"` par `"127.0.0.1:8080:8080"`
dans `docker-compose.prod.yml` et accédez-y via un tunnel SSH
(`ssh -L 8080:localhost:8080 <vps>`).

## À compléter avant la mise en ligne

- **Dons** : l'adresse HelloAsso (`HELLOASSO_URL`) et le RIB (`RIB`) sont des
  valeurs factices dans [`site/lib/site-data.ts`](site/lib/site-data.ts) — le
  bouton HelloAsso reste désactivé tant que l'URL n'est pas renseignée.
- **Photos** : le contenu initial est chargé sans photos ; elles sont à
  déposer et associer depuis l'admin.
- **E-mail de contact** et formulaire de contact : voir
  [`site/README.md`](site/README.md).

## Origine

Le site public provient d'un handoff [Claude Design](https://claude.com) porté
en Next.js — détails, choix et écarts documentés dans [`site/README.md`](site/README.md).
