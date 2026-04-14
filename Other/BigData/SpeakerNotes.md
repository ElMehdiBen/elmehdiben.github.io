## SECTION 1 — Introduction & Récapitulatif

**Slide 1 — Titre**
Bienvenue à tous. Ce cours porte sur l'écosystème d'outils que l'industrie a construits sur 20 ans pour traiter des données à une échelle que les bases de données traditionnelles n'ont jamais été conçues pour gérer. À la fin, vous saurez non seulement ce que chaque outil est — mais pourquoi il existe.

**Slide 2 — Histoire d'ouverture**
Laissez-moi commencer par une histoire. En 2004, la plupart des entreprises avaient une base de données sur un seul serveur et la vie était simple. Puis Facebook, Twitter et YouTube sont arrivés. En 2008, le monde générait plus de données toutes les deux heures que toute l'histoire humaine réunie jusqu'alors. Personne n'avait prévu ça — et rien dans la boîte à outils existante n'était prêt. C'est à ce moment-là que le Big Data a cessé d'être un buzzword pour devenir un vrai problème d'ingénierie.

**Slide 3 — Qu'est-ce que le Big Data ?**
La définition classique nous donne trois V : Volume signifie qu'on collecte tout, pas des échantillons. Vélocité signifie que les données arrivent en temps réel. Variété signifie du JSON, des vidéos, des logs, des posts sociaux — pas seulement des lignes bien rangées en base de données. L'objectif n'est pas de mémoriser les V — c'est de comprendre que c'est un problème fondamentalement différent de ce qui existait avant.

**Slide 4 — Pourquoi a-t-on besoin de nouveaux outils ?**
Les bases de données relationnelles sont brillantes — mais elles ont été conçues pour des données structurées qui tiennent sur une seule machine. Dès que vos données explosent en taille et en variété, elles s'effondrent. L'idée clé qui a tout changé : distribuer le stockage et le traitement sur de nombreuses machines ordinaires bon marché travaillant en parallèle. Google a publié cette idée en 2003, et tout ce que nous verrons dans ce cours en découle.

**Slide 5 — Feuille de route du cours**
On va aborder l'écosystème couche par couche — Ingestion, Stockage, Traitement, Data Engineering Moderne, et Visualisation. Chaque couche résout un problème spécifique. Imaginez les données qui coulent de gauche à droite : elles sont collectées, stockées, traitées, transformées, puis présentées à des humains qui peuvent agir dessus.

**Slide 6 — Comment les couches se connectent**
Cette slide est le modèle mental pour tout le cours. Les données brutes entrent à gauche — clics, logs, relevés de capteurs. Elles sont ingérées, stockées, traitées et visualisées à droite. Chaque outil qu'on va étudier vit dans l'une de ces boîtes, et elles sont toutes connectées dans un pipeline. Gardez cette image en tête au fil du cours.

---

## SECTION 2 — Couche d'Ingestion

**Slide 7 — Séparateur de section**
Notre premier problème : avant de pouvoir stocker ou traiter des données, il faut les faire entrer. Ça s'avère bien plus difficile que ça en a l'air.

**Slide 8 — Histoire : Kafka**
En 2011, LinkedIn grossit d'un million d'utilisateurs par semaine et les données volent dans tous les sens. Leurs files de messages s'effondrent — des données se perdent, les systèmes prennent du retard, les ingénieurs passent leurs nuits à gérer des incidents. Une équipe pose une question différente : et si au lieu de penser en termes de messages, on pensait en termes de journal distribué — un flux d'événements ordonné, infaillible et rejouable ? Ils le construisent, le nomment Kafka d'après l'auteur, et le reste appartient à l'histoire.

**Slide 9 — Le problème de l'ingestion**
Deux approches fondamentalement différentes. L'ingestion par lot collecte les données en blocs à intervalles programmés — pensez aux jobs ETL de nuit. L'ingestion en flux traite les événements en continu dès qu'ils arrivent. Le compromis est simple : le batch est plus facile à construire et à opérer, le streaming donne des insights en temps réel mais est bien plus complexe. Le bon choix dépend entièrement de la fraîcheur requise pour vos données.

**Slide 10 — Apache Sqoop**
Sqoop est votre pont entre le monde relationnel et le monde Hadoop. Si vous avez une base MySQL ou Oracle et que vous devez déplacer ces données dans HDFS pour un traitement à grande échelle, Sqoop est l'outil. Il utilise MapReduce en interne pour paralléliser le transfert — il est donc rapide même pour des centaines de gigaoctets.

**Slide 11 — Apache Flume**
Là où Sqoop déplace des données de base de données structurées, Flume déplace des données d'événements non structurés — logs, événements web, flux de réseaux sociaux. Son architecture est élégante : une Source collecte les données, un Channel les met en tampon de façon fiable, et un Sink les livre vers HDFS ou Elasticsearch. Le channel est ce qui le rend tolérant aux pannes — si le sink tombe, les données attendent dans le channel plutôt que d'être perdues.

**Slide 12 — Apache Kafka : qu'est-ce que c'est ?**
Kafka est un journal de commits distribué. Les producteurs écrivent des événements dans des topics, les consommateurs les lisent — et la différence clé est que la lecture ne détruit pas les données. Les consommateurs suivent leur propre position, appelée offset, ce qui signifie qu'on peut rejouer l'historique complet, avoir plusieurs consommateurs indépendants lisant le même flux, et récupérer d'une panne en reprenant simplement depuis le dernier offset validé.

**Slide 13 — Architecture Kafka**
À gauche on a les producteurs — des applications qui génèrent des événements. Au centre, le cluster Kafka où les topics sont divisés en partitions pour le parallélisme, chaque partition étant répliquée sur plusieurs brokers pour la tolérance aux pannes. À droite, les consommateurs — des jobs Spark, Flink, des dashboards, des modèles ML — chacun lisant à son propre rythme indépendamment. Remarquez qu'ajouter un nouveau consommateur n'affecte aucun des existants.

**Slide 14 — Kafka + Spark Streaming**
En production, Kafka et Spark Streaming apparaissent presque toujours ensemble. Kafka est le tampon — il absorbe les pics d'événements et découple les producteurs des consommateurs. Spark lit depuis Kafka à son propre rythme, traite des micro-lots, et écrit les résultats en aval. Si Spark tombe en panne, il reprend simplement là où il s'était arrêté dans Kafka. Cette combinaison — Kafka pour l'ingestion, Spark pour le traitement — alimente la plupart des pipelines temps réel que vous rencontrerez dans l'industrie.

**Slide 15 — Apache NiFi**
NiFi est l'approche visuelle par glisser-déposer pour les flux de données. Là où Kafka est optimisé pour le streaming à haut débit, NiFi est optimisé pour le routage et la transformation de données entre des systèmes hétérogènes — bases de données, APIs REST, stockage cloud, appareils IoT. Sa force clé est la provenance des données : il trace exactement d'où vient chaque donnée et où elle est allée. En pratique, beaucoup d'organisations utilisent NiFi et Kafka ensemble — NiFi pour la collecte et le routage, Kafka pour le pipeline à haut débit.

**Slide 16 — Résumé de la couche d'ingestion**
Le message à retenir : votre choix d'ingestion est guidé par une seule question — jusqu'où peut vieillir votre donnée avant de devenir inutile ? Si des heures conviennent, utilisez le batch. Si les secondes comptent, utilisez le streaming. Sqoop et Flume pour les données structurées et les logs respectivement ; Kafka pour les flux à haut débit ; NiFi quand vous avez besoin de routage visuel entre de nombreux systèmes.

---

## SECTION 3 — Couche de Stockage

**Slide 17 — Séparateur de section**
Maintenant que les données arrivent, il nous faut quelque part où les mettre. La couche de stockage a considérablement évolué — des fichiers distribués aux tables intelligentes avec des garanties ACID. Suivons cette évolution.

**Slide 18 — Histoire : De HDFS aux Data Swamps**
En 2003, Google publie le papier GFS. Doug Cutting construit HDFS pour son moteur de recherche et nomme le projet Hadoop d'après l'éléphant en peluche de son fils. Pendant des années, les entreprises déversent tout dans HDFS — la promesse était simple : tout stocker, se préoccuper de la structure plus tard. Mais les lacs se sont remplis, personne ne savait ce qu'ils contenaient, des données corrompues circulaient silencieusement en aval, et le lac est devenu un marécage. Les ingénieurs de Databricks se sont alors demandé : et si on ajoutait une couche de fiabilité par-dessus ? Delta Lake est né.

**Slide 19 — Le problème du stockage**
Quatre défis que le stockage sur une seule machine ne pouvait pas résoudre : Volume — un seul serveur ne peut pas contenir des pétaoctets. Variété — les données ne sont plus seulement des lignes et des colonnes. Fiabilité — les machines tombent en panne, donc il faut de la réplication. Coût — le stockage d'entreprise est cher, le matériel commodity et le cloud ont changé l'économie. Chaque outil de stockage qu'on va voir adresse un ou plusieurs de ces défis.

**Slide 20 — HDFS**
HDFS résout les problèmes de volume et de fiabilité de façon élégante. Les fichiers sont découpés en blocs de 128 Mo, distribués sur des DataNodes, et chaque bloc est répliqué trois fois sur des nœuds différents. Le NameNode garde la trace de l'emplacement de tout. Le résultat : on peut stocker des pétaoctets sur du matériel commodity, et la perte d'une machine ne fait pas perdre de données. Le compromis : HDFS est optimisé pour les grandes lectures séquentielles — il n'est pas conçu pour l'accès aléatoire ni les petits fichiers.

**Slide 21 — Bases de données NoSQL**
Quand les données ne s'adaptent pas au modèle relationnel — à cause de l'échelle, de la structure, ou des patterns d'accès — NoSQL intervient. Remarquez que les quatre familles correspondent à quatre formes différentes de données : les documents pour les enregistrements imbriqués, les clé-valeur pour une recherche ultra-rapide, les colonnes larges pour les séries temporelles et l'IoT, et les graphes pour les données riches en relations. Le nom NoSQL est malheureux — beaucoup de ces systèmes ont des interfaces SQL. Ça veut vraiment dire "pas seulement SQL".

**Slide 22 — Stockage Cloud**
Le stockage cloud a complètement changé l'économie du Big Data. S3, Azure Blob, et GCS offrent un stockage objet pratiquement infini et très durable à une fraction du coût du matériel on-premise. L'insight crucial de cette slide : le stockage cloud découple le calcul du stockage. Dans Hadoop traditionnel, votre calcul et votre stockage étaient sur les mêmes machines. Dans le cloud, vous les scalez indépendamment et payez chacun séparément — un changement architectural majeur.

**Slide 23 — Stockage en colonnes : Parquet & ORC**
C'est l'une des optimisations les plus impactantes en analytics big data. Avec le stockage en lignes, pour lire la colonne Age vous balayez chaque ligne. Avec le stockage en colonnes, toutes les valeurs Age sont stockées ensemble — donc lire une colonne signifie lire un chunk continu sur le disque. La différence de performance pour les requêtes analytiques peut être de 10 à 100 fois. Parquet est le standard de facto — si vous construisez quoi que ce soit sur Spark, Hive, Presto ou Athena, utilisez Parquet.

**Slide 24 — Data Lake vs Data Warehouse**
Deux philosophies. Le data lake dit : stockez tout brut, définissez la structure au moment de la requête — bon marché, flexible, mais désordonné. Le data warehouse dit : définissez votre structure à l'avance, gardez-la propre — cher, rigide, mais rapide et fiable. Pendant des années, ce furent des systèmes séparés. Puis quelqu'un a demandé : et si on combinait le meilleur des deux ?

**Slide 25 — Delta Lake**
Delta Lake est cette combinaison. Il s'installe par-dessus votre stockage data lake existant — S3, ADLS, HDFS — et ajoute quatre choses qui manquent aux data lakes bruts : les transactions ACID pour que plusieurs écrivains ne corrompent pas les données, l'application du schéma pour que les mauvaises données soient rejetées, le voyage dans le temps pour interroger n'importe quelle version précédente, et le support de MERGE, UPDATE et DELETE. Ce dernier point est crucial pour la conformité GDPR et les patterns de capture des changements de données.

**Slide 26 — Apache Iceberg**
Iceberg résout des problèmes similaires à Delta Lake mais avec un focus différent. Sa fonctionnalité signature est le partitionnement caché — les utilisateurs n'ont pas besoin de savoir comment les données sont partitionnées, et le partitionnement peut changer sans réécrire toute la table. Il est profondément agnostique au moteur : la même table Iceberg peut être lue par Spark, Flink, Trino, Dremio et plus encore simultanément. Netflix, Apple et LinkedIn font tourner Iceberg à massive échelle.

**Slide 27 — Le Data Lakehouse**
Le Lakehouse est l'architecture qui a émergé de ces outils. Vous obtenez l'économie du data lake — stockage cloud bon marché, n'importe quel format — combinée à la fiabilité du data warehouse — transactions ACID, requêtes rapides, gouvernance du schéma. Delta Lake, Iceberg et Apache Hudi sont les trois principales implémentations. C'est là où l'industrie se dirige — la plupart des plateformes de données modernes sont des Lakehouses, qu'elles le disent ou non.

**Slide 28 — Résumé de la couche de stockage**
L'histoire du stockage est une évolution : HDFS nous a donné des fichiers distribués, NoSQL des patterns d'accès flexibles, le stockage cloud l'économie et l'échelle, les formats en colonnes les performances analytiques, et Delta Lake et Iceberg la fiabilité par-dessus tout ça. La valeur par défaut moderne : stockage objet cloud, fichiers Parquet, avec une couche de format de table Delta Lake ou Iceberg par-dessus.

---

## SECTION 4 — Couche de Traitement

**Slide 29 — Séparateur de section**
Les données arrivent et sont stockées. Maintenant vient la partie la plus difficile : les rendre utiles à grande échelle. C'est la plus grande section — Spark à lui seul a six slides, et on couvre aussi Flink, Lambda et Kappa.

**Slide 30 — Histoire : Spark**
MapReduce fonctionne. Mais c'est lent — chaque étape lit depuis le disque, écrit sur le disque, relit, réécrit. En 2009, un étudiant en thèse à Berkeley nommé Matei Zaharia pose une question d'une simplicité remarquable : pourquoi déplace-t-on le calcul vers les données sur disque ? Et si on déplaçait les données vers la RAM et qu'on les y gardait ? C'est Spark. Le résultat : jusqu'à 100 fois plus rapide que MapReduce. En 2014 il devient le projet big data open-source le plus actif au monde.

**Slide 31 — Le problème du traitement**
Deux paradigmes, deux problèmes très différents. Le traitement par lot concerne le débit — traiter efficacement d'énormes quantités de données historiques. Le traitement en flux concerne la latence — réagir à des événements individuels en quelques millisecondes. Les outils se chevauchent, mais la philosophie de conception est complètement différente. Demandez-vous : jusqu'à quel point mes résultats peuvent-ils être périmés avant de cesser d'être utiles ?

**Slide 32 — MapReduce**
MapReduce est le fondement — comprenez-le conceptuellement, mais utilisez Spark en pratique. L'exemple du comptage de mots montre parfaitement le pattern : Map convertit les enregistrements d'entrée en paires clé-valeur, Shuffle regroupe toutes les valeurs pour la même clé, Reduce les agrège. Le problème est l'I/O disque — chaque étape écrit les résultats intermédiaires dans HDFS. Pour les algorithmes itératifs comme le machine learning qui nécessitent des centaines de passes sur les données, c'est catastrophiquement lent.

**Slide 33 — Vue d'ensemble d'Apache Spark**
Spark remplace MapReduce comme moteur de traitement mais ajoute quelque chose que MapReduce n'a jamais eu : une plateforme unifiée. Un moteur pour le SQL batch, le streaming, le machine learning et le traitement de graphes. L'architecture montre quatre modules au-dessus de Spark Core. C'est significatif — avant Spark, vous aviez besoin d'outils séparés pour chacune de ces charges de travail. Maintenant vous apprenez un seul système et il gère tout.

**Slide 34 — RDDs, DataFrames, Datasets**
Spark a fait évoluer son abstraction centrale trois fois. Les RDDs donnaient un contrôle total mais nécessitaient une optimisation manuelle et étaient verbeux. Les DataFrames ont ajouté l'optimiseur Catalyst — vous écrivez du code façon SQL et Spark détermine automatiquement le meilleur plan d'exécution. Les Datasets ont ajouté la sécurité de type par-dessus les DataFrames. La règle pratique : utilisez les DataFrames en Python et R, les Datasets en Scala ou Java, et n'atteignez les RDDs que lorsque vous avez besoin d'un contrôle bas niveau que les APIs supérieures ne peuvent pas fournir.

**Slide 35 — Spark SQL**
Spark SQL est là où la plupart des data engineers passent la plupart de leur temps. L'optimiseur Catalyst est l'arme secrète — il réécrit votre SQL dans le plan d'exécution physique le plus efficace, choisissant la bonne stratégie de jointure, poussant les filtres vers la source de données, éliminant les lectures de colonnes inutiles. Vous écrivez du SQL simple ; Catalyst génère quelque chose de bien plus optimal. Tungsten prend ensuite le plan physique et génère du bytecode qui tourne proche du métal.

**Slide 36 — Spark Streaming et Structured Streaming**
L'ancienne API DStream traitait un flux comme une séquence de micro-lots de RDDs — ça fonctionnait mais avait des limites importantes sur les données arrivant en retard. Structured Streaming est l'approche moderne : elle traite le flux comme un DataFrame illimité qui grandit continuellement. Vous écrivez le même code DataFrame/SQL que vous écririez pour le batch — Spark gère la sémantique du streaming. Le concept de watermark est clé : il dit à Spark combien de temps attendre les données tardives avant de fermer une fenêtre temporelle.

**Slide 37 — Spark MLlib**
MLlib apporte le machine learning dans le même cluster où vos données se trouvent déjà — pas besoin d'exporter les données vers une plateforme ML séparée. L'API Pipeline est la fonctionnalité phare : enchaînez une séquence de transformeurs et d'estimateurs dans un workflow reproductible. Ça reflète la philosophie de scikit-learn mais monte à l'échelle des téraoctets. Pour la plupart des cas d'usage ML en entreprise — classification, régression, clustering, filtrage collaboratif — MLlib vous couvre.

**Slide 38 — Optimisation et tuning Spark**
Cette slide est ce qui sépare les ingénieurs Spark juniors des seniors. La règle la plus importante : évitez les shuffles — quand les données traversent le réseau, tout ralentit. Mettez en cache les DataFrames intermédiaires que vous utilisez plus d'une fois. Partitionnez vos données judicieusement — trop peu de partitions sous-utilisent votre cluster, trop en créent une surcharge de planification. Et faites confiance à l'optimiseur Catalyst : utilisez les DataFrames, pas les RDDs, pour qu'il puisse faire son travail.

**Slide 39 — GraphX**
GraphX étend Spark pour le calcul sur graphes — des données où les relations entre entités sont aussi importantes que les entités elles-mêmes. Réseaux sociaux, réseaux frauduleux, chaînes d'approvisionnement, classement de pages web — tout se modélise naturellement en graphes. La différence clé avec les données relationnelles : dans une table vous demandez "quelles sont les propriétés de cet utilisateur ?" — dans un graphe vous demandez "à qui est connecté cet utilisateur, et à combien de degrés de séparation se trouve le fraudeur ?"

**Slide 40 — Architecture Spark**
Sous le capot, votre code Spark crée un DAG — un graphe acyclique dirigé de transformations. Catalyst optimise ce DAG en un plan physique. Le plan est découpé en stages séparés par des frontières de shuffle. Chaque stage devient des tasks distribués aux Executors qui tournent sur les Worker Nodes. Le Driver orchestre tout. Comprendre cette architecture vous aide à lire le Spark UI, diagnostiquer les stages lents, et tuner vos jobs intelligemment.

**Slide 41 — Apache Flink**
Si Spark Streaming est quasi-temps-réel, Flink est vrai temps réel. Spark utilise des micro-lots — il accumule des événements sur un court intervalle puis les traite ensemble. Flink traite chaque événement individuellement dès qu'il arrive, permettant une latence sous la milliseconde. Les opérateurs stateful de Flink sont aussi exceptionnellement puissants pour le traitement d'événements complexes — détecter des patterns dans des séquences d'événements. Choisissez Spark quand vous avez besoin d'une plateforme batch-plus-streaming unifiée. Choisissez Flink quand une latence sous la seconde est non négociable.

**Slide 42 — Architecture Lambda**
Lambda résout le problème de combiner des résultats historiques précis avec la fraîcheur en temps réel. La Batch Layer retraite toutes les données historiques sur un calendrier — haute précision, des heures de latence. La Speed Layer traite uniquement les données les plus récentes en temps réel — faible latence, résultats approximatifs. La Serving Layer fusionne les deux vues pour que les requêtes retournent toujours une réponse complète. La faiblesse : vous maintenez deux systèmes séparés faisant un travail similaire, ce qui double la complexité.

**Slide 43 — Architecture Kappa**
L'insight de Kappa est radical : si vous concevez votre couche de streaming suffisamment bien, vous n'avez pas besoin de la couche batch du tout. Le retraitement historique est géré en rejouant les événements depuis Kafka depuis le début. Ça simplifie dramatiquement le système — un seul codebase, un seul chemin de traitement. L'enabler clé est la rétention des logs de Kafka : si vous gardez les événements assez longtemps, vous pouvez toujours rejouer l'historique. L'industrie évolue progressivement de Lambda vers Kappa à mesure que les outils de streaming mûrissent.

**Slide 44 — Lambda vs Kappa**
Le choix se résume à votre équipe, vos données et votre appétit opérationnel. Lambda est plus sûr pour les équipes ayant des pipelines batch existants — vous les réutilisez et ajoutez le streaming par-dessus. Kappa est plus propre et plus simple mais nécessite une expertise streaming tout au long et une rétention Kafka suffisante pour le replay. La tendance de l'industrie va vers Kappa à mesure que les coûts de stockage Kafka baissent et que des frameworks comme Flink rendent le développement stream-first plus accessible.

**Slide 45 — Résumé de la couche de traitement**
La couche de traitement est là où se fait le plus gros du travail d'ingénierie. Spark est votre cheval de bataille principal — unifié, rapide, avec des APIs pour chaque cas d'usage. Flink est votre spécialiste pour le vrai temps réel. Lambda et Kappa sont des patterns architecturaux qui gouvernent la façon dont vous combinez batch et stream. Maîtrisez le problème d'abord, et l'outil devient évident.

---

## SECTION 5 — Data Engineering Moderne

**Slide 46 — Séparateur de section**
Cette section porte autant sur un changement culturel que technique. Le data engineering emprunte la discipline du génie logiciel — versioning, tests, documentation et automatisation. Les outils qui ont conduit ce changement sont dbt et Apache Airflow.

**Slide 47 — Histoire : dbt & Airflow**
En 2016, une équipe analytics est enterrée sous des centaines de scripts SQL sans ordre, sans tests, sans documentation. Un CEO prend une mauvaise décision parce qu'une transformation silencieuse a corrompu un dashboard. Un ingénieur demande : pourquoi ne peut-on pas traiter le SQL comme du logiciel ? C'est dbt. Pendant ce temps chez Airbnb, des ingénieurs déclenchent des pipelines manuellement et chassent des pannes à 3h du matin. Maxime Beauchemin demande : pourquoi les workflows ne peuvent-ils pas être du code ? C'est Airflow. Ensemble ils forment l'épine dorsale du Modern Data Stack.

**Slide 48 — ETL vs ELT**
L'ETL traditionnel transformait les données avant de les charger dans l'entrepôt — ce qui nécessitait des outils externes coûteux et rendait les changements douloureux. L'ELT inverse ça : chargez d'abord les données brutes dans l'entrepôt, puis transformez-les à l'intérieur avec du SQL. C'est seulement possible parce que les entrepôts cloud modernes comme Snowflake et BigQuery sont assez puissants pour faire tourner des transformations à massive échelle. dbt est l'outil qui rend le T de l'ELT digne de la production.

**Slide 49 — dbt : qu'est-ce que c'est ?**
dbt est d'une simplicité trompeuse : vous écrivez des SELECT, dbt matérialise ces requêtes sous forme de tables ou de vues dans votre entrepôt, et il gère tout autour — l'ordre des dépendances, les mises à jour incrémentales, la documentation et les tests. Le changement philosophique est significatif : analystes et ingénieurs peuvent collaborer dans le même dépôt Git, chaque changement est revu, testé et réversible. La transformation des données devient une discipline d'ingénierie logicielle.

**Slide 50 — Structure d'un projet dbt**
Un projet dbt bien structuré suit quatre couches. Les Sources sont vos tables brutes, intouchées. Les modèles de Staging sont en correspondance 1:1 avec les sources — juste renommer les colonnes et caster les types. Les modèles Intermédiaires contiennent la logique métier et les jointures. Les Marts sont vos tables finales orientées métier — propres, documentées et prêtes pour les outils BI. La fonction ref() est ce qui fait fonctionner tout ça : les modèles se référencent mutuellement, et dbt construit automatiquement le DAG de dépendances pour que tout s'exécute dans le bon ordre.

**Slide 51 — Tests et documentation dbt**
Deux choses que les équipes data ne faisaient historiquement jamais : tester leurs transformations et documenter leurs données. dbt rend les deux trivialements faciles. Vous déclarez des tests en YAML — not null, unique, valeurs acceptées — et dbt génère le SQL pour les vérifier à chaque run. Pour la documentation, une seule commande génère un catalogue consultable complet de chaque table, colonne et relation dans votre entrepôt. C'est le dictionnaire de données dont votre équipe a toujours eu besoin et n'a jamais eu le temps de construire.

**Slide 52 — Apache Airflow : qu'est-ce que c'est ?**
Airflow résout le problème d'orchestration : comment planifier et monitorer fiablement des pipelines complexes avec des dépendances entre plusieurs systèmes ? La réponse : définissez vos pipelines comme du code Python — des DAGs où chaque nœud est une tâche et chaque arête est une dépendance. Le graphe est acyclique pour qu'il n'y ait pas de boucles infinies. Le scheduler d'Airflow exécute alors les tâches quand leurs dépendances sont satisfaites, relance en cas d'échec, et présente tout dans une belle interface.

**Slide 53 — Architecture Airflow**
Le Web Server vous donne l'interface de monitoring. Le Scheduler analyse vos fichiers DAG et décide ce qui tourne quand. L'Executor distribue les tâches aux Workers. La base de données Metadata est la source de vérité unique — chaque état de tâche, chaque historique de run, chaque variable y est stocké. En production, les fichiers DAG vivent dans Git et sont synchronisés automatiquement vers le Scheduler. L'échelle est obtenue en ajoutant plus de Workers — chacun prend des tâches de la queue indépendamment.

**Slide 54 — Écrire un DAG Airflow**
Un DAG est juste un fichier Python. Vous définissez un calendrier avec une expression cron, créez des opérateurs pour chaque étape, et les reliez avec l'opérateur >> qui signifie "celui-ci doit se terminer avant celui-là". Airflow a des opérateurs pour tout : PythonOperator, SparkSubmitOperator, BigQueryOperator, HttpOperator, SlackOperator — des centaines d'intégrations prêtes à l'emploi. Le code sur cette slide est un pipeline quotidien complet et prêt pour la production en environ 20 lignes.

**Slide 55 — Le Modern Data Stack**
Le Modern Data Stack est une philosophie : utilisez des outils cloud-native, meilleurs de leur catégorie pour chaque couche, chacun remplaçable indépendamment. Ingestion avec Fivetran ou Airbyte. Stockage dans Snowflake ou BigQuery. Transformation avec dbt. Orchestration avec Airflow. Visualisation avec Tableau ou Superset. La couche de gouvernance — tests dbt, Great Expectations, Monte Carlo — tourne au-dessus de tout. La stack est composable : remplacez n'importe quelle couche sans reconstruire les autres.

**Slide 56 — dbt + Airflow ensemble**
dbt connaît les dépendances à l'intérieur de votre couche de transformation. Airflow connaît les dépendances sur l'ensemble de votre système — extract, test, load, notify. En pratique vous faites tourner dbt à l'intérieur d'un DAG Airflow : une tâche d'extraction tire les données, un DbtRunOperator exécute vos transformations, un DbtTestOperator valide les résultats, puis une tâche finale publie vers un dashboard ou déclenche une alerte. Ensemble ils vous donnent une observabilité de bout en bout depuis la donnée brute jusqu'à la métrique métier testée.

**Slide 57 — Résumé du Data Engineering Moderne**
Le changement dans cette section est culturel. L'ETL devient l'ELT. Le SQL devient du logiciel. Les pipelines deviennent du code. Chaque transformation est testée, chaque dataset est documenté, chaque panne est observable. dbt et Airflow sont les deux outils qui opérationnalisent cette philosophie — et ensemble avec les entrepôts cloud, ils forment le Modern Data Stack sur lequel la plupart des équipes analytics engineering construisent aujourd'hui.

---

## SECTION 6 — Couche de Visualisation

**Slide 58 — Séparateur de section**
La dernière couche. Tout ce travail — ingérer, stocker, traiter, transformer — n'a aucune valeur tant qu'un humain ne peut pas comprendre les données et agir dessus. C'est l'objet de cette section.

**Slide 59 — Histoire : ELK**
En 2010, un développeur nommé Shay Banon construit un moteur de recherche de recettes pour sa femme. Il encapsule Apache Lucene dans une API REST, l'appelle Elasticsearch, et le publie en open-source comme projet personnel. Des ingénieurs le découvrent et commencent à l'utiliser pour les logs. Ensuite ils ont besoin d'un moyen de visualiser ces logs — Kibana apparaît. Puis ils ont besoin d'un moyen fiable d'alimenter les logs dans Elasticsearch — Logstash suit. Personne n'a conçu le Stack ELK. Il s'est assemblé lui-même, outil par outil, autour d'un problème partagé. Aujourd'hui c'est l'une des stacks d'observabilité les plus largement déployées au monde.

**Slide 60 — Le problème de la visualisation**
L'insight clé de cette slide : des consommateurs différents ont besoin des données sous des formes complètement différentes. Les utilisateurs métier ont besoin de dashboards en glisser-déposer sans SQL. Les data scientists ont besoin de notebooks Python avec des librairies de graphiques flexibles. Les ingénieurs et les ops ont besoin de recherche de logs en temps réel et d'alertes d'anomalies. Il n'existe pas d'outil de visualisation unique qui serve bien ces trois audiences — c'est pourquoi on a tout un écosystème.

**Slide 61 — Le Stack ELK**
Le flux ELK se lit de gauche à droite. Les Beats sont des agents légers qui expédient des données depuis vos serveurs — pas de JVM, overhead minimal. Logstash les parse, les enrichit et les route. Elasticsearch les indexe et les stocke, les rendant consultables en quasi-temps-réel. Kibana les visualise. Le tout peut traiter des millions de lignes de logs par seconde. L'innovation technique clé d'Elasticsearch est l'index inversé — la même structure de données qui alimente la recherche Google, appliquée à vos logs et données métier.

**Slide 62 — Elasticsearch en profondeur**
Un index Elasticsearch ressemble à une table de base de données, mais flexible en termes de schéma et optimisé pour la recherche. Les documents sont des objets JSON. Les index sont découpés en shards pour le parallélisme et répliqués pour la tolérance aux pannes — exactement la même philosophie distribuée que HDFS. L'API de requête est remarquablement expressive : recherche plein texte, requêtes par plage, agrégations, requêtes géo-spatiales — tout via une API REST propre. L'exemple sur la slide recherche tous les index de logs pour "error" et agrège les résultats par hôte.

**Slide 63 — Kibana**
Kibana est la fenêtre sur vos données Elasticsearch. Discover vous permet de rechercher et filtrer les logs interactivement — essentiel pour déboguer des incidents de production. Les Dashboards vous permettent de construire des visualisations qui se rafraîchissent automatiquement. La fonctionnalité d'alerting est critique opérationnellement : définissez un seuil ou une condition d'anomalie et Kibana envoie un message Slack, une alerte PagerDuty ou un webhook. La détection d'anomalies ML apprend automatiquement les patterns de référence et signale les déviations — aucun seuil à configurer.

**Slide 64 — Outils BI**
Là où ELK sert les ingénieurs, les outils BI servent les utilisateurs métier. Le paysage a quatre acteurs principaux aujourd'hui. Tableau est la puissance de visualisation, de confiance par les entreprises pour les graphiques analytiques complexes. Power BI gagne sur l'intégration Microsoft et le coût — si votre entreprise est dans l'écosystème Microsoft, c'est souvent le choix par défaut. L'angle unique de Looker est sa couche sémantique : vous définissez la logique métier en LookML une fois, et elle est cohérente partout. Superset est l'option open-source gratuite — idéale pour les équipes data-savvy qui ne veulent pas de coûts de licences.

**Slide 65 — Les APIs comme couche de consommation**
Tous les consommateurs de données ne sont pas humains. Les applications mobiles, les intégrations partenaires et les microservices consomment les données de façon programmatique via des APIs. REST est le standard pour une compatibilité large — basé sur les ressources, sans état, cacheable. GraphQL est l'alternative moderne pour les APIs internes — les clients spécifient exactement quels champs ils ont besoin, éliminant le problème de sur-récupération qui affecte REST. Beaucoup d'équipes génèrent maintenant automatiquement des APIs REST ou GraphQL directement depuis leurs tables d'entrepôt avec des outils comme Hasura ou PostgREST.

**Slide 66 — Résumé de la couche de visualisation**
À retenir : une bonne visualisation ne consiste pas en de beaux graphiques. Il s'agit de donner aux bonnes personnes les bonnes données dans le bon format au bon moment. Un dashboard que personne n'utilise est pire que pas de dashboard du tout — il crée une fausse confiance. Faites correspondre votre outil à votre audience : ELK pour les ingénieurs, outils BI pour le métier, notebooks pour les scientifiques, APIs pour les applications.

---

## SECTION 7 — Tout Mettre Ensemble

**Slide 67 — Séparateur de section**
Maintenant on assemble tout. On va regarder une architecture réelle, parler de comment choisir le bon outil, et finir avec le tableau complet du paysage Big Data.

**Slide 68 — Exigences e-commerce**
Rendons ça concret. Imaginez que vous gérez une plateforme e-commerce traitant des millions d'événements par jour. Vous avez six exigences qui couvrent chaque couche de l'écosystème : détection de fraude en 100ms, recommandations en temps réel, rapports batch précis à 7h du matin, recherche pour le support client, une API mobile, et des dashboards pour les dirigeants. Aucun outil unique ne satisfait tout ça — vous avez besoin de tout l'écosystème travaillant ensemble. C'est exactement à quoi ressemble le vrai data engineering.

**Slide 69 — Diagramme d'architecture complet**
Voici comment tous les outils se connectent. Les événements de l'application web et mobile arrivent dans Kafka. Les données batch de l'ERP et du CRM passent par Fivetran. Les logs passent par Flume. Tout ça atterrit dans S3 comme lac brut, Delta Lake comme couche de tables fiable, et Elasticsearch pour la recherche. Spark Streaming gère le scoring de fraude et les recommandations en temps réel. Spark Batch fait l'ETL de nuit. dbt transforme les données de l'entrepôt. Airflow orchestre tout. Ensuite Power BI, Kibana, l'API REST, et Jupyter sont au-dessus comme consommateurs. Chaque outil mérite sa place.

**Slide 70 — Choisir le bon outil**
Six cartes de décision, chacune une vraie question que vous rencontrerez en pratique. La réponse n'est jamais "toujours utiliser X" — ça dépend de votre exigence de latence, de l'expertise de votre équipe, de la structure de vos données, et de votre budget. Les meilleurs ingénieurs n'ont pas d'outil favori — ils ont une compréhension claire des compromis et choisissent le bon pour le problème en question.

**Slide 71 — Le paysage Big Data aujourd'hui**
Dix catégories, chacune avec quatre à six outils. Cette slide est intentionnellement dense — elle est là pour vous montrer que l'écosystème est vaste et évolue constamment. Les outils que vous utilisez aujourd'hui pourraient être différents dans cinq ans. Mais si vous comprenez le problème que chaque catégorie résout, évaluer un nouvel outil devient simple : quel problème résout-il, quels sont ses compromis, et où s'intègre-t-il dans le pipeline ?

**Slide 72 — Tableau complet + 5 points clés**
Cinq choses à retenir de ce cours. Le Big Data concerne la vélocité et la variété, pas seulement la taille. Chaque couche résout un problème spécifique — maîtrisez le problème d'abord. Spark est le couteau suisse mais savoir quand atteindre Flink, dbt ou Elasticsearch est ce qui sépare les ingénieurs juniors des seniors. Le Modern Data Stack est un changement de philosophie, pas juste une mise à niveau d'outils. Et enfin — le paysage change vite, mais les principes du stockage et du traitement distribués sont intemporels.

**Slide 73 — Merci**
Vous avez maintenant le tableau complet — depuis un simple clic sur un site web jusqu'à une insight métier sur un dashboard Power BI. La prochaine étape est la pratique : lancez un cluster Spark, écrivez un producteur Kafka, construisez un projet dbt. Les concepts se cristalliseront quand vous commencerez à déboguer un shuffle Spark ou à tracer l'échec d'un modèle dbt. Merci, et bonne chance.
