"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Coins } from "lucide-react"

export function CreateTokenForm() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimals: "9",
    supply: "",
    description: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/web3/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Токен создан успешно!\nMint: ${result.token.mint}`)
        // Сбрасываем форму
        setFormData({
          name: "",
          symbol: "",
          decimals: "9",
          supply: "",
          description: ""
        })
      } else {
        alert(result.error || 'Ошибка создания токена')
      }
    } catch (error) {
      console.error('Token creation error:', error)
      alert('Ошибка создания токена')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <Coins className="h-4 w-4 text-secondary" />
          </div>
          Создать токен
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Название токена *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Например: MyToken"
              />
            </div>
            <div>
              <Label htmlFor="symbol">Символ токена *</Label>
              <Input
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                required
                placeholder="Например: MTK"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="decimals">Количество десятичных знаков *</Label>
              <Input
                id="decimals"
                name="decimals"
                type="number"
                value={formData.decimals}
                onChange={handleInputChange}
                required
                min="0"
                max="9"
              />
            </div>
            <div>
              <Label htmlFor="supply">Общее количество токенов *</Label>
              <Input
                id="supply"
                name="supply"
                type="number"
                value={formData.supply}
                onChange={handleInputChange}
                required
                placeholder="1000000"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Описание токена</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Краткое описание вашего токена..."
              rows={3}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Создание токена...' : 'Создать токен'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
