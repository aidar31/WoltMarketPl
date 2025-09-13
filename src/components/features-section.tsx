import { Card, CardContent } from "@/components/ui/card"
import { Coins, TrendingUp, BarChart3, UserCheck, DollarSign, Zap } from "lucide-react"

const features = [
  {
    icon: Coins,
    title: "Создание токенов",
    description: "Выпускайте собственные токены на Solana Devnet с настраиваемыми параметрами",
    color: "text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Спотовая торговля",
    description: "Покупка и продажа токенов с реалистичной симуляцией рыночных условий",
    color: "text-accent",
  },
  {
    icon: BarChart3,
    title: "Графики и аналитика",
    description: "Профессиональные торговые графики и книга ордеров для анализа рынка",
    color: "text-primary",
  },
  {
    icon: UserCheck,
    title: "KYC для бизнеса",
    description: "Проверка и верификация бизнеса для подготовки к реальному запуску",
    color: "text-secondary",
  },
  {
    icon: DollarSign,
    title: "Бесплатное тестирование",
    description: "Полный функционал платформы доступен бесплатно в тестовом режиме",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Быстрые транзакции",
    description: "Мгновенные операции благодаря высокой скорости сети Solana",
    color: "text-primary",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">Возможности платформы</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Полный набор инструментов для создания, тестирования и анализа токенов
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/80 backdrop-blur hover:bg-card transition-colors group"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 group-hover:bg-muted/80 transition-colors">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
