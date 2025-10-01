# emotionary

## App Summary
*emotionary* is a journaling app with sentiment analysis that helps users reflect on their moods through visual insights. Our app offers a seamless and intuitive user experience, complete with features such as tagging, favoriting, filtering, and search. Our top priority is user privacy, and we securely encrypt all account information and journal entries.

## Table of Contents
- [App Summary](#app-summary)
- [Team Info](#team-info)
- [XSS Security Assessment](#xss-security-assessment)
- [Getting Started](#getting-started)

## Team Info

**Name**: SLAcK (Team #15)

**Members**:
- Annie Chung
- Kathleen Tom
- Lavender Yu
- Sophia Pobre

## XSS Security Assessment
We performed a manual XSS security assessment by entering various payloads into all input fields across our application to determine whether user input could manipulate the DOM or execute unintended scripts.

### Input Fields Tested

| Component                     | Input Field(s)                |
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
| Time Capsule                  | Letter, Email                 |

### Payloads Used

- `<script>alert("Test1")</script>`: Tests for reflected or stored XSS. If our app is vulnerable, an alert popup should appear with the message "Test1".
- `<b>Test1</b>`: Tests for HTML injection. If our app is vulnerable, the text should render in bold instead of plaintext.

### Results

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
| Time Capsule: Letter | `<script>alert("Test1")</script>` | No                   | No alert popup, rendered as plaintext in email |
| Time Capsule: Email | `<script>alert("Test1")</script>` | No                   | Rejected due to invalid email format |
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
| Time Capsule: Letter | `<b>Test1</b>` | No                   | Rendered as plaintext in email (not bolded) |
| Time Capsule: Email | `<b>Test1</b>` | No                   | Rejected due to invalid email format |

### Mitigation

No changes were made, as no vulnerabilities were discovered. The app is already rather secure because:
- By default, React escapes values inserted into the DOM. That is, React automatically escapes special HTML characters in user input, ensuring it is rendered as plaintext rather than HTML or JavaScript. This can only be bypassed if `dangerouslySetInnerHTML` is used to manually insert raw HTML into the DOM. We did not use `dangerouslySetInnerHTML` at all in our project.
- We did not allow direct DOM manipulation with user input using `innerHTML`, `outerHTML`, or `document.write`. We only allowed React components to display input via JSX, which handles escaping safely.

We considered using [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize user inputs but determined it was unnecessary in our case. DOMPurify is primarily used to protect against XSS attacks when rendering rich text input or using `dangerouslySetInnerHTML`, which we do not use. Overall, since React handles escaping and we avoid high-risk rendering of user inputs, our application is not vulnerable to XSS attacks.

## Description
*emotionary* is a journaling app with sentiment analysis. It will store encrypted user journal entries, sentiment analysis scores, and account information. Users will be able to gain a deeper understanding of their mental well-being, and utilize mood tracking with weekly and monthly summaries to manage their emotions. Users will also be able to tag, favorite, and filter journal entries to search through past entries easily.

### Instructions to run
1. Please follow Steps #1 and #2 below from [Getting Started](#instructions-to-run-1)
    - Clone this repo, go to the `FinalRelease` branch, and add the `.env` file
2. If you would like to run the test suite image separately, run `docker compose up --build test`
4. Otherwise, follow the remaining instructions below, and test reports will be automatically generated in Step #6

### Links
- [Backend tests](https://github.students.cs.ubc.ca/CPSC455-2025S/team15/tree/FinalRelease/Backend/test)
- [Frontend tests](https://github.students.cs.ubc.ca/CPSC455-2025S/team15/tree/FinalRelease/Frontend/test)

## Getting Started
The following credentials need to be passed as environment variables:
- `GOOGLE_ID`
- `MONGODB_ID`
- `RESEND_API_KEY`
- `VITE_GOOGLE_ID`
- `VITE_HUGGINGFACE_ID`

We will send you a `.env` file to use for Step #2 below.

### Instructions to run
1. Clone this repo and go to the `FinalRelease` branch
2. Replace the `.env.example` file in the root directory with the `.env` file we provide to you
    - Make sure the file is named `.env`
3. Run `docker compose up --build`
4. Backend API runs at: http://localhost:5000
5. Frontend will be available at: http://localhost
    - Please login using our test user:
        - Email: testhash@email.com
        - Password: testingthehash
    - Email account for Time Capsule:
        - email: emotionary@yahoo.com
        - password: emotionSlary1$!
6. Tests reports are automatically generated in the project's root directory in the `test-results` folder and can be opened in your browser of choice:
    - `backend-test-report.html`

    - `frontend-test-report.html`
