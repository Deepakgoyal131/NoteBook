module.exports = {
  apps: [
    {
      name: 'notebook-backend',
      script: 'index.js', // or your entry file
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      }
    }
  ]
};
