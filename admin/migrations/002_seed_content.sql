-- Contenu initial, repris du document « Les éléments du site en cours »
-- rédigé par la cliente (28/08/2026). Les photos (« *Joindre la photo ») sont
-- laissées vides : le site affiche un placeholder tant qu'elles ne sont pas
-- associées depuis l'admin.

-- ---------------------------------------------------------------------------
-- Projets
-- ---------------------------------------------------------------------------
INSERT INTO projects (slug, title, location, status, summary, position) VALUES
  ('college-glo-yokpo',
   'Un collège pour Glo Yokpo',
   'Glo Yokpo, commune de Zè (Bénin)',
   'realise',
   'Au Collège d''Enseignement Général de Glo Yokpo : création d''un collège de 6 classes pour 632 élèves, avec le soutien des partenaires de Glo.',
   1),
  ('ecole-primaire-glo-yokpo',
   'L''école primaire publique de Glo Yokpo',
   'Glo Yokpo, commune de Zè (Bénin)',
   'realise',
   'Du mobilier pour les élèves et une cantine scolaire équipée pour préparer et servir les repas aux enfants.',
   2),
  ('solidarite-sante-glo-alladacome',
   'Solidarité et santé à Glo Alladacomè',
   'Glo Alladacomè, commune d''Abomey-Calavi (Bénin)',
   'realise',
   'Aide alimentaire pendant la crise sanitaire et prévention du paludisme auprès de près de 300 ménages.',
   3),
  ('cantine-glo-alladacome',
   'Une cantine scolaire pour Glo Alladacomè',
   'Glo Alladacomè, commune d''Abomey-Calavi (Bénin)',
   'en_cours',
   'La construction de la cantine de l''école primaire publique a démarré. Nous sollicitons l''aide des particuliers, des entreprises et des mécènes afin d''achever ce projet.',
   4),
  ('vie-associative-2027',
   'Rendez-vous 2027',
   'Glo Yokpo, commune de Zè (Bénin)',
   'a_venir',
   'Les prochains temps forts de l''association. Les dates seront précisées prochainement — et l''association a besoin de vos conseils pour la suite de son histoire.',
   5),
  ('entreprise-graphisme-raymond',
   'Une entreprise de conception graphique pour Raymond',
   'Glo Yokpo, commune de Zè (Bénin)',
   'a_venir',
   'Accompagner un jeune diplômé sans emploi dans la création de son entreprise individuelle de conception graphique.',
   6);

INSERT INTO project_items (project_id, label, position)
SELECT p.id, v.label, v.position
FROM (VALUES
  ('college-glo-yokpo', 'Création d''un collège de 6 classes pour 632 élèves', 1),
  ('college-glo-yokpo', 'Mobiliers scolaires dans les classes', 2),
  ('college-glo-yokpo', 'Latrines à 4 cabines', 3),
  ('college-glo-yokpo', 'Forage de puits avec groupe électrogène', 4),
  ('college-glo-yokpo', 'Local du gardien', 5),
  ('college-glo-yokpo', 'Salle des professeurs', 6),
  ('college-glo-yokpo', 'Bureaux des professeurs', 7),
  ('college-glo-yokpo', 'Point d''eau pour le sport', 8),
  ('college-glo-yokpo', 'Une classe avec ses élèves', 9),

  ('ecole-primaire-glo-yokpo', 'Fabrication de tables-bancs pour près de 300 élèves', 1),
  ('ecole-primaire-glo-yokpo', 'Construction d''une cantine scolaire', 2),
  ('ecole-primaire-glo-yokpo', 'Équipement du matériel de préparation et de service des repas aux enfants', 3),

  ('solidarite-sante-glo-alladacome', 'Plusieurs distributions de colis alimentaires pendant le Covid', 1),
  ('solidarite-sante-glo-alladacome', 'Sensibilisation contre le paludisme, suivie de la distribution de moustiquaires, d''huiles essentielles et de pommades répulsives à près de 300 ménages, jusqu''à Glo Djigbé', 2),

  ('cantine-glo-alladacome', 'Fabrication d''une centaine de tables et bancs pour les enfants de l''école primaire publique, en attendant la construction de la cantine', 1),
  ('cantine-glo-alladacome', 'Démarrage de la construction de la cantine scolaire', 2),

  ('vie-associative-2027', 'Assemblée générale de l''Association Quimperlé-Glo en février 2027 (date à définir)', 1),
  ('vie-associative-2027', 'Repas festif en mars 2027 (date à définir)', 2),
  ('vie-associative-2027', 'L''association a besoin de vos conseils pour la suite de son histoire', 3),

  ('entreprise-graphisme-raymond', 'Création d''une entreprise individuelle de conception graphique pour un jeune diplômé sans emploi', 1),
  ('entreprise-graphisme-raymond', 'Créer de l''emploi', 2),
  ('entreprise-graphisme-raymond', 'Former d''autres jeunes', 3),
  ('entreprise-graphisme-raymond', 'Développer leur localité pour y vivre pleinement', 4)
) AS v(slug, label, position)
JOIN projects p ON p.slug = v.slug;

-- ---------------------------------------------------------------------------
-- Actions
-- ---------------------------------------------------------------------------
INSERT INTO actions (zone, title, description, position) VALUES
  ('bretagne', 'Restitution et capitalisation',
   'Nous intervenons dans les écoles, collèges et lycées pour des échanges et des témoignages. Faites-nous appel !', 1),
  ('bretagne', 'Forum des associations',
   'Nous intervenons chaque année au Forum des Associations.', 2),
  ('bretagne', 'Semaine internationale',
   'Nous participons à la semaine internationale.', 3),
  ('bretagne', 'Réunions annuelles',
   'Nous suivons plusieurs réunions annuelles, en présentiel et en distanciel.', 4),
  ('bretagne', 'Dossiers de subvention et de financement',
   'Montage et compte rendu des dossiers de subvention et de financement.', 5),
  ('bretagne', 'L''artisanat béninois à votre disposition',
   'Inventez selon votre goût l''artisanat béninois et commandez-le à l''association Quimperlé-Glo. Vous aurez de magnifiques fabrications faites main par les bénévoles de notre association, en Bretagne, en France et au Bénin. Les bénéfices serviront à la construction de la cantine scolaire de Glo Alladacomè.', 6),
  ('bretagne', 'Ateliers cuisines béninoises',
   'Que mangeons-nous ? Inscrivez-vous aux sympathiques ateliers cuisines béninoises : nous cuisinons des repas de la paix dans la joie et la bonne humeur.', 7),

  ('benin', 'Voyages des bénévoles au Bénin',
   'Voyage et présence au Bénin des bénévoles qui le souhaitent, à leurs propres frais.', 1),
  ('benin', 'Rencontre de la population locale',
   'Rencontre en présentiel de la population locale et échange d''égal à égal.', 2),
  ('benin', 'Rencontre des partenaires',
   'Rencontre avec les différents partenaires et échanges sur les projets.', 3),
  ('benin', 'Visite des projets',
   'Visite des projets déjà réalisés et de ceux en cours.', 4),
  ('benin', 'Suivi et information',
   'Suivi et information sur la visibilité de nos partenaires auprès des bénéficiaires.', 5);

-- ---------------------------------------------------------------------------
-- Parrainages : initiales des parrains et marraines
-- ---------------------------------------------------------------------------
INSERT INTO sponsor_initials (label, position) VALUES
  ('J et ALT', 1), ('CD', 2), ('AB', 3), ('CLG', 4), ('JB', 5), ('O et NP', 6),
  ('A et JDG', 7), ('E et FE', 8), ('YLG', 9), ('J-MP', 10), ('LHB', 11),
  ('C et FM', 12), ('A et FR', 13), ('M et ML', 14), ('KLT', 15), ('S et SLF', 16),
  ('J et DLH', 17), ('MLG', 18);
