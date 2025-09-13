# Настройка переменных окружения

## Создайте файл `.env.local` в корне проекта:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_APP_NAME=SolanaDemo
```

## Описание переменных:

- `JWT_SECRET` - секретный ключ для подписи JWT токенов
- `NEXT_PUBLIC_SOLANA_RPC_URL` - URL для подключения к Solana Devnet
- `NEXT_PUBLIC_APP_NAME` - название приложения

## Важно:

1. Никогда не коммитьте файл `.env.local` в репозиторий
2. Используйте сложный секретный ключ в продакшене
3. Для продакшена используйте Mainnet RPC URL
