import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import { PLATFORM_NAME } from '@/data/constants';
import styled from 'styled-components';

interface WalletCardProps {
  wallet: string | number;
}

const StyledWrapper = styled.div`
  width: 100%;

  .card {
    width: 100%;
    min-height: 200px;
    background: linear-gradient(45deg, #000000, #0a0a2e);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.1);
    padding: 18px;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(100, 149, 237, 0.3);
  }

  .moon {
    height: 60px;
    width: 60px;
    background: linear-gradient(145deg, #f0f0f0, #ffffff);
    border-radius: 50%;
    position: absolute;
    right: 18px;
    top: 14px;
    box-shadow:
      0 0 40px rgba(235, 235, 235, 0.5),
      inset -5px -5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .crater {
    position: absolute;
    background: rgba(200, 200, 200, 0.3);
    border-radius: 50%;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .cr1 { width: 11px; height: 11px; top: 14px; left: 10px; }
  .cr2 { width: 14px; height: 14px; top: 32px; left: 28px; }
  .cr3 { width: 9px;  height: 9px;  top: 40px; left: 14px; }

  .blub {
    height: calc(3px * var(--j));
    width: calc(1px * var(--j));
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(173, 216, 230, 1) 100%
    );
    box-shadow:
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(173, 216, 230, 0.6);
    animation: animated linear infinite reverse;
    animation-duration: calc(40s / var(--i));
    rotate: 25deg;
    opacity: 0.8;
    filter: blur(calc(0.5px * var(--j)));
    position: absolute;
  }

  @keyframes animated {
    0%   { transform: translateY(220px) scale(0.3) rotate(25deg); }
    100% { transform: translateY(-40px) scale(1.2) rotate(25deg); }
  }

  .card:hover .moon {
    box-shadow:
      0 0 60px rgba(173, 216, 230, 0.7),
      inset -8px -8px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(145deg, #e0ffff, #ffffff);
  }

  .card:hover .blub {
    animation-duration: calc(30s / var(--i));
    opacity: 1;
  }

  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  .store-link {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    padding: 7px 10px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    margin-top: 12px;
    justify-content: center;
  }

  .store-link:hover {
    background: rgba(255,255,255,0.12);
    color: #fff;
  }
`;

const blubs = [
  { i: 10, j: 2 },
  { i: 12, j: 1.8 },
  { i: 16, j: 2.2 },
  { i: 9,  j: 1.5 },
  { i: 7,  j: 1.7 },
  { i: 18, j: 2.5 },
  { i: 20, j: 2 },
  { i: 16, j: 1.9 },
  { i: 21, j: 2.1 },
  { i: 5,  j: 1.6 },
];

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {/* Falling stars */}
        {blubs.map((b, idx) => (
          <div
            key={idx}
            className="blub"
            style={{ '--i': b.i, '--j': b.j } as React.CSSProperties}
          />
        ))}

        {/* Moon */}
        <div className="moon">
          <div className="crater cr1" />
          <div className="crater cr2" />
          <div className="crater cr3" />
        </div>

        {/* Content */}
        <div className="content">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', fontWeight: 600 }}>
            Wallet Balance
          </span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
            {wallet}
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            {PLATFORM_NAME} Credits
          </span>
        </div>

        {/* Store link */}
        <Link to="/student/store" className="store-link">
          <Store style={{ width: 14, height: 14, opacity: 0.8 }} />
          Go to Store
        </Link>
      </div>
    </StyledWrapper>
  );
};

export default WalletCard;
