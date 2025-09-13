import { NextResponse } from 'next/server'
import { transactionDB } from '@/lib/db'

// Получение всех транзакций
export async function GET() {
  try {
    const transactions = await transactionDB.getAllTransactions()
    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
