import React from 'react';
import styled from 'styled-components';

interface MorphCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StyledCard = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }

  .morph-inner {
    background-color: #1a1a1a;
    border-radius: 18px;
    transition: all 0.2s ease;
    width: 100%;
    height: 100%;
  }

  &:hover .morph-inner {
    transform: scale(0.98);
    border-radius: 20px;
  }
`;

const MorphCard: React.FC<MorphCardProps> = ({ children, onClick, className }) => (
  <StyledCard onClick={onClick} className={className}>
    <div className="morph-inner">
      {children}
    </div>
  </StyledCard>
);

export default MorphCard;
