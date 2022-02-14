Document Management System

## Prerequisites

## Install

- Node version > 14.15.0
- Yarn version > 1.22.5
- MongoDB version > 4.4

---

## Microservice Architechture

- Three services
  - User service - maintain user info
  - Directory service - maintain files and folders
  - Gateway service - To get connect with client

---

## To deploy & run

$ docker-compose up --build

- Above command will up 3 servers (user, directory, gateway)

## Try/Test

http://localhost:4000/ping
