
const DiferenciaisSection = () => {
  const diferenciais = [
    {
      icon: "✅",
      title: "Reboques Homologados",
      description: "Todos os nossos produtos possuem certificação e homologação do CONTRAN"
    },
    {
      icon: "🚚",
      title: "Enviamos para Todo Brasil",
      description: "Entregamos sua carreta em qualquer lugar do país com segurança"
    },
    {
      icon: "🔧",
      title: "Garantia e Assistência",
      description: "Oferecemos garantia completa e assistência técnica especializada"
    },
    {
      icon: "📞",
      title: "Atendimento Personalizado",
      description: "Equipe especializada para atender suas necessidades específicas"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Por que escolher a <span className="text-red-500">JVC Carretas</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de uma década de experiência oferecendo as melhores soluções em transporte
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diferenciais.map((item, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisSection;
