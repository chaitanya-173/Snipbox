# Code Snippet Manager

A modern, full-stack application for managing and organizing code snippets with a beautiful dark/light mode interface.

## 🌟 Features

- **Create & Edit Snippets**: Easily create and edit code snippets with syntax highlighting
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable coding
- **Copy to Clipboard**: One-click copy functionality for quick code sharing
- **Search Functionality**: Find snippets quickly with the search feature
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback on all operations
- **Persistent Drafts**: Your work is saved even when navigating between pages

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
- React Hot Toast for notifications
- Lucide React for icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/code-snippet-manager.git
cd code-snippet-manager
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
```

### Running the Application

1. Start the backend server

```bash
cd backend
npm start
```

2. Start the frontend development server

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📝 API Endpoints

### Snippets

- `GET /api/snippets` - Get all snippets
- `GET /api/snippets/:id` - Get a specific snippet
- `POST /api/snippets` - Create a new snippet
- `PUT /api/snippets/:id` - Update a snippet
- `DELETE /api/snippets/:id` - Delete a snippet

## 🎨 Features in Detail

### Snippet Management

- Create new code snippets with title and content
- Edit existing snippets
- Delete snippets
- View all snippets in a list
- Search through snippets

### User Experience

- Dark/Light mode toggle
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Copy to clipboard functionality
- Persistent drafts during navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Chaitanya Chaudhary - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for a simple and efficient code snippet management solution
