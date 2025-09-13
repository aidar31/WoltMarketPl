"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChartBar, PriceChartLine } from "@/components/price-charts"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"

export function DemoSection() {
  return (
    <section id="demo" className="py-20 bg-card/20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">Демо-платформа</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Посмотрите, как работает наша торговая платформа с реальными графиками и данными
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Trading Charts */}
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

          {/* Features Preview */}
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Возможности платформы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">Создание токенов</h4>
                    <p className="text-sm text-muted-foreground">
                      Выпускайте токены с настраиваемыми параметрами
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">Торговля</h4>
                    <p className="text-sm text-muted-foreground">
                      Покупайте и продавайте токены в реальном времени
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">Аналитика</h4>
                    <p className="text-sm text-muted-foreground">
                      Профессиональные инструменты анализа рынка
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/demo">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Попробовать полное демо
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
