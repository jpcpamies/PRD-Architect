module.exports = {
  apps: [{
    name: 'prd-architect-dev',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development'
    }
  }]
};
