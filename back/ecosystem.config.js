module.exports = {
  apps: [{
    name: 'saline-acedmy',
    script: './server.js',
    instances: 'max',
    autorestart: true, 
    watch: true,
  }]
};
