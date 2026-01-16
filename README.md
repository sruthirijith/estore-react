# eStore React Application

This is a React conversion of the eStore e-commerce HTML/CSS/JS application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Copy Assets

You need to copy the assets folder from the original project to the React public folder:

```bash
# On Windows (PowerShell)
Copy-Item -Path "estore-react\assets" -Destination "public\assets" -Recurse

# On macOS/Linux
cp -r estore-react/assets public/assets
```

### 3. Copy Additional CSS Files to src

Copy the CSS files to src/assets/css:

```bash
# On Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "src\assets\css"
Copy-Item -Path "estore-react\assets\css\*" -Destination "src\assets\css" -Recurse

# On macOS/Linux
mkdir -p src/assets/css
cp -r estore-react/assets/css/* src/assets/css/
```

### 4. Configure API URL

Update the API base URL in `src/config.js` if needed:

```javascript
export const BASE_URL = "http://localhost:8000/api";
```

### 5. Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
estore-react/
├── public/
│   ├── assets/          # Images, fonts, etc. (copy from estore-react)
│   └── index.html
├── src/
│   ├── assets/
│   │   └── css/        # CSS files (copy from estore-react)
│   ├── components/     # React components
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── context/        # React Context providers
│   │   └── AuthContext.js
│   ├── pages/          # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ProductDetails.js
│   │   └── Profile.js
│   ├── utils/          # Utility functions
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── config.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Features

- ✅ React Router for navigation
- ✅ Authentication context and protected routes
- ✅ API integration for login, register, categories
- ✅ Responsive design (original Bootstrap CSS)
- ✅ Dynamic category loading
- ✅ Product listing and details pages

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Notes

- Make sure your backend API is running on the configured BASE_URL
- The app uses localStorage for token management
- All original CSS and styling has been preserved
- Some third-party JS libraries (like tiny-slider) may need to be loaded via CDN or installed as npm packages if not working