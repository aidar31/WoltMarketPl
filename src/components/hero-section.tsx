"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm text-secondary">
            <span className="mr-2 h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Работает на Solana Devnet
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Демо-биржа токенов для{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              малого бизнеса
            </span>{" "}
            на Solana
          </h1>

          <p className="mb-10 text-xl text-muted-foreground sm:text-2xl text-pretty max-w-3xl mx-auto">
            Создавайте токены, тестируйте торговлю и готовьтесь к выходу в рынок. Безопасная среда для изучения
            возможностей блокчейна.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/kyc/register">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
              >
                Создать токен
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Попробовать демо
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
    </section>
  )
}
