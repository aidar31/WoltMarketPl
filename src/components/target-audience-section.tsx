import { Card, CardContent } from "@/components/ui/card"
import { Building, Users, TrendingUp } from "lucide-react"

const audiences = [
  {
    icon: Building,
    title: "Малый бизнес",
    description: "Протестируйте идею токенизации вашего бизнеса без рисков и затрат",
    benefits: ["Изучение возможностей блокчейна", "Подготовка к реальному запуску", "Понимание рыночной динамики"],
  },
  {
    icon: Users,
    title: "Инвесторы",
    description: "Оцените потенциал проектов на раннем этапе развития",
    benefits: ["Ранний доступ к проектам", "Анализ команды и идеи", "Безрисковое тестирование"],
  },
  {
    icon: TrendingUp,
    title: "Стартапы",
    description: "Привлеките внимание к своему проекту и найдите первых инвесторов",
    benefits: ["Демонстрация концепции", "Привлечение инвестиций", "Обратная связь от рынка"],
  },
]

export function TargetAudienceSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">Для кого эта платформа</h2>
          <p className="text-xl text-muted-foreground text-pretty">Решение для разных участников рынка токенизации</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <Card key={index} className="border-border/50 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                  <audience.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-foreground">{audience.title}</h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">{audience.description}</p>
                <ul className="space-y-2">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-accent" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
