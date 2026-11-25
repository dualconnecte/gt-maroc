# Site GT Maroc — guide de mise en ligne

Site vitrine statique (HTML / CSS / JavaScript, sans dépendance ni build) pour **GT Maroc — Transmission Hydraulique et Mécanique**, Casablanca.

## 1. Contenu du dossier

```
gt-maroc/
├─ index.html               Accueil (hero, métiers, produits, savoir-faire, showreel, secteurs, CTA)
├─ entreprise.html          Histoire, chronologie, engagements, informations légales
├─ produits.html            6 familles de produits + références complémentaires
├─ services.html            Négoce, étude, fabrication, maintenance + processus
├─ contact.html             Coordonnées, formulaire de devis, plan d'accès
├─ mentions-legales.html    Éditeur, hébergement, données personnelles
├─ robots.txt
├─ sitemap.xml
├─ 404.html
├─ netlify.toml / vercel.json / _headers   Configurations d'hébergement
├─ DEPLOIEMENT.md          Guide d'hébergement gratuit (Netlify, Cloudflare, GitHub Pages)
├─ .github/workflows/pages.yml            Déploiement automatique GitHub Pages
└─ assets/
   ├─ css/style.css
   ├─ js/main.js
   └─ img/  (logo SVG + 10 photographies optimisées)
```

## 2. Voir le site

- Double-cliquez sur `index.html` (fonctionne tel quel).
- Ou, pour un rendu identique à la production :
  ```powershell
  cd gt-maroc
  python -m http.server 8080
  ```
  puis ouvrez http://localhost:8080

## 3. Mise en ligne

Le site est 100 % statique : aucun serveur applicatif n'est nécessaire. Un guide détaillé des hébergements gratuits (Netlify, Cloudflare Pages, GitHub Pages, Vercel) est fourni dans **DEPLOIEMENT.md**.

| Option | Marche à suivre |
|---|---|
| Hébergement classique (o2switch, Hostinger, etc.) | Envoyer tout le contenu du dossier `gt-maroc/` dans `public_html/` par FTP. |
| Netlify / Vercel / Cloudflare Pages | Glisser-déposer le dossier `gt-maroc` dans l'interface, ou connecter un dépôt Git. |
| GitHub Pages | Pousser le dossier dans un dépôt, activer Pages sur la branche principale. |

### À faire juste après la mise en ligne

1. **Domaine** : remplacer `https://gtmaroc.ma` par l'URL réelle dans les balises `canonical`, `og:url`, `og:image`, dans `sitemap.xml` et dans `robots.txt`.
2. **HTTPS** : activer le certificat SSL (gratuit chez la plupart des hébergeurs).
3. **Redirections** : rediriger l'ancien site Wix (`artdomo.wixsite.com/gt-maroc`) vers le nouveau domaine, en 301, pour conserver le référencement existant.
4. **Google Search Console** : valider le domaine et soumettre `sitemap.xml`.
5. **Google Business Profile** : mettre à jour la fiche établissement avec la nouvelle adresse du site (facteur de visibilité local important pour « hydraulique Casablanca »).

## 4. Points à personnaliser

| Élément | Où | Remarque |
|---|---|---|
| Destinataire du formulaire | `contact.html` (champ `mailto:`) et `assets/js/main.js` | Aujourd'hui le formulaire prépare un e-mail vers `gtmaroc@menara.ma`. Pour un envoi direct sans passer par la messagerie du visiteur, brancher un service type Formspree, Web3Forms ou un script PHP sur l'hébergement. |
| Hébergeur (mentions légales) | `mentions-legales.html`, section 2 | Deux champs `[à compléter]` à renseigner. |
| Photos | `assets/img/` | Les 10 visuels sont des images générées pour la maquette. Les remplacer par des photos réelles de l'atelier, de l'équipe et des réalisations dès que possible : c'est le premier facteur de crédibilité en B2B industriel. |
| Logo | `assets/img/logo-mark.svg` | Monogramme provisoire. Remplacer par le logo officiel (fournir un SVG ou un PNG à fond transparent). |
| Carte | `contact.html` | Fond de carte Google Maps sans clé API. Si l'hébergeur bloque les iframes, prévoir un lien simple. |
| Compteurs / statistiques | `index.html`, section hero | Vérifier les chiffres avant publication. |
| Vidéo | `index.html`, section « En images » | Emplacement prévu : on peut y intégrer une vraie vidéo (MP4 ou YouTube) à la place du diaporama. |

## 5. Contenus à valider par le client

Ces éléments proviennent d'annuaires publics et de l'ancien site Wix ; ils doivent être confirmés avant publication :

- **Année de création** : 1985 (ancien site, Kerix) / 1986 (Telecontact). Le site affiche « Depuis 1985 ».
- **Note 4,3/5 — 13 avis** : reprise de la demande initiale. À relier à la fiche Google réelle ou à retirer.
- **Marques distribuées** : liste issue de la fiche Telecontact (Rexroth, Danfoss, Atos, Hydac, Pall, Sauer, Casappa, Stauff, Olaer, Leduc, Larzep, EPE, OMT, Emmegi, Valvoil, Mintor). À actualiser selon les accords en cours.
- **Chronologie** (1985 / années 1990 / années 2000) : reconstruction éditoriale à partir des métiers actuels ; à ajuster si l'entreprise a des dates précises.
- **Secteurs** : liste indicative des industries servies ; à valider.
- **Informations légales** : SARL, capital 1 200 000 DH, RC 47271, ICE 001540544000076 (Kerix / Telecontact). À confirmer sur le registre.
- **Direction** : M. Mohamed BEN EL BARGUIA, Directeur Général (citation et signature reprises de l'ancien site). M. Nahmias Armand apparaît comme gérant sur Kerix.
- **Horaires** : ceux fournis (Lun–Jeu 8h–12h / 14h–19h, Ven 8h–12h / 15h–19h).

## 6. Choix techniques

- **Typographie** : Barlow Condensed (titres) + Inter (texte), via Google Fonts.
- **Palette** : bleu acier / graphite + ambre `#F5A623` (sécurité industrielle et énergie hydraulique).
- **Accessibilité** : lien d'évitement, contrastes vérifiés, navigation clavier, `prefers-reduced-motion`, libellés ARIA sur le menu et le diaporama.
- **Performance** : images en JPEG progressif (100–370 Ko), `loading="lazy"` hors hero, aucune bibliothèque JS externe.
- **SEO local** : données structurées `LocalBusiness` (adresse, téléphones, horaires, catalogue de services), balises Open Graph, plan de site XML.

## 7. Sources consultées

- Ancien site : https://artdomo.wixsite.com/gt-maroc
- Telecontact : https://www.telecontact.ma/annonceur/gt-maroc/1649700/casablanca.php
- Kerix : https://www.kerix.net/fr/annuaire-entreprise/gt-maroc
- Charika (immatriculation) : https://www.charika.ma/societe-gt-maroc-transmissions-hydrauliques-et-mecaniques-51354

