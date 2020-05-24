pipeline {
  agent any

  environment {
    FLASK_ENV = 'production'
    DOCKER_FILE = "./docker-compose.yml"
  }

   stages {
    stage('Clean') {
      steps {
        sh './clean.sh'
      }
    }

    stage('Build') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} build --no-cache'
      }
    }

    stage('Start') {
      steps {
        sh 'USER_ID=$(id -u) GROUP_ID=$(id -g) docker-compose -f ${DOCKER_FILE} up -d --force-recreate --no-deps --remove-orphans'
      }
    }

    stage('Proxy') {
      steps {
        sh './run-proxy.sh'
      }
    }
  }
}