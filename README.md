# OpportunityAI 🚀
> **Intelligent, Transparent Student Opportunity Discovery Platform for B.Tech Engineers**

OpportunityAI is an opportunity discovery platform tailored for engineering undergraduates across **CSE, ECE, EEE, Mechanical, Civil, AI/ML, IT, and Data Science**. 

Unlike generic job portals, OpportunityAI provides:
- **Transparent Match Scoring (0–100%)**: Breaks down compatibility into skill overlap, branch fit, interest alignment, and academic year fit.
- **Strict, Explainable Eligibility Checks**: Verifies academic year prerequisites, branch criteria, and CGPA thresholds separately from match scores.
- **Personalized Learning Roadmaps**: Analyzes missing skills required for target opportunities and highlights beginner-friendly milestone pathways with curated free resources (NPTEL, documentation, interactive tutorials).
- **Persistent Saved Opportunities**: Bookmark internships, hackathons, and scholarships with local state persistence.
- **100% Free & Low-Cost Architecture**: Built with Vite and React without heavy cloud server costs.

---

## ⚠️ Sample Data Transparency
All opportunities and awards presented in this MVP are **realistic sample demo data** labeled with `[Sample Demo]` badges for demonstration and evaluation. None of these listings represent active or verified live corporate openings.

---

## 🛠️ Technology Stack

| Component | Choice | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React 19 + Vite 6** | Ultra-fast local dev server (< 200ms) and optimized production bundles |
| **Icons** | **Lucide React** | Sleek, modern vector icons |
| **Styling** | **Custom Modern Design System (CSS3 Tokens)** | Responsive dark-mode interface, glassmorphism, accessible cards |
| **Persistence** | **Browser LocalStorage** | Zero database configuration required; student profiles and bookmarks persist across reloads |
| **Matching Algorithm** | **Deterministic Explainable Rule Engine** | Pure client-side calculations with zero API key requirement and zero AI token expenses |
| **Deployment** | **Vercel / Netlify / GitHub Pages** | 100% free hosting with automatic HTTPS |

---

## 📂 File Structure

```text
Opportunity AI/
├── index.html                           # HTML5 entry point with responsive viewport
├── package.json                         # Dependencies and build scripts
├── vite.config.js                       # Vite bundler configuration
├── dist/                                # Production build distribution output
├── src/
│   ├── main.jsx                         # React root entry
│   ├── App.jsx                          # Main application layout, filtering & state orchestration
│   ├── index.css                        # Design system tokens, utilities & animations
│   ├── data/
│   │   ├── branchesAndSkills.js         # Branch taxonomy, career goals & suggested skills
│   │   ├── sampleOpportunities.js       # Curated sample opportunities (Internships, Hackathons, etc.)
│   │   └── defaultRoadmaps.js           # Beginner-friendly milestone roadmaps with free resources
│   ├── services/
│   │   ├── storageService.js            # LocalStorage persistence wrapper & defaults
│   │   └── matchingEngine.js            # Transparent match score calculator & eligibility validator
│   ├── components/
│   │   ├── Navbar.jsx                   # Sticky header with tabs, profile chip & reset button
│   │   ├── HeroBanner.jsx               # Headline, search bar & branch quick-selectors
│   │   ├── FilterBar.jsx                # Category tabs, mode dropdown, eligibility toggle & sorters
│   │   ├── OpportunityCard.jsx          # Opportunity preview card with score dial & badge
│   │   ├── OpportunityDetailsModal.jsx  # Deep-dive modal with score explanation & apply simulation
│   │   ├── StudentProfileModal.jsx      # Modal to customize branch, year, CGPA, skills & interests
│   │   ├── SavedOpportunities.jsx       # Dedicated bookmarked listings view
│   │   ├── LearningRoadmap.jsx          # Milestone tracker with checklist & free learning links
│   │   └── SampleDataBadge.jsx          # Persistent simulated demo environment notice
│   └── utils/
│       └── formatters.js                # Date, countdown, and category formatting utilities
└── README.md                            # Comprehensive project guide
```

---

## 💻 Running Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24+ recommended)
- **npm**: v9.0.0 or higher

### Step 1: Open Terminal in Project Directory
```bash
cd "c:\Users\Siva Krishna\OneDrive\Documents\Opportunity AI"
```

### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

The Vite dev server will start instantly:
```text
  VITE v6.2.0  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 🧪 Testing the MVP Features

1. **Test Profile Customization**:
   - Click your profile pill in the top-right navbar (`Alex Sharma • CSE • Year 2`).
   - Change your branch to **`ECE`** and year to **`Year 3`**.
   - Add skills like `Embedded C`, `Verilog`, or `Microcontrollers`.
   - Click **Save Profile & Update Scores**. Notice how all match scores and eligibility badges across the dashboard instantly recalculate!

2. **Test Search & Category Filters**:
   - Filter by **Internships**, **Hackathons**, **Workshops**, **Courses**, or **Scholarships**.
   - Type `Remote` or `Python` into the search bar.
   - Click the branch pills (e.g., `MECH`, `CIVIL`, `AI/ML`) to view discipline-specific listings.
   - Toggle **"Eligible For Me Only"** to filter out opportunities that require higher academic years or other branches.

3. **Test Explainable Match Scores**:
   - Click **"Explain Score & View Details"** on any card.
   - Review the progress bars showing exact point allocations: **Skill Overlap (up to 40 pts)**, **Branch Fit (up to 25 pts)**, **Interest Alignment (up to 20 pts)**, and **Year Cohort Fit (up to 15 pts)**.
   - View the **Strict Eligibility Checklist** explaining in plain English why you passed or failed specific criteria.
   - Click **"Highlight Missing Skills in My Learning Roadmap"** to flag missing skills.

4. **Test Saved Opportunities**:
   - Click the bookmark icon on any card to save or remove it.
   - Switch to the **Saved** tab in the navbar to view and manage your collection.

5. **Test Personalized Learning Roadmap**:
   - Click the **Roadmap** tab.
   - Check off completed milestones to watch your progress bar advance.
   - Click the curated free learning links (NPTEL, Harvard CS50, documentation) to explore study materials.

---

## 🌐 100% Free Deployment Options

Because this MVP is built with a client-side architecture using standard static build output, it can be hosted **100% free forever** on top global platforms:

### Option 1: Deploy to Vercel (Recommended - Easiest & Fastest)
1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial OpportunityAI MVP"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/opportunity-ai.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub (Free Hobby tier).
3. Click **"Add New Project"** and select `opportunity-ai`.
4. Vercel automatically detects **Vite**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. Your app will be live with a free `https://opportunity-ai-*.vercel.app` URL and automatic SSL within 30 seconds!

### Option 2: Deploy to Netlify
1. Build the production package locally:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com](https://app.netlify.com) and log in.
3. Drag and drop the generated `dist` folder into the Netlify dashboard.
4. Your site is instantly live with a free Netlify subdomain!

### Option 3: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.js`, set `base: '/opportunity-ai/'`.
3. In `package.json`, add `"deploy": "vite build && gh-pages -d dist"`.
4. Run:
   ```bash
   npm run deploy
   ```

---

## 🔒 Security & Privacy
- **Zero API Keys Exposed**: The MVP operates entirely client-side; no secret credentials or third-party paid keys are used.
- **Client-Side Persistence**: Profile and bookmark data are stored strictly within the user's browser `localStorage`.
- **Safe Demonstration**: No sensitive academic records or credentials are collected or transmitted.
