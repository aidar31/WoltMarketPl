'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Token {
  mint: string
  name: string
  symbol: string
  decimals: number
  supply: number
  description?: string
  tokenAccount: string
  mintAuthority: string
  freezeAuthority: string | null
}

interface Transaction {
  id: string
  signature: string
  fromTokenAccount: string
  toTokenAccount: string
  amount: number
  mint: string
  status: string
  createdAt: string
}

export default function Web3Demo() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Форма создания токена
  const [tokenForm, setTokenForm] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    supply: 1000000,
    description: ''
  })

  // Форма перевода токенов
  const [transferForm, setTransferForm] = useState({
    fromTokenAccount: '',
    toTokenAccount: '',
    amount: 0,
    mint: ''
  })

  // Форма проверки баланса
  const [balanceForm, setBalanceForm] = useState({
    tokenAccount: ''
  })

  const [balance, setBalance] = useState<any>(null)

  // Загрузка данных
  const loadData = async () => {
    try {
      setLoading(true)
      const [tokensRes, transactionsRes] = await Promise.all([
        fetch('/api/web3/tokens'),
        fetch('/api/web3/transactions')
      ])
      
      const tokensData = await tokensRes.json()
      const transactionsData = await transactionsRes.json()
      
      setTokens(tokensData.tokens || [])
      setTransactions(transactionsData.transactions || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Создание токена
  const createToken = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/web3/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenForm)
      })
      
      const data = await response.json()
      if (response.ok) {
        setMessage('Токен успешно создан!')
        setTokenForm({ name: '', symbol: '', decimals: 9, supply: 1000000, description: '' })
        loadData()
      } else {
        setMessage(`Ошибка: ${data.error}`)
      }
    } catch (error) {
      console.error('Error creating token:', error)
      setMessage('Ошибка создания токена')
    } finally {
      setLoading(false)
    }
  }

  // Проверка баланса
  const checkBalance = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/web3/get-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(balanceForm)
      })
      
      const data = await response.json()
      if (response.ok) {
        setBalance(data)
        setMessage('Баланс получен!')
      } else {
        setMessage(`Ошибка: ${data.error}`)
        setBalance(null)
      }
    } catch (error) {
      console.error('Error checking balance:', error)
      setMessage('Ошибка проверки баланса')
    } finally {
      setLoading(false)
    }
  }

  // Перевод токенов
  const transferTokens = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/web3/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferForm)
      })
      
      const data = await response.json()
      if (response.ok) {
        setMessage('Перевод выполнен успешно!')
        setTransferForm({ fromTokenAccount: '', toTokenAccount: '', amount: 0, mint: '' })
        loadData()
      } else {
        setMessage(`Ошибка: ${data.error}`)
      }
    } catch (error) {
      console.error('Error transferring tokens:', error)
      setMessage('Ошибка перевода токенов')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Web3 Демо (Симуляция)</h1>
        <p className="text-muted-foreground">
          Демонстрация функциональности создания токенов, переводов и проверки балансов
        </p>
      </div>

      {message && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">{message}</p>
        </div>
      )}

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Создать токен</TabsTrigger>
          <TabsTrigger value="balance">Проверить баланс</TabsTrigger>
          <TabsTrigger value="transfer">Перевести токены</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Создание токена</CardTitle>
              <CardDescription>
                Создайте новый токен в симуляции блокчейна
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createToken} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Название токена</Label>
                    <Input
                      id="name"
                      value={tokenForm.name}
                      onChange={(e) => setTokenForm({...tokenForm, name: e.target.value})}
                      placeholder="My Token"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="symbol">Символ</Label>
                    <Input
                      id="symbol"
                      value={tokenForm.symbol}
                      onChange={(e) => setTokenForm({...tokenForm, symbol: e.target.value})}
                      placeholder="MTK"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="decimals">Десятичные знаки</Label>
                    <Input
                      id="decimals"
                      type="number"
                      value={tokenForm.decimals}
                      onChange={(e) => setTokenForm({...tokenForm, decimals: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="supply">Общее количество</Label>
                    <Input
                      id="supply"
                      type="number"
                      value={tokenForm.supply}
                      onChange={(e) => setTokenForm({...tokenForm, supply: Number(e.target.value)})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Input
                    id="description"
                    value={tokenForm.description}
                    onChange={(e) => setTokenForm({...tokenForm, description: e.target.value})}
                    placeholder="Описание токена"
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Создание...' : 'Создать токен'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Проверка баланса</CardTitle>
              <CardDescription>
                Проверьте баланс токен аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={checkBalance} className="space-y-4">
                <div>
                  <Label htmlFor="tokenAccount">Адрес токен аккаунта</Label>
                  <Input
                    id="tokenAccount"
                    value={balanceForm.tokenAccount}
                    onChange={(e) => setBalanceForm({...balanceForm, tokenAccount: e.target.value})}
                    placeholder="Введите адрес токен аккаунта"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Проверка...' : 'Проверить баланс'}
                </Button>
              </form>
              
              {balance && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800">Информация о балансе:</h3>
                  <p><strong>Баланс:</strong> {balance.balance}</p>
                  <p><strong>Mint:</strong> {balance.mint}</p>
                  <p><strong>Владелец:</strong> {balance.owner}</p>
                  <p><strong>Десятичные знаки:</strong> {balance.decimals}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfer">
          <Card>
            <CardHeader>
              <CardTitle>Перевод токенов</CardTitle>
              <CardDescription>
                Переведите токены между аккаунтами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={transferTokens} className="space-y-4">
                <div>
                  <Label htmlFor="fromAccount">От аккаунта</Label>
                  <Input
                    id="fromAccount"
                    value={transferForm.fromTokenAccount}
                    onChange={(e) => setTransferForm({...transferForm, fromTokenAccount: e.target.value})}
                    placeholder="Адрес отправителя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="toAccount">К аккаунту</Label>
                  <Input
                    id="toAccount"
                    value={transferForm.toTokenAccount}
                    onChange={(e) => setTransferForm({...transferForm, toTokenAccount: e.target.value})}
                    placeholder="Адрес получателя"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Количество</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={transferForm.amount}
                      onChange={(e) => setTransferForm({...transferForm, amount: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mint">Mint адрес</Label>
                    <Input
                      id="mint"
                      value={transferForm.mint}
                      onChange={(e) => setTransferForm({...transferForm, mint: e.target.value})}
                      placeholder="Mint адрес токена"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Перевод...' : 'Перевести токены'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Созданные токены</CardTitle>
                <CardDescription>
                  Список всех созданных токенов
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tokens.length === 0 ? (
                  <p className="text-muted-foreground">Токены не найдены</p>
                ) : (
                  <div className="space-y-2">
                    {tokens.map((token, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{token.name} ({token.symbol})</h3>
                            <p className="text-sm text-muted-foreground">{token.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Supply: {token.supply} | Decimals: {token.decimals}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p><strong>Mint:</strong> {token.mint}</p>
                          <p><strong>Token Account:</strong> {token.tokenAccount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История транзакций</CardTitle>
                <CardDescription>
                  Все выполненные переводы токенов
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-muted-foreground">Транзакции не найдены</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.map((tx, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Перевод {tx.amount} токенов</h3>
                            <p className="text-sm text-muted-foreground">
                              От: {tx.fromTokenAccount.slice(0, 8)}...{tx.fromTokenAccount.slice(-8)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              К: {tx.toTokenAccount.slice(0, 8)}...{tx.toTokenAccount.slice(-8)}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p><strong>Signature:</strong> {tx.signature.slice(0, 16)}...</p>
                          <p><strong>Mint:</strong> {tx.mint}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

