🚌 Bus Maintenance System
📌 Project Overview
The Bus Maintenance System is a web-based application designed to streamline and digitize the management of college bus operations. It provides a centralized platform for tracking bus details, driver assignments, fuel usage, maintenance records, inventory, safety compliance, and complaints. This system is tailored for Pragati Engineering College and aims to improve operational efficiency, data accuracy, and user experience.

🎯 Objectives
- Digitize manual records of bus operations and maintenance
- Provide a user-friendly interface for data entry, search, and export
- Enable bulk uploads via CSV and XLSX formats
- Support real-time updates and filtering
- Prepare the system for integration with a backend (Flask) for dynamic data handling

🧩 Modules and Features
1. Dashboard
- Overview of fleet status
- Summary charts (planned)
- Quick links to all modules
2. Bus Details
- Stores bus number, route, capacity, model, fuel type, and status
- Searchable and exportable
- Supports CSV/XLSX upload
3. Driver Info
- Records driver name, assigned route, and bus number
- Editable and searchable
- Supports Excel upload
4. Fuel & Mileage
- Tracks fuel type, average mileage, and last refill date
- Allows adding new records and exporting data
- Search filter included
5. Logbook
- Logs daily trips: date, bus, route, start/end time, kilometers, and fuel used
- Useful for tracking usage and efficiency
6. Maintenance
- Records service history: date, work done, parts used, service center, and bill amount
- Helps monitor repair frequency and costs
7. Inventory
- Manages spare parts: name, stock level, reorder threshold, vendor, and contact
- Prevents stockouts and supports vendor tracking
8. Safety
- Tracks insurance and fitness certificate validity
- Flags expired documents
- Ensures compliance with safety regulations
9. Complaints
- Allows users to submit issues related to buses
- Categorized by type (maintenance, cleanliness, route, timing)
- Tracks status (pending/resolved)

⚙️ Technologies Used
- HTML, CSS, JavaScript for frontend
- Flask (Python) for backend integration (planned)
- SheetJS (xlsx.js) for Excel file handling
- Responsive design for desktop and mobile
- Modular JavaScript for maintainability

📁 Folder Structure
bus-maintenance-system/
├── index.html
├── dashboard.html
├── bus_details.html
├── driver_info.html
├── fuel.html
├── inventory.html
├── maintenance.html
├── safety.html
├── complaints.html
├── logbook.html
├── styles.css
├── script.js
├── README.md



🚀 Deployment
This project is ready to be hosted on GitHub Pages or integrated into a Flask backend. It supports:
- CSV and XLSX uploads
- Data export in both formats
- Search and filter functionality
- Modular expansion for analytics and user roles

🏫 Academic Relevance
- Real-world application design
- UI/UX best practices
- Data handling and validation
- Integration readiness with backend services



