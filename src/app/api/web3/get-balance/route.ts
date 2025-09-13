import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'
import { getAccount } from '@solana/spl-token'

// Подключение к Solana Devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

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

    // Получаем информацию об аккаунте токена
    const accountInfo = await getAccount(connection, new PublicKey(tokenAccount))
    
    return NextResponse.json({
      balance: accountInfo.amount.toString(),
      mint: accountInfo.mint.toString(),
      owner: accountInfo.owner.toString(),
      decimals: accountInfo.mint.toString()
    })
  } catch (error) {
    console.error('Balance fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}
