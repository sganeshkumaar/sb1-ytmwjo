import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}