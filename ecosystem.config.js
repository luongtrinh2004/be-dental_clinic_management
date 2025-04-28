module.exports = {
  apps: [
    {
      name: 'Server',
      script: './src/index.js',
      instances: '1',
      autorestart: true,
      exec_mode: 'fork',
      watch: false,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      combine_logs: true,
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      max_memory_restart: '5000M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
