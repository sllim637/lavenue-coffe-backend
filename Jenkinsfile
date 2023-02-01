pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'I am Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'I am Testing..'
				script {
					sh 'docker build -t lavenue-app:1.0 '
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