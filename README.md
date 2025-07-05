# 🔍Uptime – Scalable Uptime Monitoring System

A modern, full-stack uptime monitoring system built using **Turborepo**, **TypeScript**, **Redis Streams**, **Express**, and **Next.js**. Monitor HTTP services, track incidents in real-time, and view statuses on a clean dashboard.

---

## 🏗 Tech Stack

| Layer         | Stack                            |
|---------------|----------------------------------|
| Frontend      | Next.js (React) + Tailwind CSS   |
| Backend       | Express.js + TypeScript          |
| Stream Engine | Redis Streams                    |
| Monorepo Tool | Turborepo                        |

---

## 📁 Monorepo Structure
```console
/apps
  /web  #Next.js frontend (dashboard, auth, status view)
  /api  #Express.js backend (auth, monitor APIs)
  /worker  #read from streams and process health checks
  /publisher  #pushes ping/check jobs into the Redis stream
/packages
  /ui
  /db
  /utils
  /redisstream 
```

---

## 🚀 Features

- ✅ Track uptime and response health using Redis Streams
- 📊 Real-time status updates on a unified dashboard
- 🚨 Incident detection and Redis-based streaming alert pipeline
- 🧪 REST API to interact with monitors and status data
- 🧠 Centralized error handling & logging
- ♻️ Scalable microservice-style architecture with Turborepo

---

## 🧠 Architecture Overview

- **Redis Streams** manage asynchronous message flow and task handoffs
- **Publisher** pushes ping/check jobs into the Redis stream
- **Worker** read from streams and process health checks
- **Express API** manages website data, incidents, and exposes REST endpoints
- **Frontend Dashboard** shows live monitor status, incident logs, and response summaries
- **Turborepo** organizes frontend/backend/types into a scalable monorepo setup

---

## ✅ TODOs & Improvements

- [ ] Add email/SMS/webhook alerts
- [ ] Retry logic
- [ ] Multi-region support and edge monitors
- [ ] Dark mode toggle

---

## 📸 Screenshots

> Coming soon...

---

## 📜 License

MIT License © [Your Name or Company]

---

## 📬 Contact

For questions, reach out via [devbhutani10@gmail.com](mailto:devbhutani10@gmail.com) or DM [@dev_bhutani10](https://x.com/dev_bhutani10)