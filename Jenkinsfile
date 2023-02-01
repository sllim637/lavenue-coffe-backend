pipeline {
    agent any
    tools { nodejs 'node' }
    stages {
        stage('Build') {
            steps {
                echo 'I am Building..'
                sh 'npm install '
            }
        }
        stage('build image') {
            steps {
                script {
                    echo 'I am Building the application..'
                    sh 'docker build -t lavenue-app:1.0'
                    /* groovylint-disable-next-line LineLength, NestedBlockDepth */
                    withCredentials([usernamePassword(credentialsId : 'docker-hub-account' , passwordVariable: 'PASS', usernameVariable:'USER')]) {
                    // now i have access tho this variables
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'I am Deploying....'
            }
        }
    }
}
