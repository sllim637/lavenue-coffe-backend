//this variable will be true if there is some changes in the code
// CODE_CHANGES = getGitChanges()
pipeline {
    agent any 
    stages { 
        stage("build") {
            // when {
            //     expression {
            //         BRANCH_NAME == "dev" && CODE_CHANGES == true
            //     }
            // }
            steps{
                echo "I am building the app"
            }
        }
         stage("test") {
             //the steps will execute if the expression is true
             when {
                 expression {
                     BRANCH_NAME == 'dev' || BRANCH_NAME == 'master' 
                 }
             }
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