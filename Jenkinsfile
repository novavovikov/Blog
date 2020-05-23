pipeline {
  agent any

  environment {
  }

   stages {
    stage('Clean') {
      steps {
        sh './clean.sh'
      }
    }

    stage('Build') {
      steps {
        sh './run-prod.sh'
      }
    }
  }
}