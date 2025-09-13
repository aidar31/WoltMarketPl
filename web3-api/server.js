const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
const { createMint, getOrCreateAssociatedTokenAccount, mintTo, createTransferInstruction, getAccount } = require('@solana/spl-token');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Подключение к Solana Devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Создание токена
app.post('/api/create-token', async (req, res) => {
  try {
    const { name, symbol, decimals, supply, description } = req.body;

    // Валидация
    if (!name || !symbol || !decimals || !supply) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Создаем новый ключ для минта
    const mintKeypair = Keypair.generate();
    
    // Создаем минт токена
    const mint = await createMint(
      connection,
      mintKeypair, // payer
      mintKeypair.publicKey, // mint authority
      null, // freeze authority
      decimals
    );

    // Создаем ассоциированный токен аккаунт
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      mintKeypair, // payer
      mint, // mint
      mintKeypair.publicKey // owner
    );

    // Минтим токены
    const mintAmount = supply * Math.pow(10, decimals);
    await mintTo(
      connection,
      mintKeypair, // payer
      mint, // mint
      tokenAccount.address, // destination
      mintKeypair, // authority
      mintAmount // amount
    );

    res.json({
      message: 'Token created successfully',
      token: {
        mint: mint.toString(),
        name,
        symbol,
        decimals,
        supply,
        description,
        tokenAccount: tokenAccount.address.toString(),
        mintAuthority: mintKeypair.publicKey.toString(),
        freezeAuthority: null
      }
    });
  } catch (error) {
    console.error('Token creation error:', error);
    res.status(500).json({ error: 'Failed to create token' });
  }
});

// Получение баланса токена
app.post('/api/get-balance', async (req, res) => {
  try {
    const { tokenAccount } = req.body;

    if (!tokenAccount) {
      return res.status(400).json({ error: 'Token account address is required' });
    }

    // Получаем информацию об аккаунте токена
    const accountInfo = await getAccount(connection, new PublicKey(tokenAccount));
    
    res.json({
      balance: accountInfo.amount.toString(),
      mint: accountInfo.mint.toString(),
      owner: accountInfo.owner.toString(),
      decimals: accountInfo.mint.toString()
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Перевод токенов
app.post('/api/transfer', async (req, res) => {
  try {
    const { fromTokenAccount, toTokenAccount, amount, mint } = req.body;

    if (!fromTokenAccount || !toTokenAccount || !amount || !mint) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Создаем транзакцию
    const transaction = new Transaction();

    // Создаем инструкцию перевода
    const transferInstruction = createTransferInstruction(
      new PublicKey(fromTokenAccount), // source
      new PublicKey(toTokenAccount), // destination
      new PublicKey(fromTokenAccount), // owner (в реальном проекте используйте правильный owner)
      amount // amount
    );

    transaction.add(transferInstruction);

    // Подписываем и отправляем транзакцию
    const signature = await connection.sendTransaction(transaction, []);
    
    // Ждем подтверждения
    await connection.confirmTransaction(signature);

    res.json({
      message: 'Transfer successful',
      signature,
      amount
    });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ error: 'Failed to transfer tokens' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Web3 API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

