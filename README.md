# Walid Larbi — Portfolio

Portfolio one-page pour Walid Larbi, Chef de Projet Data en recherche d'alternance (24 mois).

## Apercu

Site vitrine a destination des recruteurs, presentant le profil, les competences, le parcours professionnel, les projets et la formation de Walid Larbi.

**Direction artistique** : design cyberpunk / futuriste avec fond sombre bleu nuit, accents cyan neon, grille HUD, typographie geometrique et animations immersives.

## Stack technique

- **HTML5** — fichier unique `index.html`
- **Tailwind CSS v4** — via CDN (`@tailwindcss/browser@4`)
- **GSAP 3.12** + ScrollTrigger — animations d'entree et de scroll
- **Google Fonts** — Chakra Petch (display), IBM Plex Sans (body), JetBrains Mono (accents)
- **SVG inline** — icones custom sans dependance externe

## Sections

| Section | Description |
|---------|-------------|
| Hero | Titre anime (scramble effect), particules, grille HUD, CTA |
| A propos | Photo avec cadre lumineux, stats cards, texte de presentation |
| Competences | Layout featured + mini-grid avec icones SVG (Option K) |
| Parcours | Grille de cards d'experience avec icones, tags et badges |
| Formation | Cards avec graduation cap, tags de modules, numerotation |
| Centres d'interet | 4 cards avec icones cyan/violet |
| Contact | Cards email/tel/localisation, CTA avec glow |

## Structure du projet

```
walid-larbi/
  index.html              # Page principale (HTML + CSS inline)
  assets/
    js/
      script.js           # Animations GSAP, particles, interactions
    img/
      photo.png            # Photo (fond blanc)
      photo2.png           # Photo alternative
      photo3.jpg           # Photo (fond noir)
      result_0.png         # Photo (fond transparent) — utilisee
    pdf/
      cv-walid-larbi.pdf   # CV telechargereable
```

## Deploiement

Compatible **GitHub Pages** et **Netlify** — hebergement statique, aucun build necessaire.

### GitHub Pages

1. Aller dans Settings > Pages
2. Source : Deploy from a branch
3. Branch : `main` / `/ (root)`
4. Le site sera accessible a `https://<username>.github.io/walid-larbi/`

### Netlify

1. Glisser-deposer le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Ou connecter le repo GitHub pour un deploiement automatique