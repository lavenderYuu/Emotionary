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

## Milestone 4

### XSS Security Assessment

#### Input Fields Tested

| Component                | Input Field(s)                |
|-------------------------------|-------------------------------|
| Sign Up Modal                 | First Name, Email, Password   |
| Login Modal                   | Email, Password               |
| Google Sign Up Modal          | Passkey                       |
| Google Login Modal            | Passkey                       |
| Create Entry Modal            | Title, Content                |
| Edit Entry Modal              | Title, Content                |
| Search Bar                    | Search Query                  |
| Create Tag                    | Tag Name                      |
| Edit Tag                      | Tag Name                      |

#### Payloads Used

- `<script>alert("Test1")</script>`
- `<b>Test1</b>`

#### Results

| Input Point         | Payload Submitted                 | Vulnerable? | Comments |
|---------------------|-----------------------------------|----------------------|-------|
| Sign Up: First Name | `<script>alert("Test1")</script>`   | No                   | No alert popup, rendered as plaintext on homepage |
| Sign Up: Email      | `<script>alert("Test1")</script>`   | No                   | Rejected due to invalid email format |
| Sign Up: Password   | `<script>alert("Test1")</script>`   | No                   | No alert popup, accepted as password, but not rendered anywhere |
| Login: Email        | `<script>alert("Test1")</script>`   | No                   | Rejected due to invalid email format     |
| Login: Password     | `<script>alert("Test1")</script>`   | No                   | No alert popup, successful login, but not rendered anywhere     |
| Google Sign Up: Passkey | `<script>alert("Test1")</script>` | No                 | No alert popup, accepted as passkey, but not rendered anywhere  |
| Google Login: Passkey | `<script>alert("Test1")</script>`   | No                 | No alert popup, successful login, but not rendered anywhere     |
| Create Entry: Title | `<script>alert("Test1")</script>` | No                     | No alert popup, rendered as plaintext     |
| Create Entry: Content | `<script>alert("Test1")</script>` | No                 | No alert popup, rendered as plaintext  |
| Edit Entry: Content | `<script>alert("Test1")</script>` | No                 | No alert popup, rendered as plaintext  |
| Search              | `<script>alert("Test1")</script>` | No                   | No alert popup, rendered as plaintext on homepage |
| Create Tag: Tag Name | `<script>alert("Test1")</script>` | No                   | No alert popup, rendered as plaintext |
| Edit Tag: Tag Name  | `<script>alert("Test1")</script>` | No                   | No alert popup, rendered as plaintext |
| Sign Up: First Name | `<b>Test1</b>`   | No                   | Rendered as plaintext (not bolded) on homepage |
| Sign Up: Email      | `<b>Test1</b>`   | No                   | Rejected due to invalid email format |
| Sign Up: Password   | `<b>Test1</b>`   | No                   | Accepted as password, but not rendered anywhere |
| Login: Email        | `<b>Test1</b>`   | No                   | Rejected due to invalid email format        |
| Login: Password     | `<b>Test1</b>`   | No                   | Successful login, but not rendered anywhere     |
| Google Sign Up: Passkey | `<b>Test1</b>` | No                 | Accepted as passkey, but not rendered anywhere  |
| Google Login: Passkey | `<b>Test1</b>`   | No                 | Successful login, but not rendered anywhere     |
| Create Entry: Title | `<b>Test1</b>` | No                     | Rendered as plaintext (not bolded)     |
| Create Entry: Content | `<b>Test1</b>` | No                 | Rendered as plaintext (not bolded)  |
| Edit Entry: Content | `<b>Test1</b>` | No                 | Rendered as plaintext (not bolded)  |
| Search              | `<b>Test1</b>` | No                   | Rendered as plaintext on Search Results page (not bolded) |
| Create Tag: Tag Name | `<b>Test1</b>` | No                   | Rendered as plaintext (not bolded) |
| Edit Tag: Tag Name  | `<b>Test1</b>` | No                   | Rendered as plaintext (not bolded) |

#### Mitigation

No changes were made, as no vulnerabilities were discovered. The app is already rather secure because:
- By default, React escapes values inserted into the DOM. That is, React automatically escapes special HTML characters in user input, ensuring it is rendered as plaintext rather than HTML or JavaScript. This can only be bypassed if `dangerouslySetInnerHTML` is used to manually insert raw HTML into the DOM. We did not use `dangerouslySetInnerHTML` at all in our project.
- We did not allow direct DOM manipulation with user input using `innerHTML`, `outerHTML`, or `document.write`. We only allowed React components to display input via JSX, which handles escaping safely.

We considered using [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize user inputs but determined it was unnecessary in our case. DOMPurify is primarily used to protect against XSS attacks when rendering rich text input or using `dangerouslySetInnerHTML`, which we do not use. Overall, since React handles escaping and we avoid high-risk rendering of user inputs, our application is not vulnerable to XSS attacks.

### Test Suite
We implemented a comprehensive test suite using the Mocha and Chai testing frameworks, as well as mongodb-memory-server and supertest. Our backend tests cover all API routes for entries, tags, and users; our frontend tests cover filtering for our search functionality. Additionally, we used mochawesome to generate our test reports.

**Instructions to run:**
1. Please follow Steps #1 and #2 below from the "Getting Started" section > "Instructions to run"
    - Clone this repo, go to `Milestone3` branch, and add `.env` file
2. If you would like to run the test suite image separately, run `docker compose up --build test`
4. Otherwise, follow the remaining instructions below, and test reports will be automatically generated in Step #6

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
1. Clone this repo and go to the `Milestone3` branch
2. Replace the `.env.example` file in the root directory with the `.env` file we provide to you
    - Make sure the file is named `.env`
3. Run `docker compose up --build`
4. Backend API runs at: http://localhost:5000
5. Frontend will be available at: http://localhost
    - Please login using our test user:
        - Email: test@gmail.com
        - Password: 12345678
6. Tests reports are automatically generated in the project's root directory in the `test-results` folder and can be opened in your browser of choice:
    - `backend-test-report.html`
    - `frontend-test-report.html`