import { NextResponse } from 'next/server'
import { tokenDB } from '@/lib/db'

// Получение всех токенов
export async function GET() {
  try {
    const tokens = await tokenDB.getAllTokens()
    return NextResponse.json({ tokens })
  } catch (error) {
    console.error('Get tokens error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    )
  }
}
