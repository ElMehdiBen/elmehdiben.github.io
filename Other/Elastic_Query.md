# 🔍 Guide de Recherche Elasticsearch
### Pour les utilisateurs business — sans jargon technique

---

## Introduction

La **barre de recherche Elasticsearch** vous permet de trouver exactement ce que vous cherchez en utilisant des mots-clés simples ou des combinaisons plus précises.

Ce guide vous montre comment formuler vos recherches pour obtenir les meilleurs résultats.

---

## 1. Recherche simple

La façon la plus basique : tapez simplement un ou plusieurs mots.

```
facture client
```

> 🔎 Retourne tous les documents qui contiennent **"facture"** ou **"client"** (ou les deux).

---

## 2. Correspondance exacte — Les guillemets `" "`

Pour chercher une **expression exacte**, entourez-la de guillemets.

```
"facture impayée"
```

> ✅ Retourne uniquement les documents contenant exactement la phrase **"facture impayée"** dans cet ordre.

```
"contrat de service 2024"
```

> ✅ Très utile pour retrouver un titre de document, un nom de projet ou une référence précise.

---

## 3. ET — L'opérateur `AND`

Pour que **tous les mots** soient présents dans le résultat.

```
facture AND Paris
```

> ✅ Retourne les documents qui contiennent **"facture"** ET **"Paris"**.

```
contrat AND "Jean Dupont" AND 2024
```

> ✅ Idéal pour croiser plusieurs critères et affiner votre recherche.

---

## 4. OU — L'opérateur `OR`

Pour obtenir des résultats qui contiennent **l'un ou l'autre** des termes.

```
facture OR devis
```

> ✅ Retourne les documents qui contiennent **"facture"** ou **"devis"** (ou les deux).

```
Lyon OR Marseille OR Bordeaux
```

> ✅ Pratique pour rechercher sur plusieurs villes, catégories ou variantes d'un même concept.

---

## 5. SAUF / PAS — L'opérateur `NOT`

Pour **exclure** un terme de vos résultats.

```
facture NOT annulée
```

> ✅ Retourne les documents contenant **"facture"** mais **pas** ceux avec le mot **"annulée"**.

```
contrat NOT brouillon NOT archivé
```

> ✅ Très utile pour filtrer les documents de travail et ne voir que les finaux.

---

## 6. Combinaisons — Utiliser les parenthèses `( )`

Les parenthèses permettent de **grouper** des conditions, comme en mathématiques.

```
(facture OR devis) AND Paris
```

> ✅ Retourne les documents qui contiennent **("facture" ou "devis")** ET **"Paris"**.

```
(contrat OR accord) AND "Jean Dupont" NOT archivé
```

> ✅ Trouve les contrats ou accords de Jean Dupont, en excluant les archives.

---

## 7. Les Wildcards (Jokers) — `*` et `?`

Les wildcards vous permettent de chercher des **mots partiels ou avec des variations**.

### L'étoile `*` — remplace zéro ou plusieurs caractères

```
factur*
```

> ✅ Trouve : **facture**, **factures**, **facturation**, **facturier**...

```
rapport*2024
```

> ✅ Trouve : **rapport_annuel_2024**, **rapport-Q1-2024**, **rapportFinal2024**...

### Le point d'interrogation `?` — remplace exactement un caractère

```
anal?se
```

> ✅ Trouve : **analyse**, **analyser** *(un seul caractère manquant)*

```
200?
```

> ✅ Trouve : **2001**, **2002**, **2003**... jusqu'à **2009**

> ⚠️ **Conseil** : Évitez de commencer un wildcard par `*` (ex: `*ture`), cela ralentit la recherche.

---

## 8. Recherche dans un champ précis

Si vous connaissez le champ dans lequel chercher, vous pouvez **cibler votre recherche**.

```
titre:"rapport annuel"
```

> ✅ Cherche la phrase exacte **"rapport annuel"** uniquement dans le champ **titre**.

```
auteur:Dupont AND statut:validé
```

> ✅ Trouve les documents créés par **Dupont** avec le statut **validé**.

---

## 9. Tableau récapitulatif

| Ce que je veux faire | Syntaxe à utiliser | Exemple |
|---|---|---|
| Chercher plusieurs mots (l'un ou l'autre) | mots séparés par un espace | `facture client` |
| Chercher une phrase exacte | `"..."` | `"bon de commande"` |
| Les deux mots obligatoires | `AND` | `facture AND Paris` |
| L'un ou l'autre | `OR` | `facture OR devis` |
| Exclure un mot | `NOT` | `facture NOT annulée` |
| Grouper des conditions | `( )` | `(facture OR devis) AND Paris` |
| Mot partiel / plusieurs variantes | `*` | `factur*` |
| Un caractère inconnu | `?` | `anal?se` |
| Chercher dans un champ spécifique | `champ:valeur` | `auteur:Dupont` |

---

## 10. Exemples concrets du quotidien

**Trouver toutes les factures impayées de 2024 à Paris :**
```
"facture impayée" AND Paris AND 2024
```

**Trouver les contrats ou accords de Marie Martin, hors brouillons :**
```
(contrat OR accord) AND "Marie Martin" NOT brouillon
```

**Trouver tous les rapports trimestriels (Q1, Q2, Q3, Q4) :**
```
"rapport Q?" OR rapport*trimestriel
```

**Trouver les documents liés aux clients de Lyon ou Bordeaux, validés :**
```
(Lyon OR Bordeaux) AND statut:validé
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
