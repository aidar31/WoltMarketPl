# Web3 API Service

Отдельный API сервис для Web3 операций, чтобы избежать ограничений Vercel по размеру Serverless Functions.

## Установка

```bash
cd web3-api
npm install
```

## Запуск

```bash
# Development
npm run dev

# Production
npm start
```

## Переменные окружения

Скопируйте `env.example` в `.env` и настройте:

- `PORT` - порт для API сервиса (по умолчанию 3001)
- `FRONTEND_URL` - URL фронтенда для CORS
- `NODE_ENV` - окружение (development/production)

## API Endpoints

- `GET /health` - проверка здоровья сервиса
- `POST /api/create-token` - создание токена
- `POST /api/get-balance` - получение баланса токена
- `POST /api/transfer` - перевод токенов

## Деплой

Этот сервис можно задеплоить на:
- Railway
- Render
- Heroku
- DigitalOcean App Platform
- AWS Lambda (с serverless framework)

