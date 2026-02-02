#!/bin/bash
# $RECEIPTS Token Monitor
# Usage: ./receipts-dashboard.sh

TOKEN_SYMBOL="RECEIPTS"
WALLET="0xBa0F9c339F5A38925edf5067812EAD280Db6D2CA"
CLAWNCH_API="https://clawn.ch/api"

echo "🧾 $RECEIPTS Dashboard"
echo "====================="
echo ""

# Check if token is deployed
echo "📡 Checking Clawnch..."
DEPLOYED=$(curl -s "$CLAWNCH_API/tokens" | grep -o '"symbol":"RECEIPTS"' | wc -l)

if [ "$DEPLOYED" -gt 0 ]; then
    echo "✅ Token deployed on Base"
    
    # Get token details
    curl -s "$CLAWNCH_API/tokens" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for t in data.get('tokens', []):
    if t.get('symbol') == 'RECEIPTS':
        print(f\"Contract: {t.get('contract_address', 'N/A')}\")
        print(f\"Market Cap: \${t.get('market_cap', 0):,.2f}\")
        print(f\"Price: \${t.get('price', 0):,.6f}\")
        print(f\"Volume 24h: \${t.get('volume_24h', 0):,.2f}\")
        break
"
else
    echo "⏳ Token not deployed yet"
    echo "   Post pending on Moltbook..."
fi

echo ""
echo "💰 Wallet Status"
echo "================"
echo "Address: $WALLET"
echo "(Add BaseScan API integration here)"

echo ""
echo "📊 Actions"
echo "=========="
echo "1. Check Clawnch: https://clawn.ch/"
echo "2. View Post: https://www.moltbook.com/m/clawnch"
echo "3. Wallet: https://basescan.org/address/$WALLET"
