# Davide Taddia's Portfolio Website

A modern, responsive portfolio website built with React and TailwindCSS, featuring a  Matrix-style animation background and comprehensive content sections.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode Support**: Built-in dark/light mode with smooth transitions
- **Matrix Animation Effect**: Custom canvas-based animation in the background
- **Interactive Components**: Card animations, modal forms, and dynamic navigation
- **Content Sections**:
  - MasteryHub: Skills and expertise showcase
  - WikiDEDIA: Knowledge base with markdown rendering
  - ServiceHub: Services offered with detailed descriptions
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Cookie Consent**: GDPR-compliant cookie consent management
- **Contact Form**: Interactive form with form validation

## 📋 Project Structure

```
portfolioweb_davidetaddia/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AnimatioHandler.js
│   │   ├── Card.js
│   │   ├── ContactForm.js
│   │   ├── CookieBanner.js
│   │   ├── DarkLightModeToggle.js
│   │   ├── EnhancedFooter.js
│   │   ├── EnhancedMatrixEffect.js
│   │   ├── Footer.js
│   │   ├── HeroSection.js
│   │   ├── Navbar.js
│   │   ├── SEO.js
│   │   └── WikiRender.js
│   ├── pages/
│   │   ├── MasteryHubPage.js
│   │   ├── ServiceHubPage.js
│   │   └── WikiDEDIAPage.js
│   ├── styles/
│   │   ├── masteryhub.css
│   │   ├── styles.css
│   │   ├── transitions.css
│   │   └── wikidedia.css
│   ├── App.js
│   ├── Router.js
│   ├── ThemeContext.js
│   └── index.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building the UI
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Routing for React applications
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon set
- [React Helmet](https://github.com/nfl/react-helmet) - Document head manager
- [Katex](https://katex.org/) - Math rendering library
- [Rehype/Remark](https://github.com/rehypejs/rehype) - Markdown processing

## 🧩 Core Components

### EnhancedMatrixEffect

A canvas-based Matrix-like animation that creates a unique background effect. The animation is optimized for performance and adapts to both dark and light themes.

### ThemeContext

Manages the dark/light mode state across the application with localStorage persistence and system preference detection.

### Router

Custom router implementation for SPA navigation without external dependencies, handling internal routing while preserving browser history.

### MasteryHub, WikiDEDIA, and ServiceHub

Three main content sections showcasing different aspects of the portfolio:
- **MasteryHub**: Skills visualization with interactive categories
- **WikiDEDIA**: Knowledge wiki with advanced markdown and code visualization
- **ServiceHub**: Service offerings with animated cards and detailed descriptions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/davidetaddia/portfolioweb.git
cd portfolioweb_davidetaddia
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `build` directory.

### Deployment

The site is configured for GitHub Pages deployment. To deploy:

```bash
npm run deploy
# or
yarn deploy
```

## 🎨 Customization

### Styling

The project uses TailwindCSS with custom configuration in `tailwind.config.js`. The main color schemes are defined there:

```js
// Dark mode palette
'dark': {
  'highlight': '#00FF7F',
  'action': '#6DE6B6',
  'accent': '#02B55E',
  'text': '#FFFFFF',
  'bg': '#080C13',
  // ... more colors
},
// Light mode palette
'light': {
  'highlight': '#008F4F',
  'action': '#007D5B',
  'accent': '#A1E8D9',
  'text': '#222222',
  'bg': '#F8F8F8',
  // ... more colors
}
```

### Content

To update the content:
- For skills/expertise: Edit the `slides` array in `MasteryHubPage.js`
- For services: Edit the `services` array in `ServiceHubPage.js`
- For wiki pages: Edit the `chapters` array in `WikiDEDIAPage.js`

## 📄 License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## 👤 Author

**Davide Taddia**
- Email: davide.taddia2@studio.unibo.it
- GitHub: [@davidetaddia](https://github.com/idediadev)

## 🙏 Acknowledgments

- Design inspiration from various modern portfolio websites
- Matrix animation inspired by the movie "The Matrix"
- Special thanks to the creators of TailwindCSS and React for making such awesome tools
