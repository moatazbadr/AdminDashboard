# Edu-plat Admin Dashboard

![Angular](https://img.shields.io/badge/Angular-v19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)

## 📌 OverView

The Edu-Plat Admin Dashboard is a crucial component of Edu-Plat, 
an online educational platform designed to serve the Faculty of Science.
Ain Shams University's Mathematics Department espcially Computer sicence program.
This dashboard provides administrators with the tools to manage courses, users, and more!

### Features :
- Manage courses CRUD operations
- Manage Doctor Registeration And Removal
- Upload important Academic Files (Exams Schedules ,Labs Schedules ,etc...)
- View academic analytics
- Control And Manage students (remove, inquire)


## 📋 Prerequisites

|        Software      |       Version       |              Download Link                   |
| ---------------------| --------------------| -------------------------------------------- |
| Node.js              | v18 or higher       | [https://nodejs.org/](https://nodejs.org/)   |
| npm                  | v9 or higher        | Comes with Node.js                           |
| Angular CLI          | v15 or higher       | npm install -g @angular/cli                |
| Git (optional)       | Any                 | [https://git-scm.com/](https://git-scm.com/) |


## ⚙️ Setup Instructions 
  ### 🪟 For Windows / 🍎For macOS
  1-Open PowerShell / CMD and run the following: 
```bash
    git clone https://github.com/moatazbadr/AdminDashboard.git
    cd AdminDashboard
    npm install
    ng serve
```
## 🚀 Launching the Application
  ### Open your browser and open 
```
http://localhost:4200
```
## Alertnatively you can visit the Hosted site at 
https://admin-dashboard-c9dh.vercel.app/login

## ❗ Troubleshooting
| Issue                      | Solution                                              |
| -------------------------- | ----------------------------------------------------- |
| `ng: command not found`    | Run `npm install -g @angular/cli`                     |
| `EACCES` permission errors | Use `sudo` on macOS or run PowerShell as Admin on Win |
| App not loading in browser | Ensure port 4200 is not blocked or in use             |
| Slow npm install           | Try clearing npm cache: `npm cache clean --force`     |
