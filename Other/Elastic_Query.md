# 🔍 Guide de Recherche Elasticsearch
### Pour les utilisateurs business — sans jargon technique

---

## Introduction

La **barre de recherche Elasticsearch** vous permet de trouver exactement ce que vous cherchez parmi des milliers de posts, commentaires et publications de réseaux sociaux, en utilisant des mots-clés simples ou des combinaisons plus précises.

Ce guide vous montre comment formuler vos recherches pour surveiller votre marque, analyser des tendances ou modérer du contenu.

---

## 1. Recherche simple

La façon la plus basique : tapez simplement un ou plusieurs mots dans le champ `text` ou `ml_content_summary`.

```
boycott stade
```

> 🔎 Retourne tous les posts dont le contenu mentionne **"boycott"** ou **"stade"** (ou les deux).

```
Moulay Abdellah
```

> 🔎 Retourne toutes les publications citant **"Moulay"** ou **"Abdellah"** — utile pour surveiller les mentions d'un lieu spécifique.

---

## 2. Correspondance exacte — Les guillemets `" "`

Pour chercher une **expression exacte**, entourez-la de guillemets.

```
"Prince Moulay Abdellah Stadium"
```

> ✅ Retourne uniquement les posts mentionnant exactement ce nom de stade (`ml_place_mentioned`), sans remonter des résultats partiels non pertinents.

```
"empty stands"
```

> ✅ Retrouve précisément les publications dont le résumé ML (`ml_content_summary`) contient cette expression — par exemple les posts analysés comme montrant des tribunes vides.

---

## 3. ET — L'opérateur `AND`

Pour que **tous les mots** soient présents dans le résultat.

```
boycott AND Maroc
```

> ✅ Retourne les posts qui mentionnent à la fois **"boycott"** ET **"Maroc"** (`ml_place_mentioned:Morocco`).

```
ml_sentiment:neutral AND ml_category:Football AND platform:tiktok
```

> ✅ Retrouve toutes les publications TikTok classées Football avec un sentiment neutre — exactement comme le post de l'exemple (`ml_sentiment`, `ml_category`, `platform`).

---

## 4. OU — L'opérateur `OR`

Pour obtenir des résultats qui contiennent **l'un ou l'autre** des termes.

```
platform:tiktok OR platform:instagram
```

> ✅ Retourne toutes les publications provenant de TikTok ou d'Instagram (champ `platform`).

```
ml_dominant_emotion:curiosity OR ml_dominant_emotion:anger OR ml_dominant_emotion:frustration
```

> ✅ Utile pour surveiller plusieurs émotions à la fois parmi les posts analysés par le moteur ML (`ml_dominant_emotion`).

---

## 5. SAUF / PAS — L'opérateur `NOT`

Pour **exclure** un terme de vos résultats.

```
ml_sector:Sports NOT ml_category:Football
```

> ✅ Retourne les posts du secteur Sports (`ml_sector`) mais en excluant ceux catégorisés Football — pour voir d'autres disciplines.

```
ml_tags:boycott NOT ml_sentiment:negative
```

> ✅ Trouve les posts taggés "boycott" (`ml_tags`) mais dont le sentiment n'est pas négatif — pour identifier les mentions neutres ou informatives.

---

## 6. Combinaisons — Utiliser les parenthèses `( )`

Les parenthèses permettent de **grouper** des conditions, comme en mathématiques.

```
(ml_tags:stadium OR ml_tags:attendance) AND ml_place_mentioned:"Morocco"
```

> ✅ Retourne les posts taggés "stadium" ou "attendance" ET mentionnant le Maroc comme lieu — comme dans l'exemple avec `ml_sector_specific_tags`.

```
(ml_post_type:question OR ml_post_type:personal_opinion) AND ml_category:Football NOT ml_status:complete
```

> ✅ Trouve les posts football de type question ou opinion personnelle (`ml_post_type`) qui ne sont pas encore traités — pour prioriser la modération.

---

## 7. Les Wildcards (Jokers) — `*` et `?`

Les wildcards vous permettent de chercher des **mots partiels ou avec des variations**.

### L'étoile `*` — remplace zéro ou plusieurs caractères

```
ml_tags:fan*
```

> ✅ Trouve tous les tags commençant par "fan" : **fan_engagement**, **fans**, **fan_culture**... Pratique quand les tags ML varient légèrement selon les projets.

```
ml_sector_specific_tag_values:*low*
```

> ✅ Capture toutes les valeurs contenant "low" : **low fan_engagement**, **low attendance**, **low crowd**... comme dans le champ `ml_sector_specific_tag_values` de l'exemple.

### Le point d'interrogation `?` — remplace exactement un caractère

```
author_username:achetr?achetra
```

> ✅ Tolère une variation d'un caractère dans le nom d'utilisateur (`author_username`) — utile si le séparateur varie (point, tiret, underscore).

```
ml_emotional_intensity:moderately_emotion??
```

> ✅ Trouve **moderately_emotional** et ses variantes proches — utile si les valeurs du champ ne sont pas toujours uniformes.

> ⚠️ **Conseil** : Évitez de commencer un wildcard par `*` (ex: `*engagement`), cela ralentit la recherche.

---

## 8. Recherche dans un champ précis

Si vous connaissez le champ dans lequel chercher, vous pouvez **cibler votre recherche**.

```
author_username:achetr.achetra
```

> ✅ Retourne uniquement les publications de cet auteur précis (champ `author_username`).

```
projects.name:"Perception Foot CAN CDM"
```

> ✅ Filtre toutes les publications rattachées à ce projet spécifique (champ `projects[id].name`).

```
ml_place_mentioned:"Prince Moulay Abdellah Stadium" AND ml_sector_specific_tag_values.stadium_attendance:"empty stands"
```

> ✅ Croise le lieu mentionné (`ml_place_mentioned`) et la valeur d'analyse ML de remplissage du stade (`ml_sector_specific_tag_values`) pour un ciblage très précis.

```
qualification.status:QUALIFIED AND qualification.country:Morocco
```

> ✅ Trouve tous les posts qualifiés manuellement au Maroc (champs dans `projects[id].qualification`).

---

## 9. Tableau récapitulatif

| Ce que je veux faire | Syntaxe à utiliser | Exemple |
|---|---|---|
| Chercher plusieurs mots (l'un ou l'autre) | mots séparés par un espace | `boycott stade` |
| Chercher une phrase exacte | `"..."` | `"empty stands"` |
| Les deux mots obligatoires | `AND` | `boycott AND Maroc` |
| L'un ou l'autre | `OR` | `platform:tiktok OR platform:instagram` |
| Exclure un mot | `NOT` | `ml_sector:Sports NOT ml_category:Football` |
| Grouper des conditions | `( )` | `(ml_tags:stadium OR ml_tags:attendance) AND ml_place_mentioned:"Morocco"` |
| Mot partiel / plusieurs variantes | `*` | `ml_tags:fan*` |
| Un caractère inconnu | `?` | `ml_emotional_intensity:moderately_emotion??` |
| Chercher dans un champ spécifique | `champ:valeur` | `author_username:achetr.achetra` |

---

## 10. Exemples concrets du quotidien

**Trouver tous les posts TikTok sur le boycott des stades au Maroc :**
```
platform:tiktok AND ml_tags:boycott AND ml_place_mentioned:Morocco
```

**Surveiller les posts à forte charge émotionnelle sur le football national :**
```
ml_category:Football AND (ml_dominant_emotion:anger OR ml_dominant_emotion:frustration) AND ml_emotional_intensity:highly_emotional
```

**Identifier les posts avec peu d'engagement liés à la CAN ou à la CDM :**
```
projects.name:"Perception Foot CAN CDM" AND ml_engagement_level:discussion_without_engagement
```

**Retrouver tous les posts qualifiés par l'équipe sur le projet foot, hors sentiment positif :**
```
qualification.status:QUALIFIED AND projects.name:"Perception Foot CAN CDM" NOT ml_sentiment:positive
```

**Détecter les publications mentionnant des tribunes vides ou une faible affluence :**
```
(ml_sector_specific_tag_values.stadium_attendance:"empty stands" OR ml_tags:attendance) AND ml_sector_specific_tag_values.fan_engagement:low
```

**Trouver les posts de type opinion ou question sur TikTok en arabe :**
```
(ml_post_type:question OR ml_post_type:personal_opinion) AND platform:tiktok AND language:ara
```

---

## 💡 Bonnes pratiques

- **Commencez simple** : un ou deux mots suffisent souvent.
- **Utilisez les guillemets** dès que vous cherchez une expression précise.
- **Combinez AND et NOT** pour affiner et éliminer le bruit.
- **Les opérateurs** (`AND`, `OR`, `NOT`) doivent être en **MAJUSCULES**.
- **Testez par étapes** : ajoutez des critères progressivement pour voir comment les résultats évoluent.

---

*Guide rédigé pour les utilisateurs business — aucune connaissance technique requise.*
