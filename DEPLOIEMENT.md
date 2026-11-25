# Hébergement gratuit — mode d'emploi

Le site est 100 % statique (HTML, CSS, JS, images) : **aucune base de données, aucun serveur, aucun build**. Il rentre donc dans les offres gratuites des grandes plateformes, avec HTTPS inclus.

## Comparatif des options gratuites

| Plateforme | URL gratuite | HTTPS | Domaine gtmaroc.ma | Mise à jour | Limites de l'offre gratuite |
|---|---|---|---|---|---|
| **Netlify** | `gt-maroc.netlify.app` | Oui | Oui, gratuit | Glisser-déposer ou dépôt Git | 100 Go de bande passante / mois |
| **Cloudflare Pages** | `gt-maroc.pages.dev` | Oui | Oui, gratuit | Dépôt Git (ou envoi direct) | Requêtes illimitées, 500 builds / mois |
| **GitHub Pages** | `compte.github.io/gt-maroc` | Oui | Oui, gratuit | `git push` (workflow inclus) | 1 Go de site, 100 Go / mois |
| **Vercel** | `gt-maroc.vercel.app` | Oui | Oui, gratuit | Dépôt Git ou CLI | Usage personnel / non commercial |

Pour un site d'entreprise, **Netlify** ou **Cloudflare Pages** sont les plus simples ; **GitHub Pages** est le plus confortable si le code est déjà sur GitHub.

---

## Option 1 — Netlify Drop (le plus rapide, ~2 minutes)

1. Compresser le dossier **contenu** du site (pas le dossier parent) en `.zip`.
2. Aller sur **https://app.netlify.com/drop** et se connecter (compte gratuit).
3. Glisser le `.zip` dans la zone indiquée : le site est en ligne immédiatement.
4. Renommer le site : *Site configuration → Change site name* → `gt-maroc` (donne `https://gt-maroc.netlify.app`).
5. Pour le domaine : *Domain management → Add a domain* → `gtmaroc.ma`, puis suivre les instructions DNS. Le certificat HTTPS est généré automatiquement.
6. Mise à jour : re-glisser un nouveau `.zip` sur la page *Deploys*.

Le fichier `netlify.toml` fourni active déjà les en-têtes de sécurité, le cache des images et la redirection `/index.html` → `/`.

> ⚠️ Le formulaire de contact fonctionne sans serveur : il ouvre la messagerie du visiteur avec un e-mail prérempli. Aucune fonction Netlify Forms n'est nécessaire.

---

## Option 2 — Cloudflare Pages

1. Créer un compte sur **https://dash.cloudflare.com** (gratuit).
2. *Workers & Pages → Create → Pages → Upload assets*.
3. Nommer le projet `gt-maroc`, glisser le dossier du site, cliquer sur **Deploy**.
4. URL : `https://gt-maroc.pages.dev`.
5. Domaine personnalisé : *Custom domains → Set up a domain* → `gtmaroc.ma` (si le domaine est déjà chez Cloudflare, l'opération est immédiate).

Le fichier `_headers` fourni est pris en charge nativement par Cloudflare Pages.

---

## Option 3 — GitHub Pages (workflow déjà inclus)

Le dépôt doit contenir **directement** `index.html` à sa racine (et non un sous-dossier `gt-maroc/`).

```bash
cd gt-maroc
git init
git add .
git commit -m "Site GT Maroc"
git branch -M main
git remote add origin https://github.com/<compte>/gt-maroc.git
git push -u origin main
```

Puis, sur GitHub :

1. *Settings → Pages → Build and deployment → Source* : **GitHub Actions**.
2. Le workflow `.github/workflows/pages.yml` se déclenche au prochain `push` sur `main`.
3. URL : `https://<compte>.github.io/gt-maroc/`.

Le fichier `.nojekyll` est présent (il évite que GitHub ignore certains dossiers). Pour un domaine personnalisé, suivre `CNAME.example.txt`.

> Si le site est publié dans un sous-dossier du dépôt, ouvrir `pages.yml` et remplacer `path: "."` par `path: "gt-maroc"`.

---

## Option 4 — Vercel

1. Compte gratuit sur **https://vercel.com**.
2. *Add New → Project → Deploy* sans framework, ou glisser le dossier via l'interface.
3. Le fichier `vercel.json` fourni gère les URL propres et les en-têtes.
4. URL : `https://gt-maroc.vercel.app`.

---

## Brancher le domaine gtmaroc.ma (gratuit, quel que soit l'hébergeur)

1. **Choisir un hébergeur** ci-dessus et noter l'URL fournie.
2. Chez le registraire du domaine (ou le gestionnaire DNS actuel) :
   - **Netlify** : `CNAME www → <site>.netlify.app` + enregistrement `A @ → 75.2.60.5` (ou utiliser les *Netlify DNS*).
   - **Cloudflare Pages** : `CNAME www → <projet>.pages.dev` + `A @ →` l'adresse indiquée par Cloudflare.
   - **GitHub Pages** : les 4 adresses `A` et le `CNAME www` figurent dans `CNAME.example.txt`.
3. Activer **HTTPS / Enforce HTTPS** dans le tableau de bord de l'hébergeur. Le certificat est gratuit (Let's Encrypt).
4. Mettre à jour les URL absolues du site : `canonical`, `og:url`, `og:image` dans les 5 pages, ainsi que `sitemap.xml` et `robots.txt`.
5. Rediriger l'ancien site Wix (`artdomo.wixsite.com/gt-maroc`) vers le nouveau domaine en **301**.

---

## Après la mise en ligne — checklist

- [ ] Ouvrir chaque page sur mobile et vérifier le menu, le formulaire et la carte.
- [ ] Tester le formulaire (l'e-mail prérempli arrive bien à `gtmaroc@menara.ma`).
- [ ] Déclarer le site dans **Google Search Console** et soumettre `sitemap.xml`.
- [ ] Mettre à jour la fiche **Google Business Profile** avec la nouvelle URL.
- [ ] Vérifier l'aperçu des partages (Open Graph) sur WhatsApp / LinkedIn.
- [ ] Compléter le nom de l'hébergeur dans `mentions-legales.html` (section 2).
- [ ] Remplacer les visuels de démonstration par de vraies photos de l'atelier.

## Notes techniques

- Aucune dépendance à installer : ni `npm`, ni build, ni base de données.
- Poids total du site : environ 2,3 Mo (images optimisées, JPEG progressif).
- Compatible avec les URL propres (`/produits` au lieu de `/produits.html`) sur Netlify et Vercel ; sur GitHub Pages et Cloudflare, les liens `.html` restent valables.
