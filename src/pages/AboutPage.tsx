import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import styled, { keyframes } from 'styled-components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/* ── Flip card (contact form style) ── */
const FlipCard = styled.div`
  perspective: 1200px;
  width: 340px;
  height: 420px;
  flex-shrink: 0;

  .form {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s ease;
  }

  input#about_flip:checked + .form {
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
    gap: 18px;
    backface-visibility: hidden;
    padding: 40px 32px;
    border-radius: 15px;
    box-shadow:
      inset 2px 2px 10px rgba(0,0,0,1),
      inset -1px -1px 5px rgba(255,255,255,0.08);
    background: #111;
  }

  .form_back {
    transform: rotateY(-180deg);
  }

  .form_title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  .form_sub {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-align: center;
    margin-top: -10px;
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
    box-shadow: 4px 4px 8px rgba(0,0,0,0.8), 1px 1px 6px rgba(255,255,255,0.05);
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
    color: rgba(255,255,255,0.5);
    text-align: center;
  }
  .tog {
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    color: #00ff75;
  }

  #about_flip { display: none; }
`;

/* ── Team member card ── */
const TeamCard = styled.div`
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: default;
  &:hover { box-shadow: 0 0 30px 1px rgba(0,255,117,0.30); }
  .inner {
    background: #1a1a1a;
    border-radius: 18px;
    padding: 24px 20px;
    transition: all 0.2s ease;
  }
  &:hover .inner { transform: scale(0.98); border-radius: 20px; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  animation: ${fadeUp} 0.7s ease both;
`;

/* ── Cube grid ── */
const hueSpin = keyframes`
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const CubeStage = styled.div`
  position: relative;
  transform: skewY(-20deg);
  animation: ${hueSpin} 5s linear infinite;

  .cube {
    position: relative;
    z-index: 2;
    &:nth-child(2) { z-index: 1; translate: -60px -60px; }
    &:nth-child(3) { z-index: 3; translate: 60px 60px; }

    div {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 30px;
      translate: calc(-70px * var(--x)) calc(-60px * var(--y));

      span {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #dcdcdc;
        z-index: calc(1 * var(--i));
        transition: 1.5s;

        &:hover {
          transition: 0s;
          background: #ef4149;
          filter: drop-shadow(0 0 30px #ef4149);
          &:before, &:after { transition: 0s; background: #ef4149; }
        }

        &:before {
          content: "";
          position: absolute;
          left: -40px;
          width: 40px;
          height: 100%;
          background: #fff;
          transform-origin: right;
          transform: skewY(45deg);
          transition: 1.5s;
        }

        &:after {
          content: "";
          position: absolute;
          top: -40px;
          left: 0;
          width: 100%;
          height: 40px;
          background: #f2f2f2;
          transform-origin: bottom;
          transform: skewX(45deg);
          transition: 1.5s;
        }
      }
    }
  }
`;

// helper so TS accepts CSS custom properties in style
const cv = (vars: Record<string, number>) => vars as React.CSSProperties;

const team = [
  { name: 'Arsh Maheshwari', role: 'Founder & CEO', emoji: '🧠', bio: 'Visionary behind Wisora. Passionate about democratising access to real-world expertise across India.' },
];

export const AboutPage = () => {
  const navigate = useNavigate();
  const [sent, setSent] = React.useState(false);

  return (
    <>
      <SEOHead title="About Us | Wisora" />
      <div className="min-h-screen bg-[#090a0f] text-white">
        <Navbar extraXSpacing />

        {/* Hero */}
        <Section className="pt-32 pb-20 px-6 md:px-20 xl:px-44 text-center">
          <Badge className="mb-6 bg-green-500/15 text-green-400 border-green-500/25 text-sm px-4 py-1">
            🇮🇳 Made in India, for India
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            We built Wisora because<br />
            <span className="bg-gradient-to-r from-[#00ff75] to-[#3700ff] bg-clip-text text-transparent">
              we needed it ourselves.
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Wisora — is India's expert guidance platform. We connect curious minds with verified professionals who've actually lived the journey.
          </p>
        </Section>

        {/* Story */}
        <Section className="px-6 md:px-20 xl:px-44 pb-24" style={{ animationDelay: '0.1s' }}>
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 md:p-12 rounded-3xl border border-white/8"
              style={{ background: 'linear-gradient(135deg, #1b2735 0%, #090a0f 100%)' }}>
              <div className="absolute top-6 left-8 text-5xl opacity-20 select-none">"</div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 mt-4">
                It was 2023. I was a second-year student staring at a career crossroads — product management, data science, or just follow the herd into a service company. I had questions that no YouTube video could answer. Real questions. <em>"Is this domain right for me? How do I actually break in? What does day-one look like?"</em>
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                I reached out to a few seniors on LinkedIn. Most never replied. The ones who did gave me five-minute generic advice. I needed an hour with someone who'd been there — not a motivational post, not a course, just an honest conversation.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                That gap — between the questions students carry and the answers professionals hold — is what Wisora was built to close. We built the platform we wished existed. A place where you can book 30 minutes with a real Google PM, a CFA charterholder, a founder who's raised funding, or a doctor who switched careers. No fluff. Just real experience, on demand.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed font-semibold">
                — Arsh Maheshwari, Founder
              </p>
            </div>
          </div>
        </Section>

        {/* Team */}
        <Section className="px-6 md:px-20 xl:px-44 pb-24" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-black mb-2 text-center">The Team</h2>
          <p className="text-white/40 text-center mb-10">Four people. One obsession.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <TeamCard key={m.name}>
                <div className="inner">
                  <div className="text-4xl mb-3">{m.emoji}</div>
                  <div className="font-bold text-white text-base mb-0.5">{m.name}</div>
                  <div className="text-xs text-[#00ff75] font-semibold mb-3">{m.role}</div>
                  <p className="text-xs text-white/50 leading-relaxed">{m.bio}</p>
                </div>
              </TeamCard>
            ))}
          </div>
        </Section>

        {/* Contact flip card */}
        <Section className="px-6 md:px-20 xl:px-44 pb-32 flex flex-col items-center" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-black mb-2 text-center">Get in Touch</h2>
          <p className="text-white/40 text-center mb-12">Have a question, partnership idea, or just want to say hi?</p>
          <FlipCard>
            <input type="checkbox" id="about_flip" />
            <div className="form">
              <div className="form_front">
                <div className="form_title">Say Hello 👋</div>
                <div className="form_sub">Send us a message</div>
                <input className="inp" placeholder="Your name" type="text" />
                <input className="inp" placeholder="Your email" type="email" />
                <textarea className="inp" placeholder="Your message..." />
                <button className="btn" onClick={() => setSent(true)}>
                  {sent ? 'Sent ✓' : 'Send Message'}
                </button>
                <span className="switch">
                  Want to partner? <label className="tog" htmlFor="about_flip">Tell us more →</label>
                </span>
              </div>
              <div className="form_back">
                <div className="form_title">Partner with Wisora</div>
                <div className="form_sub">Institutions, colleges & enterprises</div>
                <input className="inp" placeholder="Organisation name" type="text" />
                <input className="inp" placeholder="Your name" type="text" />
                <input className="inp" placeholder="Work email" type="email" />
                <input className="inp" placeholder="Team size" type="text" />
                <button className="btn">Request Demo</button>
                <span className="switch">
                  Just a message? <label className="tog" htmlFor="about_flip">← Go back</label>
                </span>
              </div>
            </div>
          </FlipCard>
        </Section>
        {/* ── Fun cube section ── */}
        <Section className="pb-40 flex flex-col items-center gap-10" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-widest uppercase mb-1">just for fun</p>
            <h3 className="text-white/60 text-lg font-semibold">We like building things.</h3>
          </div>
          <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CubeStage>
              {[0, 1, 2].map((ci) => (
                <div key={ci} className="cube">
                  {([-1, 0, 1] as const).map((x) => (
                    <div key={x} style={cv({ '--x': x, '--y': 0 } as any)}>
                      {([3, 2, 1] as const).map((i) => (
                        <span key={i} style={cv({ '--i': i } as any)} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </CubeStage>
          </div>
          <p className="text-white/15 text-xs">hover the cubes ↑</p>
        </Section>

      </div>
    </>
  );
};

