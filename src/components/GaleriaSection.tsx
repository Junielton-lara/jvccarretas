
import { useState } from 'react';
import { Instagram } from 'lucide-react';

const GaleriaSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      src: "/lovable-uploads/3c69fe3c-11bd-45a4-93d7-660f61fb2122.png",
      alt: "Carreta JVC - Modelo Premium"
    },
    {
      src: "/lovable-uploads/05da403b-39b0-496c-8d7f-d3fc6a8b979f.png",
      alt: "Carreta para Jetski - Laranja"
    },
    {
      src: "/lovable-uploads/7e9c31f5-3449-4335-ad11-fb78a0936420.png",
      alt: "Carreta Preta - Modelo Clássico"
    },
    {
      src: "/lovable-uploads/9753bf03-e12c-4c9b-938a-927dcccc7a79.png",
      alt: "Carreta Azul - Alta Performance"
    },
    {
      src: "/lovable-uploads/19fc62a9-34d5-40ec-b3dd-7f04ea7a47e5.png",
      alt: "Carreta Cinza - Modelo Executivo"
    },
    {
      src: "/lovable-uploads/28b8cdf9-3ce2-42ae-b2fd-78a791681ec9.png",
      alt: "Carreta Vermelha - Modelo Esportivo"
    }
  ];

  return (
    <section id="produtos" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-red-500">Produtos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Confira nossa linha completa de carretas para jetskis e motos aquáticas
          </p>
          <div className="flex items-center justify-center gap-2 text-red-500">
            <Instagram className="w-5 h-5" />
            <span className="text-sm">@jvccarretas</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-bold text-lg">Ver Detalhes</p>
                  <p className="text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage} 
                alt="Carreta JVC"
                className="max-w-full max-h-full object-contain"
              />
              <button 
                className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GaleriaSection;
