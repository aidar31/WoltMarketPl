# Интеграция с бэкендом

## Подключение FastAPI бэкенда

### 1. Настройка API

Создайте файл `src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = {
  // Регистрация пользователя
  registerUser: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return response.json()
  },

  // Регистрация инвестора
  registerInvestor: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/register/investor`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  },

  // Регистрация бизнеса
  registerBusiness: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/register/business`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  },

  // Вход в систему
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }
}
```

### 2. Обновление форм

Обновите компоненты форм для отправки данных на бэкенд:

```typescript
// В investor/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const formData = new FormData()
  formData.append('user_id', userId)
  formData.append('first_name', formData.firstName)
  // ... остальные поля
  
  if (files.idDocumentFront) {
    formData.append('id_document_front', files.idDocumentFront)
  }
  // ... остальные файлы
  
  try {
    const result = await api.registerInvestor(formData)
    // Обработка успешной регистрации
  } catch (error) {
    // Обработка ошибок
  }
}
```

### 3. Аутентификация

Создайте контекст аутентификации:

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  user: any | null
  login: (credentials: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  
  const login = async (credentials: any) => {
    const result = await api.login(credentials)
    localStorage.setItem('token', result.access_token)
    setUser(result.user)
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

### 4. Защищенные маршруты

Создайте компонент для защищенных страниц:

```typescript
// src/components/ProtectedRoute.tsx
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    redirect('/login')
  }
  
  return <>{children}</>
}
```

### 5. Переменные окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=SolanaDemo
```

### 6. Запуск бэкенда

Для запуска FastAPI бэкенда:

```bash
cd kyc_service/backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 7. CORS настройки

Убедитесь, что в бэкенде настроен CORS для фронтенда:

```python
# В app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Дополнительные возможности

### 1. Обработка ошибок

Создайте компонент для отображения ошибок:

```typescript
// src/components/ErrorBoundary.tsx
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null)
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }
  
  return <>{children}</>
}
```

### 2. Загрузка состояний

Добавьте индикаторы загрузки:

```typescript
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  
  try {
    await api.registerInvestor(formData)
  } finally {
    setIsLoading(false)
  }
}

// В JSX
<Button type="submit" disabled={isLoading}>
  {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
</Button>
```

### 3. Валидация форм

Используйте react-hook-form с zod для валидации:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  // ... остальные поля
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

## Тестирование

### 1. Unit тесты

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### 2. E2E тесты

```bash
npm install --save-dev playwright
npx playwright install
```

## Деплой

### 1. Vercel

```bash
npm install -g vercel
vercel --prod
```

### 2. Docker

Создайте `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
