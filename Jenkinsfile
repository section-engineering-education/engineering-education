#!groovy

pipeline {
  agent none // Required to avoid blocking a Jenkins executor while waiting for user input

  options {
    ansiColor('xterm')
  }

  environment {
    AWS_DEFAULT_REGION = 'ap-southeast-2'
  }

  stages {

    stage('Deploy') {
      agent { label 'docker' }
      
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'jenkins-section-website'
        ]]) {
          sh 'make build-beta'
          sh 'make generate-beta'
          sh 'make deploy-beta'
        }
      }
    }
  }
}
