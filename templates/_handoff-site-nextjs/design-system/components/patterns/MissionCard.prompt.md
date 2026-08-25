Signature "Nos missions" card: image + tag + title + short description + press-article link. The whole card links out.

```jsx
<MissionCard
  image="assets/article1.avif"
  tag="Éducation"
  tagTone="green"
  title="Scolariser les enfants"
  description="Fournitures, uniformes et parrainage pour permettre à chaque enfant d'aller à l'école."
  articleSource="Ouest-France"
  href="https://..."
  accent="var(--benin-green)"
/>
```

Give each mission its own `accent` + `tagTone` (green / yellow / red) to echo the flag across a row of three.
