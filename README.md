# Image-Video-Uploader
A web application that allows users to securely log in, upload image or video files, tag them, display and organize files through a drag-and-drop interface, share files via links, and view statistics on file views.

### Key Features:

1. **User Authentication:**
   - Implement secure login functionality.
   - Ensure proper session management.

2. **File Upload and Management:**
   - Allow users to upload only image or video files.
   - Implement tagging functionality for each uploaded file.
   - Display a list of uploaded files to the user.
   - Enable a drag-and-drop interface for organizing files on the user's display.

3. **File Sharing:**
   - Generate a shareable link for any file that allows non-logged-in users to view the file.
   - Ensure files shared via link are accessible without requiring login.

4. **Statistics:**
   - Track and display statistics for each file, including the number of times viewed.

### Technical Requirements:

- **Frontend:**
  - Use react for the frontend.
  - Implement a responsive design that works on both desktop and mobile browsers.
  - Ensure a user-friendly drag-and-drop interface.

- **Backend:**
  - Choose a suitable backend technology only  Node.js, allowed.
  - Implement secure authentication mechanisms.
  - Use a database to store user information, file metadata, tags, and view statistics.
  - Ensure the backend handles file uploads securely and efficiently.
  - Implement an API for file sharing and statistics tracking.

- **Security:**
  - Implement proper input validation to prevent common vulnerabilities.
  - Ensure secure file storage and access controls to prevent unauthorized access.
