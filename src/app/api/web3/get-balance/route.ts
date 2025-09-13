import { NextRequest, NextResponse } from 'next/server'
import { tokenAccountDB } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tokenAccount } = body

    if (!tokenAccount) {
      return NextResponse.json(
        { error: 'Token account address is required' },
        { status: 400 }
      )
    }

    // Получаем информацию об аккаунте токена через симуляцию
    const accountInfo = await tokenAccountDB.getBalance(tokenAccount)
    
    if (!accountInfo) {
      return NextResponse.json(
        { error: 'Token account not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      balance: accountInfo.amount.toString(),
      mint: accountInfo.mint,
      owner: accountInfo.owner,
      decimals: accountInfo.decimals
    })
  } catch (error) {
    console.error('Balance fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}
