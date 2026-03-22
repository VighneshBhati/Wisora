import React from 'react';
import styled from 'styled-components';

interface GlowBorderCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(100, 149, 237, 0.25);
  }

  /* Starfield background */
  .star-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    border-radius: 16px;
    overflow: hidden;
  }

  .stars1, .stars2, .stars3 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
  }

  .stars1 {
    background-image:
      radial-gradient(1px 1px at 10% 15%, #fff, transparent),
      radial-gradient(1px 1px at 25% 40%, #fff, transparent),
      radial-gradient(1px 1px at 40% 10%, #fff, transparent),
      radial-gradient(1px 1px at 55% 60%, #fff, transparent),
      radial-gradient(1px 1px at 70% 25%, #fff, transparent),
      radial-gradient(1px 1px at 85% 75%, #fff, transparent),
      radial-gradient(1px 1px at 15% 80%, #fff, transparent),
      radial-gradient(1px 1px at 30% 55%, #fff, transparent),
      radial-gradient(1px 1px at 45% 90%, #fff, transparent),
      radial-gradient(1px 1px at 60% 35%, #fff, transparent),
      radial-gradient(1px 1px at 75% 50%, #fff, transparent),
      radial-gradient(1px 1px at 90% 20%, #fff, transparent),
      radial-gradient(1px 1px at 5%  70%, #fff, transparent),
      radial-gradient(1px 1px at 20% 30%, #fff, transparent),
      radial-gradient(1px 1px at 35% 65%, #fff, transparent),
      radial-gradient(1px 1px at 50% 85%, #fff, transparent),
      radial-gradient(1px 1px at 65% 45%, #fff, transparent),
      radial-gradient(1px 1px at 80% 10%, #fff, transparent),
      radial-gradient(1px 1px at 95% 55%, #fff, transparent),
      radial-gradient(1px 1px at 8%  45%, #fff, transparent),
      radial-gradient(1px 1px at 22% 92%, #fff, transparent),
      radial-gradient(1px 1px at 38% 22%, #fff, transparent),
      radial-gradient(1px 1px at 52% 72%, #fff, transparent),
      radial-gradient(1px 1px at 68% 88%, #fff, transparent),
      radial-gradient(1px 1px at 82% 38%, #fff, transparent),
      radial-gradient(1px 1px at 12% 58%, #fff, transparent),
      radial-gradient(1px 1px at 28% 18%, #fff, transparent),
      radial-gradient(1px 1px at 42% 48%, #fff, transparent),
      radial-gradient(1px 1px at 58% 8%,  #fff, transparent),
      radial-gradient(1px 1px at 72% 68%, #fff, transparent);
    animation: animStar 40s linear infinite;
  }

  .stars2 {
    background-image:
      radial-gradient(1.5px 1.5px at 18% 22%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 33% 67%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 48% 12%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 63% 82%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 78% 37%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 93% 57%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 7%  47%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 23% 77%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 38% 32%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 53% 97%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 68% 17%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 83% 62%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 13% 87%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 43% 52%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1.5px 1.5px at 73% 92%, rgba(255,255,255,0.8), transparent);
    animation: animStar 70s linear infinite;
  }

  .stars3 {
    background-image:
      radial-gradient(2px 2px at 20% 50%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 50% 20%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 80% 70%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 35% 85%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 65% 35%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 10% 65%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 90% 15%, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 55% 55%, rgba(255,255,255,0.6), transparent);
    animation: animStar 110s linear infinite;
  }

  @keyframes animStar {
    from { transform: translateY(0); }
    to   { transform: translateY(-100%); }
  }

  /* Subtle border glow */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(100,149,237,0.4), rgba(30,30,80,0.1), rgba(100,149,237,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: linear-gradient(135deg, rgba(173,216,230,0.6), rgba(100,149,237,0.3), rgba(173,216,230,0.5));
  }

  /* Content sits above stars */
  .inner {
    position: relative;
    z-index: 1;
    padding: 20px;
  }
`;

const GlowBorderCard: React.FC<GlowBorderCardProps> = ({ children, onClick, className }) => (
  <StyledWrapper className={className} onClick={onClick}>
    <div className="star-bg">
      <div className="stars1" />
      <div className="stars2" />
      <div className="stars3" />
    </div>
    <div className="inner">
      {children}
    </div>
  </StyledWrapper>
);

export default GlowBorderCard;
