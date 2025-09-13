import { Card, CardContent } from "@/components/ui/card"
import { Building2, Rocket, Shield } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">О проекте</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Мы даём бизнесу простой инструмент выпуска токенов и тестовой торговли. Изучайте возможности блокчейна без
            рисков и затрат.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Для малого бизнеса</h3>
              <p className="text-muted-foreground">
                ИП, ТОО, стартапы и малые предприятия могут протестировать идею токенизации своего бизнеса
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Быстрый старт</h3>
              <p className="text-muted-foreground">
                Создайте токен за несколько минут и начните тестировать торговлю на демо-бирже
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Безопасно</h3>
              <p className="text-muted-foreground">
                Работаем в тестовой сети Solana Devnet — никаких реальных денег и рисков
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
