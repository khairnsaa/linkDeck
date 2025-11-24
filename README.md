# LinkDeck 🔗

**LinkDeck** is a sleek, minimalist personal dashboard designed to declutter your digital workspace. It serves as a modern alternative to traditional browser bookmarks, giving you a clean, focused environment to manage your most essential web links.

Built with performance and simplicity in mind, LinkDeck ensures your favorite resources are always just one click away.

## ✨ Features

- **⚡ Instant Capture**: Quickly add new links with a custom title and URL.
- **🔒 Local Privacy**: All data is persisted locally in your browser's `LocalStorage`—no external servers, no tracking.
- **✅ Smart Validation**: Automatically validates URLs to ensure your deck remains broken-link free.
- **🗑️ Effortless Management**: Clean interface to view, open, and remove links with ease.
- **📱 Responsive Design**: Looks great on desktop and mobile (responsive layout).

## 🛠️ Tech Stack

This project is built using a modern, lightweight frontend stack:

- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe, robust code.
- **Build Tool**: [Vite](https://vitejs.dev/) - For lightning-fast development and bundling.
- **Testing**:
  - [Vitest](https://vitest.dev/) - Blazing fast unit test framework.
  - [JSDOM](https://github.com/jsdom/jsdom) - Browser environment simulation.
  - [Testing Library](https://testing-library.com/) - DOM testing utilities.

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Installation

1. **Clone the repository** (or navigate to the project folder):

   ```bash
   cd linkDeck
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Running Tests

Run the test suite to ensure everything is working correctly:

```bash
npm test
```
