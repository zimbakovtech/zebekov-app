# Dental Clinic Management System

A comprehensive dental clinic management system with a Django backend API and Next.js admin dashboard.

## Features

### Backend (Django)

- **Doctor Management**: CRUD operations for doctors with profile pictures
- **Service Management**: Predefined services with pricing and duration
- **Shift Management**: Weekly shift rotation system with automatic doctor assignment
- **Appointment Management**: Full appointment scheduling with conflict detection
- **Calendar API**: Week-based calendar view with shifts and appointments
- **Authentication**: JWT-based authentication system
- **API Documentation**: Swagger/OpenAPI documentation

### Frontend (Next.js Admin Dashboard)

- **Dashboard**: Overview with statistics and weekly calendar view
- **Appointments**: Full CRUD with search functionality and custom services
- **Doctors**: Doctor management with profile pictures
- **Services**: Service management with pricing
- **Shifts**: Shift management and rotation
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

### Backend

- Django 4.x
- Django REST Framework
- Django CORS Headers
- JWT Authentication
- SQLite (can be changed to PostgreSQL/MySQL)

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- Axios
- Date-fns

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Initialize with sample data:**

   ```bash
   python manage.py initialize_clinic
   ```

6. **Create superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to admin-dashboard directory:**

   ```bash
   cd admin-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/token/` - Login
- `POST /api/token/refresh/` - Refresh token

### Doctors

- `GET /api/doctors/` - List all doctors
- `POST /api/doctors/` - Create doctor
- `GET /api/doctors/{id}/` - Get doctor details
- `PUT /api/doctors/{id}/` - Update doctor
- `DELETE /api/doctors/{id}/` - Delete doctor

### Services

- `GET /api/services/` - List all services
- `POST /api/services/` - Create service
- `PUT /api/services/{id}/` - Update service
- `DELETE /api/services/{id}/` - Delete service

### Appointments

- `GET /api/appointments/` - List appointments (with optional patient_name filter)
- `POST /api/appointments/` - Create appointment
- `GET /api/appointments/{id}/` - Get appointment details
- `PUT /api/appointments/{id}/` - Update appointment
- `DELETE /api/appointments/{id}/` - Delete appointment
- `GET /api/appointments/future/?week={week}` - Get future appointments for a week

### Shifts

- `GET /api/shifts/?week={week}` - List shifts for a week
- `POST /api/shifts/` - Create shift
- `PUT /api/shifts/{id}/` - Update shift
- `DELETE /api/shifts/{id}/` - Delete shift
- `POST /api/shifts/{id}/doctors/` - Add doctors to shift
- `DELETE /api/shifts/{id}/doctors/{doctor_id}/` - Remove doctor from shift
- `POST /api/shifts/generate_week/` - Generate shifts for a week

### Calendar

- `GET /api/calendar/?week={week}` - Get calendar data for a week

## Business Logic

### Shift Rotation

- Two shifts per day: "first" (08:00-13:00) and "second" (13:00-20:00)
- Saturday has only one shift (first)
- Automatic doctor rotation between shifts
- Admin can manually override assignments

### Appointment Scheduling

- Conflict detection prevents overlapping appointments
- Support for both predefined services and custom services
- Automatic end time calculation based on duration
- Price auto-fill from service selection

### Time Zones

- All times are in Europe/Skopje timezone
- Datetime fields use ISO format

## Sample Data

The initialization command creates:

- 4 sample doctors
- 6 common dental services with pricing
- Shift rotation for current and next 4 weeks

## Development

### Backend Development

- API documentation available at `/swagger/` and `/redoc/`
- Use Django admin at `/admin/` for data management
- Run tests with `python manage.py test`

### Frontend Development

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Responsive design for mobile and desktop

## Deployment

### Backend Deployment

1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up static file serving
4. Configure CORS for production domain
5. Set up environment variables for secrets

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Configure environment variables for API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
