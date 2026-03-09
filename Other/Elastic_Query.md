# 🔍 Guide de Recherche Elasticsearch
### Pour les utilisateurs business — sans jargon technique

---

## Introduction

La **barre de recherche Elasticsearch** vous permet de trouver exactement ce que vous cherchez parmi des milliers de posts, commentaires et publications de réseaux sociaux, en utilisant des mots-clés simples ou des combinaisons plus précises.

Ce guide vous montre comment formuler vos recherches pour surveiller votre marque, analyser des tendances ou modérer du contenu.

---

## 1. Recherche simple

La façon la plus basique : tapez simplement un ou plusieurs mots.

```
nouveau produit
```

> 🔎 Retourne tous les posts qui contiennent **"nouveau"** ou **"produit"** (ou les deux).

---

## 2. Correspondance exacte — Les guillemets `" "`

Pour chercher une **expression exacte**, entourez-la de guillemets.

```
"service client déplorable"
```

> ✅ Retourne uniquement les publications contenant exactement la phrase **"service client déplorable"** dans cet ordre.

```
"lancement produit 2024"
```

> ✅ Très utile pour retrouver un hashtag, un slogan de campagne ou une expression précise utilisée par les internautes.

---

## 3. ET — L'opérateur `AND`

Pour que **tous les mots** soient présents dans le résultat.

```
livraison AND retard
```

> ✅ Retourne les posts qui mentionnent **"livraison"** ET **"retard"**.

```
"@MaMarque" AND arnaque AND 2024
```

> ✅ Idéal pour détecter les signaux négatifs liés à votre marque sur une période donnée.

---

## 4. OU — L'opérateur `OR`

Pour obtenir des résultats qui contiennent **l'un ou l'autre** des termes.

```
Instagram OR TikTok
```

> ✅ Retourne les publications qui mentionnent **"Instagram"** ou **"TikTok"** (ou les deux).

```
excellent OR génial OR "top qualité"
```

> ✅ Pratique pour regrouper tous les avis positifs exprimés de différentes façons.

---

## 5. SAUF / PAS — L'opérateur `NOT`

Pour **exclure** un terme de vos résultats.

```
concours NOT spam
```

> ✅ Retourne les posts mentionnant **"concours"** mais **pas** ceux identifiés comme **"spam"**.

```
avis NOT positif NOT satisfait
```

> ✅ Très utile pour isoler les retours négatifs et les signalements critiques.

---

## 6. Combinaisons — Utiliser les parenthèses `( )`

Les parenthèses permettent de **grouper** des conditions, comme en mathématiques.

```
(problème OR bug OR panne) AND application
```

> ✅ Retourne les posts qui parlent de **("problème" ou "bug" ou "panne")** ET de **"application"**.

```
(influenceur OR créateur) AND "MaMarque" NOT publicité
```

> ✅ Trouve les mentions organiques de votre marque par des influenceurs, en excluant les posts sponsorisés.

---

## 7. Les Wildcards (Jokers) — `*` et `?`

Les wildcards vous permettent de chercher des **mots partiels ou avec des variations**.

### L'étoile `*` — remplace zéro ou plusieurs caractères

```
promo*
```

> ✅ Trouve : **promo**, **promotion**, **promotionnel**, **promos**...

```
insatisf*
```

> ✅ Trouve : **insatisfait**, **insatisfaite**, **insatisfaction**... Utile pour capturer toutes les variantes d'un sentiment.

### Le point d'interrogation `?` — remplace exactement un caractère

```
livrais?n
```

> ✅ Trouve : **livraison**, **livraisOn** *(tolérance sur une faute de frappe)*

```
Covid-1?
```

> ✅ Trouve : **Covid-19**, **Covid-10**, **Covid-18**... Pratique pour les sujets avec numérotation variable.

> ⚠️ **Conseil** : Évitez de commencer un wildcard par `*` (ex: `*tion`), cela ralentit la recherche.

---

## 8. Recherche dans un champ précis

Si vous connaissez le champ dans lequel chercher, vous pouvez **cibler votre recherche**.

```
auteur:"@jean_dupont"
```

> ✅ Cherche uniquement les publications postées par le compte **@jean_dupont**.

```
plateforme:Twitter AND contenu:"service client"
```

> ✅ Trouve les tweets mentionnant exactement **"service client"**, en filtrant sur Twitter uniquement.

---

## 9. Tableau récapitulatif

| Ce que je veux faire | Syntaxe à utiliser | Exemple |
|---|---|---|
| Chercher plusieurs mots (l'un ou l'autre) | mots séparés par un espace | `nouveau produit` |
| Chercher une phrase exacte | `"..."` | `"service client déplorable"` |
| Les deux mots obligatoires | `AND` | `livraison AND retard` |
| L'un ou l'autre | `OR` | `Instagram OR TikTok` |
| Exclure un mot | `NOT` | `concours NOT spam` |
| Grouper des conditions | `( )` | `(bug OR panne) AND application` |
| Mot partiel / plusieurs variantes | `*` | `promo*` |
| Un caractère inconnu | `?` | `livrais?n` |
| Chercher dans un champ spécifique | `champ:valeur` | `plateforme:Twitter` |

---

## 10. Exemples concrets du quotidien

**Surveiller les mentions négatives de votre marque en 2024 :**
```
"MaMarque" AND (plainte OR arnaque OR déçu OR remboursement) AND 2024
```

**Trouver tous les posts parlant de votre nouveau produit, hors posts sponsorisés :**
```
"NouveauProduit" NOT sponsorisé NOT publicité NOT partenariat
```

**Détecter les variations d'un hashtag de campagne :**
```
#campagne* OR "ma campagne ?"
```

**Trouver les avis positifs sur Instagram ou TikTok :**
```
(excellent OR génial OR "j'adore" OR incroyable) AND (plateforme:Instagram OR plateforme:TikTok)
```

**Chercher les signalements de bugs ou pannes par les utilisateurs :**
```
(bug OR panne OR "ça ne fonctionne pas" OR planté) AND application NOT résolu
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
