# User manager (user-manager)

This is a test task

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# Архитектура проекта

- **Компоненты** — только UI и взаимодействие с пользователем.
- **Store (Pinia)** — хранение состояния и синхронизация с хранилищем.
- **Services** — бизнес-логика, валидация, работа с API.
- **Utils** — утилиты, валидация полей.
- **i18n** — все тексты и сообщения.
- **Тесты** — unit и e2e для всех ключевых сценариев.

## Поток данных

1. Пользователь вводит данные в компонент.
2. Компонент вызывает сервис для валидации.
3. Если данные валидны — отправляет в стор.
4. Стор обновляет состояние и синхронизирует с хранилищем.
5. Ошибки отображаются пользователю через UI.
