# emotionary

**Team Name**: SLAcK (Team #15)

**Team Members**:
- Annie Chung
- Kathleen Tom
- Lavender Yu
- Sophia Pobre

## Description
*emotionary* journaling app with sentiment analysis. It will store encrypted user journal entries, sentiment analysis scores, and account information. Users will be able to gain a deeper understanding of their mental well-being, and utilize mood tracking with weekly and monthly summaries to manage their emotions. Users will also be able to tag, favorite, and filter journal entries to search through past entries easily.

## Milestone 1
For Milestone 1, we implemented the basic frontend structure of our app, including components for authentication, journal entry management, and mood tracking. Below is a summary of the features that have been added: 
- Authentication and Landing Page - New users can create an account, and existing users can log in using their email and password. We also added an option for users to login through Google OAuth.
- Home Page - After logging in, users are directed to the home page which includes:
    - A navbar with navigation links, a search bar to find journal entries, and a logout option
    - A mood chart that provides weekly and monthly summaries of the user's mood, generated from sentiment analysis data
    - A "create an entry" feature, which includes the ability to write a new journal entry, add a title, select a date, and add up to three tags for that entry
    - A feature to view past journal entries, as well as edit, favourite/unfavourite, and delete them

## Getting Started
1. `cd` to the `Frontend` folder.
2. Run `docker pull lavyu/my-react-app`.
3. Run `docker run -p 5174:5174 lavyu/my-react-app`.
