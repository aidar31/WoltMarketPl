import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Временное хранилище бизнесов (в реальном проекте используйте базу данных)
const businesses: any[] = []

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Извлекаем данные из формы
    const userId = formData.get('userId') as string
    const companyName = formData.get('companyName') as string
    const registrationNumber = formData.get('registrationNumber') as string
    const registrationDate = formData.get('registrationDate') as string
    const taxNumber = formData.get('taxNumber') as string
    const legalAddress = formData.get('legalAddress') as string
    const physicalAddress = formData.get('physicalAddress') as string
    const businessType = formData.get('businessType') as string
    const industry = formData.get('industry') as string
    const directorFirstName = formData.get('directorFirstName') as string
    const directorLastName = formData.get('directorLastName') as string
    const directorDob = formData.get('directorDob') as string
    const directorIdNumber = formData.get('directorIdNumber') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const ownershipStructure = formData.get('ownershipStructure') as string
    const website = formData.get('website') as string

    // Получаем файлы
    const directorIdDocument = formData.get('directorIdDocument') as File
    const directorSelfie = formData.get('directorSelfie') as File
    const companyRegistrationCertificate = formData.get('companyRegistrationCertificate') as File
    const taxRegistrationCertificate = formData.get('taxRegistrationCertificate') as File

    // Валидация
    if (!companyName || !registrationNumber || !registrationDate || !taxNumber || !legalAddress || !physicalAddress || !businessType || !industry || !directorFirstName || !directorLastName || !directorDob || !directorIdNumber || !phoneNumber || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Проверяем, существует ли уже бизнес с таким email
    const existingBusiness = businesses.find(biz => biz.email === email)
    if (existingBusiness) {
      return NextResponse.json(
        { error: 'Business already registered' },
        { status: 400 }
      )
    }

    // Создаем бизнес
    const business = {
      id: businesses.length + 1,
      userId: parseInt(userId) || businesses.length + 1,
      companyName,
      registrationNumber,
      registrationDate,
      taxNumber,
      legalAddress,
      physicalAddress,
      businessType,
      industry,
      directorFirstName,
      directorLastName,
      directorDob,
      directorIdNumber,
      phoneNumber,
      email,
      ownershipStructure,
      website,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      documents: {
        directorIdDocument: directorIdDocument ? await directorIdDocument.arrayBuffer() : null,
        directorSelfie: directorSelfie ? await directorSelfie.arrayBuffer() : null,
        companyRegistrationCertificate: companyRegistrationCertificate ? await companyRegistrationCertificate.arrayBuffer() : null,
        taxRegistrationCertificate: taxRegistrationCertificate ? await taxRegistrationCertificate.arrayBuffer() : null
      }
    }

    businesses.push(business)

    // Создаем JWT токен
    const token = jwt.sign(
      { userId: business.userId, email: business.email, type: 'business' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Business registered successfully',
      business: {
        id: business.id,
        companyName: business.companyName,
        email: business.email,
        verificationStatus: business.verificationStatus
      },
      token
    })
  } catch (error) {
    console.error('Business registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
