
# 🎓 University Microservices Management System

This repository contains a complete microservices-based architecture for managing university operations. Developed collaboratively by a team of five developers, the project demonstrates advanced concepts in software architecture, service orchestration, containerization, security, and frontend-backend integration.

---

## 👨‍👩‍👧‍👦 Team Overview

Our team followed a distributed development model where:
- Each member designed and implemented an **independent microservice** using **Spring Boot** with either **H2** or **MySQL**.
- We collaboratively developed a **Node.js microservice** with **MongoDB** that integrates and extends functionalities from the individual services.
- All services are containerized with Docker and orchestrated via a **centralized `docker-compose.yml`**.

---

## 🔧 Technologies Stack

| Layer             | Technology                             |
|------------------|----------------------------------------|
| Backend (Java)    | Spring Boot, Spring Data JPA           |
| Backend (Node.js) | Express.js, Mongoose (MongoDB)         |
| Frontend          | React.js                               |
| Databases         | MySQL, H2, MongoDB                     |
| Inter-Service Comm| OpenFeign, RabbitMQ                    |
| Service Discovery | Eureka (Netflix OSS)                   |
| Gateway           | Spring Cloud Gateway                   |
| Security          | Keycloak (OAuth2, OpenID Connect)      |
| DevOps/Container  | Docker, Docker Compose                 |

---

## 🗂️ Project Structure

```
├── ConfigServer/
├── DiscoveryService/
├── Gateway/
├── keycloak/
├── keycloak-26.1.3/
├── microservices-universite-*/            
├── microservices-universite-cours-service
├── Frontend/
├── docker-compose.yml
├── Database/Data/
├── *.pdf
└── *.png
```

---

## 📜 Microservices Details

Each Spring Boot microservice manages a core university domain entity.

---

## 🔁 Communication Between Services

- **OpenFeign** is used for synchronous RESTful service-to-service calls.
- **RabbitMQ** is used for asynchronous messaging.
- All services are **registered with Eureka**, and the Gateway dynamically routes requests.

---

## 🔐 Security with Keycloak

- OAuth2 + OpenID Connect
- Role-Based Access Control (RBAC)
- Token-based API protection

---

## 🌐 React Frontend Integration

- User login and token storage
- Conditional rendering by role
- Secure API access with Bearer tokens

---

## 🐳 Docker & Deployment

```bash
docker-compose up --build
```

---

## 📘 Documentation

| File                              | Description                                  |
|-----------------------------------|----------------------------------------------|
| `Atelier 5 - Dockerisation.pdf`   | Dockerizing a microservice                   |
| `Atelier 6 - docker-compose.pdf`  | Compose orchestration guide                  |
| `microservice architecture.png`   | System diagram                               |

---

## ✅ Key Features

- ✅ Microservices with Docker
- ✅ Service discovery and Gateway
- ✅ JWT + Keycloak security
- ✅ React-based UI
- ✅ Use case implementation
- ✅ REST + Messaging

---

## 🚀 Getting Started

1. Clone and enter:
```bash
git clone https://github.com/your-org/university-microservices.git
cd university-microservices
```

2. Start services:
```bash
docker-compose up --build
```

3. Access:
- Frontend: `http://localhost:3000`
- Keycloak: `http://localhost:8080`
- Eureka: `http://localhost:8761`
- Gateway: `http://localhost:8081`

---

## 🙌 Authors

A team of 5 developers. Each built one Spring Boot microservice. Final Node.js service + frontend was built collaboratively.

---

## 📬 Contact

Open an issue for questions or suggestions.
