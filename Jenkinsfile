pipeline {
    agent any 
    environment {
        NEX_VERSION = "3.1.0"
        SERVER_CREDENTIALS = credentials('docker-hub-account')
    }
    stages { 
        //all the stages for example the test stage or build stage and dockerize stage and deploy stage
        stage("build") {
            steps{
                echo "I am building the app"
            }
        }
        stage("test") {
            steps{
                echo "I am testing the app"
            }
        }
        stage("deploy") {
            steps{
                echo "I am deploying the app"
                echo "I use this credentials ${SERVER_CREDENTIALS}"
                sh "${SERVER_CREDENTIALS}"
            }
        }

}}  