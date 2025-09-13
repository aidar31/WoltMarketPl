"use client"

import { Button } from "@/components/ui/button"
import { Coins, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary">
            <Coins className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">SolanaDemo</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            О проекте
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Возможности
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            Как работает
          </a>
          <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
            Демо
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              Войти
            </Button>
          </Link>
          <Link href="/demo">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Попробовать демо
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">
              О проекте
            </a>
            <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground transition-colors">
              Как работает
            </a>
            <a href="#demo" className="block text-muted-foreground hover:text-foreground transition-colors">
              Демо
            </a>
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Войти
                </Button>
              </Link>
              <Link href="/demo" className="block">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Попробовать демо
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
