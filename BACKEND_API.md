# Backend API Documentation

## Обзор

Проект теперь включает полнофункциональный бэкенд API с поддержкой:
- Аутентификации и авторизации
- KYC регистрации
- Web3 функций для работы с Solana

## API Endpoints

### Аутентификация

#### POST `/api/auth/register`
Регистрация нового пользователя

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "investor" | "business"
}
```

**Ответ:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "userType": "investor"
  },
  "token": "jwt-token"
}
```

#### POST `/api/auth/login`
Вход в систему

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "userType": "investor"
  },
  "token": "jwt-token"
}
```

### KYC Регистрация

#### POST `/api/kyc/register/investor`
Регистрация инвестора

**Форма данных (multipart/form-data):**
- `firstName` - Имя
- `lastName` - Фамилия
- `dateOfBirth` - Дата рождения
- `phoneNumber` - Номер телефона
- `idDocumentType` - Тип документа
- `idDocumentNumber` - Номер документа
- `address` - Адрес
- `taxNumber` - ИИН (необязательно)
- `email` - Email
- `password` - Пароль
- `idDocumentFront` - Файл лицевой стороны документа
- `idDocumentBack` - Файл обратной стороны документа
- `selfieWithId` - Файл селфи с документом

#### POST `/api/kyc/register/business`
Регистрация бизнеса

**Форма данных (multipart/form-data):**
- `companyName` - Название компании
- `registrationNumber` - Регистрационный номер
- `registrationDate` - Дата регистрации
- `taxNumber` - Налоговый номер
- `legalAddress` - Юридический адрес
- `physicalAddress` - Физический адрес
- `businessType` - Тип бизнеса
- `industry` - Отрасль
- `directorFirstName` - Имя директора
- `directorLastName` - Фамилия директора
- `directorDob` - Дата рождения директора
- `directorIdNumber` - Номер документа директора
- `phoneNumber` - Контактный телефон
- `email` - Email
- `password` - Пароль
- `ownershipStructure` - Структура собственности (необязательно)
- `website` - Веб-сайт (необязательно)
- `directorIdDocument` - Документ директора
- `directorSelfie` - Селфи директора с документом
- `companyRegistrationCertificate` - Свидетельство о регистрации
- `taxRegistrationCertificate` - Свидетельство о постановке на налоговый учет

### Web3 API

#### POST `/api/web3/create-token`
Создание токена на Solana

**Тело запроса:**
```json
{
  "name": "MyToken",
  "symbol": "MTK",
  "decimals": 9,
  "supply": 1000000,
  "description": "Описание токена"
}
```

**Ответ:**
```json
{
  "message": "Token created successfully",
  "token": {
    "mint": "mint-address",
    "name": "MyToken",
    "symbol": "MTK",
    "decimals": 9,
    "supply": 1000000,
    "description": "Описание токена",
    "tokenAccount": "token-account-address",
    "mintAuthority": "mint-authority-address",
    "freezeAuthority": null
  }
}
```

#### POST `/api/web3/get-balance`
Получение баланса токенов

**Тело запроса:**
```json
{
  "tokenAccount": "token-account-address"
}
```

**Ответ:**
```json
{
  "balance": "1000000000",
  "mint": "mint-address",
  "owner": "owner-address",
  "decimals": "9"
}
```

#### POST `/api/web3/transfer`
Перевод токенов

**Тело запроса:**
```json
{
  "fromTokenAccount": "from-token-account",
  "toTokenAccount": "to-token-account",
  "amount": 1000000,
  "mint": "mint-address"
}
```

**Ответ:**
```json
{
  "message": "Transfer successful",
  "signature": "transaction-signature",
  "amount": 1000000
}
```

## Web3 Функции

### Solana Integration

Проект использует официальную библиотеку `@solana/web3.js` для:
- Создания токенов (SPL Token)
- Управления балансами
- Переводов токенов
- Работы с кошельками

### Безопасность

- JWT токены для аутентификации
- Хеширование паролей с bcrypt
- Валидация входных данных
- Обработка ошибок

### Хранение данных

В текущей реализации используется временное хранилище в памяти. Для продакшена рекомендуется:
- PostgreSQL для пользователей и KYC данных
- IPFS для хранения документов
- Redis для кеширования

## Запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env.local` (см. ENVIRONMENT_SETUP.md)

3. Запустите проект:
```bash
npm run dev
```

API будет доступен по адресу `http://localhost:3000/api/`
