import { Product } from '@/types/product';

import wheyImage from '@/assets/whey-protein.png';
import creatinaImage from '@/assets/creatina.png';
import preTreinoImage from '@/assets/pre-treino.png';
import bcaaImage from '@/assets/bcaa.png';

export const products: Product[] = [
  // Whey Protein
  {
    id: 'whey-1',
    name: 'Whey Protein Concentrado 900g',
    price: 89.90,
    image: wheyImage,
    category: 'Whey Protein',
    description: 'Proteína de alta qualidade para ganho de massa muscular'
  },
  {
    id: 'whey-2',
    name: 'Whey Protein Isolado 900g',
    price: 119.90,
    image: wheyImage,
    category: 'Whey Protein',
    description: 'Absorção rápida e baixo teor de gordura',
    isBestSeller: true
  },
  {
    id: 'whey-3',
    name: 'Whey Protein Hidrolisado 900g',
    price: 149.90,
    image: wheyImage,
    category: 'Whey Protein',
    description: 'Máxima absorção para resultados rápidos'
  },

  // Creatina
  {
    id: 'creatina-1',
    name: 'Creatina Monohidratada 300g',
    price: 59.90,
    image: creatinaImage,
    category: 'Creatina',
    description: 'Aumento de força e performance',
    isBestSeller: true
  },
  {
    id: 'creatina-2',
    name: 'Creatina Creapure 300g',
    price: 79.90,
    image: creatinaImage,
    category: 'Creatina',
    description: 'Creatina premium importada'
  },

  // Pré-Treino
  {
    id: 'pre-1',
    name: 'Pré-Treino Extreme 300g',
    price: 69.90,
    image: preTreinoImage,
    category: 'Pré-Treino',
    description: 'Energia e foco para treinos intensos',
    isBestSeller: true
  },
  {
    id: 'pre-2',
    name: 'Pré-Treino Hardcore 300g',
    price: 89.90,
    image: preTreinoImage,
    category: 'Pré-Treino',
    description: 'Máxima explosão muscular'
  },

  // Termogênicos
  {
    id: 'termo-1',
    name: 'Termogênico Black Fire 60 caps',
    price: 54.90,
    image: preTreinoImage,
    category: 'Termogênicos',
    description: 'Acelera o metabolismo e queima gordura'
  },
  {
    id: 'termo-2',
    name: 'Termogênico Lipo 6 Black 60 caps',
    price: 129.90,
    image: preTreinoImage,
    category: 'Termogênicos',
    description: 'Fórmula premium para definição'
  },

  // BCAA / Aminoácidos
  {
    id: 'bcaa-1',
    name: 'BCAA 2:1:1 - 120 caps',
    price: 49.90,
    image: bcaaImage,
    category: 'BCAA / Aminoácidos',
    description: 'Recuperação muscular e anti-catabólico',
    isBestSeller: true
  },
  {
    id: 'bcaa-2',
    name: 'BCAA Powder 300g',
    price: 69.90,
    image: bcaaImage,
    category: 'BCAA / Aminoácidos',
    description: 'BCAA em pó com sabor'
  },
  {
    id: 'amino-1',
    name: 'Glutamina 300g',
    price: 59.90,
    image: bcaaImage,
    category: 'BCAA / Aminoácidos',
    description: 'Recuperação e imunidade'
  },

  // Hipercalóricos
  {
    id: 'hiper-1',
    name: 'Hipercalórico Mass Gainer 3kg',
    price: 99.90,
    image: wheyImage,
    category: 'Hipercalóricos',
    description: 'Ganho de peso e massa muscular'
  },
  {
    id: 'hiper-2',
    name: 'Hipercalórico Monster Mass 3kg',
    price: 119.90,
    image: wheyImage,
    category: 'Hipercalóricos',
    description: 'Alta concentração calórica'
  },

  // Vitaminas e Minerais
  {
    id: 'vita-1',
    name: 'Multivitamínico Premium 60 caps',
    price: 39.90,
    image: bcaaImage,
    category: 'Vitaminas e Minerais',
    description: 'Complexo vitamínico completo'
  },
  {
    id: 'vita-2',
    name: 'Ômega 3 - 120 caps',
    price: 44.90,
    image: bcaaImage,
    category: 'Vitaminas e Minerais',
    description: 'Saúde cardiovascular'
  },
  {
    id: 'vita-3',
    name: 'Vitamina D3 - 60 caps',
    price: 29.90,
    image: bcaaImage,
    category: 'Vitaminas e Minerais',
    description: 'Fortalece ossos e imunidade'
  },

  // Barras e Snacks
  {
    id: 'barra-1',
    name: 'Barra de Proteína Chocolate (Caixa 12un)',
    price: 59.90,
    image: wheyImage,
    category: 'Barras e Snacks',
    description: 'Lanche proteico prático'
  },
  {
    id: 'barra-2',
    name: 'Pasta de Amendoim Integral 500g',
    price: 24.90,
    image: wheyImage,
    category: 'Barras e Snacks',
    description: 'Fonte natural de proteína e gorduras boas'
  },

  // Combos Promocionais
  {
    id: 'combo-1',
    name: 'Combo Iniciante (Whey + Creatina)',
    price: 129.90,
    image: wheyImage,
    category: 'Combos Promocionais',
    description: 'Kit completo para começar'
  },
  {
    id: 'combo-2',
    name: 'Combo Performance (Whey + Pré + BCAA)',
    price: 189.90,
    image: wheyImage,
    category: 'Combos Promocionais',
    description: 'Máxima performance nos treinos',
    isBestSeller: true
  },
  {
    id: 'combo-3',
    name: 'Combo Definição (Whey + Termogênico)',
    price: 159.90,
    image: wheyImage,
    category: 'Combos Promocionais',
    description: 'Para quem busca definição muscular'
  },
];

export const categories = [
  'Whey Protein',
  'Creatina',
  'Pré-Treino',
  'Termogênicos',
  'BCAA / Aminoácidos',
  'Hipercalóricos',
  'Vitaminas e Minerais',
  'Barras e Snacks',
  'Combos Promocionais',
];
