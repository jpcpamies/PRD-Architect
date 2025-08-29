module.exports = {
  apps: [{
    name: 'prd-architect-static',
    script: 'simple-server.cjs',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
