pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'employee-management'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Maven Build and Test') {
            steps {
                dir('backend') {
                    sh 'mvn clean test package'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down || true
                    docker compose up -d
                    docker compose ps
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    sleep 15
                    curl -f http://localhost/ || exit 1
                    curl -f http://localhost:8080/api/employees || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Review the failed stage. Deployment only occurs after Maven tests pass.'
        }
        always {
            sh 'docker compose ps || true'
        }
    }
}
