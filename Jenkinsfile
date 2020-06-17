node('maven') {
  stage('Build') {
    checkout scm
    sh "mvn clean fabric8:deploy"
    // sh "mvn clean install"
    // sh "oc start-build dbxUI --from-file=target/dbx-0.0.1-SNAPSHOT.jar --follow"
  }
  stage('Deploy') {
    openshiftDeploy depCfg: 'dbx-ui'
    openshiftVerifyDeployment depCfg: 'dbx-ui', replicaCount: 1, verifyReplicaCount: true
  }
}