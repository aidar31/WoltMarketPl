"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, User } from "lucide-react"
import Link from "next/link"

export default function InvestorRegistrationPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    idDocumentType: "",
    idDocumentNumber: "",
    address: "",
    taxNumber: ""
  })

  const [files, setFiles] = useState({
    idDocumentFront: null as File | null,
    idDocumentBack: null as File | null,
    selfieWithId: null as File | null
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
      if (files.idDocumentFront) {
        submitFormData.append('idDocumentFront', files.idDocumentFront)
      }
      if (files.idDocumentBack) {
        submitFormData.append('idDocumentBack', files.idDocumentBack)
      }
      if (files.selfieWithId) {
        submitFormData.append('selfieWithId', files.selfieWithId)
      }
      
      const response = await fetch('/api/kyc/register/investor', {
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
      <div className="container mx-auto max-w-2xl px-4 py-20">
        <div className="mb-8">
          <Link href="/kyc" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к выбору типа регистрации
          </Link>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-secondary" />
              </div>
              Регистрация инвестора
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Основная информация */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Основная информация</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="dateOfBirth">Дата рождения *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Номер телефона *</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Адрес *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Документы */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Документы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="idDocumentType">Тип документа *</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, idDocumentType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип документа" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id_card">Удостоверение личности</SelectItem>
                        <SelectItem value="passport">Паспорт</SelectItem>
                        <SelectItem value="driver_license">Водительские права</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="idDocumentNumber">Номер документа *</Label>
                    <Input
                      id="idDocumentNumber"
                      name="idDocumentNumber"
                      value={formData.idDocumentNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="taxNumber">ИИН (необязательно)</Label>
                  <Input
                    id="taxNumber"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Загрузка файлов */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Загрузка документов</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="idDocumentFront">Лицевая сторона документа *</Label>
                    <div className="mt-2">
                      <Input
                        id="idDocumentFront"
                        name="idDocumentFront"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="idDocumentBack">Обратная сторона документа *</Label>
                    <div className="mt-2">
                      <Input
                        id="idDocumentBack"
                        name="idDocumentBack"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="selfieWithId">Селфи с документом *</Label>
                    <div className="mt-2">
                      <Input
                        id="selfieWithId"
                        name="selfieWithId"
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

              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Зарегистрироваться
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
