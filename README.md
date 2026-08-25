# Employee Management - CI/CD Project

## Objective
Implement a CI/CD pipeline for a containerized 3-tier Employee Management application using Git, Maven, Jenkins, Docker and AWS EC2.

## Architecture
User -> Frontend (Nginx) -> Backend (Spring Boot REST API) -> MySQL

## Tools
- Git/GitHub
- Java 17
- Maven
- Jenkins
- Docker/Docker Compose
- AWS EC2
- Spring Boot
- MySQL
- HTML/CSS/JavaScript

## Project Structure
```text
Employee-Management-CICD-Project/
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   ├── nginx.conf
│   └── Dockerfile
├── database/
│   └── init.sql
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## 1. Run Backend Tests
```bash
cd backend
mvn clean test
mvn clean package
```

## 2. Run the Complete Application Locally
From the project root:
```bash
docker compose up -d --build
```

Open:
```text
http://localhost
```

Backend API:
```text
http://localhost:8080/api/employees
```

Check containers:
```bash
docker ps
```

Stop:
```bash
docker compose down
```

## 3. Git Workflow
```bash
git init
git add .
git commit -m "Initial Employee Management application"
git branch -M main
git remote add origin <YOUR-GITHUB-REPOSITORY>
git push -u origin main

git checkout -b develop
git push -u origin develop
```

Feature branches:
```bash
git checkout -b feature/employee-api
git checkout -b feature/employee-service
git checkout -b feature/database-config
```

Merge feature branches into `develop` using Pull Requests.

## 4. Jenkins
Create a Jenkins Pipeline job.

Pipeline configuration:
- Definition: Pipeline script from SCM
- SCM: Git
- Repository: `<YOUR-GITHUB-REPOSITORY>`
- Branch: `*/develop`
- Script Path: `Jenkinsfile`

Install/configure Jenkins tools:
- JDK 17
- Maven
- Git
- Docker

The pipeline performs:
1. Checkout
2. Maven clean package
3. Unit tests
4. Docker image build
5. Stop/remove previous containers
6. Start new application containers

If Maven tests fail, Jenkins stops before the Docker/deployment stages.

## 5. AWS EC2
Launch an Ubuntu EC2 instance.

Install Docker:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

Reconnect to SSH after adding the user to the Docker group.

Install Java/Maven if Jenkins will run on the same server:
```bash
sudo apt install -y openjdk-17-jdk maven git
```

For a lab deployment, clone the project:
```bash
git clone <YOUR-GITHUB-REPOSITORY>
cd Employee-Management-CICD-Project
docker compose up -d --build
```

Open:
```text
http://<EC2-PUBLIC-IP>
```

## Security Group
For a basic lab:
- SSH 22: restrict to your IP
- HTTP 80: allow as required
- Do not expose MySQL 3306 publicly.

## 6. GitHub Webhook
Configure a GitHub webhook to trigger Jenkins after pushes/merges to `develop`.

Recommended flow:
```text
Developer -> Feature Branch -> Pull Request -> develop
        -> GitHub Webhook -> Jenkins -> Maven Test
        -> Docker Build -> Deploy to EC2
```

## 7. Submission Evidence
Capture screenshots of:
1. GitHub repository and branches
2. Feature branch/merge conflict resolution
3. Successful Maven test
4. Jenkins successful pipeline
5. Jenkins failed pipeline caused by a test failure
6. Docker images
7. Docker containers
8. AWS EC2 instance
9. Application opened using EC2 public IP

## Important
Replace all placeholders such as `<YOUR-GITHUB-REPOSITORY>` and configure Jenkins/EC2 credentials for your own environment. Do not commit real passwords, SSH private keys, or cloud credentials.
