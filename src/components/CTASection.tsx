
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTASection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Tenho interesse em uma carreta JVC.%0ANome: ${formData.nome}%0ATelefone: ${formData.telefone}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-red-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pronto para levar sua moto ou jetski com <span className="text-black">segurança</span>?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Preencha seus dados e receba um orçamento personalizado em minutos
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <Input
              type="text"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="h-14 text-lg bg-white/95 border-0 placeholder:text-gray-500"
              required
            />
            
            <Input
              type="tel"
              placeholder="Seu WhatsApp"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              className="h-14 text-lg bg-white/95 border-0 placeholder:text-gray-500"
              required
            />
            
            <Button 
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold bg-black hover:bg-gray-800 text-white"
            >
              Quero minha carreta
            </Button>
          </form>
          
          <p className="text-white/80 text-sm mt-6">
            Resposta em até 1 hora durante horário comercial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
