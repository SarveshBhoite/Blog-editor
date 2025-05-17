
# 📝 Blog Editor – Full Stack Blog Management App

A fully functional blog editor web application where users can create, auto-save, edit, and publish blog posts. Built using modern web technologies and the App Router of Next.js 13+, this project includes debounced auto-saving, rich blog listing, and clean backend API routes.

---

## ✨ Features

- Create and edit blog posts with:
  - Title
  - Content
  - Tags (comma-separated)
- Save blog posts as **drafts**
- **Auto-save** functionality:
  - Every 30 seconds
  - After 5 seconds of user inactivity (debounced)
- Visual feedback with **toast notifications** when drafts are auto-saved
- **Publish** button to mark a blog post as live
- **View all blogs**, separated as:
  - Drafts
  - Published
- Edit and update any existing blog post

---

## 📁 Project Structure (Key Files)

```

blog-editor/
├── app/
│   ├── editor/page.tsx             # Blog editor page
│   ├── blogs/page.tsx              # Blog listing page
│   └── api/
│       ├── blogs/route.ts          # GET all blogs
│       ├── blogs/\[id]/route.ts     # GET single blog by ID
│       ├── blogs/draft/route.ts    # POST save draft
│       └── blogs/publish/route.ts  # POST publish blog
│
├── components/                     # UI components and utilities
│   └── tag-input.tsx, toast, etc.
├── styles/
│   └── globals.css                 # Global Tailwind styles
├── tailwind.config.ts              # Tailwind CSS config
├── next.config.mjs                 # Next.js config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Project metadata

````

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/blog-editor.git
cd blog-editor
````

### 2. Install Dependencies (npm)

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open in your browser

```bash
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/blogs/draft`   | Save or update a draft blog post |
| POST   | `/api/blogs/publish` | Publish a blog post              |
| GET    | `/api/blogs`         | Retrieve all blogs               |
| GET    | `/api/blogs/:id`     | Retrieve a single blog by ID     |

---

## 🧠 Technical Concepts

* **App Router** with file-based routing and server actions
* **API Routes** defined inside the `/app/api/` directory
* **Tailwind CSS** for fast and responsive styling
* **Debounced Auto-Save** using timeout logic for performance
* **Toast Notifications** for user feedback
* **Dynamic Routing** for blog pages and editor updates

---

## 🚀 Deployment

You can deploy this project easily using [Vercel](https://vercel.com/):

### Steps:

1. Push the code to GitHub
2. Import the repository in Vercel
3. Set `NODE_ENV=production` (if required)
4. Deploy 🎉

---

## 📸 Screenshots (Optional)

![Screenshot 2025-05-17 211020](https://github.com/user-attachments/assets/baae5be1-6708-4e05-a089-dcf8cdd571aa)


## 🧩 Future Improvements

* Add rich text editing support (TipTap / React Quill)
* User authentication (JWT or NextAuth)
* Blog cover images and markdown support
* Comments and likes system

---



## 📄 License

This project is licensed under the MIT License.

````

---

✅ **Next Step:**  
- Rename this to `README.md`
- Put it in the root of your project folder
- Push to GitHub using:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/blog-editor.git
git push -u origin main
