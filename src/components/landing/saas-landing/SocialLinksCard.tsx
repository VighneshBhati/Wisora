import React from 'react';
import styled from 'styled-components';

const SocialLinksCard: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="brutalist-container">
        <div className="slab-bg slab-1" />
        <div className="slab-bg slab-2" />
        <div className="concrete-block">
          <div className="concrete-texture" />
          <div className="paper-texture" />
          <div className="main-content">
            <div className="title-text">LINKS</div>
            <div className="social-grid">

              {/* X / Twitter */}
              <a href="https://x.com/knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a href="https://pinterest.com/knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/company/knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://tiktok.com/@knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/@knowitall" target="_blank" rel="noopener noreferrer" className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

            </div>
          </div>
          <div className="scan-effect" />
          <div className="rivet" />
          <div className="rivet" />
          <div className="rivet" />
          <div className="rivet" />
        </div>
        <div className="type-accent">SYS//SOCIAL_LINKS</div>
        <div className="corner-bracket bracket-tl" />
        <div className="corner-bracket bracket-tr" />
        <div className="corner-bracket bracket-bl" />
        <div className="corner-bracket bracket-br" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-container {
    position: relative;
    width: 300px;
    height: 110px;
    cursor: pointer;
  }

  .concrete-block {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    border: 8px solid #000;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    overflow: hidden;
  }

  .brutalist-container:hover .concrete-block {
    transform: translate(-12px, -12px) rotate(-2deg);
    box-shadow: 12px 12px 0 #333, 24px 24px 0 #666, 36px 36px 0 #999;
  }

  .concrete-texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      repeating-linear-gradient(45deg, #000 0px, #000 2px, #111 2px, #111 4px),
      repeating-linear-gradient(-45deg, transparent 0px, transparent 8px, rgba(255,255,255,0.05) 8px, rgba(255,255,255,0.05) 10px);
    opacity: 0.3;
  }

  .main-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .title-text {
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 6px;
    text-transform: uppercase;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-shadow: 2px 2px 0 #333, 4px 4px 0 #666;
  }

  .brutalist-container:hover .title-text {
    opacity: 0;
    transform: translateY(-40px) rotateX(90deg) scale(0.3);
    filter: blur(8px);
  }

  .social-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 3px;
    padding: 10px;
    opacity: 0;
    transform: translateY(40px) rotateX(-90deg) scale(1.3);
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .brutalist-container:hover .social-grid {
    opacity: 1;
    transform: translateY(0) rotateX(0deg) scale(1);
  }

  .social-cell {
    position: relative;
    background: #fff;
    border: 3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    overflow: hidden;
    text-decoration: none;
  }

  .social-cell:nth-child(1) { transition-delay: 0.05s; }
  .social-cell:nth-child(2) { transition-delay: 0.08s; }
  .social-cell:nth-child(3) { transition-delay: 0.11s; }
  .social-cell:nth-child(4) { transition-delay: 0.14s; }
  .social-cell:nth-child(5) { transition-delay: 0.17s; }
  .social-cell:nth-child(6) { transition-delay: 0.20s; }

  .social-cell:hover {
    background: #000;
    transform: scale(1.1) rotate(5deg);
    border-color: #fff;
    z-index: 10;
    box-shadow: 8px 8px 0 rgba(0,0,0,0.3);
  }

  .social-cell:hover .social-icon {
    fill: #fff;
    transform: scale(1.2) rotate(-5deg);
  }

  .social-icon {
    width: 18px;
    height: 18px;
    fill: #000;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* Concrete slab backgrounds */
  .slab-bg {
    position: absolute;
    background: #ddd;
    border: 4px solid #000;
    z-index: -1;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .slab-1 {
    top: 18px;
    left: 18px;
    width: 264px;
    height: 74px;
  }

  .slab-2 {
    top: 36px;
    left: 36px;
    width: 228px;
    height: 38px;
  }

  .brutalist-container:hover .slab-1 { transform: translate(20px, 20px) rotate(1deg); }
  .brutalist-container:hover .slab-2 { transform: translate(-10px, 30px) rotate(-1deg); }

  /* Industrial corner brackets */
  .corner-bracket {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid #000;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .bracket-tl { top: -10px; left: -10px; border-right: none; border-bottom: none; }
  .bracket-tr { top: -10px; right: -10px; border-left: none; border-bottom: none; }
  .bracket-bl { bottom: -10px; left: -10px; border-right: none; border-top: none; }
  .bracket-br { bottom: -10px; right: -10px; border-left: none; border-top: none; }

  .brutalist-container:hover .corner-bracket {
    transform: scale(1.5);
    background: #000;
    border-color: #fff;
  }

  /* Typography accent */
  .type-accent {
    position: absolute;
    top: -30px;
    left: 0;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #fff;
    transition: all 0.4s ease;
    opacity: 0;
  }

  .brutalist-container:hover .type-accent {
    opacity: 1;
    transform: translateY(5px);
  }

  /* Industrial rivets */
  .rivet {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
    border: 2px solid #333;
    transition: all 0.3s ease;
  }

  .rivet:nth-child(1) { top: 10px; left: 10px; }
  .rivet:nth-child(2) { top: 10px; right: 10px; }
  .rivet:nth-child(3) { bottom: 10px; left: 10px; }
  .rivet:nth-child(4) { bottom: 10px; right: 10px; }

  .brutalist-container:hover .rivet {
    background: #fff;
    transform: scale(1.5);
  }

  /* Scan line effect */
  .scan-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff, transparent);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0.8;
  }

  .brutalist-container:hover .scan-effect { left: 100%; }

  /* Paper texture overlay */
  .paper-texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent),
      linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent);
    pointer-events: none;
  }
`;

export default SocialLinksCard;
