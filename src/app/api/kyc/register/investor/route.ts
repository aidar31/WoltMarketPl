import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Временное хранилище инвесторов (в реальном проекте используйте базу данных)
const investors: any[] = []

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Извлекаем данные из формы
    const userId = formData.get('userId') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const idDocumentType = formData.get('idDocumentType') as string
    const idDocumentNumber = formData.get('idDocumentNumber') as string
    const address = formData.get('address') as string
    const taxNumber = formData.get('taxNumber') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Получаем файлы
    const idDocumentFront = formData.get('idDocumentFront') as File
    const idDocumentBack = formData.get('idDocumentBack') as File
    const selfieWithId = formData.get('selfieWithId') as File

    // Валидация
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !idDocumentType || !idDocumentNumber || !address || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Проверяем, существует ли уже инвестор с таким email
    const existingInvestor = investors.find(inv => inv.email === email)
    if (existingInvestor) {
      return NextResponse.json(
        { error: 'Investor already registered' },
        { status: 400 }
      )
    }

    // Создаем инвестора
    const investor = {
      id: investors.length + 1,
      userId: parseInt(userId) || investors.length + 1,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      idDocumentType,
      idDocumentNumber,
      address,
      taxNumber,
      email,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      documents: {
        idDocumentFront: idDocumentFront ? await idDocumentFront.arrayBuffer() : null,
        idDocumentBack: idDocumentBack ? await idDocumentBack.arrayBuffer() : null,
        selfieWithId: selfieWithId ? await selfieWithId.arrayBuffer() : null
      }
    }

    investors.push(investor)

    // Создаем JWT токен
    const token = jwt.sign(
      { userId: investor.userId, email: investor.email, type: 'investor' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Investor registered successfully',
      investor: {
        id: investor.id,
        firstName: investor.firstName,
        lastName: investor.lastName,
        email: investor.email,
        verificationStatus: investor.verificationStatus
      },
      token
    })
  } catch (error) {
    console.error('Investor registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
