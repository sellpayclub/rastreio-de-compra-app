export interface Customer {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cleanCpf: string;
  ip: string;
  payment: {
    method: 'card' | 'pix' | 'boleto';
    details?: string;
    amount?: string;
    installments?: string;
  };
  delivery: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
    cep: string;
  };
}

export const customers: Customer[] = [
  {
    name: "Solange da Silveira Barros",
    email: "solangesilveirabarros@yahoo.com.br",
    phone: "(83) 99628-9142",
    cpf: "136.296.114-00",
    cleanCpf: "13629611400",
    ip: "177.37.144.54",
    payment: {
      method: 'card',
      details: "4984********7920",
      amount: "R$ 311,50",
      installments: "5x de R$ 62,30"
    },
    delivery: {
      street: "Rua Valeriano Ferreira de Melo",
      number: "265",
      neighborhood: "Sandra Cavalcante",
      complement: "Casa",
      city: "Campina Grande",
      state: "PB",
      cep: "58410-865"
    }
  },
  {
    name: "Maria José Pereira dos Santos",
    email: "heloisadias93@gmail.com",
    phone: "(35) 99911-4233",
    cpf: "353.097.416-15",
    cleanCpf: "35309741615",
    ip: "138.121.220.227",
    payment: {
      method: 'card',
      details: "4854********9076",
      amount: "R$ 297,00",
      installments: "12x de R$ 24,75"
    },
    delivery: {
      street: "R Padre Alderije",
      number: "102",
      neighborhood: "São Bento de Caldas",
      complement: "casa",
      city: "Santa Rita de Caldas",
      state: "MG",
      cep: "37778-000"
    }
  },
  {
    name: "Luiz Carlos",
    email: "luizbahia96@gmail.com",
    phone: "(11) 99654-7638",
    cpf: "329.360.445-53",
    cleanCpf: "32936044553",
    ip: "187.74.23.224",
    payment: {
      method: 'pix',
      amount: "R$ 297,00" // reasonable generic amount for pix
    },
    delivery: {
      street: "Rua Donato Calabrez",
      number: "25",
      neighborhood: "Vila Zefira",
      complement: "Sobrado",
      city: "São Paulo",
      state: "SP",
      cep: "08411-120"
    }
  },
  {
    name: "Celso ferreira da Silva",
    email: "celsoferreira1740@gmail.com",
    phone: "(44) 99977-8393",
    cpf: "668.853.889-04",
    cleanCpf: "66885388904",
    ip: "187.26.129.67",
    payment: {
      method: 'boleto'
    },
    delivery: {
      street: "Avenida imbuia",
      number: "930",
      neighborhood: "Centro",
      complement: "Esquina com capel",
      city: "Perobal",
      state: "PR",
      cep: "87538-000"
    }
  },
  {
    name: "Ademar izabel de barros",
    email: "ademarizabeldebarros@gmail.com",
    phone: "(32) 98467-5949",
    cpf: "010.595.098-06",
    cleanCpf: "01059509806",
    ip: "191.38.232.225",
    payment: {
      method: 'pix'
    },
    delivery: {
      street: "Rua pio 3",
      number: "260",
      neighborhood: "Centro",
      complement: "Loja do vanderlei sales",
      city: "Senador Firmino",
      state: "MG",
      cep: "36540-000"
    }
  },
  {
    name: "Celso Diogenes Martins Dos Anjos Diogenes",
    email: "celsoanjos@gmail.com",
    phone: "(21) 96404-3069",
    cpf: "512.711.847-53",
    cleanCpf: "51271184753",
    ip: "179.158.48.109",
    payment: {
      method: 'card',
      details: "5346********8146",
      amount: "R$ 127,00",
      installments: "3x de R$ 42,33"
    },
    delivery: {
      street: "Rua General Otávio Povoa",
      number: "305",
      neighborhood: "Vila da Penha",
      complement: "601",
      city: "Rio de Janeiro",
      state: "RJ",
      cep: "21221-430"
    }
  },
  {
    name: "MAYKOW MORGAN",
    email: "maykowmorgan@gmail.com",
    phone: "(27) 99821-0646",
    cpf: "103.458.817-61",
    cleanCpf: "10345881761",
    ip: "179.193.102.111",
    payment: {
      method: 'pix'
    },
    delivery: {
      street: "TRAVESSA PAVAO",
      number: "80",
      neighborhood: "centro, vila pavão",
      complement: "Sem complemento",
      city: "Vila Pavão",
      state: "ES",
      cep: "29843-000"
    }
  },
  {
    name: "José Carlos Cabral Rodrigues",
    email: "zecaterraplenagem@gmail.com",
    phone: "(13) 99704-5504",
    cpf: "066.744.498-06",
    cleanCpf: "06674449806",
    ip: "138.97.221.164",
    payment: {
      method: 'card',
      details: "4078********0474",
      amount: "R$ 197,00",
      installments: "3x de R$ 65,67"
    },
    delivery: {
      street: "Rua Embare",
      number: "1408",
      neighborhood: "Morada da Praia",
      complement: "Q 110 L 13",
      city: "Bertioga",
      state: "SP",
      cep: "11270-205"
    }
  },
  {
    name: "MARCIO MARCELO DE ANDRADE LIMA",
    email: "mmalima26@yahoo.com.br",
    phone: "(81) 99203-3368",
    cpf: "217.913.334-00",
    cleanCpf: "21791333400",
    ip: "191.244.234.234",
    payment: {
      method: 'pix'
    },
    delivery: {
      street: "Rua Treze de Maio",
      number: "291",
      neighborhood: "Carmo",
      complement: "Jto a pousasda Alro Astral",
      city: "Olinda",
      state: "PE",
      cep: "53020-170"
    }
  }
];

export interface TrackingStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

export const getTrackingSteps = (dateStr: string = "Hoje"): TrackingStep[] => {
  return [
    {
      title: "Formulação em andamento",
      description: "Nossa equipe está produzindo e refinando sua fórmula personalizada de alta precisão com ativos exclusivos de alta qualidade.",
      status: 'current',
      date: dateStr
    },
    {
      title: "Em separação",
      description: "Os componentes do seu pedido serão catalogados e embalados em embalagens térmicas e seguras.",
      status: 'upcoming'
    },
    {
      title: "Em rota de entrega",
      description: "Despacho da fábrica e transferência para a transportadora expressa.",
      status: 'upcoming'
    },
    {
      title: "Chegou na sua Cidade",
      description: "Entrada do pacote na unidade de distribuição local mais próxima.",
      status: 'upcoming'
    },
    {
      title: "Em separação",
      description: "Triagem final para distribuição porta a porta.",
      status: 'upcoming'
    },
    {
      title: "Em rota de entrega",
      description: "O entregador saiu com sua encomenda para o endereço final.",
      status: 'upcoming'
    },
    {
      title: "Entregue",
      description: "Seu produto foi entregue com sucesso e assinado no endereço fornecido.",
      status: 'upcoming'
    }
  ];
};
