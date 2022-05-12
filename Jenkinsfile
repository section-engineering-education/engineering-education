#!groovy

pipeline {
  agent { label 'docker' }

  options {
    ansiColor('xterm')
  }

  environment {
    AWS_DEFAULT_REGION = 'ap-southeast-2'
  }

  stages {

    stage('Deploy') {
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
