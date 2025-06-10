
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const Configurador = () => {
  const [formData, setFormData] = useState({
    // Chassi
    chassi: '',
    
    // Alumínio
    aluminioOpcoes: [],
    corAluminio: '',
    
    // Berço
    berco: '',
    
    // Acessórios
    acessorios: [],
    
    // Pintura da Carreta
    pinturaCarreta: '',
    
    // Pára-lama
    paraLama: [],
    
    // Roda
    roda: '',
    aro: '',
    
    // Pneu
    pneu: '',
    
    // Adesivos
    adesivos18mm: false,
    adesivos5mm: false,
    adesivosCor: '',
    adesivosDetalhe: '',
    adesivosParaLama: '',
    adesivosNomes: '',
    adesivosOutros: '',
    
    // Colaboradores
    suspensao: '',
    eletrica: '',
    plotagem: '',
    montagem: '',
    checklist: '',
    
    // Dados
    cliente: '',
    dataEntrega: '',
    cidade: '',
    
    // Observação
    observacao: ''
  });

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header com logo (menor)
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('JVC CARRETAS', 105, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.text('CONFIGURAÇÃO JET PREMIUM', 105, 20, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 35;
    const leftColumn = 15;
    const rightColumn = 110;
    const lineHeight = 4;
    
    // Helper function to add section header (menor)
    const addSectionHeader = (title: string, y: number) => {
      doc.setFillColor(230, 6, 19);
      doc.rect(15, y - 2, 180, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(title, 16, y + 2);
      doc.setTextColor(0, 0, 0);
      return y + 8;
    };

    // Helper function to add field in columns (mais compacto)
    const addField = (label: string, value: string | string[], x: number, y: number) => {
      doc.setFontSize(7);
      doc.setFont(undefined, 'bold');
      doc.text(`${label}:`, x, y);
      doc.setFont(undefined, 'normal');
      const text = Array.isArray(value) ? value.join(', ') : value;
      const maxWidth = 85;
      const splitText = doc.splitTextToSize(text || 'Não informado', maxWidth);
      doc.text(splitText, x, y + 2);
      return y + Math.max(splitText.length * 2, 3) + 2;
    };

    // DADOS DO CLIENTE
    yPosition = addSectionHeader('DADOS DO CLIENTE', yPosition);
    let leftY = yPosition;
    let rightY = yPosition;
    
    leftY = addField('CLIENTE', formData.cliente, leftColumn, leftY);
    rightY = addField('CIDADE', formData.cidade, rightColumn, rightY);
    leftY = addField('DATA DE ENTREGA', formData.dataEntrega, leftColumn, leftY);
    
    yPosition = Math.max(leftY, rightY) + 3;

    // ESPECIFICAÇÕES TÉCNICAS
    yPosition = addSectionHeader('ESPECIFICAÇÕES TÉCNICAS', yPosition);
    leftY = yPosition;
    rightY = yPosition;
    
    leftY = addField('CHASSI', formData.chassi, leftColumn, leftY);
    rightY = addField('BERÇO', formData.berco, rightColumn, rightY);
    leftY = addField('RODA', formData.roda, leftColumn, leftY);
    rightY = addField('ARO', formData.aro, rightColumn, rightY);
    leftY = addField('PNEU', formData.pneu, leftColumn, leftY);
    
    yPosition = Math.max(leftY, rightY) + 3;

    // ALUMÍNIO E PINTURA
    yPosition = addSectionHeader('ALUMÍNIO E PINTURA', yPosition);
    leftY = yPosition;
    rightY = yPosition;
    
    leftY = addField('ALUMÍNIO', formData.aluminioOpcoes, leftColumn, leftY);
    rightY = addField('COR DO ALUMÍNIO', formData.corAluminio, rightColumn, rightY);
    leftY = addField('PINTURA DA CARRETA', formData.pinturaCarreta, leftColumn, leftY);
    rightY = addField('PÁRA-LAMA', formData.paraLama, rightColumn, rightY);
    
    yPosition = Math.max(leftY, rightY) + 3;

    // ACESSÓRIOS
    yPosition = addSectionHeader('ACESSÓRIOS', yPosition);
    yPosition = addField('ACESSÓRIOS', formData.acessorios, leftColumn, yPosition) + 2;

    // ADESIVOS
    yPosition = addSectionHeader('ADESIVOS', yPosition);
    leftY = yPosition;
    rightY = yPosition;
    
    const adesivos = [];
    if (formData.adesivos18mm) adesivos.push('18mm');
    if (formData.adesivos5mm) adesivos.push('5mm');
    
    leftY = addField('TIPO', adesivos, leftColumn, leftY);
    rightY = addField('COR', formData.adesivosCor, rightColumn, rightY);
    leftY = addField('DETALHE', formData.adesivosDetalhe, leftColumn, leftY);
    rightY = addField('PÁRA-LAMA', formData.adesivosParaLama, rightColumn, rightY);
    leftY = addField('NOMES', formData.adesivosNomes, leftColumn, leftY);
    rightY = addField('OUTROS', formData.adesivosOutros, rightColumn, rightY);
    
    yPosition = Math.max(leftY, rightY) + 3;

    // COLABORADORES
    yPosition = addSectionHeader('COLABORADORES RESPONSÁVEIS', yPosition);
    leftY = yPosition;
    rightY = yPosition;
    
    leftY = addField('SUSPENSÃO', formData.suspensao, leftColumn, leftY);
    rightY = addField('ELÉTRICA', formData.eletrica, rightColumn, rightY);
    leftY = addField('PLOTAGEM', formData.plotagem, leftColumn, leftY);
    rightY = addField('MONTAGEM', formData.montagem, rightColumn, rightY);
    leftY = addField('CHECKLIST', formData.checklist, leftColumn, leftY);
    
    yPosition = Math.max(leftY, rightY) + 3;

    // OBSERVAÇÕES (se houver espaço)
    if (formData.observacao && yPosition < 250) {
      yPosition = addSectionHeader('OBSERVAÇÕES', yPosition);
      doc.setFontSize(7);
      const maxObsWidth = 180;
      const remainingSpace = 270 - yPosition;
      const maxLines = Math.floor(remainingSpace / 2);
      let splitObservacao = doc.splitTextToSize(formData.observacao, maxObsWidth);
      
      if (splitObservacao.length > maxLines) {
        splitObservacao = splitObservacao.slice(0, maxLines - 1);
        splitObservacao.push('...');
      }
      
      doc.text(splitObservacao, leftColumn, yPosition);
    }

    // Footer compacto
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(0, 0, 0);
    doc.rect(0, pageHeight - 12, 210, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text('JVC Carretas - Qualidade que transmite segurança', 105, pageHeight - 8, { align: 'center' });
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 105, pageHeight - 3, { align: 'center' });
    
    // Save PDF
    doc.save(`configuracao-jvc-carretas-${formData.cliente || 'cliente'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">CONFIGURAÇÃO JET PREMIUM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Chassi */}
            <div>
              <Label className="text-lg font-semibold">CHASSI</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[1, 2, 3, 4].map((num) => (
                  <Input
                    key={num}
                    placeholder={`${num}`}
                    value={formData.chassi.split('')[num - 1] || ''}
                    onChange={(e) => {
                      const newChassi = formData.chassi.split('');
                      newChassi[num - 1] = e.target.value;
                      handleInputChange('chassi', newChassi.join(''));
                    }}
                    maxLength={1}
                    className="text-center"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Alumínio */}
              <div>
                <Label className="text-lg font-semibold">ALUMÍNIO</Label>
                <div className="space-y-2 mt-2">
                  {[
                    'Alumínio Padrão',
                    'Alumínio Lateral',
                    'Alumínio Lateral central',
                    'Alumínio Fechado até a frente',
                    'Alumínio Fechamento total'
                  ].map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`aluminio-${index}`}
                        checked={formData.aluminioOpcoes.includes(option)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('aluminioOpcoes', option, checked as boolean)
                        }
                      />
                      <Label htmlFor={`aluminio-${index}`} className="text-sm">
                        {index + 1} {option}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Label className="font-semibold">COR DO ALUMÍNIO</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cor-preto"
                        checked={formData.corAluminio === 'Preto'}
                        onCheckedChange={(checked) => 
                          handleInputChange('corAluminio', checked ? 'Preto' : '')
                        }
                      />
                      <Label htmlFor="cor-preto">Preto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cor-prata"
                        checked={formData.corAluminio === 'Prata'}
                        onCheckedChange={(checked) => 
                          handleInputChange('corAluminio', checked ? 'Prata' : '')
                        }
                      />
                      <Label htmlFor="cor-prata">Prata</Label>
                    </div>
                    <Input
                      placeholder="Outra cor"
                      value={formData.corAluminio.includes('Preto') || formData.corAluminio.includes('Prata') ? '' : formData.corAluminio}
                      onChange={(e) => handleInputChange('corAluminio', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Pára-lama */}
              <div>
                <Label className="text-lg font-semibold">PÁRA-LAMA</Label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {['70', '75', '78', '83', '85', '90', '93'].map((size) => (
                    <div key={size} className="flex items-center space-x-1">
                      <Checkbox
                        id={`paralama-${size}`}
                        checked={formData.paraLama.includes(size)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('paraLama', size, checked as boolean)
                        }
                      />
                      <Label htmlFor={`paralama-${size}`} className="text-sm">{size}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Berço */}
            <div>
              <Label className="text-lg font-semibold">BERÇO</Label>
              <div className="space-y-2 mt-2">
                {[
                  'Berço em madeira acarpetado',
                  'Berço em roletes de borracha'
                ].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`berco-${index}`}
                      checked={formData.berco === option}
                      onCheckedChange={(checked) => 
                        handleInputChange('berco', checked ? option : '')
                      }
                    />
                    <Label htmlFor={`berco-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Acessórios */}
            <div>
              <Label className="text-lg font-semibold">ACESSÓRIOS</Label>
              <div className="space-y-2 mt-2">
                {[
                  'Pedestal',
                  'Recorte a laser iluminado',
                  'Engate removível',
                  'Kit moto',
                  'Kit quadriciclo',
                  'Led moderno',
                  'Leds brancos'
                ].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`acessorio-${index}`}
                      checked={formData.acessorios.includes(option)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('acessorios', option, checked as boolean)
                      }
                    />
                    <Label htmlFor={`acessorio-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Roda e Aro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label className="text-lg font-semibold">RODA</Label>
                <Input
                  value={formData.roda}
                  onChange={(e) => handleInputChange('roda', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-lg font-semibold">ARO</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    value={formData.aro.split(' ')[0] || ''}
                    onChange={(e) => {
                      const current = formData.aro.split(' ');
                      current[0] = e.target.value;
                      handleInputChange('aro', current.join(' '));
                    }}
                  />
                  <Input
                    value={formData.aro.split(' ')[1] || ''}
                    onChange={(e) => {
                      const current = formData.aro.split(' ');
                      current[1] = e.target.value;
                      handleInputChange('aro', current.join(' '));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Pneu */}
            <div>
              <Label className="text-lg font-semibold">PNEU</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Input
                  value={formData.pneu.split('/')[0] || ''}
                  onChange={(e) => {
                    const parts = formData.pneu.split('/');
                    parts[0] = e.target.value;
                    handleInputChange('pneu', parts.join('/'));
                  }}
                />
                <Input
                  value={formData.pneu.split('/')[1] || ''}
                  onChange={(e) => {
                    const parts = formData.pneu.split('/');
                    parts[1] = e.target.value;
                    handleInputChange('pneu', parts.join('/'));
                  }}
                />
                <Input
                  value={formData.pneu.split('/')[2] || ''}
                  onChange={(e) => {
                    const parts = formData.pneu.split('/');
                    parts[2] = e.target.value;
                    handleInputChange('pneu', parts.join('/'));
                  }}
                />
              </div>
            </div>

            {/* Adesivos */}
            <div>
              <Label className="text-lg font-semibold">ADESIVOS</Label>
              <div className="space-y-4 mt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adesivos-18mm"
                      checked={formData.adesivos18mm}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, adesivos18mm: checked as boolean }))
                      }
                    />
                    <Label htmlFor="adesivos-18mm">18mm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adesivos-5mm"
                      checked={formData.adesivos5mm}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, adesivos5mm: checked as boolean }))
                      }
                    />
                    <Label htmlFor="adesivos-5mm">5mm</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Label>Cor:</Label>
                    <Input
                      value={formData.adesivosCor}
                      onChange={(e) => handleInputChange('adesivosCor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Detalhe:</Label>
                    <Input
                      value={formData.adesivosDetalhe}
                      onChange={(e) => handleInputChange('adesivosDetalhe', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Pára-lama:</Label>
                    <Input
                      value={formData.adesivosParaLama}
                      onChange={(e) => handleInputChange('adesivosParaLama', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Nomes:</Label>
                    <Input
                      value={formData.adesivosNomes}
                      onChange={(e) => handleInputChange('adesivosNomes', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Outros:</Label>
                    <Input
                      value={formData.adesivosOutros}
                      onChange={(e) => handleInputChange('adesivosOutros', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pintura da Carreta */}
            <div>
              <Label className="text-lg font-semibold">PINTURA DA CARRETA</Label>
              <div className="space-y-2 mt-2">
                {['Preto', 'Branco', 'Nardo Grey', 'Prata'].map((cor) => (
                  <div key={cor} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pintura-${cor}`}
                      checked={formData.pinturaCarreta === cor}
                      onCheckedChange={(checked) => 
                        handleInputChange('pinturaCarreta', checked ? cor : '')
                      }
                    />
                    <Label htmlFor={`pintura-${cor}`}>{cor}</Label>
                  </div>
                ))}
                <Input
                  placeholder="Outra cor"
                  value={!['Preto', 'Branco', 'Nardo Grey', 'Prata'].includes(formData.pinturaCarreta) ? formData.pinturaCarreta : ''}
                  onChange={(e) => handleInputChange('pinturaCarreta', e.target.value)}
                />
              </div>
            </div>

            {/* Colaboradores */}
            <div>
              <Label className="text-lg font-semibold">COLABORADORES</Label>
              <div className="space-y-2 mt-2">
                <div>
                  <Label>Suspensão:</Label>
                  <Input
                    value={formData.suspensao}
                    onChange={(e) => handleInputChange('suspensao', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Elétrica:</Label>
                  <Input
                    value={formData.eletrica}
                    onChange={(e) => handleInputChange('eletrica', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Plotagem:</Label>
                  <Input
                    value={formData.plotagem}
                    onChange={(e) => handleInputChange('plotagem', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Montagem:</Label>
                  <Input
                    value={formData.montagem}
                    onChange={(e) => handleInputChange('montagem', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Checklist:</Label>
                  <Input
                    value={formData.checklist}
                    onChange={(e) => handleInputChange('checklist', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Dados */}
            <div>
              <Label className="text-lg font-semibold">DADOS</Label>
              <div className="space-y-2 mt-2">
                <div>
                  <Label>Cliente:</Label>
                  <Input
                    value={formData.cliente}
                    onChange={(e) => handleInputChange('cliente', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Data de entrega:</Label>
                  <Input
                    type="date"
                    value={formData.dataEntrega}
                    onChange={(e) => handleInputChange('dataEntrega', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cidade:</Label>
                  <Input
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Observação */}
            <div>
              <Label className="text-lg font-semibold">OBSERVAÇÃO</Label>
              <Textarea
                value={formData.observacao}
                onChange={(e) => handleInputChange('observacao', e.target.value)}
                className="mt-2"
                rows={6}
                placeholder="Digite observações adicionais..."
              />
            </div>

            {/* Botão Download PDF */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={generatePDF}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configurador;
