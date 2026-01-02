"use client"

import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

export default function TermosDeUso() {
  const termoRef = useRef(null);

  const gerarPDF = () => {
    const doc = new jsPDF();
    
    // Configurações do documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('TERMOS DE USO E POLÍTICA DE PRIVACIDADE - SIGEO', 105, 20, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    // Conteúdo do documento
    const conteudo = [
      'SISTEMA INTEGRADO DE GESTÃO E APREENSÃO PATRIMONIAL (SIGEO)',
      '',
      '1. DEFINIÇÃO E ESCOPO',
      'O Sistema Integrado de Gestão e Apreensão Patrimonial (SIGEO) é uma plataforma digital desenvolvida para gerenciar, controlar e monitorar bens apreendidos sob custódia de órgãos públicos ou entidades privadas autorizadas. O sistema permite o registro, acompanhamento, classificação e destinação de bens apreendidos, oferecendo ferramentas para gestão eficiente e transparente destes ativos.',
      '',
      '2. RESPONSABILIDADE CONTRATUAL',
      'Os Termos de Uso do SIGEO são estritamente direcionados ao contrato estabelecido entre a empresa ou Órgão Público contratante e o fornecedor do sistema. A responsabilidade pelo uso adequado do sistema, conforme estipulado em contrato, recai sobre a entidade contratante. Os usuários individuais, embora não sejam parte direta do contrato, têm seus dados e ações responsabilizados indiretamente perante a empresa ou órgão contratante.',
      '',
      '3. CREDENCIAIS DE ACESSO',
      'As credenciais de acesso (nome de usuário e senha) são de inteira responsabilidade do usuário designado. O usuário compromete-se a:',
      '• Manter suas credenciais em sigilo absoluto',
      '• Não compartilhar acesso com terceiros, mesmo que sejam colegas de trabalho',
      '• Notificar imediatamente qualquer suspeita de uso indevido de sua conta',
      '• Realizar logout ao finalizar o uso do sistema, especialmente em dispositivos compartilhados',
      '',
      'O usuário está ciente de que poderá ser acionado pela empresa ou Órgão Público contratante em caso de uso indevido de suas credenciais ou violação dos termos de uso.',
      '',
      '4. COLETA E TRATAMENTO DE DADOS',
      'O SIGEO coleta e processa dados necessários para sua operação, incluindo:',
      '• Dados cadastrais dos usuários (nome, cargo, departamento, e-mail institucional)',
      '• Registros de acesso e ações realizadas no sistema',
      '• Informações sobre os bens apreendidos e sua movimentação',
      '• Documentos e imagens relacionados aos bens cadastrados',
      '',
      'Todos os dados são tratados em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis.',
      '',
      '5. FINALIDADE DO TRATAMENTO DE DADOS',
      'Os dados coletados pelo SIGEO são utilizados exclusivamente para:',
      '• Gerenciamento e controle de bens apreendidos',
      '• Geração de relatórios estatísticos e gerenciais',
      '• Auditoria e rastreabilidade das ações realizadas no sistema',
      '• Cumprimento de obrigações legais e regulatórias',
      '• Melhoria contínua do sistema e seus processos',
      '',
      '6. COMPARTILHAMENTO DE DADOS',
      'O SIGEO poderá compartilhar dados com:',
      '• Órgãos públicos, quando exigido por lei ou ordem judicial',
      '• Prestadores de serviços contratados para manutenção e suporte do sistema',
      '• Outras entidades, mediante autorização expressa da entidade contratante',
      '',
      'Todo compartilhamento é realizado com medidas de segurança adequadas e em conformidade com a legislação vigente.',
      '',
      '7. SEGURANÇA DA INFORMAÇÃO',
      'O SIGEO implementa medidas técnicas e administrativas para proteger os dados processados, incluindo:',
      '• Criptografia de dados sensíveis',
      '• Controle de acesso baseado em perfis e permissões',
      '• Registro de logs de acesso e ações',
      '• Backups regulares',
      '• Atualizações de segurança',
      '',
      '8. DIREITOS DOS TITULARES',
      'Os titulares dos dados têm direitos conforme a LGPD, que podem ser exercidos através da entidade contratante, incluindo:',
      '• Acesso aos dados pessoais',
      '• Correção de dados incompletos ou inexatos',
      '• Informações sobre o compartilhamento de dados',
      '',
      '9. RETENÇÃO DE DADOS',
      'Os dados são mantidos pelo período necessário para cumprir as finalidades para as quais foram coletados, observando:',
      '• Prazos legais de guarda de documentos',
      '• Prazos prescricionais para exercício de direitos',
      '• Necessidades operacionais legítimas',
      '',
      '10. RESPONSABILIDADES DO USUÁRIO',
      'Ao utilizar o SIGEO, o usuário compromete-se a:',
      '• Fornecer informações verdadeiras, precisas e atualizadas',
      '• Utilizar o sistema exclusivamente para fins profissionais e legítimos',
      '• Não realizar ações que possam comprometer a segurança ou integridade do sistema',
      '• Respeitar a confidencialidade das informações acessadas',
      '• Cumprir as políticas internas da entidade contratante',
      '',
      '11. LIMITAÇÃO DE RESPONSABILIDADE',
      'O fornecedor do SIGEO não será responsável por:',
      '• Uso indevido do sistema pelos usuários',
      '• Inexatidão das informações inseridas pelos usuários',
      '• Indisponibilidade temporária do sistema por motivos de força maior',
      '• Danos indiretos decorrentes do uso ou impossibilidade de uso do sistema',
      '',
      '12. PROPRIEDADE INTELECTUAL',
      'O SIGEO, incluindo seu código-fonte, interface, design e conteúdos, é protegido por direitos de propriedade intelectual. É vedada a cópia, modificação, distribuição ou engenharia reversa do sistema sem autorização expressa do fornecedor.',
      '',
      '13. ALTERAÇÕES NOS TERMOS',
      'Os Termos de Uso e Política de Privacidade podem ser atualizados periodicamente. As alterações serão comunicadas aos usuários e à entidade contratante com antecedência razoável.',
      '',
      '14. DISPOSIÇÕES FINAIS',
      'Estes Termos de Uso e Política de Privacidade constituem o acordo integral entre as partes em relação ao uso do SIGEO. Em caso de dúvidas ou esclarecimentos, o usuário deve contatar o administrador do sistema na entidade contratante.',
      '',
      'Data da última atualização: ' + new Date().toLocaleDateString('pt-BR')
    ];
    
    // Adicionar o conteúdo ao PDF
    let y = 30;
    const lineHeight = 7;
    
    conteudo.forEach(linha => {
      // Verificar se precisa adicionar uma nova página
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      // Verificar se é um título
      if (linha.startsWith('SISTEMA') || linha.match(/^\d+\.\s/)) {
        doc.setFont('helvetica', 'bold');
        doc.text(linha, 10, y);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.text(linha, 10, y);
      }
      
      y += lineHeight;
    });
    
    // Salvar o PDF
    doc.save('termos-de-uso-sigeo.pdf');
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <button 
          onClick={gerarPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors text-xs"
        >
          <FaFilePdf />
          Baixar Termos de Uso (PDF)
        </button>
      </div>
      
      <div ref={termoRef} className="bg-c_deep_middle_black p-6 rounded-lg border border-gray-700 shadow-lg text-sm">
        <h1 className="text-xl font-bold mb-6 text-center">TERMOS DE USO E POLÍTICA DE PRIVACIDADE - SIGEO</h1>
        
        <h2 className="text-lg font-bold mt-6 mb-3 text-blue-400">SISTEMA INTEGRADO DE GESTÃO E APREENSÃO PATRIMONIAL (SIGEO)</h2>
        
        <h3 className="text-md font-bold mt-5 mb-2">1. DEFINIÇÃO E ESCOPO</h3>
        <p className="mb-4">
          O Sistema Integrado de Gestão e Apreensão Patrimonial (SIGEO) é uma plataforma digital desenvolvida para gerenciar, 
          controlar e monitorar bens apreendidos sob custódia de órgãos públicos ou entidades privadas autorizadas. 
          O sistema permite o registro, acompanhamento, classificação e destinação de bens apreendidos, 
          oferecendo ferramentas para gestão eficiente e transparente destes ativos.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">2. RESPONSABILIDADE CONTRATUAL</h3>
        <p className="mb-4">
          Os Termos de Uso do SIGEO são estritamente direcionados ao contrato estabelecido entre a empresa ou Órgão Público 
          contratante e o fornecedor do sistema. A responsabilidade pelo uso adequado do sistema, conforme estipulado em contrato, 
          recai sobre a entidade contratante. Os usuários individuais, embora não sejam parte direta do contrato, 
          têm seus dados e ações responsabilizados indiretamente perante a empresa ou órgão contratante.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">3. CREDENCIAIS DE ACESSO</h3>
        <p className="mb-2">
          As credenciais de acesso (nome de usuário e senha) são de inteira responsabilidade do usuário designado. 
          O usuário compromete-se a:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Manter suas credenciais em sigilo absoluto</li>
          <li>Não compartilhar acesso com terceiros, mesmo que sejam colegas de trabalho</li>
          <li>Notificar imediatamente qualquer suspeita de uso indevido de sua conta</li>
          <li>Realizar logout ao finalizar o uso do sistema, especialmente em dispositivos compartilhados</li>
        </ul>
        <p className="mb-4">
          O usuário está ciente de que poderá ser acionado pela empresa ou Órgão Público contratante em caso de 
          uso indevido de suas credenciais ou violação dos termos de uso.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">4. COLETA E TRATAMENTO DE DADOS</h3>
        <p className="mb-2">
          O SIGEO coleta e processa dados necessários para sua operação, incluindo:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Dados cadastrais dos usuários (nome, cargo, departamento, e-mail institucional)</li>
          <li>Registros de acesso e ações realizadas no sistema</li>
          <li>Informações sobre os bens apreendidos e sua movimentação</li>
          <li>Documentos e imagens relacionados aos bens cadastrados</li>
        </ul>
        <p className="mb-4">
          Todos os dados são tratados em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">5. FINALIDADE DO TRATAMENTO DE DADOS</h3>
        <p className="mb-2">
          Os dados coletados pelo SIGEO são utilizados exclusivamente para:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Gerenciamento e controle de bens apreendidos</li>
          <li>Geração de relatórios estatísticos e gerenciais</li>
          <li>Auditoria e rastreabilidade das ações realizadas no sistema</li>
          <li>Cumprimento de obrigações legais e regulatórias</li>
          <li>Melhoria contínua do sistema e seus processos</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">6. COMPARTILHAMENTO DE DADOS</h3>
        <p className="mb-2">
          O SIGEO poderá compartilhar dados com:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Órgãos públicos, quando exigido por lei ou ordem judicial</li>
          <li>Prestadores de serviços contratados para manutenção e suporte do sistema</li>
          <li>Outras entidades, mediante autorização expressa da entidade contratante</li>
        </ul>
        <p className="mb-4">
          Todo compartilhamento é realizado com medidas de segurança adequadas e em conformidade com a legislação vigente.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">7. SEGURANÇA DA INFORMAÇÃO</h3>
        <p className="mb-2">
          O SIGEO implementa medidas técnicas e administrativas para proteger os dados processados, incluindo:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Criptografia de dados sensíveis</li>
          <li>Controle de acesso baseado em perfis e permissões</li>
          <li>Registro de logs de acesso e ações</li>
          <li>Backups regulares</li>
          <li>Atualizações de segurança</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">8. DIREITOS DOS TITULARES</h3>
        <p className="mb-2">
          Os titulares dos dados têm direitos conforme a LGPD, que podem ser exercidos através da entidade contratante, incluindo:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Acesso aos dados pessoais</li>
          <li>Correção de dados incompletos ou inexatos</li>
          <li>Informações sobre o compartilhamento de dados</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">9. RETENÇÃO DE DADOS</h3>
        <p className="mb-2">
          Os dados são mantidos pelo período necessário para cumprir as finalidades para as quais foram coletados, observando:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Prazos legais de guarda de documentos</li>
          <li>Prazos prescricionais para exercício de direitos</li>
          <li>Necessidades operacionais legítimas</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">10. RESPONSABILIDADES DO USUÁRIO</h3>
        <p className="mb-2">
          Ao utilizar o SIGEO, o usuário compromete-se a:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
          <li>Utilizar o sistema exclusivamente para fins profissionais e legítimos</li>
          <li>Não realizar ações que possam comprometer a segurança ou integridade do sistema</li>
          <li>Respeitar a confidencialidade das informações acessadas</li>
          <li>Cumprir as políticas internas da entidade contratante</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">11. LIMITAÇÃO DE RESPONSABILIDADE</h3>
        <p className="mb-2">
          O fornecedor do SIGEO não será responsável por:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Uso indevido do sistema pelos usuários</li>
          <li>Inexatidão das informações inseridas pelos usuários</li>
          <li>Indisponibilidade temporária do sistema por motivos de força maior</li>
          <li>Danos indiretos decorrentes do uso ou impossibilidade de uso do sistema</li>
        </ul>
        
        <h3 className="text-md font-bold mt-5 mb-2">12. PROPRIEDADE INTELECTUAL</h3>
        <p className="mb-4">
          O SIGEO, incluindo seu código-fonte, interface, design e conteúdos, é protegido por direitos de propriedade intelectual. 
          É vedada a cópia, modificação, distribuição ou engenharia reversa do sistema sem autorização expressa do fornecedor.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">13. ALTERAÇÕES NOS TERMOS</h3>
        <p className="mb-4">
          Os Termos de Uso e Política de Privacidade podem ser atualizados periodicamente. 
          As alterações serão comunicadas aos usuários e à entidade contratante com antecedência razoável.
        </p>
        
        <h3 className="text-md font-bold mt-5 mb-2">14. DISPOSIÇÕES FINAIS</h3>
        <p className="mb-4">
          Estes Termos de Uso e Política de Privacidade constituem o acordo integral entre as partes em relação ao uso do SIGEO. 
          Em caso de dúvidas ou esclarecimentos, o usuário deve contatar o administrador do sistema na entidade contratante.
        </p>
        <img src="/images/logo_sigeo.png" alt="Logo SIGEO" className="w-1/2 mx-auto" />
        <span className="text-center block mt-4 text-gray-400">Created by: fagundesrafael</span>
        
        <p className="mt-8 text-right text-gray-400">
          Data da última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
} 