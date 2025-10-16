# 🚀 FFIdeal EAS CI Setup

Эта конфигурация предназначена для автоматической сборки APK через **Expo EAS** и **GitHub Actions**.

## 🔧 Подготовка

1. Создай аккаунт на [https://expo.dev/signup](https://expo.dev/signup)
   - Email: `fulfilmentideal@gmail.com`
   - Пароль: <твой пароль>

2. Сгенерируй EAS токен:
   [https://expo.dev/accounts/ffideal/settings/access-tokens](https://expo.dev/accounts/ffideal/settings/access-tokens)

3. Добавь секреты в GitHub:
   - `EAS_TOKEN` — токен из Expo
   - `EXPO_PASSWORD` — пароль от аккаунта Expo

4. Проверь, что структура проекта такая:
   ```
   ffideal/
   ├── app.json
   ├── package.json
   ├── eas.json
   ├── .env.example
   ├── .easignore
   └── .github/workflows/eas-build.yml
   ```

## 🧱 Запуск сборки

После каждого `push` в ветку `main` или при ручном запуске через вкладку **Actions**  
GitHub автоматически соберёт Android APK.

1. Перейди во вкладку **Actions** в репозитории GitHub.
2. Найди workflow **“FFIdeal — Build Android APK”**.
3. После завершения скачай готовый APK из раздела **Artifacts**.

## 🌍 Переменные окружения

| Название | Описание | Пример |
|-----------|-----------|--------|
| `EXPO_PUBLIC_API_URL` | Базовый URL API | `https://api.ffideal.app` |
| `EAS_TOKEN` | Expo Access Token | `eyJhbGciOi...` |
| `EXPO_EMAIL` | Expo аккаунт | `fulfilmentideal@gmail.com` |
| `ANDROID_PACKAGE` | Android package ID | `com.ffideal.app` |
| `IOS_BUNDLE` | iOS bundle ID | `com.ffideal.app` |

🟢 После загрузки этих файлов и добавления секретов
GitHub Actions автоматически соберёт APK и выложит его как артефакт.
