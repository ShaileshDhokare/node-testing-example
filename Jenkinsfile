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
      steps {
        withSonarQubeEnv('sonarqube') {
          sh '/home/shailesh/.sonar/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner \
            -Dsonar.projectKey=jenkins-assignment-key \
            -Dsonar.sources=. \
            -Dsonar.login=sqp_5feede43f58bd87f4682f56fa139bf541aa46403 \
            -Dsonar.host.url=http://127.0.0.1:9000'
        }
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