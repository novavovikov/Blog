pipeline {
  agent any

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