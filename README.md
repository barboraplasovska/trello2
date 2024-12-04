# Trello2

Trello2 is a task management application inspired by Trello, built to organize and prioritize your work with ease. This project uses modern web development practices, including **Domain-Driven Design (DDD)**, **MVVM architecture**, and component-driven UI development with **Storybook**.

## Table of Contents

- [Project Overview](#project-overview)
- [Team Collaboration](#team-collaboration)
- [Features](#features)
- [Architecture](#architecture)
- [License](#license)

---

## Project Overview

Trello2 is designed to streamline workflows for individuals and teams. Users can create, edit, and manage boards, lists, and cards, offering flexibility and efficiency in task management.

This project leverages:

- **React** for a dynamic and interactive UI.
- **TypeScript** for type safety and maintainable code.
- **Material-UI (MUI)** for modern, responsive design components.
- **Storybook** for isolated UI development and documentation.

---

## Team Collaboration

This project was developed by a team of four members:

- **Barbora** and **Bianca**: Focused on designing the user interface and developing reusable UI components. Storybook was extensively used to ensure component reusability and visual consistency.
- **Charlene** and **Lilian**: Worked primarily on backend integration, implementing Domain-Driven Design (DDD) principles for a scalable and maintainable architecture. They handled services, stores, and the integration of components with the MVVM-based viewmodels.

The collaborative effort ensured a clear division of responsibilities while maintaining coherence in the final application.

---

## Features

- **User Authentication**: Secure login functionality.
- **Task Management**: Create and organize boards, lists, and cards.
- **Responsive Design**: Accessible across devices with a consistent user experience.
- **Isolated Component Development**: Develop and test UI components with Storybook.
- **Scalable Architecture**: Clean and maintainable codebase using DDD and MVVM principles.

---

## Architecture

### **Domain-Driven Design (DDD)**  
The `core` directory encapsulates domain logic:

- **Models**: Define entities like `Board`, `Card`, and `User`.
- **Services**: Handle API calls and business logic.
- **Stores**: Manage application state (e.g., `BoardStore`, `UserStore`).

### **MVVM Architecture**  
The `viewmodels` directory bridges domain logic and UI components, promoting separation of concerns and testability.

### **Storybook**  
Used for isolated UI development and documentation. Components under `ui/components` are documented and tested in Storybook to ensure visual consistency and reusability.

---

## Folder Structure

```plaintext
src
├── core
│   ├── models        # Domain models (e.g., Board, Card)
│   ├── services      # Business logic and API services
│   ├── stores        # Application state management
├── ui
│   ├── components    # Reusable UI components
│   ├── pages         # High-level views (e.g., HomePage, BoardPage)
│   ├── styles        # Global and component-specific styles
│   ├── viewmodels    # Bridges between core and UI
├── index.tsx         # App entry point
```


---

## License

This project is open-source and available under the [MIT License](LICENSE).
