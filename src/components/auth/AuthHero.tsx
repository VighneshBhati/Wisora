
import React from "react";
import { BookOpen, Users, Award, TrendingUp, Sparkles } from "lucide-react";
import { PLATFORM_NAME } from "@/data/constants";

interface AuthHeroProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
}

export const AuthHero: React.FC<AuthHeroProps> = ({
  title = "Access Real",
  highlight = "Expert Guidance",
  subtitle = "Connect with verified industry veterans — retired professionals, senior executives, and domain specialists ready to help you.",
}) => (
  <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-950 via-secondary-950 to-accent-950 dark:from-primary-950 dark:via-secondary-950 dark:to-accent-950 overflow-hidden min-h-screen select-none">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-16 right-24 w-96 h-96 bg-accent-400/12 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-44 h-44 bg-secondary-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-2/3 left-10 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-1/4 right-40 w-48 h-20 bg-accent-700/25 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-7 right-64 w-20 h-40 bg-secondary-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }} />
      <Sparkles className="absolute left-24 bottom-24 text-accent-400/50 w-16 h-16 animate-fade-in" style={{ animationDelay: "0.5s" }} />
    </div>
    <div className="relative z-10 flex flex-col justify-center items-start px-16 py-12 h-full text-white min-h-screen">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mr-4 shadow-lg border border-primary-500/30">
          <BookOpen className="w-6 h-6 text-primary-300" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider gradient-text drop-shadow">{PLATFORM_NAME}</h1>
      </div>
      <h2 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight text-balance gradient-text">
        {title}
        <span className="block gradient-text drop-shadow">{highlight}</span>
      </h2>
      <p className="text-xl text-white/80 mb-10 max-w-md leading-relaxed">{subtitle}</p>
      <div className="grid grid-cols-3 gap-7 mb-8">
        <div className="text-center animate-fade-in" style={{ animationDelay: ".2s" }}>
          <div className="flex items-center justify-center w-14 h-14 bg-primary-700/50 rounded-2xl backdrop-blur-sm mb-2 mx-auto border border-primary-500/20">
            <Users className="w-7 h-7 text-primary-300" />
          </div>
          <div className="text-xl font-bold gradient-text">500+</div>
          <div className="text-primary-100/80 text-xs">Verified Experts</div>
        </div>
        <div className="text-center animate-fade-in" style={{ animationDelay: ".4s" }}>
          <div className="flex items-center justify-center w-14 h-14 bg-secondary-700/40 rounded-2xl backdrop-blur-sm mb-2 mx-auto border border-secondary-500/20">
            <Award className="w-7 h-7 text-secondary-300" />
          </div>
          <div className="text-xl font-bold gradient-text">15+</div>
          <div className="text-secondary-100/80 text-xs">Domains</div>
        </div>
        <div className="text-center animate-fade-in" style={{ animationDelay: ".6s" }}>
          <div className="flex items-center justify-center w-14 h-14 bg-accent-700/40 rounded-2xl backdrop-blur-sm mb-2 mx-auto border border-accent-500/20">
            <TrendingUp className="w-7 h-7 text-accent-300" />
          </div>
          <div className="text-xl font-bold gradient-text">₹149</div>
          <div className="text-accent-100/80 text-xs">Trial Session</div>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col gap-2 shadow-inner">
        <p className="text-white/90 italic mb-0 text-balance text-lg">
          "Got clarity on my career switch in just 20 minutes. The expert was incredibly precise and practical."
        </p>
        <div className="flex items-center mt-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 via-secondary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm">R</span>
          <div className="ml-3">
            <div className="font-semibold text-white">Rahul Sharma</div>
            <div className="text-white/60 text-xs">Career Switcher, Pune</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
