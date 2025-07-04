# emotionary

**Team Name**: SLAcK (Team #15)

**Team Members**:
- Annie Chung
- Kathleen Tom
- Lavender Yu
- Sophia Pobre

## Description
*emotionary* is a journaling app with sentiment analysis. It will store encrypted user journal entries, sentiment analysis scores, and account information. Users will be able to gain a deeper understanding of their mental well-being, and utilize mood tracking with weekly and monthly summaries to manage their emotions. Users will also be able to tag, favorite, and filter journal entries to search through past entries easily.

## Milestone 1
For Milestone 1, we implemented the basic frontend structure of our app, including components for authentication, journal entry management, and mood tracking.
- 🔑 Authentication and Landing Page - New users can create an account, and existing users can log in using their email and password. We also added an option for users to login through Google OAuth.
- 🏠 Home Page - After logging in, users are directed to the home page which includes:
    - 🧭 A navbar with navigation links, a search bar to find journal entries, and a logout option
    - 📈 A mood chart that provides weekly and monthly summaries of the user's mood, generated from sentiment analysis data
    - 📝 A "create an entry" feature, which includes the ability to write a new journal entry, add a title, select a date, and add up to three tags for that entry
    - 👁️ A feature to view past journal entries, as well as edit, favorite/unfavorite, and delete them

## Milestone 2
For Milestone 2, we updated `entriesSlice` and added `usersSlice` for Redux. We set up Node and Express to connect our React and Redux frontend. We also implemented backend API routes for login, entries, and sentiment analysis, all of which access stored data on MongoDB Atlas.
- 🛬 Landing Page
    - API calls are made when users register or sign in
- 🏠 Home Page
    - API calls are made when users create, edit, favorite, or delete entries
- 🔍Insights Page - Users can see different insights for their moods in addition to the default graph on the dashboard
    - 📅 Calender view with colours indicating mood on tracked dates 
    - 🌡️ Gauge displaying user's average mood over the past month
    - 🥧 Pie chart representation of user mood over the past month illustrating proportion of different moods

## Milestone 3
For Milestone 3, we continued to implement and improve the key functionalities of our app, including filtering, search, and tag management. We also updated `tagsSlice` for Redux. In addition, we performed manual, unit and integration testing, filed issues, and fixed high-priority bugs (see [GitHub Issues](https://github.students.cs.ubc.ca/CPSC455-2025S/team15/issues?q=is%3Aissue+is%3Aclosed)). Furthermore, we addressed crossplay feedback to make our app more accessible and user-friendly (denoted below with CP).
- 🔒 Encryption - User passwords are encrypted using bcrypt
    - Database stores encrypted passwords
- 🔑 Google OAuth - Users can log in with their Google credentials
    - POST request is made when users sign in
    - Database does not store passwords
- 📝 Entries
    - Users can edit the mood of an entry in case they disagree with sentiment analysis results (CP) - uses existing PUT request
    - Users can choose the time of day for their entries (CP)
    - Tag dots are replaced with mood emojis (CP)
    - "Create an entry" button is a fixed and floating button that is available on all relevant pages (Dashboard and Entries) (CP)
- 🏷️ Tags - Users can fully customize tag names
    - Users can create up to 10 unique tags and add up to 3 tags per entry
    - Unused tags are slightly transparent (CP)
    - API calls are made when users create, edit, or delete tags
    - Stored in database and Redux
- 🔍 Search Page - Users can search for entries by title, content, and/or tags
    - Implemented in frontend to avoid code duplication and achieve better UI responsiveness
- 📄 Entries Page - Users can filter entries by date, mood, favorites, and tags
    - Implemented in backend and stored in Redux
- 👤 UI improvements
    - Fully functional buttons and navbar links
    - Updated styling and tooltips for charts (CP)
    - Dark mode

### Test Suite
We implemented a comprehensive test suite using the Mocha and Chai testing frameworks, as well as mongodb-memory-server and supertest. Our backend tests cover all API routes for entries, tags, and users; our frontend tests cover filtering for our search functionality. Additionally, we used mochawesome to generate our test reports.

**Instructions to run:**
1. Please follow Steps #1 and #2 from the "Getting Started" section > "Instructions to run", i.e., clone this repo and add the `.env` file
2. For backend tests, `cd backend` and run `npm test`
3. For frontend tests, `cd ../frontend` and run `npm test`
4. Test results will appear in the IDE terminal, and test reports will automatically open in your browser

**Links:**
- [Backend tests](https://github.students.cs.ubc.ca/CPSC455-2025S/team15/tree/Milestone3/Backend/test)
- [Frontend tests](https://github.students.cs.ubc.ca/CPSC455-2025S/team15/tree/Milestone3/Frontend/test) 

## Getting Started
The following credentials need to be passed as environment variables:
- `GOOGLE_ID`
- `MONGODB_ID`
- `VITE_GOOGLE_ID`
- `VITE_HUGGINGFACE_ID`

We will send you a `.env` file to use for Step #2 below.

**Instructions to run:**
1. Clone this repo
2. Replace the `.env.example` file in the root directory with the `.env` file we provide to you; make sure the file is named `.env`
3. Run `docker compose up --build`
4. Frontend will be available at: http://localhost
5. Backend API runs at: http://localhost:5000