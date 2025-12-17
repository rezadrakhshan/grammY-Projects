# RuleKeeper

RuleKeeper is a powerful Telegram group management bot designed to automate moderation, enforce rules, and maintain healthy communities. Built with **Node.js** and **grammY**, RuleKeeper provides advanced filtering, moderation tools, multilingual support, and real-time performance suitable for small communities and large-scale groups alike.

---

## Features

* **Advanced Content Filtering**
  Automatically detect and moderate unwanted content such as:

  * Text messages
  * Images and videos
  * GIFs and stickers
  * Voice messages and music
  * Locations and polls

* **User Moderation Tools**

  * Mute users (reply-based moderation)
  * Track user activity and violations
  * Leaderboard and user statistics

* **Custom Welcome Messages**
  Define dynamic welcome messages for new members.

* **Multilingual Support (i18n)**
  Built-in internationalization with support for multiple languages, including English and Persian.

* **High Performance & Scalable**

  * Redis for caching and fast operations
  * MongoDB for persistent storage
  * Designed for cloud and containerized environments

* **Modern Architecture**

  * Modular command and middleware system
  * Clean, maintainable codebase
  * Environment-based configuration

---

## Tech Stack

* **Runtime:** Node.js (TypeScript)
* **Telegram Framework:** grammY
* **Database:** MongoDB
* **Cache / Queue:** Redis
* **Deployment:** Docker-ready

---

## Project Structure

```text
rulekeeper/
├── src/
│   ├── bot/            # Bot initialization and core logic
│   ├── commands/       # Bot commands
│   ├── composers/      # grammY composers and middlewares
│   ├── database/       # Database models and services
│   ├── i18n/           # Localization files
│   ├── middlewares/    # Custom middlewares
│   └── utils/          # Utility functions
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── package.json
└── README.md
```

---

## Installation

### Prerequisites

* Node.js >= 18
* MongoDB
* Redis
* Telegram Bot Token (from @BotFather)

### Clone the Repository

```bash
git clone https://github.com/your-username/rulekeeper.git
cd rulekeeper
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
BOT=your_telegram_bot_token
MONGO_URL=mongodb://localhost:27017/rulekeeper
REDIS_URL=redis://localhost:6379
AI_BASE_URL=
AI_KEY=
```

---

## Running the Bot

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

---

## Docker Deployment

RuleKeeper is fully Dockerized.

```bash
docker-compose up -d
```

Make sure MongoDB and Redis services are properly configured in `docker-compose.yml`.

---

## Commands Overview

* `/help` – Show help menu
* `/settings` – Open bot settings
* `/language` – Change bot language
* `/addfilter` – Add a filtered word
* `/removefilter` – Remove a filtered word
* `/clearfilter` – Clear all filters
* `/filterlist` – Show all filters
* `/mute` – Mute a user (reply-based)
* `/leaderboard` – Show user rankings
* `/info` – Show bot information

---

## Internationalization (i18n)

RuleKeeper uses a structured localization system. Translation files are located under:

```text
src/i18n/locales/
├── en/
│   └── translation.json
├── fa/
│   └── translation.json
```

Adding a new language only requires creating a new locale folder and translation file.

---

## Security & Permissions

* The bot requires **admin permissions** in groups to moderate content.
* Certain commands are restricted to group admins only.
* Rate-limiting and validation are applied to prevent abuse.

---

## Roadmap

* Web-based admin dashboard
* AI-powered spam detection
* More granular role management
* Advanced analytics and reports

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

Please follow clean code practices and write clear commit messages.

---

## License

This project is licensed under the MIT License.

---

## Author

**Seyed Reza Derakhshan**
Backend Developer | Node.js | Telegram Bots

---

## Disclaimer

RuleKeeper is not affiliated with Telegram. Use at your own risk and ensure compliance with Telegram's Terms of Service.
