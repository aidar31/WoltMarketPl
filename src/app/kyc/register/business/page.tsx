"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"

export default function BusinessRegistrationPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    registrationNumber: "",
    registrationDate: "",
    taxNumber: "",
    legalAddress: "",
    physicalAddress: "",
    businessType: "",
    industry: "",
    directorFirstName: "",
    directorLastName: "",
    directorDob: "",
    directorIdNumber: "",
    phoneNumber: "",
    ownershipStructure: "",
    website: ""
  })

  const [files, setFiles] = useState({
    directorIdDocument: null as File | null,
    directorSelfie: null as File | null,
    companyRegistrationCertificate: null as File | null,
    taxRegistrationCertificate: null as File | null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFiles(prev => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submitFormData = new FormData()
      
      // Добавляем данные формы
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitFormData.append(key, value)
      })
      
      // Добавляем файлы
      if (files.directorIdDocument) {
        submitFormData.append('directorIdDocument', files.directorIdDocument)
      }
      if (files.directorSelfie) {
        submitFormData.append('directorSelfie', files.directorSelfie)
      }
      if (files.companyRegistrationCertificate) {
        submitFormData.append('companyRegistrationCertificate', files.companyRegistrationCertificate)
      }
      if (files.taxRegistrationCertificate) {
        submitFormData.append('taxRegistrationCertificate', files.taxRegistrationCertificate)
      }
      
      const response = await fetch('/api/kyc/register/business', {
        method: 'POST',
        body: submitFormData
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Сохраняем токен
        localStorage.setItem('token', result.token)
        // Перенаправляем на демо
        window.location.href = '/demo'
      } else {
        alert(result.error || 'Ошибка регистрации')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Ошибка регистрации')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="mb-8">
          <Link href="/kyc" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к выбору типа регистрации
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-accent" />
              </div>
              Регистрация бизнеса
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Информация о компании */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Информация о компании</h3>
                <div>
                  <Label htmlFor="companyName">Название компании *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="registrationNumber">Регистрационный номер *</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationDate">Дата регистрации *</Label>
                    <Input
                      id="registrationDate"
                      name="registrationDate"
                      type="date"
                      value={formData.registrationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="taxNumber">Налоговый номер *</Label>
                  <Input
                    id="taxNumber"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="legalAddress">Юридический адрес *</Label>
                    <Input
                      id="legalAddress"
                      name="legalAddress"
                      value={formData.legalAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="physicalAddress">Физический адрес *</Label>
                    <Input
                      id="physicalAddress"
                      name="physicalAddress"
                      value={formData.physicalAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="businessType">Тип бизнеса *</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип бизнеса" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llc">ТОО</SelectItem>
                        <SelectItem value="individual">ИП</SelectItem>
                        <SelectItem value="partnership">Товарищество</SelectItem>
                        <SelectItem value="corporation">АО</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Отрасль *</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите отрасль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Технологии</SelectItem>
                        <SelectItem value="retail">Розничная торговля</SelectItem>
                        <SelectItem value="manufacturing">Производство</SelectItem>
                        <SelectItem value="services">Услуги</SelectItem>
                        <SelectItem value="agriculture">Сельское хозяйство</SelectItem>
                        <SelectItem value="construction">Строительство</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Веб-сайт (необязательно)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Информация о директоре */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Информация о директоре</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="directorFirstName">Имя директора *</Label>
                    <Input
                      id="directorFirstName"
                      name="directorFirstName"
                      value={formData.directorFirstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="directorLastName">Фамилия директора *</Label>
                    <Input
                      id="directorLastName"
                      name="directorLastName"
                      value={formData.directorLastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="directorDob">Дата рождения директора *</Label>
                    <Input
                      id="directorDob"
                      name="directorDob"
                      type="date"
                      value={formData.directorDob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="directorIdNumber">Номер документа директора *</Label>
                    <Input
                      id="directorIdNumber"
                      name="directorIdNumber"
                      value={formData.directorIdNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Контактный телефон *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownershipStructure">Структура собственности (необязательно)</Label>
                  <Input
                    id="ownershipStructure"
                    name="ownershipStructure"
                    value={formData.ownershipStructure}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Загрузка документов */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Загрузка документов</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="directorIdDocument">Документ директора *</Label>
                    <div className="mt-2">
                      <Input
                        id="directorIdDocument"
                        name="directorIdDocument"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="directorSelfie">Селфи директора с документом *</Label>
                    <div className="mt-2">
                      <Input
                        id="directorSelfie"
                        name="directorSelfie"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="companyRegistrationCertificate">Свидетельство о регистрации *</Label>
                    <div className="mt-2">
                      <Input
                        id="companyRegistrationCertificate"
                        name="companyRegistrationCertificate"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="taxRegistrationCertificate">Свидетельство о постановке на налоговый учет *</Label>
                    <div className="mt-2">
                      <Input
                        id="taxRegistrationCertificate"
                        name="taxRegistrationCertificate"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Аккаунт */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Данные для входа</h3>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="password">Пароль *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Зарегистрироваться
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
