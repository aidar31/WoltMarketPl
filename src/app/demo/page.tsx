"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChartBar, PriceChartLine } from "@/components/price-charts"
import { CreateTokenForm } from "@/components/create-token-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, BarChart3, Coins, Wallet } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад на главную
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Демо-платформа
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Полнофункциональная демо-версия торговой платформы
          </p>
          <Badge variant="secondary" className="mb-4">
            Solana Devnet
          </Badge>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Торговые графики */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  Торговые графики
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="candlestick" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="candlestick">Свечной график</TabsTrigger>
                    <TabsTrigger value="line">Линейный график</TabsTrigger>
                  </TabsList>
                  <TabsContent value="candlestick" className="mt-4">
                    <PriceChartBar />
                  </TabsContent>
                  <TabsContent value="line" className="mt-4">
                    <PriceChartLine />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Информационная панель */}
          <div className="space-y-6">
            {/* Статистика */}
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Активных токенов</span>
                  <span className="font-semibold text-foreground">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Объем торгов</span>
                  <span className="font-semibold text-foreground">$12,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Пользователей</span>
                  <span className="font-semibold text-foreground">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Сделок за 24ч</span>
                  <span className="font-semibold text-foreground">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Топ токены */}
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  Топ токены
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "TechCorp", symbol: "TECH", price: "$2.45", change: "+12.5%" },
                  { name: "RetailPro", symbol: "RTL", price: "$1.89", change: "+8.2%" },
                  { name: "GreenEnergy", symbol: "GREEN", price: "$3.12", change: "-2.1%" },
                  { name: "FoodChain", symbol: "FOOD", price: "$0.98", change: "+15.7%" },
                ].map((token, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <div>
                      <div className="font-medium text-foreground">{token.name}</div>
                      <div className="text-sm text-muted-foreground">{token.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{token.price}</div>
                      <div className={`text-sm ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Действия */}
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-secondary" />
                  Действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Подключить кошелек
                </Button>
                <Button variant="outline" className="w-full">
                  История сделок
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Форма создания токенов */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Создать токен
            </h3>
            <p className="text-muted-foreground">
              Создайте свой первый токен на Solana Devnet
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CreateTokenForm />
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 text-center">
          <Card className="border-border/50 bg-card/80 backdrop-blur max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Готовы начать?
              </h3>
              <p className="text-muted-foreground mb-6">
                Зарегистрируйтесь и создайте свой первый токен на Solana Devnet
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kyc/register">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Начать регистрацию
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Уже есть аккаунт?
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
