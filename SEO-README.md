## Implementazione SEO per il Portfolio di Davide Taddia

Ecco una guida passo-passo per implementare la SEO sul tuo portfolio React:

### 1. Installare React Helmet

React Helmet è una libreria che permette di gestire facilmente i meta tag in un'applicazione React. Installa questa libreria con npm o yarn:

```bash
# Usando npm
npm install react-helmet

# Usando yarn
yarn add react-helmet
```

### 2. Creare il componente SEO

Crea un nuovo file chiamato `SEO.js` nella cartella `components` e copia il codice fornito. Questo componente include:

- Meta tag essenziali (titolo, descrizione, parole chiave)
- Meta tag Open Graph per la condivisione sui social media
- Meta tag Twitter Cards
- Dati strutturati Schema.org per Google
- Altre ottimizzazioni SEO

### 3. Aggiornare App.js

Aggiorna il tuo file App.js importando e utilizzando il componente SEO come mostrato nel codice fornito.

### 4. Creare un'immagine OG

Crea un'immagine rappresentativa per la condivisione sui social media (Open Graph image):

1. Dimensioni consigliate: 1200 x 630 pixel
2. Includi il tuo nome e una breve descrizione professionale
3. Usa colori che richiamano il tema del tuo portfolio
4. Salva l'immagine come `og-image.jpg` nella cartella `public` del tuo progetto React

### 5. Configurare il file robots.txt

Crea un file `robots.txt` nella cartella `public` con il seguente contenuto:

```
User-agent: *
Allow: /
Sitemap: https://davidetaddia.dev/sitemap.xml
```

### 6. Creare un sitemap.xml

Crea un file `sitemap.xml` nella cartella `public` con il seguente contenuto:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://davidetaddia.dev/</loc>
    <lastmod>2025-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 7. Configurare il file manifest.json

Assicurati che il file `manifest.json` nella cartella `public` sia configurato correttamente:

```json
{
  "short_name": "Davide Taddia",
  "name": "Davide Taddia | Computer Science Student & Developer",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#00ff7f",
  "background_color": "#000000"
}
```

### 8. Verifica SEO

Dopo aver implementato queste modifiche, verifica la tua SEO con questi strumenti:

1. [Google Search Console](https://search.google.com/search-console) - Per monitorare la presenza del tuo sito su Google
2. [Google Rich Results Test](https://search.google.com/test/rich-results) - Per testare i dati strutturati
3. [Meta Tags Validator](https://metatags.io/) - Per verificare come appare il tuo sito sui social media
4. [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Per un'analisi completa di SEO e performance (disponibile anche nelle developer tools di Chrome)

### 9. Registrazione su Google Search Console

1. Vai su [Google Search Console](https://search.google.com/search-console)
2. Aggiungi la tua proprietà (https://davidetaddia.dev)
3. Verifica la proprietà (tramite DNS, file HTML, o Google Analytics)
4. Invia il tuo sitemap.xml

### 10. Altre ottimizzazioni SEO

- Assicurati che i testi siano semanticamente corretti (usa i tag h1, h2, h3, etc. in modo appropriato)
- Ottimizza le immagini per il web (dimensioni e peso)
- Aggiungi attributi alt alle immagini
- Crea contenuti originali e di qualità che includono naturalmente le parole chiave
- Assicurati che il sito sia veloce e mobile-friendly

Seguendo questi passaggi, il tuo portfolio avrà una solida base SEO che aiuterà i motori di ricerca a indicizzarlo correttamente e migliorerà la tua visibilità online.