# Habit Tracker App

responsive habit tracking application built with Vue.js. This app allows users to add daily habits, view a 7-day habit history, and manage their daily goals, all while keeping track of their streaks.

## Features

- Add Habits: Users can add new habits, categorize them, and track them over time.
- Select Categories: Habits can be organized into various categories, such as Workout, Diet, Music, etc.
- Habit Streaks: Keep track of how long you've maintained a habit.
- Date Picker: View habits by specific days and navigate through past 7 days.
- Responsive Design: Mobile-first approach with fully responsive layouts for tablets and desktops.
- Data Persistence: All habits are stored in the browser's localStorage, so users don't lose their data on refresh.

## Tech Stack

- Vue.js 3: The frontend framework used to build the entire application.
- Vue Router: For managing the navigation between different days in the date picker.
- LocalStorage: To persist habit data across sessions.
- CSS Flexbox & Grid: Used for responsive layouts.

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/SeanMarkWD/HabitTrackerApp.git
cd habit-tracker
```

2. Install dependencies:

```bash
  npm install
```

3. Run the development server:

```bash
  npm run dev
```

4. Open the app in your browser:

```bash
  http://localhost:5173/
```

## Project Structure

`src/components`: This directory contains all the Vue components used in the app, such as AddHabitForm, HabitItem, and CategoryComponent.

`src/views`: Contains the main views, including the MainView.vue, which handles the overall layout of the application.

`src/assets/icons`: SVG icons used for different habit categories.

`src/router`: Vue Router configuration for managing routes and navigation.

`src/App.vue`: The root Vue component.

## How to use

1. Add a Habit:
   Enter a habit name in the "Enter habit name" input field.
   Select a category for the habit (e.g., Workout, Diet, etc.).
   Click "Add Habit" to save it.

2. View Habits:
   Navigate through the past 7 days using the date picker at the top.
   The app displays the habits and their completion status for each day.

3. Track Completion:
   Mark a habit as complete by checking the checkbox next to each habit.
   View your current streak for each habit.

## Design Approach

- Mobile First: The app is primarily designed for mobile devices but adjusts seamlessly for larger screens (tablets and desktops).
- Flexbox/Grid: Used throughout the app for a consistent and responsive layout.
- Theming: A soft, friendly color palette is used to make the app visually appealing and approachable.

## Customisations

You can customize the icons, habit categories, and even the number of days shown in the date picker by modifying the following files:

- Habit Categories: Update the categories in `AddHabitForm.vue`.
- Habit Icons: Add or modify SVG icons in `src/assets/icons/`.

## Acknowledgements

- Layout Inspiration: The layout design and visual inspiration for this habit tracker app were taken from a concept on Dribbble:
  [Morin - Habit Tracker App ](https://dribbble.com/shots/18932568-Morin-Habit-Tracker-App)
- Icons: The icons used in this project were sourced from SVGRepo, a platform for free SVG icons.
  [SVG icons](https://www.svgrepo.com)
