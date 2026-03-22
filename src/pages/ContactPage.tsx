import React from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import styled, { keyframes } from 'styled-components';
import { Badge } from '@/components/ui/badge';

/* ── Globe Loader ── */
const spin = keyframes`
  0%   { transform: rotateZ(90deg) rotateX(0deg); }
  50%  { transform: rotateZ(90deg) rotateX(180deg); }
  100% { transform: rotateZ(90deg) rotateX(360deg); }
`;

const GlobeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  #cont {
    scale: 0.6;
    z-index: 100;
    margin: 0;
    display: grid;
    place-items: center;
    height: 100%;
    background: rgb(38, 22, 22);
    perspective: 10000px;
    transform-style: preserve-3d;
    animation: ${spin} 5s linear infinite;
  }

  .point {
    position: absolute;
    width: 81px;
    height: 81px;
    margin: -5px 0 0 -5px;
    border-radius: 15%;
    background: #5a90ff;
    box-shadow: 0 0 1px -0.3px #ffffff53;
    z-index: 100;
  }

  .base {
    scale: 0.9;
    position: absolute;
    width: 324.5px;
    height: 324.5px;
    border-radius: 100%;
    background: #60a1f514;
    box-shadow: 0 0 1px -0.3px #ffffff53;
    z-index: 0;
  }

  .continent {
    position: absolute;
    width: 132px;
    height: 132px;
    background: radial-gradient(rgba(98, 172, 98, 0.9) 54%, transparent 55%);
    border: 1px solid rgba(0, 0, 0, 0.525);
    transform-style: preserve-3d;
  }

  /* lat -60 */
  .point:nth-child(2)  { transform: rotateX(-60deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(3)  { transform: rotateX(-60deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(4)  { transform: rotateX(-60deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(5)  { transform: rotateX(-60deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(6)  { transform: rotateX(-60deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(7)  { transform: rotateX(-60deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(8)  { transform: rotateX(-60deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(9)  { transform: rotateX(-60deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(10) { transform: rotateX(-60deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(11) { transform: rotateX(-60deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(12) { transform: rotateX(-60deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(13) { transform: rotateX(-60deg) rotateY(330deg) translateZ(150px); }
  /* lat -30 */
  .point:nth-child(14) { transform: rotateX(-30deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(15) { transform: rotateX(-30deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(16) { transform: rotateX(-30deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(17) { transform: rotateX(-30deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(18) { transform: rotateX(-30deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(19) { transform: rotateX(-30deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(20) { transform: rotateX(-30deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(21) { transform: rotateX(-30deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(22) { transform: rotateX(-30deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(23) { transform: rotateX(-30deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(24) { transform: rotateX(-30deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(25) { transform: rotateX(-30deg) rotateY(330deg) translateZ(150px); }
  /* lat 0 */
  .point:nth-child(26) { transform: rotateX(0deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(27) { transform: rotateX(0deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(28) { transform: rotateX(0deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(29) { transform: rotateX(0deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(30) { transform: rotateX(0deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(31) { transform: rotateX(0deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(32) { transform: rotateX(0deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(33) { transform: rotateX(0deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(34) { transform: rotateX(0deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(35) { transform: rotateX(0deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(36) { transform: rotateX(0deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(37) { transform: rotateX(0deg) rotateY(330deg) translateZ(150px); }
  /* lat +30 */
  .point:nth-child(38) { transform: rotateX(30deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(39) { transform: rotateX(30deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(40) { transform: rotateX(30deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(41) { transform: rotateX(30deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(42) { transform: rotateX(30deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(43) { transform: rotateX(30deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(44) { transform: rotateX(30deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(45) { transform: rotateX(30deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(46) { transform: rotateX(30deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(47) { transform: rotateX(30deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(48) { transform: rotateX(30deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(49) { transform: rotateX(30deg) rotateY(330deg) translateZ(150px); }
  /* lat +60 */
  .point:nth-child(50) { transform: rotateX(60deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(51) { transform: rotateX(60deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(52) { transform: rotateX(60deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(53) { transform: rotateX(60deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(54) { transform: rotateX(60deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(55) { transform: rotateX(60deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(56) { transform: rotateX(60deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(57) { transform: rotateX(60deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(58) { transform: rotateX(60deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(59) { transform: rotateX(60deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(60) { transform: rotateX(60deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(61) { transform: rotateX(60deg) rotateY(330deg) translateZ(150px); }
  /* lat +90 */
  .point:nth-child(62) { transform: rotateX(90deg) rotateY(0deg)   translateZ(150px); }
  .point:nth-child(63) { transform: rotateX(90deg) rotateY(30deg)  translateZ(150px); }
  .point:nth-child(64) { transform: rotateX(90deg) rotateY(60deg)  translateZ(150px); }
  .point:nth-child(65) { transform: rotateX(90deg) rotateY(90deg)  translateZ(150px); }
  .point:nth-child(66) { transform: rotateX(90deg) rotateY(120deg) translateZ(150px); }
  .point:nth-child(67) { transform: rotateX(90deg) rotateY(150deg) translateZ(150px); }
  .point:nth-child(68) { transform: rotateX(90deg) rotateY(180deg) translateZ(150px); }
  .point:nth-child(69) { transform: rotateX(90deg) rotateY(210deg) translateZ(150px); }
  .point:nth-child(70) { transform: rotateX(90deg) rotateY(240deg) translateZ(150px); }
  .point:nth-child(71) { transform: rotateX(90deg) rotateY(270deg) translateZ(150px); }
  .point:nth-child(72) { transform: rotateX(90deg) rotateY(300deg) translateZ(150px); }
  .point:nth-child(73) { transform: rotateX(90deg) rotateY(330deg) translateZ(150px); }

  /* continents */
  .c1  { clip-path: polygon(20% 0%, 90% 15%, 70% 95%, 10% 70%);  transform: rotateX(10deg)  rotateY(20deg)    translateZ(157px); }
  .c2  { clip-path: polygon(15% 10%, 95% 20%, 80% 85%, 5% 70%);  transform: rotateX(12deg)  rotateY(23deg)    translateZ(157px); }
  .c3  { clip-path: polygon(30% 0%, 85% 15%, 90% 80%, 15% 95%);  transform: rotateX(8deg)   rotateY(18deg)    translateZ(157px); }
  .c4  { clip-path: polygon(25% 5%, 100% 25%, 75% 90%, 5% 70%);  transform: rotateX(14deg)  rotateY(21deg)    translateZ(157px); }
  .c5  { clip-path: polygon(10% 25%, 90% 5%, 85% 70%, 30% 95%);  transform: rotateX(9deg)   rotateY(24deg)    translateZ(157px); }
  .c6  { clip-path: polygon(20% 10%, 80% 0%, 95% 70%, 25% 95%);  transform: rotateX(11deg)  rotateY(16deg)    translateZ(157px); }
  .c7  { clip-path: polygon(15% 0%, 95% 20%, 70% 100%, 5% 80%);  transform: rotateX(7deg)   rotateY(22deg)    translateZ(157px); }
  .c8  { clip-path: polygon(25% 0%, 85% 15%, 100% 75%, 15% 95%); transform: rotateX(13deg)  rotateY(19deg)    translateZ(157px); }
  .c9  { clip-path: polygon(10% 10%, 90% 5%, 80% 85%, 20% 95%);  transform: rotateX(10deg)  rotateY(26deg)    translateZ(157px); }
  .c10 { clip-path: polygon(20% 5%, 95% 25%, 70% 95%, 10% 75%);  transform: rotateX(6deg)   rotateY(20deg)    translateZ(157px); }
  .c11 { clip-path: polygon(15% 5%, 90% 15%, 75% 95%, 5% 80%);   transform: rotateX(-20deg) rotateY(60deg)    translateZ(157px); }
  .c12 { clip-path: polygon(25% 0%, 85% 20%, 95% 75%, 10% 95%);  transform: rotateX(-22deg) rotateY(63deg)    translateZ(157px); }
  .c13 { clip-path: polygon(20% 10%, 95% 5%, 85% 80%, 15% 90%);  transform: rotateX(-18deg) rotateY(58deg)    translateZ(157px); }
  .c14 { clip-path: polygon(30% 0%, 90% 25%, 70% 95%, 5% 70%);   transform: rotateX(-21deg) rotateY(64deg)    translateZ(157px); }
  .c15 { clip-path: polygon(15% 15%, 100% 10%, 85% 85%, 20% 95%);transform: rotateX(-19deg) rotateY(56deg)    translateZ(157px); }
  .c16 { clip-path: polygon(25% 5%, 95% 20%, 75% 90%, 10% 70%);  transform: rotateX(-23deg) rotateY(61deg)    translateZ(157px); }
  .c17 { clip-path: polygon(20% 0%, 90% 10%, 100% 70%, 15% 95%); transform: rotateX(-17deg) rotateY(59deg)    translateZ(157px); }
  .c18 { clip-path: polygon(15% 5%, 85% 20%, 70% 85%, 5% 70%);   transform: rotateX(-24deg) rotateY(62deg)    translateZ(157px); }
  .c19 { clip-path: polygon(20% 0%, 90% 20%, 80% 90%, 10% 70%);  transform: rotateX(40deg)  rotateY(-30deg)   translateZ(157px); }
  .c20 { clip-path: polygon(25% 5%, 95% 20%, 70% 95%, 5% 70%);   transform: rotateX(42deg)  rotateY(-28deg)   translateZ(157px); }
  .c21 { clip-path: polygon(30% 0%, 85% 15%, 100% 75%, 15% 95%); transform: rotateX(38deg)  rotateY(-32deg)   translateZ(157px); }
  .c22 { clip-path: polygon(15% 10%, 90% 5%, 80% 85%, 20% 95%);  transform: rotateX(43deg)  rotateY(-27deg)   translateZ(157px); }
  .c23 { clip-path: polygon(20% 5%, 95% 25%, 70% 95%, 10% 75%);  transform: rotateX(39deg)  rotateY(-29deg)   translateZ(157px); }
  .c24 { clip-path: polygon(10% 20%, 90% 10%, 85% 80%, 30% 95%); transform: rotateX(41deg)  rotateY(-31deg)   translateZ(157px); }
  .c25 { clip-path: polygon(25% 0%, 100% 20%, 75% 90%, 15% 95%); transform: rotateX(44deg)  rotateY(-33deg)   translateZ(157px); }
  .c26 { clip-path: polygon(15% 15%, 85% 5%, 95% 80%, 20% 95%);  transform: rotateX(37deg)  rotateY(-34deg)   translateZ(157px); }
  .c27 { clip-path: polygon(30% 0%, 90% 15%, 80% 100%, 10% 70%); transform: rotateX(45deg)  rotateY(-29deg)   translateZ(157px); }
  .c28 { clip-path: polygon(20% 0%, 80% 10%, 95% 70%, 25% 95%);  transform: rotateX(36deg)  rotateY(-35deg)   translateZ(157px); }
  .c29 { clip-path: polygon(30% 0%, 90% 20%, 70% 90%, 10% 70%);  transform: rotateX(-10deg) rotateY(150deg)   translateZ(157px); }
  .c30 { clip-path: polygon(25% 5%, 85% 15%, 95% 75%, 15% 95%);  transform: rotateX(-12deg) rotateY(153deg)   translateZ(157px); }
  .c31 { clip-path: polygon(20% 10%, 95% 0%, 80% 85%, 20% 95%);  transform: rotateX(-14deg) rotateY(156deg)   translateZ(157px); }
  .c32 { clip-path: polygon(10% 20%, 90% 5%, 85% 70%, 30% 95%);  transform: rotateX(-16deg) rotateY(159deg)   translateZ(157px); }
  .c33 { clip-path: polygon(20% 0%, 85% 15%, 100% 75%, 15% 95%); transform: rotateX(-18deg) rotateY(162deg)   translateZ(157px); }
  .c34 { clip-path: polygon(15% 15%, 95% 5%, 90% 85%, 25% 95%);  transform: rotateX(-20deg) rotateY(165deg)   translateZ(157px); }
  .c35 { clip-path: polygon(30% 0%, 90% 20%, 70% 90%, 10% 70%);  transform: rotateX(5deg)   rotateY(-150deg)  translateZ(157px); }
  .c36 { clip-path: polygon(25% 5%, 95% 20%, 70% 95%, 5% 70%);   transform: rotateX(-45deg) rotateY(120deg)   translateZ(157px); }
  .c37 { clip-path: polygon(20% 10%, 95% 0%, 85% 85%, 15% 95%);  transform: rotateX(50deg)  rotateY(90deg)    translateZ(157px); }
  .c38 { clip-path: polygon(10% 20%, 90% 5%, 100% 80%, 30% 95%); transform: rotateX(-60deg) rotateY(200deg)   translateZ(157px); }
  .c39 { clip-path: polygon(20% 0%, 80% 10%, 90% 70%, 30% 95%);  transform: rotateX(25deg)  rotateY(-100deg)  translateZ(157px); }
  .c40 { clip-path: polygon(15% 0%, 95% 20%, 80% 85%, 10% 70%);  transform: rotateX(15deg)  rotateY(75deg)    translateZ(157px); }
  .c41 { clip-path: polygon(25% 0%, 85% 15%, 95% 75%, 15% 95%);  transform: rotateX(-30deg) rotateY(-60deg)   translateZ(157px); }
  .c42 { clip-path: polygon(10% 10%, 90% 0%, 80% 80%, 20% 95%);  transform: rotateX(35deg)  rotateY(140deg)   translateZ(157px); }
  .c43 { clip-path: polygon(30% 0%, 90% 25%, 70% 95%, 10% 75%);  transform: rotateX(60deg)  rotateY(-10deg)   translateZ(157px); }
  .c44 { clip-path: polygon(20% 5%, 95% 20%, 85% 80%, 15% 90%);  transform: rotateX(-55deg) rotateY(-130deg)  translateZ(157px); }
  .c45 { clip-path: polygon(25% 0%, 85% 20%, 70% 90%, 5% 70%);   transform: rotateX(0deg)   rotateY(30deg)    translateZ(157px); }
  .c46 { clip-path: polygon(15% 15%, 95% 5%, 90% 85%, 20% 95%);  transform: rotateX(-10deg) rotateY(-170deg)  translateZ(157px); }
  .c47 { clip-path: polygon(20% 0%, 80% 15%, 100% 70%, 15% 95%); transform: rotateX(20deg)  rotateY(200deg)   translateZ(157px); }
  .c48 { clip-path: polygon(30% 0%, 95% 20%, 75% 95%, 10% 70%);  transform: rotateX(-25deg) rotateY(15deg)    translateZ(157px); }
  .c49 { clip-path: polygon(10% 20%, 90% 0%, 85% 70%, 20% 95%);  transform: rotateX(45deg)  rotateY(-200deg)  translateZ(157px); }
  .c50 { clip-path: polygon(25% 0%, 85% 25%, 95% 75%, 15% 95%);  transform: rotateX(-35deg) rotateY(180deg)   translateZ(157px); }
`;

const GlobeScene = styled.div`
  width: 340px;
  height: 340px;
  background: rgb(38, 22, 22);
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow: 0 0 60px 10px rgba(90, 144, 255, 0.15), inset 0 0 40px rgba(0,0,0,0.6);
  border: 1px solid rgba(90, 144, 255, 0.12);
  flex-shrink: 0;
`;

/* ── Flip contact form ── */
const FlipCard = styled.div`
  perspective: 1200px;
  width: 340px;
  height: 460px;

  .form {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s ease;
  }

  input#contact_flip:checked + .form {
    transform: rotateY(-180deg);
  }

  .form_front,
  .form_back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    backface-visibility: hidden;
    padding: 40px 32px;
    border-radius: 15px;
    box-shadow:
      inset 2px 2px 10px rgba(0,0,0,1),
      inset -1px -1px 5px rgba(255,255,255,0.06);
    background: #111;
  }

  .form_back { transform: rotateY(-180deg); }

  .form_title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
  }
  .form_sub {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    text-align: center;
    margin-top: -8px;
  }

  .inp {
    width: 100%;
    min-height: 42px;
    color: #fff;
    outline: none;
    transition: 0.3s;
    padding: 0 10px;
    background: #1a1a1a;
    border-radius: 6px;
    border: 2px solid #2a2a2a;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 1px 1px 6px rgba(255,255,255,0.04);
    font-size: 13px;
  }
  .inp::placeholder { color: #555; }
  .inp:focus {
    transform: scale(1.03);
    border-color: #00ff75;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 0 0 0 2px rgba(0,255,117,0.15);
  }
  textarea.inp {
    min-height: 80px;
    padding: 8px 10px;
    resize: none;
  }

  .btn {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    background: linear-gradient(135deg, #00ff75, #3700ff);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(0,255,117,0.2);
  }
  .btn:hover { transform: scale(1.03); box-shadow: 0 6px 20px rgba(0,255,117,0.35); }

  .switch {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    text-align: center;
  }
  .tog {
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    color: #00ff75;
  }

  #contact_flip { display: none; }
`;

/* ── Social hover card ── */
const SocialCard = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  background: lightgrey;
  border-radius: 1.6em;
  overflow: hidden;
  box-shadow: rgba(100,100,111,0.2) 0 0.8em 3em 0;
  transition: all 1s ease-in-out;
  user-select: none;
  flex-shrink: 0;

  .background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 107%, #ff89cc 0%, #9cb8ec 30%, #00ffee 60%, #62c2fe 100%);
  }

  .logo {
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    transition: all 0.6s ease-in-out;
  }

  .logo-text {
    font-size: 1.4rem;
    font-weight: 900;
    color: #212121;
    letter-spacing: -1px;
  }

  .icon { display: inline-block; width: 2em; height: 2em; }
  .icon .svg {
    fill: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }

  .box {
    position: absolute;
    padding: 1em;
    text-align: right;
    background: rgba(255,255,255,0.389);
    border-top: 0.2em solid rgb(255,255,255);
    border-right: 0.1em solid white;
    border-radius: 10% 13% 42% 0% / 10% 12% 75% 0%;
    box-shadow: rgba(100,100,111,0.364) -0.8em 0.8em 3em 0;
    transform-origin: bottom left;
    transition: all 1s ease-in-out;
  }
  .box::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }
  .box:hover .svg { fill: white; }

  .box1 { width: 70%; height: 70%; bottom: -70%; left: -70%; }
  .box1::before { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #ff53d4 60%, #62c2fe 90%); }
  .box1:hover::before { opacity: 1; }
  .box1:hover .icon .svg { filter: drop-shadow(0 0 0.5em white); }

  .box2 { width: 50%; height: 50%; bottom: -50%; left: -50%; transition-delay: 0.2s; }
  .box2::before { background: radial-gradient(circle at 30% 107%, #91e9ff 0%, #00acee 90%); }
  .box2:hover::before { opacity: 1; }
  .box2:hover .icon .svg { filter: drop-shadow(0 0 0.5em white); }

  .box3 { width: 30%; height: 30%; bottom: -30%; left: -30%; transition-delay: 0.4s; }
  .box3::before { background: radial-gradient(circle at 30% 107%, #969fff 0%, #b349ff 90%); }
  .box3:hover::before { opacity: 1; }
  .box3:hover .icon .svg { filter: drop-shadow(0 0 0.5em white); }

  .box4 { width: 10%; height: 10%; bottom: -10%; left: -10%; transition-delay: 0.6s; }

  &:hover { transform: scale(1.08); }
  &:hover .box { bottom: -0.1em; left: -0.1em; }
  &:hover .logo { transform: translate(0,0); bottom: 1.5em; right: 1.5em; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const Section = styled.section<{ delay?: string }>`
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: ${p => p.delay || '0s'};
`;

const InfoCard = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  &:hover { box-shadow: 0 0 30px 1px rgba(0,255,117,0.30); }
  .inner {
    background: #1a1a1a;
    border-radius: 18px;
    padding: 24px 20px;
    transition: all 0.2s ease;
  }
  &:hover .inner { transform: scale(0.98); border-radius: 20px; }
`;

export const ContactPage = () => {
  const [sent, setSent] = React.useState(false);

  return (
    <>
      <SEOHead title="Contact | KIA — Know It All" />
      <div className="min-h-screen bg-[#090a0f] text-white">
        <Navbar extraXSpacing />

        {/* Hero */}
        <Section className="pt-32 pb-16 px-6 md:px-20 xl:px-44 text-center">
          <Badge className="mb-6 bg-purple-500/15 text-purple-400 border-purple-500/25 text-sm px-4 py-1">
            📬 Contact Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Let's talk.<br />
            <span className="bg-gradient-to-r from-[#00ff75] to-[#3700ff] bg-clip-text text-transparent">
              We actually reply.
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Whether you're a student, an institution, a potential expert, or just curious — reach out. We're a small team and we read every message.
          </p>
        </Section>

        {/* Globe Section */}
        <Section delay="0.05s" className="pb-8 flex flex-col items-center gap-6">
          <p className="text-white/30 text-sm tracking-widest uppercase">We're reaching out globally</p>
          <GlobeScene>
            <GlobeWrapper>
              <div id="cont">
                {Array.from({ length: 73 }).map((_, i) => (
                  <div key={i} className="point" />
                ))}
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={`c${i + 1}`} className={`continent c${i + 1}`} />
                ))}
              </div>
            </GlobeWrapper>
          </GlobeScene>
          <p className="text-white/20 text-xs">Connecting learners & experts across India and beyond</p>
        </Section>

        {/* Main content: form + social */}
        <Section delay="0.1s" className="px-6 md:px-20 xl:px-44 pb-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">

            {/* Flip form */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-white/40 text-sm mb-2">Send a message or request a partnership</p>
              <FlipCard>
                <input type="checkbox" id="contact_flip" />
                <div className="form">
                  <div className="form_front">
                    <div className="form_title">Say Hello 👋</div>
                    <div className="form_sub">vighnesh@kia.in</div>
                    <input className="inp" placeholder="Your name" type="text" />
                    <input className="inp" placeholder="Your email" type="email" />
                    <textarea className="inp" placeholder="Your message..." />
                    <button className="btn" onClick={() => setSent(true)}>
                      {sent ? 'Message Sent ✓' : 'Send Message'}
                    </button>
                    <span className="switch">
                      Institution? <label className="tog" htmlFor="contact_flip">Request a demo →</label>
                    </span>
                  </div>
                  <div className="form_back">
                    <div className="form_title">Partner with KIA</div>
                    <div className="form_sub">For colleges & enterprises</div>
                    <input className="inp" placeholder="Organisation name" type="text" />
                    <input className="inp" placeholder="Your name" type="text" />
                    <input className="inp" placeholder="Work email" type="email" />
                    <input className="inp" placeholder="No. of students / employees" type="text" />
                    <button className="btn">Request Demo</button>
                    <span className="switch">
                      Just a message? <label className="tog" htmlFor="contact_flip">← Go back</label>
                    </span>
                  </div>
                </div>
              </FlipCard>
            </div>

            {/* Right column: social card + info cards */}
            <div className="flex flex-col gap-8 items-center lg:items-start">
              <div>
                <p className="text-white/40 text-sm mb-4 text-center lg:text-left">Find me on social</p>
                <SocialCard>
                  <div className="background" />
                  <div className="logo">
                    <span className="logo-text">KIA</span>
                  </div>
                  {/* Instagram */}
                  <div className="box box1">
                    <span className="icon">
                      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg">
                        <path d="M9.998 3C6.139 3 3 6.142 3 10.002v10c0 3.86 3.142 7 7.002 7h10c3.86 0 7-3.142 7-7.002V9.998C27 6.139 23.858 3 19.998 3H9.998zm12 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-7 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                      </svg>
                    </span>
                  </div>
                  {/* Twitter/X */}
                  <div className="box box2">
                    <span className="icon">
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                      </svg>
                    </span>
                  </div>
                  {/* LinkedIn */}
                  <div className="box box3">
                    <span className="icon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </span>
                  </div>
                  <div className="box box4" />
                </SocialCard>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
                <InfoCard>
                  <div className="inner">
                    <div className="text-2xl mb-2">📧</div>
                    <div className="text-xs font-bold text-white mb-1">Email</div>
                    <div className="text-xs text-white/50">vighnesh@kia.in</div>
                  </div>
                </InfoCard>
                <InfoCard>
                  <div className="inner">
                    <div className="text-2xl mb-2">🏙️</div>
                    <div className="text-xs font-bold text-white mb-1">Location</div>
                    <div className="text-xs text-white/50">India 🇮🇳</div>
                  </div>
                </InfoCard>
                <InfoCard>
                  <div className="inner">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-xs font-bold text-white mb-1">Response Time</div>
                    <div className="text-xs text-white/50">Within 24 hours</div>
                  </div>
                </InfoCard>
                <InfoCard>
                  <div className="inner">
                    <div className="text-2xl mb-2">🤝</div>
                    <div className="text-xs font-bold text-white mb-1">Partnerships</div>
                    <div className="text-xs text-white/50">Open to colleges & orgs</div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};
