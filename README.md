# Librar-E: Book Borrowing Website

**Librar-E** is a modern e-library platform designed to streamline how users browse, borrow, and manage books online. Developed as a full-stack web application, it offers secure authentication, a responsive user interface, and powerful admin tools for digital library management.

Live Website: *(deployment link later)*

---

## Key Features

- **Authentication**: Both users and admins can register and log in to access their respective dashboard experiences.
- **Book Borrowing**: Users can borrow books based on their preferences, complete with search and filtering functionalities.
- **In-App Reading**: After borrowing, users can read books directly within the app for up to 14 days before access is restricted.
- **Book Returns**: Users can return borrowed books manually. Once the due date passes, access is automatically locked until the book is returned.
- **Admin Dashboard**: Admins have full access to manage all users and books through a separate control panel interface.
- **CRUD Operations**: Admins can Create, Read, Update, and Delete any book or user data within the system.

---

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Shadcn UI

### Backend / Database
- Neon DB (PostgreSQL)
- Drizzle ORM

### Authentication & Storage
- Auth.js
- Google Drive

---

## Prerequisites

Before starting, make sure you have the following installed:
- Node.js and npm

---

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/wengnong/librar-e.git
   cd librar-e

2. **Install Dependencies**
   ```bash
   npm install

3. **Run the Development Server**
   ```bash
   npm run dev

4. Open your browser and go to **http://localhost:3000**
