# Alfred Dashboard (React + Node + MongoDB)

A full‑stack dashboard for construction/solar project monitoring.

## 🚧 Tech Stack
- **Frontend:** React (Vite), MUI, React‑Leaflet, React Query, Axios
- **Backend:** Node.js/Express, Mongoose/MongoDB
- **Misc:** Nodemon, Dotenv, CORS, Morgan

---

## 📁 Folder Structure
alfred-dashboard/
├─ client/ # React app
└─ server/
├─ .env
├─ package.json
├─ seed/seed.js
└─ src/
├─ server.js
├─ config/db.js
├─ utils/asyncHandler.js
├─ models/
│ ├─ Site.js
│ ├─ SchematicStage.js
│ ├─ ActionItem.js
│ ├─ Risk.js
│ └─ Communication.js
├─ controllers/
├─ routes/

yaml
Copy
Edit

---

## ✅ Prerequisites
- Node 18+ (or 20+)
- MongoDB running locally (`mongodb://localhost:27017`) or Atlas
- Yarn or npm

---

## 🔧 Backend Setup

```bash
cd server
cp .env.example .env
npm install
npm run dev              # runs on http://localhost:5000