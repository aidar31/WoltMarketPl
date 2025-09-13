import { NextRequest, NextResponse } from 'next/server'
import { transactionDB, tokenAccountDB } from '@/lib/db'

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

    // Проверяем, что отправитель имеет достаточно токенов
    const fromAccount = await tokenAccountDB.getBalance(fromTokenAccount)
    if (!fromAccount) {
      return NextResponse.json(
        { error: 'Source token account not found' },
        { status: 404 }
      )
    }

    if (fromAccount.amount < Number(amount)) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Проверяем, что получатель существует
    const toAccount = await tokenAccountDB.getBalance(toTokenAccount)
    if (!toAccount) {
      return NextResponse.json(
        { error: 'Destination token account not found' },
        { status: 404 }
      )
    }

    // Создаем транзакцию через симуляцию
    const transaction = await transactionDB.createTransaction({
      fromTokenAccount,
      toTokenAccount,
      amount: Number(amount),
      mint,
    })

    return NextResponse.json({
      message: 'Transfer successful',
      signature: transaction.signature,
      amount: transaction.amount,
      transactionId: transaction.id
    })
  } catch (error) {
    console.error('Transfer error:', error)
    return NextResponse.json(
      { error: 'Failed to transfer tokens' },
      { status: 500 }
    )
  }
}
