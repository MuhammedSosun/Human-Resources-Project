
### 📄 Turkish Version
[README_TR.md](https://github.com/Sosun044/Human-Resources-Project/blob/main/README_TR.md)


📌 Project Overview
The HR Management System is a full-stack application I developed to manage personnel, inventory, and assignment operations with secure authentication and real-time notifications.

The system includes:
Personnel Management – Add, update, filter, and view detailed employee records with profile photos.

Inventory Management – Track company assets, manage their status, and update inventory information.

Assignment Operations – Assign inventory to employees, track return dates, and manage asset handovers.

Authentication & Authorization – Role-based access control using JWT + Refresh Token.

Real-time Notifications – Implemented via WebSocket (STOMP) for instant updates.

Centralized Logging – Integrated ELK Stack (Elasticsearch, Logstash, Kibana) for professional log management.

This project follows best practices in layered architecture, uses RESTful APIs for backend communication, and is containerized with Docker for easy deployment.

🏗 Architecture & Technologies

Backend
Language: Java 17+

Framework: Spring Boot 3.x

Build Tool: Maven

Database: PostgreSQL

ORM: Spring Data JPA + Hibernate

Security: Spring Security with JWT + Refresh Token

Logging: Logback → Logstash → Elasticsearch → Kibana (ELK Stack)

API: RESTful services

Containerization: Docker & Docker Compose

Frontend
Framework: React

Build Tool: Vite

Styling: TailwindCSS + Material UI components

State Management: React Hooks + Context API

HTTP Client: Axios with interceptors for JWT handling

Real-time Communication: WebSocket with STOMP.js

Infrastructure
Dockerized Services: Backend, Frontend, PostgreSQL, Elasticsearch, Logstash, Kibana

Indexing & Search: Elasticsearch

Visualization: Kibana dashboards for logs

🚀 Features & Roles
Key Features
Personnel Management
Add, update, and delete personnel records

Filter by first name, last name, TCKN, or department

Upload and display profile photos

Track employment history (start date, position, title, resignation date & reason)

Inventory Management
Add, update, and delete inventory items

Filter by type, brand, model, serial number, or status

Track inventory status (In Personal, In Office, In Warehouse)

Manage inventory types dynamically

Assignment Operations
Assign inventory to personnel

Track assignment and return dates

Manage handovers and returns with status updates

Prevent duplicate active assignments for the same inventory

Authentication & Authorization
Role-based access with JWT + Refresh Token

Secure endpoints for different roles

Dynamic frontend menu based on user role

Real-time Notifications
WebSocket + STOMP integration for instant updates

Notifications for new assignments, returns, and important events

Centralized Logging
Structured logs sent to Logstash and stored in Elasticsearch

Kibana dashboards for log analysis

User Roles
ADMIN – Full access to all modules and actions

IK (Human Resources) – Manage personnel and assignment operations

ENVANTER (Inventory Management) – Manage inventory and inventory types only

🌍 Environment Variables
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/hr
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600000
REFRESH_TOKEN_EXPIRATION=604800000
LOGSTASH_HOST=logstash
LOGSTASH_PORT=5000

📊 Logging (ELK)
Logback sends logs to Logstash via TCP (5000 port).

Logstash processes logs and sends them to Elasticsearch.

Kibana visualizes logs with index pattern: hr-logs-*.

⚠️ Note
The project does not come with a full Docker setup.
Only Elasticsearch and Kibana are provided via Docker.
Please run the backend and frontend locally to start the application.










