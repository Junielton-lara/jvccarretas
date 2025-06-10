
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/2e7dedaa-9bf4-4096-a481-5f8bcf1d1a4d.png" 
            alt="JVC Carretas" 
            className="h-8 md:h-10"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-red-500 transition-colors font-medium">
            Home
          </a>
          <a href="#produtos" className="text-white hover:text-red-500 transition-colors font-medium">
            Produtos
          </a>
          <a href="#sobre" className="text-white hover:text-red-500 transition-colors font-medium">
            Sobre
          </a>
          <a href="#contato" className="text-white hover:text-red-500 transition-colors font-medium">
            Contato
          </a>
        </nav>

        {/* CTA Button */}
        <Button 
          className="hidden md:flex bg-red-600 hover:bg-red-700 text-white border border-white/20 px-6 py-2 font-bold"
        >
          Solicitar Orçamento
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#home" className="block text-white hover:text-red-500 transition-colors font-medium">
              Home
            </a>
            <a href="#produtos" className="block text-white hover:text-red-500 transition-colors font-medium">
              Produtos
            </a>
            <a href="#sobre" className="block text-white hover:text-red-500 transition-colors font-medium">
              Sobre
            </a>
            <a href="#contato" className="block text-white hover:text-red-500 transition-colors font-medium">
              Contato
            </a>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white border border-white/20 font-bold">
              Solicitar Orçamento
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
