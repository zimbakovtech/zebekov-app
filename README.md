# Zebekov Portal

Monorepo housing both the public‑facing website and the internal admin dashboard for **Dental Center Zebekov**, plus a Django REST API backend for appointment management.

---

## 🚀 Project Overview

- **Public Site** (`public-site/`):  
  A modern, SEO‑friendly Next.js (App Router) site showcasing the clinic, team, services, locations, and contact form.  
- **Admin Dashboard** (`admin-dashboard/`):  
  A protected Next.js area where staff and doctors can log in, view doctor profiles, manage weekly shifts, and schedule appointments via an interactive calendar.  
- **API Backend** (`backend/`):  
  Django + Django REST Framework providing JWT‑secured endpoints for users, doctors, shifts, services, and appointments. PostgreSQL in production (SQLite for local dev).

---

## 🎯 Goals & Features

1. **Public Website**  
   - Home page with hero and call‑to‑action  
   - Services page listing treatments with durations and pricing  
   - Locations page with map embeds and photo gallery  
   - About Us + Contact form to capture inquiries  

2. **Admin Dashboard**  
   - JWT‑secured login for admins & doctors  
   - Doctor overview grid (photo, name, phone, “Schedule” button)  
   - Per‑doctor calendar view: clear “free” vs “booked” slots, multi‑service appointments, custom‑duration entries  
   - Shift management: assign morning/evening shifts per 4‑week cycle  
   - Service catalog CRUD and custom‑service support  

3. **Backend API**  
   - **Users**: custom `User` model with `is_doctor` flag and phone  
   - **Doctors**: one‑to‑one profile linked to `User`; photo upload  
   - **Shifts**: weekly shift assignments (1–4, morning/evening)  
   - **Services**: name, duration, price  
   - **Appointments**: M2M to services (plus custom overrides), start/end times, patient info  
   - JWT authentication (via `rest_framework_simplejwt`)  

---

## 🛠️ Tech Stack

| Layer               | Technology                                    |
| ------------------- | ---------------------------------------------  |
| **Public Site**     | Next.js (App Router), React, TypeScript, Tailwind CSS |
| **Admin Dashboard** | Next.js, React, TypeScript, Tailwind CSS, React Query |
| **API Backend**     | Django, Django REST Framework, Simple JWT, PostgreSQL (SQLite for dev) |
| **Deployment**      | Docker, Nginx, Gunicorn, GitHub Actions CI/CD |
| **Monitoring**      | Sentry, basic uptime checks                   |

---

## 📁 Repository Structure

```
zebekov-portal/
├── public-site/           # Next.js public website
│   ├── app/
│   └── components/
├── admin-dashboard/       # Next.js internal dashboard
│   ├── app/
│   └── components/
├── backend/               # Django + DRF API
│   ├── backend/           # Django project settings
│   ├── users/             # Custom user & auth
│   ├── doctors/           # Doctor & Shift apps
│   ├── services/          # Service catalog app
│   ├── appointments/      # Appointment app
│   ├── manage.py
│   └── venv/              # Python virtual env (ignored)
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js ≥ 16 & Yarn  
- Python 3.10+ & pip  
- PostgreSQL (optional for local dev; SQLite fallback)

### 1. Clone & bootstrap

```bash
git clone https://github.com/your‑org/zebekov-portal.git
cd zebekov-portal
```

### 2. Front‑end Setup

```bash
# Install workspace deps
yarn install

# Dev servers
yarn workspace public-site dev
yarn workspace admin-dashboard dev
```

Sites will run on `http://localhost:3000` and `http://localhost:3001` by default.

### 3. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Migrate & create superuser
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Run server
python manage.py runserver
```

API is available at `http://127.0.0.1:8000/api/`.

---

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE) for details.
