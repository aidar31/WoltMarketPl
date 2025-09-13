"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-accent/10 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm text-secondary">
            <Rocket className="mr-2 h-4 w-4" />
            Начните прямо сейчас
          </div>

          <h2 className="text-3xl font-bold text-foreground sm:text-5xl mb-6 text-balance">
            Готовы протестировать свою идею?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto">
            Присоединяйтесь к демо-бирже и изучите возможности токенизации вашего бизнеса в безопасной тестовой среде
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
              >
                Попробовать демо сейчас
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/kyc/register">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 bg-transparent"
              >
                Создать токен
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
    </section>
  )
}
