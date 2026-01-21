# Task Explorer

Task Explorer is a React Native application that fetches and manages tasks from the JSON Placeholder API.

## Features
- **Task List**: Scrollable list of tasks with completion status.
- **Filtering**: Filter tasks by "All", "Completed", or "Incomplete".
- **Task Details**: View detailed information about a task.
- **Offline Support**: Tasks are persisted locally using AsyncStorage.
- **Error Handling**: Retry mechanism for network failures.

## Setup Instructions

1.  **Clone the repository** (if applicable) or extract the zip.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run on Android**:
    ```bash
    npx react-native run-android
    ```
    *Make sure you have an Android emulator running or a device connected.*
4.  **Run on iOS** (Mac only):
    ```bash
    cd ios && pod install && cd ..
    npx react-native run-ios
    ```

## Architecture
- **API**: `src/api/tasks.js` handles data fetching.
- **Components**: `TaskItem.js` for list items.
- **Screens**: `HomeScreen.js` (List & Filters) and `DetailScreen.js` (Details).
- **Navigation**: Native Stack Navigator via `AppNavigator.js`.
- **Persistence**: `AsyncStorage` used in `HomeScreen` to cache data.

## Note
- The "Toggle Status" button on the detail screen updates local state only (bonus feature demonstration).
# TaskExplorer
