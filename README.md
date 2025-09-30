# 🎚️ kr8-mobile

**kr8-mobile** is the mobile companion app for the kr8 ecosystem — a virtual record bag that lets DJs and vinyl enthusiasts browse curated playlists, sleeve artwork and track metadata.

This app is built with **React Native**, **Expo Router** and **Tailwind CSS**, and is designed to work alongside `kr8-desktop`, which extracts and uploads track data from m3u files.

---

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run the app**
   - In **Expo Go** on your phone (scan the QR code)
   - On an iOS/Android **simulator**
   - In a custom **development build**

---

## 📁 Project Structure

```
kr8-mobile/
├── app/                  # Expo Router app directory (routes)
├── assets/               # Images, fonts, etc.
├── components/           # Reusable UI components
├── context/              # React Context providers
├── hooks/                # Custom hooks (e.g. colours)
├── utils/                # Data processing and helpers
├── api/                  # API and Supabase utilities (optional integration)
├── global.css            # Tailwind base styling
├── tailwind.config.js    # Tailwind setup
├── app.json              # Expo project config
├── playlistData.js       # Local test data (to be replaced with Supabase fetch)
└── README.md
```

---

## 🌐 Features

- 🧾 View playlists parsed from DJ software
- 🎨 Browse vinyl-style sleeve artwork and track metadata
- 🧭 Navigate decks, playlists and tracks via tabs
- 🗃️ Toggle between local dev data and Supabase integration (in progress)

---

## 🛣️ Roadmap

- [ ] ☁️ Sync with Supabase cloud storage
- [ ] 🌀 Enhanced animation/render of record "sleeves"
- [ ] 🔍 Search and filter by artist, label, BPM, etc.
- [ ] 🎛️ Extend to integrate with DJ software file formats

---

## 📚 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.dev/router)
- [Tailwind CSS (via NativeWind)](https://www.nativewind.dev/)
- [Supabase](https://supabase.com/) (via `kr8-server`)
