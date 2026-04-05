# AICTE Curriculum Management Portal

A comprehensive web application for managing model curriculums and tracking institute adoptions across India.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Complete Workflow](#complete-workflow)
3. [Admin Workflow (AICTE Staff)](#admin-workflow-aicte-staff)
4. [Institute Workflow (College/University)](#institute-workflow-collegeuniversity)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Installation & Setup](#installation--setup)
8. [API Documentation](#api-documentation)
9. [Database Schema](#database-schema)

---

## 🎯 Project Overview

### What is this Portal?

AICTE (All India Council for Technical Education) creates **model curriculums** for various engineering and technical programs. These curriculums serve as a standard that colleges and universities across India should follow.

This portal provides:
- **For AICTE (Admin)**: A platform to create, manage, and publish model curriculums
- **For Institutes**: A platform to view curriculums, download syllabi, and submit their adoption status

### The Problem it Solves

1. **Before this Portal**:
   - AICTE sends curriculum PDFs via email
   - No way to track which institutes adopted the curriculum
   - No centralized system for feedback
   - Manual tracking of adoption rates

2. **After this Portal**:
   - Centralized curriculum management
   - Real-time adoption tracking
   - Digital submission and approval workflow
   - Analytics and reporting

---

## 🔄 Complete Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AICTE CURRICULUM PORTAL                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐                              ┌─────────────┐          │
│  │    ADMIN    │                              │  INSTITUTE  │          │
│  │ (AICTE Staff)│                              │  (College)  │          │
│  └──────┬──────┘                              └──────┬──────┘          │
│         │                                            │                  │
│         ▼                                            │                  │
│  1. Login as Admin                                   │                  │
│         │                                            │                  │
│         ▼                                            │                  │
│  2. Create Curriculum (Draft)                        │                  │
│     - Title, Branch, Year                            │                  │
│     - Add Semesters                                  │                  │
│     - Add Subjects with Credits                      │                  │
│     - Upload Syllabus PDF                            │                  │
│         │                                            │                  │
│         ▼                                            │                  │
│  3. Publish Curriculum ──────────────────────────────┼──────────────┐  │
│         │                                            │              │  │
│         │                                            ▼              │  │
│         │                                   4. Login as Institute   │  │
│         │                                            │              │  │
│         │                                            ▼              │  │
│         │                                   5. View Published       │  │
│         │                                      Curriculums          │  │
│         │                                            │              │  │
│         │                                            ▼              │  │
│         │                                   6. Download Syllabus    │  │
│         │                                            │              │  │
│         │                                            ▼              │  │
│         │                                   7. Submit Mapping       │  │
│         │                                      Document + Feedback  │  │
│         │                                            │              │  │
│         ▼                                            │              │  │
│  8. Review Submissions ◄─────────────────────────────┘              │  │
│         │                                                           │  │
│         ▼                                                           │  │
│  9. Approve / Reject                                                │  │
│         │                                                           │  │
│         ▼                                                           │  │
│  10. Dashboard Analytics                                            │  │
│      - Total Curriculums                                            │  │
│      - Adoption Rate                                                │  │
│      - Institute Stats                                              │  │
│                                                                     │  │
│  11. Review Assessments ◄───────────────────────────────────────────┤  │
│         │                                                           │  │
│         ▼                                                           │  │
│  12. Accept / Reject                                                │  │
│                                                                     │  │
│                                           8. Create & Publish       │  │
│                                              Assessments ───────────┘  │
│                                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 👨‍💼 Admin Workflow (AICTE Staff)

Admin is the AICTE staff member who manages the curriculum system.

### Step 1: Admin Login

```
Email: admin@aicte.gov.in
Password: admin123
Role: Admin
```

When admin logs in:
1. JWT token is generated with `role: admin`
2. Token is stored in localStorage
3. Admin is redirected to Admin Dashboard

### Step 2: View Dashboard

Admin Dashboard shows:
- **Total Curriculums**: All curriculums (draft + published)
- **Published**: Curriculums available to institutes
- **Registered Institutes**: How many colleges signed up
- **Total Submissions**: How many institutes submitted adoptions
- **Submission Statistics**: Pending, Approved, Rejected counts
- **Adoption Rate**: Percentage of institutes that adopted

### Step 3: Create New Curriculum

**Path**: Dashboard → Create Curriculum

Admin enters:
```
Title: "B.Tech Computer Science and Engineering"
Description: "Model curriculum for CSE program"
Program Type: UG (Undergraduate) / PG / Diploma
Branch: "Computer Science and Engineering"
Academic Year: "2024-25"
Version: "1.0"
```

**Status after creation**: `draft`

A draft curriculum is:
- ❌ NOT visible to institutes
- ✅ Can be edited by admin
- ✅ Can add semesters and subjects

### Step 4: Add Semesters

**Path**: Curriculum Detail → Add Semester

Admin adds semesters one by one:
```
Semester 1
Semester 2
Semester 3
... up to Semester 8
```

### Step 5: Add Subjects to Each Semester

**Path**: Semester Card → Add Subject

For each subject, admin enters:
```
Subject Name: "Data Structures"
Subject Code: "CS201"
Credits: 4
Type: Theory / Practical / Elective
Learning Outcomes:
  - "Implement linked lists"
  - "Understand tree structures"
  - "Analyze algorithm complexity"
```

The system automatically calculates:
- Total credits per semester
- Total credits for entire curriculum

### Step 6: Upload Syllabus PDF

**Path**: Curriculum Detail → Upload Syllabus

Admin uploads the official syllabus document:
- Only PDF files allowed
- Max size: 10MB
- Stored in `backend/uploads/syllabi/`
- Institutes can download this

### Step 7: Publish Curriculum

**Path**: Curriculum Detail → Publish

Before publishing, system validates:
- ✅ At least 1 semester exists
- ✅ Each semester has at least 1 subject

After publishing:
- Status changes to `published`
- ✅ Visible to all institutes
- ❌ Cannot be edited anymore
- `publishedAt` timestamp is saved

### Step 8: Review Institute Submissions

**Path**: Sidebar → Submissions

Admin sees list of all submissions with:
- Institute name
- Which curriculum they're adopting
- Submission status
- Submitted date

### Step 9: Approve or Reject Submission

**Path**: Submission Detail → Review

Admin can:
1. **Mark as Under Review**: "We're looking at it"
2. **Approve**: "Your curriculum mapping is accepted"
3. **Reject**: "Changes needed, please resubmit"

Admin can also add feedback message for the institute.

### Step 10: View Institutes

**Path**: Sidebar → Institutes

Admin can see all registered institutes:
- Institute Name
- Institute Code
- Contact Email
- Phone
- Address
- Registration Date
- Active Status

### Step 11: Review Institute Assessments

**Path**: Sidebar → Assessments

Admin can review the assessments (Quiz, Midterm, etc.) generated by institutes. Admin can:
- View all questions and total marks
- Change status to `accepted` or `rejected`

---

## 🏛️ Institute Workflow (College/University)

Institute is a college or university that wants to adopt AICTE curriculum.

### Step 1: Institute Registration

**Path**: Login Page → Register

New institute fills:
```
Contact Person Name: "Dr. Sharma"
Email: "principal@college.edu"
Password: "******"
Institute Name: "ABC Engineering College"
Institute Code: "AICTE123" (optional)
Address: "City, State"
Phone: "9876543210"
```

After registration:
- Account is created with `role: institute`
- JWT token issued
- Redirected to Institute Dashboard

### Step 2: Institute Login

```
Email: admin@iitd.ac.in
Password: institute123
Role: Institute
```

### Step 3: View Dashboard

Institute Dashboard shows:
- **Available Curriculums**: Published curriculums they can view
- **My Submissions**: How many submissions they made
- **Approved**: How many were approved
- **Pending Review**: Waiting for admin response

### Step 4: Browse Published Curriculums

**Path**: Sidebar → View Curriculums

Institute can see only `published` curriculums:
- Title
- Program Type (UG/PG/Diploma)
- Branch
- Academic Year
- Version

### Step 5: View Curriculum Details

**Path**: Click on any curriculum

Institute can see complete curriculum structure:
- All semesters
- All subjects with codes and credits
- Learning outcomes
- Total credits

### Step 6: Download Syllabus PDF

**Path**: Curriculum Detail → Download

Institute downloads the official AICTE syllabus to:
- Understand the model curriculum
- Compare with their existing curriculum
- Plan their curriculum mapping

### Step 7: Submit Curriculum Mapping

**Path**: Curriculum Detail → Submit Adoption Mapping

Institute submits:
```
Mapping Document (PDF): Their own curriculum mapped to AICTE model
Feedback/Comments: "We have implemented 95% of the curriculum..."
```

What is a mapping document?
- Shows how institute's curriculum aligns with AICTE model
- Subject-by-subject comparison
- Any deviations and justifications

After submission:
- Status is `submitted`
- Waiting for admin review

### Step 8: Track Submission Status

**Path**: Sidebar → My Submissions

Institute can see:
- Which curriculums they submitted for
- Current status (Submitted / Under Review / Approved / Rejected)
- Submission date
- Review date (if reviewed)
- Admin feedback (if any)

### Step 9: View Admin Feedback

When admin reviews:
- Status changes to Approved/Rejected
- Admin feedback message is visible
- Institute can take action based on feedback

### Step 10: Create & Manage Assessments

**Path**: Sidebar → Assessments

Institutes can create subjective and objective assessments for curriculum evaluation:
- Create Assesssments (Quiz, Assignment, Midterm, End Semester, Viva, Project)
- Add Questions (MCQ, Short answer, Long answer, Coding)
- Set total marks, passing marks, and duration
- Publish assessments for Admin review

---

## 🛡️ Security & Access Control

### Authentication Flow

```
1. User enters email, password, role
2. Backend validates credentials
3. Password is compared with bcrypt hash
4. JWT token generated with { userId, role }
5. Token sent to frontend
6. Frontend stores in localStorage
7. Token sent in every API request header
```

### Role-Based Access

| Action | Admin | Institute |
|--------|-------|-----------|
| Create Curriculum | ✅ | ❌ |
| Edit Curriculum | ✅ | ❌ |
| Publish Curriculum | ✅ | ❌ |
| Delete Curriculum | ✅ | ❌ |
| View Draft Curriculum | ✅ | ❌ |
| View Published Curriculum | ✅ | ✅ |
| Download Syllabus | ✅ | ✅ |
| Submit Mapping | ❌ | ✅ |
| Review Submissions | ✅ | ❌ |
| View Own Submissions | ❌ | ✅ |
| View All Submissions | ✅ | ❌ |
| View Institutes List | ✅ | ❌ |
| Create/Edit Assessments | ❌ | ✅ |
| Review Assessments | ✅ | ❌ |

### Middleware Protection

```javascript
// Every protected route has:
router.use(protect);  // Verify JWT token

// Admin-only routes also have:
router.use(authorize('admin'));  // Check role
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | File uploads |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| Vite | Build tool |
| React Router | Navigation |
| Axios | HTTP client |
| React Icons | Icon library |
| CSS | Styling (no frameworks) |

### Colors Used

```css
--color-bg: #F6F8FB;      /* Light gray background */
--color-primary: #2563EB;  /* Blue - buttons, links */
--color-dark: #1E293B;     /* Dark blue - text */
```

---

## 📁 Project Structure

```
AICTE/
├── backend/
│   ├── config/
│   │   ├── config.js        # App configuration
│   │   └── db.js            # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js       # Login, Register, Profile
│   │   ├── curriculumController.js # CRUD for curriculums
│   │   ├── submissionController.js # Submission handling
│   │   ├── assessmentController.js # Assessment handling
│   │   └── analyticsController.js  # Dashboard stats
│   │
│   ├── middleware/
│   │   ├── auth.js          # JWT verification, role check
│   │   └── upload.js        # Multer file upload config
│   │
│   ├── models/
│   │   ├── User.js          # User schema (admin/institute)
│   │   ├── Curriculum.js    # Curriculum with semesters
│   │   ├── Submission.js    # Institute submissions
│   │   └── Assessment.js    # Institute assessments
│   │
│   ├── routes/
│   │   ├── index.js         # Route aggregator
│   │   ├── authRoutes.js    # /api/auth/*
│   │   ├── curriculumRoutes.js # /api/curriculums/*
│   │   ├── submissionRoutes.js # /api/submissions/*
│   │   ├── assessmentRoutes.js # /api/assessments/*
│   │   └── analyticsRoutes.js  # /api/analytics/*
│   │
│   ├── services/
│   │   ├── authService.js        # Auth business logic
│   │   ├── curriculumService.js  # Curriculum business logic
│   │   ├── submissionService.js  # Submission business logic
│   │   └── analyticsService.js   # Analytics calculations
│   │
│   ├── uploads/
│   │   ├── syllabi/         # Syllabus PDFs
│   │   └── submissions/     # Mapping PDFs
│   │
│   ├── .env                 # Environment variables
│   ├── package.json
│   ├── seed.js              # Database seeder
│   └── server.js            # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Form/
│   │   │   ├── Layout/
│   │   │   ├── Loading/
│   │   │   ├── Modal/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   ├── assessment/
│   │   │   └── Table/
│   │   │
│   │   ├── pages/           # Page components
│   │   │   ├── Auth/        # Login, Register
│   │   │   ├── Dashboard/   # Admin & Institute dashboards
│   │   │   ├── Curriculum/  # List, Create, Detail
│   │   │   ├── Submissions/ # List, Detail, Institutes
│   │   │   └── Assessments/ # List, Create, Edit, Detail
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   │
│   │   ├── services/
│   │   │   └── api.js       # Axios API calls
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js   # Utility functions
│   │   │
│   │   ├── App.jsx          # Main app with routes
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   │
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd AICTE
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aicte_curriculum
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Seed database with demo data:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@aicte.gov.in | admin123 |
| Institute | admin@iitd.ac.in | institute123 |
| Institute | admin@nitt.edu | institute123 |

---

## 📡 API Documentation

### Authentication APIs

```
POST /api/auth/register
Body: { name, email, password, role, instituteName, ... }
Response: { user, token }

POST /api/auth/login
Body: { email, password, role }
Response: { user, token }

GET /api/auth/profile
Headers: Authorization: Bearer <token>
Response: { user }

GET /api/auth/institutes (Admin only)
Response: { institutes[] }
```

### Curriculum APIs

```
GET /api/curriculums
Query: ?status=published&programType=UG
Response: { curriculums[] }

GET /api/curriculums/:id
Response: { curriculum }

POST /api/curriculums (Admin)
Body: { title, description, programType, branch, academicYear, version }
Response: { curriculum }

PUT /api/curriculums/:id (Admin)
Body: { ...updates }
Response: { curriculum }

POST /api/curriculums/:id/semesters (Admin)
Body: { number, subjects: [] }
Response: { curriculum }

POST /api/curriculums/:id/semesters/:idx/subjects (Admin)
Body: { name, code, credits, type, learningOutcomes }
Response: { curriculum }

POST /api/curriculums/:id/upload-syllabus (Admin)
Body: FormData with 'syllabus' file
Response: { curriculum }

GET /api/curriculums/:id/download
Response: PDF file

POST /api/curriculums/:id/publish (Admin)
Response: { curriculum with status: 'published' }

DELETE /api/curriculums/:id (Admin, draft only)
Response: { message }
```

### Submission APIs

```
GET /api/submissions (Admin)
Query: ?status=submitted
Response: { submissions[] }

GET /api/submissions/my-submissions (Institute)
Response: { submissions[] }

GET /api/submissions/:id
Response: { submission }

POST /api/submissions (Institute)
Body: FormData with curriculumId, feedback, mappingFile
Response: { submission }

PUT /api/submissions/:id/status (Admin)
Body: { status, adminFeedback }
Response: { submission }

GET /api/submissions/:id/download
Response: PDF file
```

### Assessment APIs

```
GET /api/assessments (Admin)
Response: { assessments[] }

GET /api/assessments/institute (Institute)
Response: { assessments[] }

GET /api/assessments/:id
Response: { assessment }

POST /api/assessments (Institute)
Body: { title, courseId, type, totalMarks, questions... }
Response: { assessment }

PUT /api/assessments/:id (Institute)
Body: { ...updates }
Response: { assessment }

PATCH /api/assessments/:id/publish (Institute)
Response: { assessment }

PATCH /api/assessments/:id/status (Admin)
Body: { status }
Response: { assessment }

DELETE /api/assessments/:id
Response: { message }
```

### Analytics APIs (Admin)

```
GET /api/analytics/dashboard
Response: {
  curriculums: { total, published, draft },
  users: { institutes, admins },
  submissions: { submitted, approved, rejected, total },
  adoptionRate
}

GET /api/analytics/adoption
Response: { curriculumAdoptionStats[] }

GET /api/analytics/activity
Response: { recentSubmissions[], recentCurriculums[] }
```

---

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,           // Contact person name
  email: String,          // Unique, lowercase
  password: String,       // Hashed with bcrypt
  role: "admin" | "institute",
  instituteName: String,  // For institutes
  instituteCode: String,  // AICTE code
  address: String,
  phone: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Curriculum Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  programType: "UG" | "PG" | "Diploma",
  branch: String,
  academicYear: String,
  version: String,
  status: "draft" | "published" | "archived",
  semesters: [{
    number: Number,
    subjects: [{
      name: String,
      code: String,
      credits: Number,
      type: "theory" | "practical" | "elective",
      learningOutcomes: [String]
    }],
    totalCredits: Number
  }],
  syllabusFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  totalCredits: Number,
  createdBy: ObjectId (ref: User),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Submission Collection

```javascript
{
  _id: ObjectId,
  curriculum: ObjectId (ref: Curriculum),
  institute: ObjectId (ref: User),
  mappingFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  feedback: String,        // Institute's feedback
  status: "submitted" | "under_review" | "approved" | "rejected",
  adminFeedback: String,   // Admin's response
  reviewedBy: ObjectId (ref: User),
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Unique constraint: one submission per institute per curriculum
Index: { curriculum: 1, institute: 1 } unique
```

### Assessment Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  courseId: ObjectId (ref: Curriculum),
  instituteId: ObjectId (ref: User),
  type: "Quiz" | "Assignment" | "Midterm" | "End Semester" | "Viva" | "Project",
  totalMarks: Number,
  passingMarks: Number,
  duration: Number,
  status: "draft" | "published" | "accepted" | "rejected",
  questions: [{
    questionText: String,
    type: "MCQ" | "SHORT" | "LONG" | "CODING",
    marks: Number,
    options: [String],
    correctAnswer: String,
    difficulty: "easy" | "medium" | "hard"
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📱 Responsive Design

The application is fully responsive:

| Breakpoint | Layout |
|------------|--------|
| > 1024px | Full sidebar visible, desktop layout |
| 768px - 1024px | Collapsible sidebar, tablet layout |
| < 768px | Mobile layout, tables become cards |
| < 480px | Compact mobile, stacked buttons |

---

## 🔐 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/aicte_curriculum

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

---

## 📄 License

ISC License

---

## 👥 Contributors

AICTE Curriculum Management Portal Team

---

## 🆘 Support

For issues or questions, please create an issue in the repository.
