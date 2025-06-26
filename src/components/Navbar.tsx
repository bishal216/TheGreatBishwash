import React from "react";
import { Button } from "@/components/Button"; // Adjust the path based on your project structure

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-background text-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold">
          The Great Bishwash
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {/* <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="/services" className="hover:text-primary transition-colors">
            Services
          </a>
          <a href="/contact" className="hover:text-primary transition-colors">
            Contact
          </a> */}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Feedback
          </Button>
        </div>
      </div>
    </header>
  );
};
