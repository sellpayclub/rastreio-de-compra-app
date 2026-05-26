import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Package, 
  MapPin, 
  CreditCard, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  X, 
  Compass, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  ClipboardCheck,
  CheckCircle,
  HelpCircle,
  Lock,
  Moon,
  Sun
} from 'lucide-react';
import { customers, getTrackingSteps, Customer } from './data';

export default function App() {
  const [cpfInput, setCpfInput] = useState('');
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showLockAlert, setShowLockAlert] = useState(false);
  const [showTaxAlert, setShowTaxAlert] = useState(false);

  // Helper to format CPF as user types
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal.length > 11) return; // Limit to 11 digits
    
    // Apply CPF masking on the fly
    let formatted = rawVal;
    if (rawVal.length > 3) {
      formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3)}`;
    }
    if (rawVal.length > 6) {
      formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3, 6)}.${rawVal.slice(6)}`;
    }
    if (rawVal.length > 9) {
      formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3, 6)}.${rawVal.slice(6, 9)}-${rawVal.slice(9, 11)}`;
    }
    
    setCpfInput(formatted);
    setSearchError('');
  };

  // Perform search
  const triggerSearch = (cpfToSearch: string) => {
    const cleanSearch = cpfToSearch.replace(/\D/g, '');
    
    if (cleanSearch.length === 0) {
      setSearchError('Por favor, insira o seu CPF para consultar.');
      return;
    }
    
    if (cleanSearch.length !== 11) {
      setSearchError('Um CPF válido possui 11 dígitos.');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    
    // Simulate server lookup for premium UX
    setTimeout(() => {
      const found = customers.find(c => c.cleanCpf === cleanSearch);
      if (found) {
        setActiveCustomer(found);
        setSearchError('');
      } else {
        setSearchError('CPF não encontrado em nossa base de entregas. Por favor, verifique se os números foram digitados corretamente.');
        setActiveCustomer(null);
      }
      setIsSearching(false);
    }, 700);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(cpfInput);
  };

  // Safe copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const quickSelect = (customer: Customer) => {
    setCpfInput(customer.cpf);
    triggerSearch(customer.cpf);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-stone-800 transition-colors duration-300">
      {/* Top micro-banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-300 animate-pulse" />
          Acompanhamento de Produção & Entrega de Fórmulas Personalizadas de Alta Performance
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            🧪 Laboratório Exclusivo
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Rastreie seu pedido!
          </h1>
        </header>

        <AnimatePresence mode="wait">
          {!activeCustomer ? (
            /* Search / Landing View */
            <motion.div
              key="search-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto"
            >
              {/* Form Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-slate-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                    <Compass className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Acompanhar meu Pedido</h2>
                    <p className="text-sm text-slate-500">Informe o CPF cadastrado no momento da compra</p>
                  </div>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="cpfInput" className="block text-sm font-semibold text-slate-700 mb-2">
                      Digite seu CPF
                    </label>
                    <div className="relative rounded-2xl shadow-sm">
                      <input
                        type="text"
                        name="cpf"
                        id="cpfInput"
                        placeholder="000.000.000-00"
                        value={cpfInput}
                        onChange={handleCpfChange}
                        className="block w-full px-5 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-950 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg"
                        disabled={isSearching}
                      />
                      {cpfInput && !isSearching && (
                        <button
                          type="button"
                          onClick={() => setCpfInput('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    {searchError && (
                      <motion.p 
                        initial={{ opacity: 0, h: 0 }}
                        animate={{ opacity: 1, h: 'auto' }}
                        className="text-red-600 text-sm mt-3 font-medium bg-red-50 p-3 rounded-xl border border-red-100 flex items-start gap-2"
                      >
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{searchError}</span>
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-85 text-base sm:text-lg group"
                  >
                    {isSearching ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Consultando Banco de Dados...</span>
                      </>
                    ) : (
                      <>
                        <span>Acessar Meu Cadastro</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Active Customer Tracking Dashboard */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Top Welcome and Return banner */}
              <div className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-3xl border border-slate-100 shadow-md p-6 gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                    <User className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                      Pedido em Monitoramento Mapeado
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {activeCustomer.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      CPF Cadastrado: {activeCustomer.cpf} | Email: {activeCustomer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setActiveCustomer(null);
                      setCpfInput('');
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 py-3 px-5 rounded-2xl transition-all cursor-pointer border border-slate-200"
                  >
                    <X className="h-4 w-4" />
                    <span>Consultar Outro CPF</span>
                  </button>
                </div>
              </div>

              {/* Left Side: Steps Progress */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                
                {/* Critical Attention Message about Customized Formula */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-start gap-4.5">
                    <div className="h-11 w-11 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-300 border border-indigo-500/20 shrink-0">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        Aviso Importante: Alta Demanda de Manipulação 🧪
                      </h3>
                      <p className="text-sm mt-2 text-indigo-200 leading-relaxed font-light">
                        Devido ao altíssimo volume de pedidos originados de nossa recente veiculação de fórmulas exclusivas, informamos que o seu pedido encontra-se atualmente na etapa de <strong className="text-indigo-100 font-semibold underline decoration-emerald-400 decoration-2">Formulação em andamento</strong>. 
                      </p>
                      <p className="text-sm mt-3 text-indigo-200 leading-relaxed font-light">
                        Cada produto é produzido de maneira minuciosamente testada para o seu perfil. Para assegurar a integridade farmacológica da sua fórmula personalizada, o prazo desta etapa foi readequado. Fique calmo! Nosso controle de qualidade laboratorial está atuando em plena capacidade.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Histórico de Entrega</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Etapas sequenciais da unidade fabril à residência</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                      <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full" />
                      Produzindo Fórmula
                    </span>
                  </div>

                  {/* 7-Step List */}
                  <div className="relative pl-6 lg:pl-8 space-y-8 py-2">
                    {/* Vertical timeline connector */}
                    <div className="absolute top-4 bottom-4 left-[14px] lg:left-[18px] w-[2px] bg-slate-100" />

                    {/* Step 1: Formulação em andamento */}
                    <div className="relative group">
                      <div className="absolute -left-[24px] lg:-left-[28px] top-1 h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-emerald-600 border-4 border-emerald-100 flex items-center justify-center text-white shadow-md animate-pulse">
                        <span className="h-1.5 w-1.5 bg-white rounded-full" />
                      </div>
                      <div className="bg-emerald-50/70 border border-emerald-100 p-4.5 rounded-2xl relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <span>Formulação em andamento</span>
                            <span className="bg-emerald-200/60 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                              Estágio Atual
                            </span>
                          </h4>
                          <span className="text-xs text-emerald-700 font-bold font-mono">
                            Hoje (2026-05-26)
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          A fase em que o produto ainda está sendo produzido de forma sob medida no laboratório. Devido à alta demanda de pedidos, estamos processando sua fórmula personalizada com toda a segurança dos ativos.
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Em separação */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm">Em separação</h4>
                        <p className="text-xs text-slate-500 mt-1">Conferência de embalagem, peso e lote físico no estoque central.</p>
                      </div>
                    </div>

                    {/* Step 3: Em rota de entrega */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm">Em rota de entrega</h4>
                        <p className="text-xs text-slate-500 mt-1">Despacho de carga via courier expresso.</p>
                      </div>
                    </div>

                    {/* Step 4: Chegou na sua Cidade */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm">Chegou na sua Cidade</h4>
                        <p className="text-xs text-slate-500 mt-1">Entrada no Centro de Distribuição Municipal.</p>
                      </div>
                    </div>

                    {/* Step 5: Em separação */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm">Em separação</h4>
                        <p className="text-xs text-slate-500 mt-1">Separação de remessas e roteirização do portador local.</p>
                      </div>
                    </div>

                    {/* Step 6: Em rota de entrega */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm">Em rota de entrega</h4>
                        <p className="text-xs text-slate-500 mt-1">Motorista local em trânsito de entrega de última milha (last mile).</p>
                      </div>
                    </div>

                    {/* Step 7: Entregue */}
                    <div className="relative group opacity-45">
                      <div className="absolute -left-[19px] lg:-left-[23px] top-1.5 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-white" />
                      <div className="pl-3">
                        <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5">
                          <span>Entregue</span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">Mercadoria recebida e assinada.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Side: Address & Payment Info */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                
                {/* Delivery Information Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      Endereço de Entrega
                    </h3>
                    <button
                      onClick={() => setShowLockAlert(true)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg"
                    >
                      Editar
                    </button>
                  </div>

                  {/* Lock Alert Modal style on top of card */}
                  <AnimatePresence>
                    {showLockAlert && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <Lock className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-bold text-amber-900">Endereço Bloqueado em Produção</div>
                            <p className="text-[11px] text-amber-700 mt-1 leading-normal">
                              Para sua segurança, a edição de endereço está desabilitada no painel público uma vez que a etapa de <strong>Formulação em andamento</strong> já foi iniciada pelo laboratório químico. Caso necessite de alterações críticas, acione o suporte.
                            </p>
                            <button 
                              onClick={() => setShowLockAlert(false)}
                              className="text-[10px] text-amber-950 font-black underline mt-2 uppercase tracking-wide cursor-pointer hover:text-black"
                            >
                              Entendi, fechar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-3.5">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Destinatário</span>
                      <span className="text-sm font-bold text-slate-800">{activeCustomer.name}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Logradouro</span>
                        <span className="text-sm font-semibold text-slate-800">
                          {activeCustomer.delivery.street}, {activeCustomer.delivery.number}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Bairro</span>
                        <span className="text-sm font-semibold text-slate-800">{activeCustomer.delivery.neighborhood}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Cidade / Estado</span>
                        <span className="text-sm font-semibold text-slate-800">
                          {activeCustomer.delivery.city} / {activeCustomer.delivery.state}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">CEP</span>
                        <span className="text-sm font-mono font-bold text-slate-800">{activeCustomer.delivery.cep}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50">
                      <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">Complemento</span>
                      <span className="text-sm text-slate-700 italic">{activeCustomer.delivery.complement}</span>
                    </div>
                  </div>
                </div>

                {/* Billing and Tracking Meta Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
                  <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 mb-5 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                    Dados do Pagamento
                  </h3>

                  <div className="space-y-4">
                    {/* Render specific payment type */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/50">
                      <div className="p-2.5 bg-white text-slate-700 rounded-xl shadow-xs border border-slate-100 shrink-0">
                        {activeCustomer.payment.method === 'card' ? (
                          <CreditCard className="h-5 w-5 text-emerald-600" />
                        ) : activeCustomer.payment.method === 'pix' ? (
                          <div className="font-black text-xs text-emerald-600 font-display">Pix</div>
                        ) : (
                          <FileText className="h-5 w-5 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Forma de Pagamento</span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {activeCustomer.payment.method === 'card' 
                            ? `Cartão de Crédito (${activeCustomer.payment.details})`
                            : activeCustomer.payment.method === 'pix'
                            ? "Pix Integrado (Aprovado)"
                            : "Boleto Bancário (Quitado)"}
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50/60 rounded-xl">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Valor Total</span>
                        <span className="text-sm font-black text-slate-900">{activeCustomer.payment.amount || "R$ 297,00"}</span>
                      </div>
                      <div className="p-3 bg-slate-50/60 rounded-xl">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Parcelamento</span>
                        <span className="text-xs font-semibold text-slate-700">{activeCustomer.payment.installments || "À vista"}</span>
                      </div>
                    </div>

                    {/* Meta info block */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" /> Skype/E-mail
                        </span>
                        <span className="text-slate-800 font-semibold">{activeCustomer.email}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" /> Telefone comercial
                        </span>
                        <span className="text-slate-800 font-semibold">{activeCustomer.phone}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5" /> IP de Compra Registrado
                        </span>
                        <span className="text-slate-800 font-mono font-medium">{activeCustomer.ip}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-dashed border-slate-100">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          Status Tributário
                        </span>
                        <button 
                          onClick={() => setShowTaxAlert(!showTaxAlert)}
                          className="text-emerald-700 hover:text-emerald-800 cursor-pointer text-[10px] font-black uppercase tracking-wide bg-emerald-50 px-1.5 py-0.5 rounded"
                        >
                          Isento
                        </button>
                      </div>

                      {showTaxAlert && (
                        <motion.div
                          initial={{ opacity: 0, h: 0 }}
                          animate={{ opacity: 1, h: 'auto' }}
                          className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 tracking-wide"
                        >
                          Pedido faturado sob regime especial de fabricação personalizada de fórmulas exclusivas. Isento de recolhimento complementar interestadual.
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quality certificate seal */}
                <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100/60 text-center">
                  <div className="inline-flex p-3 bg-white rounded-2xl text-emerald-600 border border-emerald-100 shadow-xs mb-3">
                    <CheckCircle className="h-6 w-6 stroke-[2]" />
                  </div>
                  <h4 className="font-bold text-emerald-950 text-sm">Garantia KeraLab de Autenticidade</h4>
                  <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed max-w-sm mx-auto">
                    Nossas fórmulas ativas de alta demanda seguem as diretrizes mais rigorosas do controle de qualidade e manipulação química. Código de rastreamento de fábrica ativo.
                  </p>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200 pt-8 text-center text-xs text-slate-400 space-y-2">
          <p>© 2026 FórmulaTracker Laboratórios S.A. Todos os direitos reservados.</p>
          <p className="max-w-xl mx-auto text-[11px] leading-relaxed text-slate-400/80">
            Este painel serve exclusivamente para o acompanhamento personalizado das etapas de preparação, centrifugação e envio express. Todos os dados são protegidos por criptografia de ponta a ponta.
          </p>
        </footer>
      </div>
    </div>
  );
}
