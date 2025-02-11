# Event Management App - Frontend

## Project Structure

### **Components**  
- **EventCard.jsx**: Displays individual event details in a card layout.  
- **Layout.jsx**: Contains the common layout structure for the app, like header, footer, and sidebar.  
- **NavBar.jsx**: Contains the navigation bar with links to different pages.

### **Pages**  
- **CreateEvent.jsx**: Allows users to create a new event.  
- **EditEvent.jsx**: Provides the interface for editing an existing event.  
- **Event.jsx**: Displays details of a specific event, including participant info.  
- **Events.jsx**: Lists all available events.  
- **Login.jsx**: Handles user login functionality.  
- **Signup.jsx**: Allows new users to register.

### **AuthProvider**  
- **AuthContext**: Provides context for managing user authentication state throughout the app.


## Project Setup

### 1. **Install Dependencies**

Clone the repository and install the dependencies using npm or yarn:

```bash
git clone <repository-url>
cd <project-folder>
npm install   # Or yarn install
```

### 2. **Run the Development Server**

To start the development server and open the app in your browser:

```bash
npm run dev   # Or yarn dev
```

This will run the app on `http://localhost:5173` by default.

