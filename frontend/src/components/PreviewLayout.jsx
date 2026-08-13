import React from 'react';

const PreviewLayout = ({ children }) => {
  return (
    <div className="preview-layout">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">CSS Template Forge</div>
          <ul className="nav-menu">
            <li><a href="#" className="nav-link">Home</a></li>
            <li><a href="#" className="nav-link">Templates</a></li>
            <li><a href="#" className="nav-link">Features</a></li>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Header Section */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Beautiful CSS Templates</h1>
          <p className="header-subtitle">Professional, modern designs for your next project</p>
          <p className="header-description">
            Choose from our collection of carefully crafted CSS templates that include 
            complete styling for navigation, headers, cards, buttons, and more.
          </p>
          <div className="header-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">View Templates</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Features Section */}
          <section className="features-section">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Responsive Design</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    All our templates are fully responsive and work perfectly on all devices 
                    and screen sizes.
                  </p>
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Modern Styling</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Clean, modern designs with smooth animations and professional color schemes 
                    that impress your visitors.
                  </p>
                  <button className="btn btn-secondary">View Examples</button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Easy Integration</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Simple to integrate into any project with well-organized CSS and semantic 
                    class names.
                  </p>
                  <button className="btn btn-success">Get Started</button>
                </div>
              </div>
            </div>
          </section>

          {/* Button Showcase */}
          <section className="button-showcase">
            <h2 className="section-title">Button Variants</h2>
            <div className="button-grid">
              <div className="button-group">
                <h3>Primary Buttons</h3>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-primary btn-lg">Large Primary</button>
                <button className="btn btn-primary btn-sm">Small Primary</button>
              </div>

              <div className="button-group">
                <h3>Secondary Buttons</h3>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-ghost">Ghost</button>
              </div>

              <div className="button-group">
                <h3>Status Buttons</h3>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
              </div>
            </div>
          </section>

          {/* Card Showcase */}
          <section className="card-showcase">
            <h2 className="section-title">Card Layouts</h2>
            <div className="card-grid">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Standard Card</h3>
                  <p className="card-subtitle">Basic card layout</p>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    This is a standard card with header, body, and footer sections. 
                    Perfect for displaying content in an organized manner.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm">Action</button>
                    <button className="btn btn-outline btn-sm">Cancel</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Feature Card</h3>
                  <p className="card-subtitle">Highlight important features</p>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Use feature cards to highlight key benefits and features of your 
                    product or service with engaging visuals.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-secondary btn-sm">Learn More</button>
                </div>
              </div>

              <div className="card card-horizontal">
                <div className="card-img" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}></div>
                <div className="card-content">
                  <div className="card-body">
                    <h3 className="card-title">Horizontal Card</h3>
                    <p className="card-text">
                      Cards can also be displayed horizontally with images on the side 
                      and content flowing next to them.
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Custom Content */}
          {children && (
            <section className="custom-content">
              <h2 className="section-title">Custom Content</h2>
              <div className="custom-content-wrapper">
                {children}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About CSS Template Forge</h3>
              <p>
                We provide high-quality, professional CSS templates that help developers 
                and designers create beautiful websites quickly and efficiently.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Browse Templates</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Getting Started</a></li>
                <li><a href="#">CSS Guidelines</a></li>
                <li><a href="#">Best Practices</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Connect With Us</h3>
              <p>Stay updated with our latest templates and features</p>
              <div className="footer-social">
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 CSS Template Forge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewLayout;
