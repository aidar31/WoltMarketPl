// Симуляция базы данных для Web3 функциональности
// В реальном проекте здесь будет подключение к настоящей БД

export interface Token {
  id: string;
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description?: string;
  tokenAccount: string;
  mintAuthority: string;
  freezeAuthority: string | null;
  createdAt: Date;
}

export interface TokenAccount {
  id: string;
  address: string;
  mint: string;
  owner: string;
  amount: number;
  decimals: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  signature: string;
  fromTokenAccount: string;
  toTokenAccount: string;
  amount: number;
  mint: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Date;
}

// In-memory хранилище (в реальном проекте используйте PostgreSQL, MongoDB и т.д.)
let tokens: Token[] = [];
let tokenAccounts: TokenAccount[] = [];
let transactions: Transaction[] = [];

// Генерация случайных адресов для симуляции
function generateAddress(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateSignature(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 88; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Функции для работы с токенами
export const tokenDB = {
  // Создание нового токена
  async createToken(data: {
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description?: string;
  }): Promise<Token> {
    const id = generateAddress();
    const mint = generateAddress();
    const tokenAccount = generateAddress();
    const mintAuthority = generateAddress();

    const token: Token = {
      id,
      mint,
      name: data.name,
      symbol: data.symbol,
      decimals: data.decimals,
      supply: data.supply,
      description: data.description,
      tokenAccount,
      mintAuthority,
      freezeAuthority: null,
      createdAt: new Date(),
    };

    // Создаем токен аккаунт
    const account: TokenAccount = {
      id: generateAddress(),
      address: tokenAccount,
      mint,
      owner: mintAuthority,
      amount: data.supply * Math.pow(10, data.decimals),
      decimals: data.decimals,
      createdAt: new Date(),
    };

    tokens.push(token);
    tokenAccounts.push(account);

    return token;
  },

  // Получение токена по ID
  async getTokenById(id: string): Promise<Token | null> {
    return tokens.find(token => token.id === id) || null;
  },

  // Получение токена по mint адресу
  async getTokenByMint(mint: string): Promise<Token | null> {
    return tokens.find(token => token.mint === mint) || null;
  },

  // Получение всех токенов
  async getAllTokens(): Promise<Token[]> {
    return [...tokens];
  },
};

// Функции для работы с токен аккаунтами
export const tokenAccountDB = {
  // Получение баланса токен аккаунта
  async getBalance(tokenAccountAddress: string): Promise<TokenAccount | null> {
    return tokenAccounts.find(account => account.address === tokenAccountAddress) || null;
  },

  // Создание нового токен аккаунта
  async createTokenAccount(data: {
    mint: string;
    owner: string;
    amount?: number;
  }): Promise<TokenAccount> {
    const account: TokenAccount = {
      id: generateAddress(),
      address: generateAddress(),
      mint: data.mint,
      owner: data.owner,
      amount: data.amount || 0,
      decimals: 9, // По умолчанию 9 decimals для Solana токенов
      createdAt: new Date(),
    };

    tokenAccounts.push(account);
    return account;
  },

  // Обновление баланса токен аккаунта
  async updateBalance(tokenAccountAddress: string, newAmount: number): Promise<boolean> {
    const account = tokenAccounts.find(acc => acc.address === tokenAccountAddress);
    if (account) {
      account.amount = newAmount;
      return true;
    }
    return false;
  },

  // Получение всех токен аккаунтов пользователя
  async getAccountsByOwner(owner: string): Promise<TokenAccount[]> {
    return tokenAccounts.filter(account => account.owner === owner);
  },
};

// Функции для работы с транзакциями
export const transactionDB = {
  // Создание новой транзакции
  async createTransaction(data: {
    fromTokenAccount: string;
    toTokenAccount: string;
    amount: number;
    mint: string;
  }): Promise<Transaction> {
    const transaction: Transaction = {
      id: generateAddress(),
      signature: generateSignature(),
      fromTokenAccount: data.fromTokenAccount,
      toTokenAccount: data.toTokenAccount,
      amount: data.amount,
      mint: data.mint,
      status: 'confirmed', // В симуляции сразу подтверждаем
      createdAt: new Date(),
    };

    // Обновляем балансы
    const fromAccount = tokenAccounts.find(acc => acc.address === data.fromTokenAccount);
    const toAccount = tokenAccounts.find(acc => acc.address === data.toTokenAccount);

    if (fromAccount && toAccount) {
      fromAccount.amount -= data.amount;
      toAccount.amount += data.amount;
    }

    transactions.push(transaction);
    return transaction;
  },

  // Получение транзакции по ID
  async getTransactionById(id: string): Promise<Transaction | null> {
    return transactions.find(tx => tx.id === id) || null;
  },

  // Получение транзакции по подписи
  async getTransactionBySignature(signature: string): Promise<Transaction | null> {
    return transactions.find(tx => tx.signature === signature) || null;
  },

  // Получение всех транзакций
  async getAllTransactions(): Promise<Transaction[]> {
    return [...transactions];
  },

  // Получение транзакций пользователя
  async getTransactionsByOwner(owner: string): Promise<Transaction[]> {
    const ownerAccounts = tokenAccounts.filter(acc => acc.owner === owner);
    const ownerAccountAddresses = ownerAccounts.map(acc => acc.address);
    
    return transactions.filter(tx => 
      ownerAccountAddresses.includes(tx.fromTokenAccount) || 
      ownerAccountAddresses.includes(tx.toTokenAccount)
    );
  },
};

// Функции для инициализации тестовых данных
export const initTestData = () => {
  // Очищаем существующие данные
  tokens = [];
  tokenAccounts = [];
  transactions = [];

  // Создаем тестовый токен
  tokenDB.createToken({
    name: 'Test Token',
    symbol: 'TEST',
    decimals: 9,
    supply: 1000000,
    description: 'Тестовый токен для демонстрации',
  });
};

// Экспорт всех функций
const db = {
  tokenDB,
  tokenAccountDB,
  transactionDB,
  initTestData,
};

export default db;
