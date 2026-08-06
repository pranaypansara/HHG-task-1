import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BuilderGenerator from '../components/BuilderGenerator';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-green-darkest selection:bg-brand-yellow selection:text-brand-green-darkest">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 1: Hero Intro */}
        <Hero />

        {/* Section 2: Builder Generator */}
        <BuilderGenerator />
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}
