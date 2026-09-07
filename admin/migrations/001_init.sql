-- Photothèque : fichiers uploadés via l'admin, convertis en WebP et stockés
-- sur le volume partagé (UPLOADS_DIR). Réutilisables par toutes les entités.
CREATE TABLE IF NOT EXISTS photos (
  id          SERIAL PRIMARY KEY,
  filename    TEXT        NOT NULL UNIQUE,      -- ex. "1725000000-ab12cd34.webp"
  alt         TEXT        NOT NULL DEFAULT '',
  width       INTEGER     NOT NULL,
  height      INTEGER     NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Page Parrainages : initiales des parrains/marraines, dans l'ordre d'affichage.
CREATE TABLE IF NOT EXISTS sponsor_initials (
  id        SERIAL PRIMARY KEY,
  label     TEXT    NOT NULL,
  position  INTEGER NOT NULL
);

-- Page Parrainages : galerie (enfants parrainés…), ordonnée.
CREATE TABLE IF NOT EXISTS sponsorship_photos (
  id        SERIAL PRIMARY KEY,
  photo_id  INTEGER NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  caption   TEXT    NOT NULL DEFAULT '',
  position  INTEGER NOT NULL
);

-- Projets : un projet = un lieu / un objectif (ex. « Un collège pour Glo
-- Yokpo »), avec son état. Ses réalisations concrètes sont les project_items.
CREATE TABLE IF NOT EXISTS projects (
  id              SERIAL PRIMARY KEY,
  slug            TEXT    NOT NULL UNIQUE,
  title           TEXT    NOT NULL,
  location        TEXT    NOT NULL DEFAULT '',
  status          TEXT    NOT NULL CHECK (status IN ('a_venir', 'en_cours', 'realise')),
  summary         TEXT    NOT NULL DEFAULT '',
  cover_photo_id  INTEGER REFERENCES photos(id) ON DELETE SET NULL,
  article_url     TEXT,
  article_source  TEXT,
  position        INTEGER NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- La liste numérotée de chaque projet dans le document de la cliente :
-- une ligne = une réalisation, avec sa photo.
CREATE TABLE IF NOT EXISTS project_items (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  label       TEXT    NOT NULL,
  photo_id    INTEGER REFERENCES photos(id) ON DELETE SET NULL,
  position    INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS project_items_project_idx ON project_items (project_id, position);

-- Actions : ce que fait l'association au quotidien, en Bretagne et au Bénin.
CREATE TABLE IF NOT EXISTS actions (
  id              SERIAL PRIMARY KEY,
  zone            TEXT    NOT NULL CHECK (zone IN ('benin', 'bretagne')),
  title           TEXT    NOT NULL,
  description     TEXT    NOT NULL DEFAULT '',
  photo_id        INTEGER REFERENCES photos(id) ON DELETE SET NULL,
  article_url     TEXT,
  article_source  TEXT,
  position        INTEGER NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS actions_zone_idx ON actions (zone, position);
