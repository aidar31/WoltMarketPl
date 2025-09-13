import { NextRequest, NextResponse } from 'next/server'
import { tokenDB } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, symbol, decimals, supply, description } = body

    // Валидация
    if (!name || !symbol || !decimals || !supply) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Создаем токен через симуляцию
    const token = await tokenDB.createToken({
      name,
      symbol,
      decimals: Number(decimals),
      supply: Number(supply),
      description,
    })

    return NextResponse.json({
      message: 'Token created successfully',
      token: {
        mint: token.mint,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        supply: token.supply,
        description: token.description,
        tokenAccount: token.tokenAccount,
        mintAuthority: token.mintAuthority,
        freezeAuthority: token.freezeAuthority
      }
    })
  } catch (error) {
    console.error('Token creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    )
  }
}
