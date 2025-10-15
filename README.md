# Borneo Language Translator & Cultural Hub

![Borneo App Logo](https://i.imgur.com/gEo53n0.png)

A sophisticated web application designed to translate between Indonesian, Bakumpai, and Ngaju—the indigenous languages of Borneo. This project goes beyond simple translation, incorporating a rich set of features including an admin panel, community engagement tools, a donation system, and a cultural learning section, all powered by the Google Gemini API.

The application is built with a modern, responsive interface using React and Tailwind CSS, ensuring a seamless experience across all devices.

## ✨ Key Features

- **🤖 AI-Powered Translation**: Utilizes the Google Gemini API (`gemini-2.5-flash`) for fast and contextually-aware translations between Indonesian, Bakumpai, and Ngaju.
- **🔊 Text-to-Speech**: Listen to the pronunciation of both the source and translated text, powered by Gemini's TTS capabilities.
- **📚 Custom Dictionary Management**: 
    - Admins can upload custom dictionaries (CSV files) to enhance translation accuracy for specific terms and phrases.
    - Features a dual-source system: manage the dictionary via local storage or a centralized GitHub repository for collaborative updates.
- **👑 Secure Admin Panel**: A dedicated, password-protected dashboard for administrators to:
    - Upload and manage the custom dictionary.
    - View key application statistics, including donation totals and user rating summaries visualized with charts.
    - Post and manage cultural content.
- **💬 Community Engagement**:
    - **Comments & Ratings**: Users can provide feedback, leave comments, and rate the application.
    - **AI Content Moderation**: Comments are automatically scanned by the Gemini API to filter out sensitive content before being posted.
    - **Likes & Replies**: Foster discussion with a nested reply system and comment liking.
- **🎓 Cultural Learning Hub**:
    - **AI-Generated Facts**: Discover interesting, dynamically generated cultural facts about the Dayak people of Borneo.
    - **Admin-Curated Content**: Admins can upload images and text to share cultural stories, traditions, and news.
- **❤️ Donation System**: 
    - Integrated donation options via DANA (QR Code & number) and Sociabuzz to support the project's mission of language preservation.
    - A dynamic list of recent and top supporters.
- **🎨 Modern UI/UX**:
    - Sleek, responsive, and intuitive design built with **React** and **Tailwind CSS**.
    - A beautiful **dark mode** toggle for user comfort.
    - Smooth animations and transitions for a polished user experience.
    - Securely stores API keys and user preferences in the browser's local storage.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI & Core Logic**: Google Gemini API (`@google/genai`)
  - **Translation**: `gemini-2.5-flash`
  - **Text-to-Speech**: `gemini-2.5-flash-preview-tts`
  - **Content Moderation & Fact Generation**: `gemini-2.5-flash`
- **Data Storage**: Browser `localStorage` for API keys, translation history, comments, donations, etc.
- **Dictionary Version Control (Optional)**: GitHub API

## 🚀 Getting Started

This application is designed to run directly in the browser without a backend server.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Google Gemini API key.

### Configuration

1.  **Clone or download the project files.**
2.  **Open `index.html` in your web browser.**
3.  **Set API Key**:
    - On the first launch, a modal will automatically appear prompting you to enter your API key.
    - You can access this modal anytime by clicking the **key icon (🔑)** in the header.
    - Enter your **Google Gemini API Key**. This key is stored securely in your browser's `localStorage` and is never transmitted to any server.
4.  **Admin Access**:
    - To access the admin panel, click the **Login** button.
    - Use the credentials hardcoded in `src/components/LoginModal.tsx`:
      - **Email**: `bangindrabang123@gmail.com`
      - **Password**: `02162003`

### (Optional) GitHub Integration for Dictionary

For more robust dictionary management, you can configure the app to use a GitHub repository as the single source of truth.

1.  **Create a GitHub Repository**: Create a new public or private repository. It must contain a `dictionary.json` file at the root.
2.  **Generate a Personal Access Token (PAT)**: Create a GitHub PAT with `repo` scope to allow the application to read and write to your repository.
3.  **Update Service Configuration**: Modify the constants in `src/services/githubService.ts` to point to your repository:
    ```typescript
    const GITHUB_REPO_OWNER = 'your-github-username';
    const GITHUB_REPO_NAME = 'your-repo-name';
    ```
4.  **Configure in Admin Panel**:
    - Log in as an admin.
    - Click the **key icon (🔑)** to open the API settings.
    - Select the **GitHub** provider and enter the PAT you generated.
    - Save the configuration. The admin panel will now read from and write to your GitHub repository when you upload dictionary files.

## 📂 Project Structure

```
.
├── src/
│   ├── components/       # React UI components
│   │   ├── charts/       # Chart components (Pie, Line)
│   │   ├── icons/        # SVG icon components
│   │   └── ...           # App components (Translator, AdminPanel, etc.)
│   ├── services/         # Logic for API calls and data management
│   │   ├── apiKeyService.ts
│   │   ├── geminiService.ts
│   │   └── githubService.ts
│   ├── App.tsx           # Main application component
│   ├── constants.ts      # App-wide constants and mock data
│   ├── index.tsx         # React entry point
│   └── types.ts          # TypeScript type definitions
├── index.html            # Main HTML file
└── README.md             # This file
```

## 📄 License

This project is open-source. Feel free to use it as a reference or for your own projects. Please provide attribution where appropriate.

---

Powered with ❤️ and the **Google Gemini API**.
