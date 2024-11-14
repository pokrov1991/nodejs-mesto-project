require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO_BACKEND, DEPLOY_PATH_BACKEND,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO_BACKEND,
      path: DEPLOY_PATH_BACKEND,
      'pre-deploy': `scp -Cr ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_BACKEND}`,
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
