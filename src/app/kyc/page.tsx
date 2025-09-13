"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function KYCPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            KYC Верификация
          </h1>
          <p className="text-xl text-muted-foreground">
            Выберите тип регистрации для продолжения
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50 bg-card/80 backdrop-blur hover:bg-card transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary" />
                </div>
                Инвестор
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Регистрация для физических лиц, желающих инвестировать в токены малого бизнеса
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Верификация личности
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Загрузка документов
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Проверка данных
                </li>
              </ul>
              <Link href="/kyc/register/investor">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Зарегистрироваться как инвестор
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur hover:bg-card transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
                Бизнес
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Регистрация для компаний, желающих создать и выпустить собственные токены
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Верификация компании
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Документы о регистрации
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Создание токена
                </li>
              </ul>
              <Link href="/kyc/register/business">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Зарегистрироваться как бизнес
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Уже есть аккаунт?
          </p>
          <Link href="/login">
            <Button variant="outline">
              Войти в систему
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
