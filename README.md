
# TerraScan by Tushar

A real-time mining site locator powered by AI technology. TerraScan helps users discover potential mining opportunities and geological features around the world through an interactive map interface.

## 🚀 Features

- **Interactive Global Map**: Explore mining sites and geological features worldwide
- **City-Based Search**: Search for mining opportunities near any city
- **AI-Powered Recommendations**: Get intelligent suggestions for potential mining sites
- **Real-Time Data**: Access live geological and mining data
- **Multiple Data Layers**: Toggle between mining sites, geological features, seismic activity, and weather data
- **Detailed Site Information**: View comprehensive details about each mining location
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Maps**: Leaflet with OpenStreetMap
- **State Management**: TanStack React Query
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd terrascan
```

### 2. Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The application will start on `http://localhost:5173` by default.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌍 Usage

1. **Explore the Map**: Use the interactive map to view mining sites and geological features
2. **Search by City**: Enter a city name in the search box to find nearby mining opportunities
3. **Filter Data**: Use the data layer toggles to show/hide different types of information
4. **View Details**: Click on any site marker to see detailed information
5. **AI Recommendations**: Get intelligent suggestions for potential mining locations

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── InteractiveMap.tsx
│   ├── CitySearch.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## 🔐 Environment Variables

Currently, the project uses free APIs that don't require authentication. If you want to use premium features in the future:

1. Create a `.env` file in the root directory
2. Add your API keys:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   VITE_GEOLOGICAL_API_KEY=your_api_key_here
   ```

## 🚀 Deployment

This project can be deployed to various platforms:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Tushar** - Creator and Lead Developer

## 🙏 Acknowledgments

- OpenStreetMap for providing free map data
- Leaflet for the excellent mapping library
- The React and Vite communities for amazing tools
- shadcn/ui for beautiful, accessible components

## 📧 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

⭐ If you found this project helpful, please give it a star!
