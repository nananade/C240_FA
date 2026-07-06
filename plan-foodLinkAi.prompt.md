## FoodLink AI Website Architecture

FoodLink AI is a smart food redistribution platform that connects restaurants, bakeries, supermarkets, hotels, and event organisers with charities and food banks to reduce food waste.

The website should include:
- Home
- About
- Donate Food
- Request Food
- AI Assistant
- Contact

The website must be modern, responsive, and look like a real startup.

### Technical Stack
- HTML
- CSS
- JavaScript
- Bootstrap 5
- Font Awesome

Later integrations:
- n8n
- Gemini AI
- Botpress
- Google Sheets

### Project Architecture

1. Folder structure
- README.md
- index.html
- about.html
- donate.html
- request.html
- ai-assistant.html
- contact.html
- assets/
  - css/
    - styles.css
  - js/
    - main.js
    - forms.js
    - assistant.js
  - img/
  - vendor/
- data/
  - content.json
- docs/

2. Files needed
- Main pages for each route
- Shared stylesheet for global styling
- Shared scripts for UI behavior and form handling
- Image directory for branding and illustrations
- Optional JSON data file for content and impact stats

3. Recommended libraries
- Bootstrap 5 for responsive layout and components
- Font Awesome for icons
- Google Fonts for modern typography
- AOS or Animate.css for subtle animation
- Chart.js for future impact metrics
- Swiper for testimonials or partner sliders

4. UI components
- Sticky navigation bar
- Hero section with strong call to action
- Impact statistics section
- How it works section
- Donation and request cards
- Multi-step forms with validation
- AI assistant panel with chat-style experience
- Testimonials and partner logos
- Contact section and footer

5. User flow
- Visitor lands on the homepage
- They choose whether to donate food, request food, or explore the platform
- They proceed through a guided form or AI assistant flow
- They receive confirmation and clear next steps
- They can contact the team for partnership questions

6. AI workflow
- Assistant welcomes users and asks simple questions
- It identifies whether the user wants to donate, request, or ask general questions
- It provides guidance and a short summary for follow-up
- Later it can be connected to Gemini AI, n8n, Botpress, and Google Sheets

7. Recommended development order
- Define branding, messaging, and page structure
- Build the static Bootstrap layout and pages
- Add styling, reusable UI sections, and visual polish
- Implement donation and request forms
- Add the AI assistant UI shell
- Prepare backend-ready hooks for future automation
- Deploy and test the site

### Recommended approach
- Start with a polished static website rather than a full backend system
- Keep the code modular so future AI and automation integrations are easy to add
- Make the interface feel credible and startup-like with strong storytelling and trust signals
