[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/k7YdU7jd)



# **Flash Learn - Digital Learning App**

## Table of Contents
1. [Project Status](#project-status)
2. [Overview](#overview)
3. [Design Prototype](#design-prototype)
4. [User Experience](#user-experience-ux)
5. [Features](#features)
    - [User Features](#user-features)
    - [Admin Features](#admin-features)
    - [Other](#other)
6. [Technology](#technology)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other](#other-1)
7. [Installation](#installation)
8. [API Documentation](#api-documentation)
9. [Progressive Web App (PWA) Guide](#pwa-guide)

## **Project Status**

Flash Learn is still under active development, and some features are yet to be implemented. Currently, the app supports basic functionality with plans to add more features in future updates.

**Planned Features** (not yet available):
- Full user progress tracking for quizzes and flashcards
- Notifications for upcoming deadlines and practice sessions
- Enhanced reporting for teachers/admins on student performance

The core features of creating, assigning, and practicing flashcards and quizzes are functional, and the platform will continue to be improved in subsequent releases.

## **Overview**

Flash Learn is a digital learning platform designed for both students and educators. Students can use it to engage with flashcards and quizzes, while teachers (admins) can manage content, track progress, and assign subjects. The app focuses on enhancing learning through interactive methods such as flashcards and quizzes.

Flash Learn provides a seamless experience for users to keep track of their learning progress, practice in a fun, gamified way, and stay motivated with real-time feedback and progress reports.

## **Design Prototype**

A lo-fi prototype has been created to illustrate the main structure and user flow of the app, for both desktop and mobile views. Although the design may change during development, the prototype offers a strong foundation for the final version.

You can view the current prototype here:

[![View Figma Prototype](https://img.shields.io/badge/Figma-Lo--Fi%20Prototype-blue?logo=figma)](https://www.figma.com/design/PoqhMK0rm7gf3LXAjvx3bp/UI%2FUX---u09?node-id=0-1&t=9pvLUHgB3TapRC4o-1)

## **User Experience (UX)**

The user experience is built based on user research and feedback gathered from surveys and usability testing.

- **Personas**: These represent the main users of Flash Learn, like students and teachers.
- **Survey Results**: Data collected from target users to inform design decisions (will send in Canvas).
- **User Stories**: Defining the core user needs and desired features.
- **Sitemap**: A visual representation of the app’s structure and navigation flow.

Explore the detailed feedback and design elements in the FigJam file:

[![View FigJam](https://img.shields.io/badge/FigJam-UX-yellow?logo=figma)](https://www.figma.com/board/WDxn7SidzlhVS9wo8haE31/Personas%2Fsitemap---u09?node-id=0-1&t=EFtD1utQJpsAyinK-1)

## **Features**

### **User Features**:
- Create an account and log in
- Access assigned flashcard collections and quizzes
- Track learning progress (in development)
- View progress status for each collection (not started, in progress, completed)
- Practice flashcards and quizzes with real-time feedback
- User profile management (change name, password)

### **Admin Features**:
- Create, update, and assign flashcard collections to students
- Track students' progress on assigned subjects and quizzes
- Manage student accounts (create, update, delete)
- View overall quiz results and student activity in a dashboard (in development)
- Set deadlines and add instructions to collections
- Search for students and view their learning history

### **Other**:
- User and admin roles for tailored functionalities
- Calendar-based tracking for quizzes and flashcard deadlines
- Responsive, mobile-friendly design

## **Technology**

### **Frontend**:
- React with Vite (for fast development)
- Zustand (for state management)
- Shadcn and Tailwind CSS (for styling and responsive design)

### **Backend**:
- Node.js with Express (for server and API management)
- MongoDB (for data storage) with Mongoose (for modeling)

### **Other**:
- JWT (Json Web Token) for user authentication
- REST API design following best practices

## **Installation**

To run Flash Learn locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/your-repo/flash-learn.git
cd flash-learn
```

2. **Backend-installation:**

```bash
Navigate to ``backend`` folder:

cd backend

Install dependencies:

npm install

```
Create a .env.development file (*for development*) with the following environment variables:
```
NODE_ENV=development
MONGO_URI=<your MongoDB Atlas URI>
PORT=3000
JWT_SECRET=<your secret JWT key>
```
Or/and a .env.production file (*for production*) with the following environment variables: 

```
NODE_ENV=production
MONGO_URI=<your MongoDB Atlas URI>
PORT=3000
JWT_SECRET=<your secret JWT key>
```

Start the backend-server:
```
npm run dev
```

3. **Frontend-installation:**

Navigate to the frontend folder:
```
cd frontend
````
Install dependencies:
```
npm install
```
Create a .env file with the following variables:
```
VITE_API_URL=https://your.chosen.backend/api 
```
And/Or for development
```
VITE_API_URL=http://localhost:3000/api 
```
Start the frontend application:
```
npm run dev
```
4. **Usage**
```
Navigate to http://localhost:5173 in your browser to start using the system.
```
## **API Collections**

To test the APIs, you can import Postman/Bruno API collections located in the `/resources/api-collections` folder.

API documentation can be found in the `/resources/api-documentation` folder.

### **How to Import into Postman/Bruno**

1. Download the relevant JSON file from `/resources/api-collections`.
2. Open Postman or Bruno.
3. Go to `File -> Import` and select the downloaded JSON file.
4. You will now be able to test all APIs directly from the tool.

## **Vite PWA Documentation**

This project includes a simple implementation of Vite's Progressive Web App (PWA) integration. Currently, the PWA does not support automatic updates or service worker-based updates. Users need to uninstall and reinstall the app to get the latest version when a new deployment is made.

### **How to Install the PWA**

To install the PWA on your device:

1. **On Desktop**: In supported browsers (such as Chrome or Edge), you will see an "Install" icon in the address bar. Click the icon and follow the prompts to install the app.
2. **On Mobile**: Open the website in a browser like Chrome on Android, then click the three-dot menu in the top right and select "Add to Home screen."

Once installed, the PWA will behave like a native app, offering a more app-like experience.

### **How Updates Work Right Now**

- The PWA does not automatically update when a new version is deployed.
- Users must uninstall the app and reinstall it to access the latest version.

### **Future Plans**

- **Automatic updates**: Implementing a service worker that will handle caching and notify users when a new version is available.
- **Improved user experience**: Adding features like "New Version Available" prompts or automatic updates upon relaunch.
