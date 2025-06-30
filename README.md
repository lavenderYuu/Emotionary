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
For Milestone 3, we continued to implement and improve the key functionalities of our app, including filtering and search. We also performed manual, unit and integration testing, filed issues, and fixed high-priority bugs. In addition, we addressed crossplay feedback to make our app more accessible and user-friendly. 
- 🔒 Encryption for user passwords using bcrypt
- 🔑 Google OAuth - Users can log in with their Google credentials 
- 📝 Entries - Users can edit the mood of an entry in case they disagree with sentiment analysis results
- 🔍 Search Page - Users can search for entries by title, content, and/or tags
    - Implemented in frontend to avoid code duplication and achieve better UI responsiveness
- 📄 Entries Page - Users can filter entries by date, mood, favorites, and tags
    - Implemented in backend and stored in Redux
- 👤 UI improvements
    - Fully functional and accessible buttons and navbar links
    - Updated styling and tooltips for charts
- 🧪 Test Suite
    - Instructions to run:
    - Link:

## Getting Started
1. Clone this repo
2. Run `docker-compose up`
3. Frontend will be available at: http://localhost
4. Backend API runs at: http://localhost:5000

Alternatively:
1. Pull from Docker Hub:
`docker pull aaachung/team15-frontend`
`docker pull aaachung/team15-backend`
2. Run containers: 
`docker run -p 3000:3000 aaachung/team15-frontend`
`docker run -p 80:80 aaachung/team15-backend`