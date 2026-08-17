# Join - Collaborative Task Management

A Kanban-style productivity tool with contact management, drag & drop tasks, and a
responsive multi-page architecture. Built with vanilla JavaScript and Firebase Firestore.

---

## Live

| Environment | URL                                                                      |
| ----------- | ------------------------------------------------------------------------ |
| **Prod**    | [join.dev2ksoftware.com](https://join.dev2ksoftware.com)                 |
| **Staging** | [join-staging.dev2ksoftware.com](https://join-staging.dev2ksoftware.com) |

---

## Preview

![Join Screenshot](./assets/img/preview-join.png)

---

## Key Features

**Core Functionality:**

- Kanban board with 4 status columns (ToDo, In Progress, Await Feedback, Done)
- Shared workspace with Firebase authentication (email/password + guest login)
- Full responsive design (320px+ mobile-first support)
- Real-time task search and filtering
- Dashboard with task statistics and summaries
- Drag & drop task management (desktop + mobile touch support)
- Advanced form validation with instant feedback
- Contact management with full CRUD operations
- Legal notice & privacy policy pages
- Cloud data persistence with Firestore

**Technical Highlights:**

- Multi-Page Application (MPA) architecture
- Modular file structure with `core/` subdirectories
- Clean code principles (JSDoc documentation, max 400 LOC/file)
- Firebase integration (Auth + Firestore)
- Service-based architecture for data management

---

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend:** Firebase Firestore (NoSQL database)
- **Authentication:** Firebase Authentication
- **Architecture:** Multi-Page Application (MPA) with modular design
- **Documentation:** JSDoc

---

## Local Development

```bash
git clone https://github.com/KosMaster87/Join.git
cd Join
pnpm install
```

Copy the Firebase config template and add your credentials:

```bash
cp config/firebase.config.js.example config/firebase.config.js
```

```bash
pnpm run dev
# → opens http://localhost:3000
```

```bash
pnpm run docs   # generate JSDoc into docs/
```

---

## Structure

```text
join/
├── assets/
│   ├── fonts/                 # Inter font variants
│   ├── img/                   # SVG icons & UI elements
│   └── templates/             # Reusable HTML partials (header, menu)
│
├── config/
│   ├── firebase.config.js             # Firebase credentials (gitignored)
│   └── firebase.config.js.example     # Config template
│
├── css/                        # One stylesheet per page/module
│
├── js/
│   ├── app.js                  # Main application logic
│   ├── add-task/               # Task creation module (+ core/)
│   ├── board/                  # Kanban board module (+ core/)
│   ├── contact/                # Contact management module (+ core/)
│   └── shared/                 # Shared utilities
│
├── pages/                       # HTML views (board, contacts, summary, legal, ...)
│
├── services/                    # Service layer
│   ├── auth.service.js          # Authentication
│   ├── firestore.service.js     # Database operations
│   ├── data.service.js          # Data transformation
│   ├── user.service.js          # User management
│   └── store.js                 # Global state
│
├── index.html                   # Entry point (login page)
├── style.css                    # Global styles
├── package.json
├── jsdoc.json
└── README.md
```

---

## Authentication

Two methods are supported: standard Firebase email/password, and a pre-configured guest
login for immediate access to the shared workspace.

---

## Architecture

**Service Layer:**

- `auth.service.js` - user authentication
- `firestore.service.js` - database operations
- `data.service.js` - data transformation
- `user.service.js` - user management
- `store.js` - global state

**Modular Design:**

- Each feature has its own directory (`board/`, `contact/`, `add-task/`)
- Core functionality separated into `core/` subdirectories
- Shared utilities in `shared/`
- Max 400 lines of code per file

---

## License

ISC License - see `package.json` for details.

---

## Author

**Konstantin Aksenov**

- [GitHub](https://github.com/KosMaster87)
