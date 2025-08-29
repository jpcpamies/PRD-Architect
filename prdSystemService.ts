
import { PrdMode } from './types';

const PRD_SYSTEM = {
  modes: {
    [PrdMode.Quick]: {
      name: "Quick Start",
      questions: [
        "What type of web app do you want to create? (e.g., 'Task manager for remote teams')",
        "List the main pages your app needs (e.g., 'Login, Dashboard, Tasks, Profile')",
        "What are 3-5 core features? Be specific about actions (e.g., 'Create tasks, Assign to users, Mark complete')",
        "What data will you store? (e.g., 'Users with email/password, Tasks with title/description/status')",
        "Do you need user login? Any AI features? Payments? (Answer yes/no to each)"
      ],
      buildPRD: function(answers: string[]) {
        const specialRequirements = (answers[4] || "").toLowerCase();
        
        return `# TECHNICAL PRD - 12-PHASE NO-CODE DEVELOPMENT

## 🤖 AI ASSISTANT INSTRUCTIONS

When you receive this PRD, you must:
1. ASK: "Which No-Code tool will you use? (Lovable, Bolt, V0, Cursor, other?)"
2. PROVIDE: Sequential prompts for each phase - ONE at a time
3. VALIDATE: Require confirmation before advancing phases
4. ENFORCE: One phase = One objective. Never mix phases.

## 📋 PROJECT SPECIFICATION

**App Type:** ${answers[0] || ''}
**Pages:** ${answers[1] || ''}
**Core Features:** ${answers[2] || ''}
**Data Model:** ${answers[3] || ''}
**Special Requirements:** ${answers[4] || ''}

## 🏗️ PHASE-BY-PHASE IMPLEMENTATION

### PHASE 1: FOUNDATIONS
**Your first prompt to give user:**
"Create project foundation for: ${answers[0] || 'the app'}. Define complete architecture using Restaurant Process: Frontend (${answers[1] || 'pages'}) → Backend (process ${answers[2] || 'features'}) → Database (store ${answers[3] || 'data'}). Confirm tool limitations and feasibility."

### PHASE 2: UI FOUNDATION
**Your second prompt to give user:**
"Build complete static UI with these pages: ${answers[1] || 'as specified'}. Use ONLY mock data - no functionality. Include all navigation, forms (visual only), responsive design 320px-1920px. Test all navigation paths work."

### PHASE 3: DESIGN SYSTEM
**Your third prompt to give user:**
"Apply professional design: Choose 3-5 colors, consistent typography, spacing system (8/16/24/32px), hover states for all interactive elements. Make it look polished and trustworthy."

### PHASE 4: DATABASE STRUCTURE
**Your fourth prompt to give user:**
"Create database schema for: ${answers[3] || 'the specified data model'}. Include all tables, fields with types, relationships, constraints. Add sample data. Do NOT connect to frontend yet."

### PHASE 5: CONNECTIONS
**Your fifth prompt to give user:**
"Connect frontend to backend. ${specialRequirements.includes('login') || specialRequirements.includes('yes') ? 'Implement authentication (register/login/logout).' : 'Setup basic API endpoints.'} Add error handling and loading states."

### PHASE 6: CORE FEATURES
**Your sixth prompt to give user:**
"Implement these features ONE at a time: ${answers[2] || 'as specified'}. Build → Test → Validate each before next. ${specialRequirements.includes('ai') ? 'Include AI integration if core to value.' : ''}"

### PHASE 7-12: [Simplified for Quick Mode]
- Phase 7: ${specialRequirements.includes('payment') ? 'Add payment system' : 'Skip - no payments needed'}
- Phase 8-12: Deploy when core features work

## ✅ VALIDATION CHECKPOINTS
□ After Phase 2: All pages visible with mock data
□ After Phase 4: Database schema complete
□ After Phase 5: Connections working
□ After Phase 6: All core features functional

## 🚨 CRITICAL RULES
- NEVER mix UI + functionality + database in one phase
- ALWAYS validate before advancing
- ONE feature at a time in Phase 6`;
      }
    },

    [PrdMode.Professional]: {
      name: "Professional",
      questions: [
        "Describe your web app idea and who will use it",
        "List ALL pages/screens with their purpose (e.g., 'Dashboard - shows user tasks')",
        "Detail your features as CRUD operations (Create X, Read Y, Update Z, Delete W)",
        "Describe your data model (entities, properties, relationships)",
        "Will AI be core to your app or just enhancement? Describe any AI features",
        "What's your monetization? (Free, Freemium with X credits, Subscription)",
        "Which No-Code tool do you prefer? Any specific integrations needed?",
        "What defines success? Timeline expectations?"
      ],
      buildPRD: function(answers: string[]) {
        const aiInfo = (answers[4] || '').toLowerCase();
        const aiIsCore = aiInfo.includes('core');
        const monetization = (answers[5] || '').toLowerCase();
        const hasMonetization = monetization !== 'free' && monetization !== 'none';

        return `# TECHNICAL PRD (PROFESSIONAL) - 12-PHASE NO-CODE DEVELOPMENT

## 🤖 AI ASSISTANT INSTRUCTIONS

When you receive this PRD, you must:
1. ASK: "Which No-Code tool will you use? I recommend [tool from user answer or suggest one]."
2. PROVIDE: Sequential prompts for each phase - ONE at a time.
3. VALIDATE: Require user confirmation of completion before advancing.
4. ENFORCE: One phase = One objective. Never mix phases.

## 📋 PROJECT SPECIFICATION

**App Overview:** ${answers[0] || ''}
**Pages & Screens:** ${answers[1] || ''}
**CRUD Features:** ${answers[2] || ''}
**Data Model:** ${answers[3] || ''}
**AI Strategy:** ${answers[4] || ''}
**Monetization:** ${answers[5] || ''}
**Tool Preference:** ${answers[6] || ''}
**Success & Timeline:** ${answers[7] || ''}

## 🏗️ PHASE-BY-PHASE IMPLEMENTATION

### PHASE 1: FOUNDATIONS
**Prompt:** "Set up the project foundation. Define the architecture: Frontend (${answers[1] || 'pages'}) → Backend (for ${answers[2] || 'features'}) → Database (for ${answers[3] || 'data'}). Confirm the tool (${answers[6] || 'your choice'}) can handle these requirements."
**Validation:** Project is created in the chosen tool.

### PHASE 2: UI FOUNDATION
**Prompt:** "Build the complete static UI for all specified pages: ${answers[1] || 'N/A'}. Use only mock data. Ensure the layout is responsive from mobile to desktop and that all navigation links work."
**Validation:** All pages are viewable and responsive.

### PHASE 3: DESIGN SYSTEM
**Prompt:** "Apply a professional design system. Choose a color palette, set up typography, and establish consistent spacing. Style all interactive elements, including buttons and forms, with clear hover and active states."
**Validation:** The UI has a consistent, polished look and feel.

### PHASE 4: DATABASE STRUCTURE
**Prompt:** "Create the database schema for your data model: ${answers[3] || 'N/A'}. Build all tables, define fields with correct types, and establish relationships. Add sample data to test."
**Validation:** Database schema is complete and contains sample data.

### PHASE 5: CONNECTIONS & AUTHENTICATION
**Prompt:** "Connect the UI to the database. Implement user authentication (Registration, Login, Logout, Password Reset). All lists and forms should now pull from and write to the database."
**Validation:** User can log in and see real data from the database.

### PHASE 6: CORE FEATURES (CRUD)
**Prompt:** "Implement the core CRUD features one by one: ${answers[2] || 'N/A'}. For each feature, ensure Create, Read, Update, and Delete operations work perfectly. ${aiIsCore ? `This includes the core AI features: ${answers[4]}.` : ''} Test each feature before moving to the next."
**Validation:** All specified CRUD operations are functional.

### PHASE 7: ADVANCED DATA
**Prompt:** "Add advanced data handling. Implement search and filtering capabilities for your main data lists. Create any necessary user profile or settings pages."
**Validation:** Users can search and filter data.

### PHASE 8: ENHANCEMENTS
**Prompt:** "${!aiIsCore && answers[4] ? `Implement the enhancement AI features: ${answers[4]}.` : 'Implement any secondary features or UX improvements based on the initial build.'}"
**Validation:** Enhancement features are functional.

### PHASE 9: MONETIZATION
**Prompt:** "${hasMonetization ? `Integrate your monetization model: ${answers[5]}. This involves setting up Stripe, creating a pricing page, and restricting features based on user plan.` : 'No monetization required. Skip this phase.'}"
**Validation:** ${hasMonetization ? 'A test payment can be completed.' : 'N/A'}

### PHASE 10: TESTING
**Prompt:** "Perform end-to-end testing. Test all user flows, from registration to using the core features. Check for bugs, responsive issues, and data inconsistencies."
**Validation:** All major user flows work without errors.

### PHASE 11: DEPLOYMENT
**Prompt:** "Deploy the application to a production environment. Set up a custom domain, ensure environment variables are correct, and confirm the live app is working."
**Validation:** The application is live and accessible.

### PHASE 12: FINAL CHECKS
**Prompt:** "Perform final checks. Set up analytics to track your success metrics (${answers[7] || 'N/A'}). Ensure all pages are optimized for speed."
**Validation:** Analytics are tracking page views and events.`;
      }
    },

    [PrdMode.Enterprise]: {
      name: "Enterprise",
      questions: [
        "What problem does your app solve in what market context?",
        "Define 2-3 user personas with needs and behaviors",
        "What's your unique value vs existing solutions?",
        "List MVP features vs Phase 2 vs future roadmap",
        "Is AI core functionality or enhancement? Describe all AI features",
        "Describe complete data flow: input → processing → storage → output",
        "Technical architecture and constraints?",
        "Monetization model with pricing tiers?",
        "Compliance requirements? (GDPR, HIPAA, etc)",
        "Success metrics and KPIs for year 1?",
        "Go-to-market strategy and timeline?",
        "Main risks and mitigation strategies?"
      ],
      buildPRD: function(answers: string[]) {
        const roadmap = (answers[3] || 'vs vs').split('vs');
        const mvpFeatures = roadmap[0].trim();
        const phase2Features = roadmap[1]?.trim() || 'User feedback-driven features';
        
        const aiInfo = (answers[4] || '').toLowerCase();
        const aiIsCore = aiInfo.includes('core');
        
        const monetization = (answers[7] || 'none').toLowerCase();
        const hasMonetization = monetization !== 'none' && monetization !== 'free';

        const compliance = answers[8] || 'Standard data privacy practices';

        return `# TECHNICAL PRD (ENTERPRISE) - 12-PHASE NO-CODE DEVELOPMENT

## 🤖 AI ASSISTANT INSTRUCTIONS

When you receive this PRD, you must:
1. ASK: "Which No-Code tool and infrastructure will you use? (e.g., Lovable + AWS, V0 + Vercel)"
2. PROVIDE: Sequential prompts for each phase - ONE at a time. Do not proceed until the current phase is validated.
3. VALIDATE: Require code snippets, screenshots, or logs for validation at each checkpoint.
4. ENFORCE: One phase = One objective. Never mix phases.

## 📋 PROJECT SPECIFICATION

**Problem & Market:** ${answers[0] || ''}
**User Personas:** ${answers[1] || ''}
**Unique Value Proposition:** ${answers[2] || ''}
**Feature Roadmap:**
  - **MVP:** ${mvpFeatures}
  - **Phase 2:** ${phase2Features}
**AI Strategy:** ${answers[4] || ''}
**Data Flow:** ${answers[5] || ''}
**Architecture:** ${answers[6] || ''}
**Monetization:** ${answers[7] || ''}
**Compliance:** ${compliance}
**KPIs:** ${answers[9] || ''}
**Go-to-Market:** ${answers[10] || ''}
**Risks:** ${answers[11] || ''}

## 🏗️ PHASE-BY-PHASE IMPLEMENTATION

### PHASE 1: FOUNDATIONS
**Prompt:** "Set up the complete project foundation. Based on the architecture (${answers[6] || 'not specified'}), choose the optimal stack in your recommended tool. Define the full data flow: ${answers[5] || 'not specified'}. Create a project structure that supports future scalability and compliance requirements (${compliance})."
**Validation:** Project structure is created; tool stack is confirmed.

### PHASE 2: UI FOUNDATION
**Prompt:** "Build the complete static UI for all pages required to support MVP features. Use ONLY mock data. Implement a fully responsive design system skeleton (placeholders for colors, typography). Ensure all navigation paths are functional."
**Validation:** All pages are accessible and responsive; navigation works.

### PHASE 3: DESIGN SYSTEM
**Prompt:** "Implement a professional, scalable design system. Establish the color palette, typography scale, spacing rules (8/16/24/32px), and component styles (buttons, forms, cards). Apply this system consistently across the entire UI from Phase 2. Add all hover, active, and focus states."
**Validation:** UI is polished and consistent; style guide is reviewable.

### PHASE 4: DATABASE & DATA MODEL
**Prompt:** "Design and implement the complete database schema based on the data flow: ${answers[5] || 'not specified'}. Create all tables, fields (with correct types and constraints), and relationships. Seed the database with realistic sample data for all personas. Do NOT connect to the UI yet."
**Validation:** Schema diagram is generated; database contains sample data.

### PHASE 5: CONNECTIONS & AUTHENTICATION
**Prompt:** "Connect the frontend UI to the backend and database. Implement a secure authentication system (registration, login, logout, password reset, session management). All data-driven UI elements should now display real data from the database, not mock data."
**Validation:** User can register, log in, and see real data.

### PHASE 6: CORE MVP FEATURES
**Prompt:** "Implement the core MVP features ONE AT A TIME: ${mvpFeatures}. For each feature: build the full CRUD functionality, add necessary UI components, handle state management, and perform unit tests. ${aiIsCore ? `This includes the core AI features: ${answers[4]}.` : ''} Validate each feature completely before starting the next."
**Validation:** All MVP features are fully functional and tested.

### PHASE 7: ADVANCED DATA HANDLING
**Prompt:** "Implement advanced data handling: search, filtering, sorting, and pagination for all relevant data sets. Build any required admin dashboards for data management and user oversight. Ensure all data mutations are efficient and secure."
**Validation:** Data can be searched and filtered; admin dashboard is functional.

### PHASE 8: ENHANCEMENTS & AI
**Prompt:** "Implement Phase 2 features: ${phase2Features}. ${!aiIsCore && answers[4] ? `This is where you will now add the enhancement AI features: ${answers[4]}.` : 'No additional AI features specified for this phase.'} Ensure they integrate smoothly with the existing MVP features."
**Validation:** Phase 2 and enhancement features are working as expected.

### PHASE 9: MONETIZATION
**Prompt:** "${hasMonetization ? `Integrate the monetization model: ${answers[7]}. This requires a full Stripe integration. Follow these sub-phases: 9.1) Set up Stripe products and pricing. 9.2) Create a pricing page. 9.3) Build subscription/payment logic. 9.4) Handle webhooks for subscription status. 9.5) Create a customer portal for managing subscriptions. 9.6) Implement feature gating based on subscription level.` : 'No monetization required for this build. Skip this phase.'}"
**Validation:** ${hasMonetization ? 'User can successfully purchase a plan and access gated features.' : 'N/A'}

### PHASE 10: OPTIMIZATION & TESTING
**Prompt:** "Conduct comprehensive performance optimization and testing. Optimize database queries, implement caching strategies, and minimize frontend load times (image compression, code splitting). Write end-to-end tests for all critical user flows. Perform security audit."
**Validation:** Page load scores (e.g., Lighthouse) are above 90; all tests pass.

### PHASE 11: DEPLOYMENT & MONITORING
**Prompt:** "Prepare for and execute production deployment. Set up production environment, configure CI/CD pipeline for automated deployments, implement logging, monitoring, and alerting systems. Follow a production deployment checklist to ensure zero downtime."
**Validation:** App is live on production URL; monitoring dashboard is active.

### PHASE 12: COMPLIANCE & DOCUMENTATION
**Prompt:** "Finalize compliance and documentation. Ensure the application adheres to ${compliance}. Generate user documentation and a final technical documentation package. Implement cookie consent and privacy policy pages."
**Validation:** Compliance requirements are met; documentation is complete.

## 🚨 CRITICAL RULES
- Validate each phase with proof before proceeding.
- Isolate features during development to minimize bugs.
- Prioritize security and data integrity at every step.

## 📈 RISK MITIGATION
**Identified Risks & Mitigation Plan:**
${answers[11] || 'No specific risks provided. General mitigation: use proven technologies, test thoroughly, and gather user feedback early.'}
`;
      }
    }
  },

  generatePRD: function(mode: PrdMode, answers: string[]) {
    return this.modes[mode].buildPRD(answers);
  }
};

export default PRD_SYSTEM;