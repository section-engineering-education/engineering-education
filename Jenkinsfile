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

    stage('Plan') {
      steps {
        sh 'bash terraform/terraform.sh fmt'

        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'jenkins-section-website' // Create agent specific to our repo
        ]]) {
          sh 'bash terraform/terraform.sh plan'
        }

        stash includes: 'terraform/.terraform/**', name: 'terraform-state'
        stash includes: 'terraform/tfplan', name: 'tfplan'
        stash includes: 'terraform/.terraform.lock.hcl', name: 'terraform-lock'
        archiveArtifacts artifacts: 'terraform/tfplan'
      }
    }

    stage('Verify Plan') {
      steps {
        milestone(100)
        timeout(time: 2, unit: 'DAYS') {
          input "Apply plan?"
        }
        milestone(110)
      }
    }

    stage('Apply') {
      steps {
        unstash name: 'terraform-state'
        unstash name: 'tfplan'
        unstash name: 'terraform-lock'

        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'jenkins-section-website'
        ]]) {
          sh 'bash terraform/terraform.sh apply'
        }
      }
    }

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
