// Website CSS Templates
// Complete CSS themes for different website types

export const templates = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'A professional, clean design perfect for corporate websites, portfolios, and business services',
    css: `/* Modern Business Theme */
:root {
  --primary-color: #2563eb;
  --primary-dark: #1e40af;
  --primary-light: #3b82f6;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  --white: #ffffff;
  --black: #000000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--gray-800);
  background-color: var(--gray-50);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.header p {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Navigation */
.nav {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary-color);
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--secondary-color);
  color: white;
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

/* Cards */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid var(--gray-200);
}

.card-body {
  padding: 24px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.card-text {
  color: var(--gray-600);
  line-height: 1.7;
}

/* Footer */
.footer {
  background: var(--gray-900);
  color: var(--gray-300);
  padding: 60px 0 30px;
  margin-top: 80px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section a {
  color: var(--gray-400);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: var(--primary-light);
}

.footer-bottom {
  border-top: 1px solid var(--gray-800);
  padding-top: 30px;
  text-align: center;
  color: var(--gray-500);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
}`
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'A vibrant, artistic theme perfect for designers, artists, and creative professionals',
    css: `/* Creative Portfolio Theme */
:root {
  --primary-color: #8b5cf6;
  --primary-dark: #7c3aed;
  --primary-light: #a78bfa;
  --secondary-color: #ec4899;
  --accent-color: #fbbf24;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gray-50: #fafafa;
  --gray-100: #f4f4f5;
  --gray-200: #e4e4e7;
  --gray-300: #d4d4d8;
  --gray-400: #a1a1aa;
  --gray-500: #71717a;
  --gray-600: #52525b;
  --gray-700: #3f3f46;
  --gray-800: #27272a;
  --gray-900: #18181b;
  --white: #ffffff;
  --black: #000000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--gray-800);
  background: var(--gray-50);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  background: var(--gradient-1);
  color: white;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
  background-size: cover;
}

.hero h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.hero p {
  font-size: 1.5rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto 40px;
  position: relative;
  z-index: 1;
}

/* Creative Navigation */
.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--gray-200);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.nav-logo {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2.5rem;
}

.nav-link {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--gradient-2);
  transition: width 0.3s;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link:hover::after {
  width: 100%;
}

/* Creative Buttons */
.btn {
  display: inline-block;
  padding: 14px 28px;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--gradient-1);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
  background: var(--gradient-2);
  color: white;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 3px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

/* Creative Cards */
.card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.4s;
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gradient-2);
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.card-header {
  padding: 30px;
  background: var(--gradient-3);
  color: white;
}

.card-body {
  padding: 30px;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.card-text {
  color: var(--gray-600);
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Gallery Grid */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 60px 0;
}

.gallery-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  height: 300px;
  background: var(--gradient-2);
  transition: transform 0.4s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

/* Creative Footer */
.footer {
  background: var(--gray-900);
  color: var(--gray-300);
  padding: 80px 0 40px;
  margin-top: 100px;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gradient-1);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  margin-bottom: 50px;
}

.footer-section h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  background: var(--gradient-2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 15px;
}

.footer-section a {
  color: var(--gray-400);
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
}

.footer-section a:hover {
  color: var(--primary-light);
  transform: translateX(5px);
}

.footer-bottom {
  border-top: 1px solid var(--gray-800);
  padding-top: 40px;
  text-align: center;
  color: var(--gray-500);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .gallery {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
}`
  }
];
