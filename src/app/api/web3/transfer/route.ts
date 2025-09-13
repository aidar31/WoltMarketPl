import { NextRequest, NextResponse } from 'next/server'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { createTransferInstruction, getAccount } from '@solana/spl-token'

// Подключение к Solana Devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromTokenAccount, toTokenAccount, amount, mint } = body

    if (!fromTokenAccount || !toTokenAccount || !amount || !mint) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Создаем транзакцию
    const transaction = new Transaction()

    // Создаем инструкцию перевода
    const transferInstruction = createTransferInstruction(
      new PublicKey(fromTokenAccount), // source
      new PublicKey(toTokenAccount), // destination
      new PublicKey(fromTokenAccount), // owner (в реальном проекте используйте правильный owner)
      amount // amount
    )

    transaction.add(transferInstruction)

    // Подписываем и отправляем транзакцию
    const signature = await connection.sendTransaction(transaction, [])
    
    // Ждем подтверждения
    await connection.confirmTransaction(signature)

    return NextResponse.json({
      message: 'Transfer successful',
      signature,
      amount
    })
  } catch (error) {
    console.error('Transfer error:', error)
    return NextResponse.json(
      { error: 'Failed to transfer tokens' },
      { status: 500 }
    )
  }
}
