pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Production build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'Vue application checks and production build completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Review the stage logs above to find the cause.'
        }

        always {
            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
        }
    }
}
