# OpportunityAI 🎯
### Intelligent, Transparent Student Opportunity Discovery Platform for B.Tech Engineers

**OpportunityAI** is a student-focused opportunity discovery platform designed to help engineering undergraduates find relevant internships, hackathons, workshops, courses, scholarships, and career-development opportunities.

Unlike generic job portals, OpportunityAI helps students understand how well an opportunity matches their profile, check eligibility requirements, identify missing skills, and follow personalized learning roadmaps.

🌐 **Live Demo:** [Explore OpportunityAI](https://melodious-fenglisu-5d89ca.netlify.app)

🏆 **Event:** Education Algorithm National AI Website Building Hackathon 2026  
👥 **Team:** CodeSync

---

## ✨ Key Features

### 1. Student Profile Customization
- Create a personalized student profile.
- Add academic branch, year of study, CGPA, skills, interests, and career goals.
- Supports engineering disciplines such as CSE, ECE, EEE, Mechanical, Civil, AI/ML, IT, and Data Science, subject to the options available in the application.

### 2. Transparent Match Scoring
OpportunityAI calculates a match score from **0–100%** using profile-related factors.

The matching model considers:

- **Skill Overlap:** How closely student skills match the listed requirements.
- **Branch Fit:** Compatibility between the student's branch and the opportunity.
- **Interest Alignment:** Relevance to the student's interests.
- **Academic Year Fit:** Alignment with the opportunity's intended student year.

The score helps students understand why an opportunity may be relevant to them.

### 3. Explainable Eligibility Checks
- Evaluates available academic year requirements.
- Checks branch restrictions where specified.
- Checks CGPA thresholds where specified.
- Provides explanations for eligibility results separately from the overall match score.

**Note:** Eligibility results are based on the requirements represented in the application's data and do not guarantee acceptance by an organizer.

### 4. Personalized Learning Roadmaps
- Identify skills that may be missing for a target opportunity.
- Explore learning milestones.
- Access curated learning resources where available.
- Track completed milestones and monitor learning progress.

### 5. Opportunity Search and Filtering
- Browse opportunity categories.
- Search using relevant keywords.
- Filter listings by available criteria.
- Explore opportunities relevant to different engineering branches and academic years.

### 6. Saved Opportunities
- Bookmark interesting opportunities.
- Access saved listings from the Saved section.
- Retain supported profile, bookmark, and progress data using browser local storage.

### 7. Responsive User Interface
- Modern interface with reusable React components.
- Responsive layouts and interactive cards.
- Organized navigation for discovering and managing opportunities.

---

## ⚠️ Sample Data Transparency

The current MVP includes **simulated sample opportunities** for demonstration, development, and evaluation.

These records are not verified live corporate openings. Organization names, deadlines, stipends, eligibility details, awards, and other listing information must not be treated as confirmed real-world opportunities.

Before applying, students should verify all information through the official organizer's website.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Building reusable user interface components |
| Vite 6 | Development server and production build |
| JavaScript | Application logic and matching calculations |
| HTML5 | Application structure |
| CSS3 | Styling, responsive layouts, and visual design |
| Lucide React | Interface icons |
| Browser LocalStorage | Client-side persistence |
| Netlify | Hosting the live demonstration |

### Matching Algorithm

OpportunityAI uses a deterministic, explainable rule-based matching engine rather than requiring a paid AI API for its core matching calculations.

The score considers four factors:

| Factor | Maximum Points |
|---|---:|
| Skill Overlap | 40 |
| Branch Fit | 25 |
| Interest Alignment | 20 |
| Academic Year Fit | 15 |
| **Total** | **100** |

The exact score depends on the matching rules implemented in the source code. Eligibility checks are evaluated separately from the overall match score.

---

## 📂 Project Structure

```text
OpportunityAI/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    ├── data/
    │   ├── branchesAndSkills.js
    │   └── sampleOpportunities.js
    ├── services/
    │   ├── matchingEngine.js
    │   └── storageService.js
    └── utils/
        └── formatters.js
```

*The structure above reflects the files identified during the project review. Update it if your actual repository contains additional files or folders.*

---

## 💻 Run the Project Locally

### Prerequisites

- Node.js compatible with the installed Vite version.
- npm.
- A web browser.

### Step 1: Clone the Repository

Replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/donasripamarthi/OpportunityAI.git
```

### Step 2: Open the Project Folder

```bash
cd OpportunityAI
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal. Vite commonly uses `http://localhost:5173/` by default, but the actual port may differ depending on your configuration.

### Step 5: Create a Production Build

```bash
npm run build
```

Vite generates the production build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🧪 Testing the Main Features

### 1. Student Profile
- Open the profile section.
- Change the branch and academic year.
- Update your skills, interests, or career goals.
- Save the profile and observe any changes in opportunity matching.

### 2. Search and Filters
- Browse available opportunity categories.
- Search for relevant keywords.
- Test the available branch, year, category, and eligibility filters.

### 3. Match Score Explanation
- Open an opportunity's details.
- Review the match score and its contributing factors.
- Check the displayed eligibility requirements and explanations.

### 4. Saved Opportunities
- Bookmark an opportunity.
- Open the Saved section.
- Confirm that the listing appears and can be removed.

### 5. Learning Roadmap
- Open the Roadmap section.
- Review available milestones and learning resources.
- Mark milestones as completed and check whether progress is retained.

*The exact controls and behavior depend on the features implemented in the current version of the application.*

---

## 🌐 Deployment

OpportunityAI is available as a live demonstration on Netlify.

**Live Website:**  
https://melodious-fenglisu-5d89ca.netlify.app

The project uses Vite's static production build, making it suitable for static hosting platforms such as Netlify, Vercel, and GitHub Pages, subject to the configuration required by each platform.

### Deployment Configuration

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | Vite |
| Hosting platform | Netlify |

For future deployments, the GitHub repository can be connected to a supported hosting provider to enable automated builds when source files change.

---

## 🔒 Security and Privacy

- The core matching engine performs calculations in the client application without requiring a paid AI API key.
- Student profile and saved-opportunity data handled by the storage service are persisted in browser local storage.
- Local storage is browser-specific and should not be considered encrypted or suitable for highly sensitive information.
- Avoid entering sensitive personal information when testing the application on shared devices.
- Never commit API keys, passwords, access tokens, or private environment files to a public repository.

---

## 🎯 Project Objective

The goal of OpportunityAI is to make opportunity discovery more organized, transparent, and accessible for engineering students.

By combining profile-based matching, separate eligibility checks, saved opportunities, and learning roadmaps, the platform aims to help students identify relevant opportunities and plan the skills they need to develop.

---

## 🚀 Future Enhancements

Potential future improvements include:

- Integration with verified opportunity providers.
- Automatic updates for deadlines and application status.
- More detailed matching explanations.
- Expanded learning roadmaps for different engineering disciplines.
- User authentication and secure cloud-based profile storage.
- Notifications for relevant opportunities and approaching deadlines.

These are potential enhancements and may not be available in the current MVP.

---

## 👥 Team and Acknowledgment

**Team Name:** CodeSync  
**Project:** OpportunityAI  
**Event:** Education Algorithm National AI Website Building Hackathon 2026

Developed as a student project focused on improving how engineering students discover opportunities and plan their career development.

---

## 📄 License

No open-source license has been specified for this repository. Unless a license is added, the source code remains under the default copyright rules. Contact the repository owner for permission to reuse or redistribute it.
