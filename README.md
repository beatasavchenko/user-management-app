# User Management System App

Benutzerverwaltungssystem-App mit **React**, **Node.js**, **Express** und **TypeScript**.

## Setup-Anleitung

### 1. Voraussetzungen

Stellen Sie sicher, dass Sie Docker Desktop installiert haben:

-   [Docker Desktop](https://www.docker.com/get-started/)

### 2. Docker starten

Stellen Sie sicher, dass **Docker Desktop** läuft.

### 3. Repository klonen

### 4. Umgebungsvariablen

Erstellen Sie eine `.env`-Datei im **backend**-Ordner mit folgendem Inhalt:

```bash
PORT=5000
DATABASE_URL=postgres://postgres:postgres@postgres/user_management_system
```

### 5. Abhängigkeiten installieren

Das folgende Befehl in dem Root-Verzeichnis ausführen:

```bash
npm install
cd frontend
npm install
```

### 6. App starten

Führen Sie das Projekt aus dem Root-Verzeichnis aus:

```bash
cd ..
npm run dev
```

### 7. Datenbank-Backup einspielen

```bash
cd backend
docker compose exec -T postgres psql -U postgres -d user_management_system < dump.sql
```
