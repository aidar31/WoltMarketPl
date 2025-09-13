import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Coins, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Зарегистрируйтесь",
    description: "Создайте аккаунт и загрузите документы для верификации бизнеса",
  },
  {
    number: "02",
    icon: Coins,
    title: "Создайте токен",
    description: "Выпустите собственный токен на Solana Devnet с нужными параметрами",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Тестируйте торговлю",
    description: "Изучайте рынок, торгуйте токенами и готовьтесь к реальному запуску",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">Как это работает</h2>
          <p className="text-xl text-muted-foreground text-pretty">Три простых шага до запуска вашего токена</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-border/50 bg-card/80 backdrop-blur h-full">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20 mb-4">
                      <step.icon className="h-10 w-10 text-secondary" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-secondary to-accent transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
