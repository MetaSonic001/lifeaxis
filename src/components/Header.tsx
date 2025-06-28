"use client";
import React, { useState } from 'react';
import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/find-doctors", label: "Find Doctors" },
    { href: "/find-hospitals", label: "Hospitals" },

    // { href: "#", label: "Services" },
    // { href: "#", label: "Lab Tests" },
    // { href: "#", label: "Health Records" },
    { href: "/wellness-tools", label: "Wellness Tools" },


  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-sm border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        {/* Main header row */}
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <Link href="/" className="flex items-center">
            <img
              src="/favicon.ico"
              alt="LifeAxis Logo"
              className="h-8 w-auto mr-2 md:h-10 md:mr-4"
            />
            <h1 className="text-xl md:text-2xl font-bold text-blue-800">LifeAxis</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section with search and buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search bar - hidden on mobile */}
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-800 focus:ring-blue-800 bg-white/80"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            {/* Authentication buttons - responsive */}
            <div className="hidden sm:flex space-x-2">
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="text-blue-800 border-blue-800 hover:bg-blue-50"
                  size="sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Portal buttons - shown differently based on screen size */}
            <div className="hidden md:flex space-x-2">
              <Link href="/patient-portal">
                <Button
                  className="bg-blue-800 text-white hover:bg-blue-900"
                  size="sm"
                >
                  Patient Portal
                </Button>
              </Link>
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="text-blue-800 border-blue-800 hover:bg-blue-50"
                  size="sm"
                >
                  Doctor Portal
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="lg:hidden text-blue-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="mt-4 space-y-4">
              {/* Mobile search */}
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search doctors, hospitals..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 bg-white/80"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Mobile navigation */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-800 py-2 transition duration-150 ease-in-out"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile portal buttons */}
              <div className="flex flex-col space-y-2">
                <Link href="/book-appointment">
                  <Button className="w-full bg-blue-800 text-white hover:bg-blue-900">
                    Patient Portal
                  </Button>
                </Link>
                <Link href="/doctor">
                  <Button
                    variant="outline"
                    className="w-full text-blue-800 border-blue-800 hover:bg-blue-50"
                  >
                    Doctor Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

