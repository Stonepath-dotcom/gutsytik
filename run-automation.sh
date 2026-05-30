#!/bin/bash

# ==============================================
# GetMova Auto-Blog Runner
# Run this script from the z.ai dev environment
# where z-ai-web-dev-sdk has access to the API
#
# Usage:
#   bash run-automation.sh          # Run daily tasks
#   bash run-automation.sh weekly   # Run weekly tasks
#   bash run-automation.sh generate # Generate single blog post
#   bash run-automation.sh trending # Discover trending topics
# ==============================================

BASE_URL="http://localhost:3000"
MODE="${1:-daily}"
COMMIT_AND_PUSH=true

echo "🚀 GetMova Automation Runner"
echo "=============================="
echo "Mode: $MODE"
echo "Time: $(date)"
echo ""

# Function to run automation and report
run_automation() {
  local name="$1"
  local method="$2"
  local url="$3"
  local body="$4"

  echo "▶ Running: $name"
  if [ "$method" = "POST" ]; then
    if [ -z "$body" ]; then
      result=$(curl -s -X POST "$BASE_URL$url" -H "Content-Type: application/json" 2>/dev/null)
    else
      result=$(curl -s -X POST "$BASE_URL$url" -H "Content-Type: application/json" -d "$body" 2>/dev/null)
    fi
  else
    result=$(curl -s "$BASE_URL$url" 2>/dev/null)
  fi

  # Check if successful
  success=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)

  if [ "$success" = "True" ]; then
    echo "  ✅ $name - SUCCESS"
    # Show key info
    echo "$result" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    if 'post' in d:
        print(f'     Title: {d[\"post\"].get(\"title\", \"\")}')
    if 'newTopicsAdded' in d:
        print(f'     New topics: {d[\"newTopicsAdded\"]}')
    if 'refreshed' in d:
        print(f'     Refreshed: {d[\"refreshed\"].get(\"title\", \"\")}')
    if 'imagesGenerated' in d:
        print(f'     Images: {d[\"imagesGenerated\"]}')
except: pass
" 2>/dev/null
  else
    echo "  ❌ $name - FAILED"
    echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'     Error: {d.get(\"error\", \"unknown\")} - {str(d.get(\"details\", \"\"))[:100]}')" 2>/dev/null
  fi
  echo ""
}

# Make sure dev server is running
echo "📡 Checking dev server..."
if ! curl -s "$BASE_URL/api/blog/dashboard" > /dev/null 2>&1; then
  echo "⚠️  Dev server not running. Starting..."
  cd /home/z/my-project
  npm run dev &
  echo "⏳ Waiting for server to start..."
  sleep 15
fi
echo ""

case "$MODE" in
  generate)
    run_automation "Generate Blog Post" POST "/api/blog/generate" '{}'
    ;;

  trending)
    run_automation "Discover Trending Topics" POST "/api/blog/trending" '{"maxTopics":5}'
    ;;

  paa)
    run_automation "PAA Enrichment" POST "/api/blog/paa" '{"maxQuestions":5}'
    ;;

  og-image)
    run_automation "Generate OG Images" POST "/api/blog/og-image" '{}'
    ;;

  daily)
    echo "📅 Running DAILY tasks..."
    echo "========================="

    day=$(date +%u) # 1=Mon, 7=Sun
    if [ "$day" -eq 1 ] || [ "$day" -eq 3 ] || [ "$day" -eq 5 ] || [ "$day" -eq 7 ]; then
      # Generate days
      run_automation "Generate Blog Post" POST "/api/blog/generate" '{}'
      run_automation "Discover Trending Topics" POST "/api/blog/trending" '{"maxTopics":5}'
      run_automation "PAA Enrichment" POST "/api/blog/paa" '{"maxQuestions":5}'
    else
      # Refresh days
      run_automation "Refresh Old Post" POST "/api/blog/refresh" '{"force":false}'
      run_automation "Generate OG Images" POST "/api/blog/og-image" '{}'
    fi

    run_automation "Check Broken Links" POST "/api/blog/link-check" '{}'
    ;;

  weekly)
    echo "📊 Running WEEKLY tasks..."
    echo "=========================="

    # Run daily tasks first
    run_automation "Generate Blog Post" POST "/api/blog/generate" '{}'
    run_automation "Discover Trending Topics" POST "/api/blog/trending" '{"maxTopics":5}'
    run_automation "PAA Enrichment" POST "/api/blog/paa" '{"maxQuestions":5}'

    # Weekly tasks
    run_automation "SEO Audit" POST "/api/blog/seo-audit" '{}'
    run_automation "Keyword Research" POST "/api/blog/keyword-research" '{"focusArea":"general"}'
    run_automation "Content Gap Analysis" POST "/api/blog/content-gap" '{}'
    run_automation "Backlink Finder" POST "/api/blog/backlinks" '{}'
    run_automation "Weekly Report" POST "/api/blog/report" '{}'
    run_automation "Topic Cluster Strategy" POST "/api/blog/topic-cluster" '{}'
    run_automation "Competitor Monitor" POST "/api/blog/competitor" '{}'
    run_automation "Web Vitals Check" POST "/api/blog/vitals" '{}'
    run_automation "Translate to English" POST "/api/blog/translate" '{"lang":"en","maxPosts":2}'
    run_automation "Generate OG Images" POST "/api/blog/og-image" '{}'
    run_automation "Full IndexNow" POST "/api/blog/index-now" '{"submitAll":true}'
    ;;

  *)
    echo "Usage: bash run-automation.sh [daily|weekly|generate|trending|paa|og-image]"
    exit 1
    ;;
esac

# Commit and push results
if [ "$COMMIT_AND_PUSH" = true ]; then
  echo "📦 Committing and pushing results..."
  cd /home/z/my-project
  git add -A

  if git diff --cached --quiet; then
    echo "  No changes to commit"
  else
    git commit -m "auto: automation run - $(date +%Y-%m-%d) - $MODE tasks"
    git push origin main 2>&1
    echo "  ✅ Changes pushed! Vercel will auto-deploy."
  fi
fi

echo ""
echo "🏁 Automation complete!"
