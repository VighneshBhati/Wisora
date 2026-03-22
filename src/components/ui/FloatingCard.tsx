import React from 'react';
import styled from 'styled-components';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className, onClick }) => {
  return (
    <StyledWrapper className={className} onClick={onClick}>
      <div className="one-div">
        {children}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .one-div {
    position: relative;
    height: 250px;
    width: 100%;
    background-color: rgb(15, 15, 15);
    transform-style: preserve-3d;
    animation: rot 2s infinite ease;
    border-radius: 20px;
    box-shadow: 0 0 50px 0px, inset 0 0 90px 0px;
    color: white;
    transition: 1.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
  }

  .one-div:hover {
    box-shadow: 0 0 30px 1000px black, inset 5px 5px 5px 0px rgb(31, 31, 31);
  }

  @keyframes rot {
    0%   { transform: rotateX(-15deg) translateY(0px); }
    50%  { transform: rotateX(-15deg) translateY(-10px); }
    100% { transform: rotateX(-15deg) translateY(0px); }
  }
`;

export default FloatingCard;
