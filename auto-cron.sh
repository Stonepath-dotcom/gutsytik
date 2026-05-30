#!/bin/bash

# ==============================================
# GetMova Local Cron - Runs automatically via system cron
# This replaces Vercel Cron for AI-powered automations
#
# Setup: Run this command once:
#   crontab -e
# Then add:
#   0 6 * * * /home/z/my-project/auto-cron.sh >> /home/z/my-project/cron.log 2>&1
#
# This will run daily at 6 AM (server time)
# ==============================================

cd /home/z/my-project

echo "========================================" >> /home/z/my-project/cron.log
echo "GetMova Auto-Cron: $(date)" >> /home/z/my-project/cron.log
echo "========================================" >> /home/z/my-project/cron.log

# Make sure dev server is running
if ! curl -s http://localhost:3000/api/blog/dashboard > /dev/null 2>&1; then
  echo "Starting dev server..." >> /home/z/my-project/cron.log
  cd /home/z/my-project && npx next dev -p 3000 &>/dev/null &
  sleep 15
fi

# Run the daily automation
bash /home/z/my-project/run-automation.sh daily >> /home/z/my-project/cron.log 2>&1

echo "Cron completed at $(date)" >> /home/z/my-project/cron.log
