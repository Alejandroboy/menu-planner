# Menu Planner

## Быстрый старт

```bash
# 1. Поднять PostgreSQL
docker compose up -d

# 2. Настроить окружение
cp apps/api/.env.example apps/api/.env

# 3. Установить зависимости
yarn install

# 4. Накатить схему и залить данные
cd apps/api
yarn prisma:migrate
yarn prisma:seed
cd ../..

# 5. Запустить
yarn dev
# API  → http://localhost:3000/api/v1
# Docs → http://localhost:3000/api/docs
# Web  → http://localhost:5173
```

## Стек

| Слой        | Технология                    |
| ----------- | ----------------------------- |
| Backend     | NestJS + Fastify              |
| ORM         | Prisma                        |
| База данных | PostgreSQL 16                 |
| Frontend    | React + Vite + TanStack Query |
| Стили       | Tailwind CSS                  |
| Монорепо    | Yarn Workspaces               |

## Структура

```
menu-planner/
├── apps/
│   ├── api/           # NestJS backend
│   │   ├── prisma/    # schema.prisma + seed.sql
│   │   └── src/
│   └── web/           # React frontend
│       └── src/
├── docker-compose.yml # PostgreSQL
└── packages/          # shared пакеты (по необходимости)
```

## Скрипты

```bash
yarn dev          # api + web одновременно
yarn lint:fix     # автофикс ESLint
yarn format       # prettier по всему репо
yarn typecheck    # проверка типов
```
