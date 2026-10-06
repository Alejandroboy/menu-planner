# Деплой в продакшен (VPS + Docker Compose)

Архитектура: один сервер, `docker compose`, 4 контейнера:

- **caddy** — единственный, кто слушает 80/443 снаружи. Терминирует TLS
  (автоматический Let's Encrypt), проксирует `/api/*` → `api`, всё
  остальное → `web`.
- **web** — статическая сборка React/Vite, раздаётся nginx.
- **api** — NestJS, слушает только внутри docker-сети (не публикуется наружу).
- **db** — Postgres 16, тоже только внутри docker-сети.

## 0. Требования

- VPS (Ubuntu/Debian) с публичным IP.
- Домен, A-запись которого указывает на IP сервера.
- Установлены Docker + Docker Compose plugin (`docker compose version`).
- Открыты порты 80 и 443 в firewall (ufw/security group). 5432/3000 наружу
  **не** открывать — они и так не публикуются в `docker-compose.prod.yml`.

## 1. Разместить код на сервере

```bash
git clone <url-репозитория> menu-planner
cd menu-planner
```

(или просто `rsync`/`scp` текущей копии — ключевое, чтобы на сервере был
актуальный `docker-compose.prod.yml`, `Caddyfile`, `apps/*/Dockerfile`).

## 2. Настроить переменные окружения

```bash
cp .env.production.example .env
```

Заполнить в `.env`:

- `POSTGRES_PASSWORD` — сгенерировать случайный, например `openssl rand -base64 24`.
- `DOMAIN` — реальный домен (должен уже резолвиться на сервер).
- `ACME_EMAIL` — почта для Let's Encrypt (уведомления об истечении и т.п.).

`VITE_API_URL=/api` трогать не нужно — именно он заставляет фронтенд ходить
на `/api` того же домена, который Caddy проксирует на `api`.

## 3. Собрать и поднять

```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

При старте `api`-контейнер сам прогоняет `prisma migrate deploy` перед
запуском (это уже встроено в `apps/api/Dockerfile`), так что схема применится
автоматически.

Проверить:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f api
docker compose -f docker-compose.prod.yml logs -f caddy   # следить за выпуском TLS-сертификата
```

Через 10-30 секунд сайт должен открыться по `https://<DOMAIN>`.

## 4. (опционально) Засеять базу начальными данными

Образ `api` в продакшене не содержит `ts-node`/`psql`, поэтому
`yarn prisma:seed` там не запустить напрямую. Проще прогнать `seed.sql`
через контейнер `db`:

```bash
docker compose -f docker-compose.prod.yml exec -T db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < apps/api/prisma/seed.sql
```

(значения `POSTGRES_USER`/`POSTGRES_DB` — те, что в `.env`).

## 5. Обновление после деплоя новой версии

```bash
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

Старые неиспользуемые образы можно почистить: `docker image prune -f`.

## 6. Бэкапы базы

```bash
docker compose -f docker-compose.prod.yml exec -T db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-$(date +%F).sql
```

Стоит повесить это в cron на сервере и копировать дампы за пределы сервера
(S3/другой хост) — локальный дамп не защищает от потери самого сервера.

## Примечания

- CORS на api выставлен в `https://${DOMAIN}` (см. `docker-compose.prod.yml`)
  — это защита на случай, если кто-то решит достучаться до `api` напрямую
  в будущем; при проксировании через один домен он не критичен, но лучше
  иметь корректное значение.
- Если понадобится несколько окружений (staging/prod), проще всего
  скопировать `docker-compose.prod.yml` + свой `.env` в отдельную директорию
  на том же или другом сервере.
