# 🌐 Future Builder – Job Portal

**Future Builder** is a full-stack job portal web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **Tailwind CSS** for styling. It aims to connect students and freshers with tech companies by providing a platform to explore job opportunities, view company profiles, and interact with recruiters.

---

## 🚀 Features

- 🔍 **Job Search** – Search jobs by title, skill set, or location.
- 🏢 **Company Profiles** – View detailed profiles and job openings.
- 🧑‍💼 **Recruiter Dashboard** – Post jobs and manage listings.
- 🎓 **Student-Friendly Design** – Tailored experience for freshers in the tech industry.
- 🌐 **Responsive UI** – Fully responsive interface for all devices.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (via Mongoose)

### Other Tools
- JWT (Authentication)
- Cloudinary (Image/Resume Upload)

---

## 📁 Environment Variables

Before running the project, create a `.env` file in the root directory and add the following variables:

SECRET_KEY= MONGO_URI= CLOUD_NAME= API_SECRET= API_KEY= PORT=



## 📦 Installation & Running Locally

Follow the steps below to set up and run the project locally:

```bash
# Step 1: Clone the repository
git clone https://github.com/your-username/FutureBuilder-Job-Portal.git
cd FutureBuilder-Job-Portal

# Step 2: Install backend dependencies
npm install

# Step 3: Move to client directory and install frontend dependencies
cd client
npm install

# Step 4: Return to the root directory
cd ..

# Step 5: Create a .env file and add the required variables

# Step 6: Start the development server (frontend + backend)
npm run dev
