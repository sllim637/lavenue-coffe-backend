pipeline {
    agent any 
    stages { 
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
                echo "I am deployin the app"
            }
        }
}
    post {
        always {
            echo "I am always executing after all steps"
        }

        success {
            echo "I am succeed !"
        }
        failure {
            echo "sorry , I failed to do you steps"
        }
    }

}  