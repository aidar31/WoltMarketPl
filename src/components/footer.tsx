import { Coins } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary">
                <Coins className="h-5 w-5 text-secondary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SolanaDemo</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Демо-биржа токенов для малого бизнеса на Solana. Создавайте, тестируйте и готовьтесь к выходу в рынок.
            </p>
            <p className="text-sm text-muted-foreground">© 2024 SolanaDemo. Все права защищены.</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Платформа</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О проекте
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Возможности
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  Как работает
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-foreground transition-colors">
                  Демо
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/kyc" className="hover:text-foreground transition-colors">
                  KYC
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/demo" className="hover:text-foreground transition-colors">
                  Демо
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Войти
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
