pipeline {
  environment {
    registry = "sdhokare/node-jenkins-example"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }

  agent any

  tools {nodejs "node"}

  stages {
     
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('SonarQube Analysis') {
      def scannerHome = tool 'SonarQubeScanner';
      withSonarQubeEnv() {
        sh "${scannerHome}/bin/sonar-scanner"
      }
    }

    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
  }
}