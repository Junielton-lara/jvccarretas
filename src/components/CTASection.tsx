
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && telefone) {
      const mensagem = `Olá! Meu nome é ${nome}. Gostaria de solicitar um orçamento para carreta. Meu telefone: ${telefone}`;
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para levar sua moto ou jetski com <span className="text-red-500">segurança</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Solicite seu orçamento personalizado ou configure sua carreta online
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Formulário de contato */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Solicitar Orçamento</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Seu telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  Quero minha carreta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

            {/* Link para configurador */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Configurador Online</h3>
              <p className="text-gray-300 mb-6">
                Configure sua carreta personalizada e baixe o PDF com as especificações
              </p>
              <Link to="/configurador">
                <Button 
                  className="w-full bg-white text-black hover:bg-gray-100"
                  size="lg"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Configurar Carreta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
