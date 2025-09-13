import { NextRequest, NextResponse } from 'next/server'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

// Подключение к Solana Devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

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

    // Создаем новый ключ для минта (в реальном проекте используйте безопасное хранение ключей)
    const mintKeypair = Keypair.generate()
    
    // Создаем минт токена
    const mint = await createMint(
      connection,
      mintKeypair, // payer
      mintKeypair.publicKey, // mint authority
      null, // freeze authority
      decimals
    )

    // Создаем ассоциированный токен аккаунт
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      mintKeypair, // payer
      mint, // mint
      mintKeypair.publicKey // owner
    )

    // Минтим токены
    const mintAmount = supply * Math.pow(10, decimals)
    await mintTo(
      connection,
      mintKeypair, // payer
      mint, // mint
      tokenAccount.address, // destination
      mintKeypair, // authority
      mintAmount // amount
    )

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Token creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    )
  }
}
