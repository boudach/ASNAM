#!/usr/bin/env node
/**
 * $RECEIPTS Token Dashboard
 * Track token performance, fees earned, and market data
 */

const CLAWNCH_API = 'https://clawn.ch/api';
const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex/tokens';
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COINGECKO_KEY = 'CG-kAvqHoowrroFejPJuvn2jR3S';
const WALLET = '0xBa0F9c339F5A38925edf5067812EAD280Db6D2CA';

async function fetchClawnchData() {
  try {
    const res = await fetch(`${CLAWNCH_API}/tokens`);
    const data = await res.json();
    return data.tokens?.find(t => t.symbol === 'RECEIPTS');
  } catch (e) {
    return null;
  }
}

async function fetchDexScreener(contractAddress) {
  if (!contractAddress) return null;
  try {
    const res = await fetch(`${DEXSCREENER_API}/${contractAddress}`);
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function fetchCoinGeckoPrice(contractAddress) {
  if (!contractAddress) return null;
  try {
    const res = await fetch(
      `${COINGECKO_API}/simple/token_price/base?contract_addresses=${contractAddress}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&x_cg_demo_api_key=${COINGECKO_KEY}`
    );
    const data = await res.json();
    return data[contractAddress.toLowerCase()];
  } catch (e) {
    return null;
  }
}

function formatNumber(num) {
  if (!num) return '$0.00';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

async function main() {
  console.log('🧾 $RECEIPTS Token Dashboard');
  console.log('=' .repeat(40));
  console.log();

  // Check Clawnch
  const token = await fetchClawnchData();
  
  if (token) {
    console.log('✅ Token Deployed on Base');
    console.log(`   Contract: ${token.contract_address}`);
    console.log(`   Market Cap: ${formatNumber(token.market_cap)}`);
    console.log(`   Price: ${formatNumber(token.price)}`);
    console.log(`   Volume 24h: ${formatNumber(token.volume_24h)}`);
    console.log();

    // Check CoinGecko
    const cgData = await fetchCoinGeckoPrice(token.contract_address);
    if (cgData) {
      console.log('📈 CoinGecko Data');
      console.log(`   Price: $${cgData.usd}`);
      console.log(`   Market Cap: ${formatNumber(cgData.usd_market_cap)}`);
      console.log(`   Volume 24h: ${formatNumber(cgData.usd_24h_vol)}`);
      console.log(`   Change 24h: ${cgData.usd_24h_change?.toFixed(2)}%`);
      console.log();
    }

    // Check DexScreener for more data
    const dexData = await fetchDexScreener(token.contract_address);
    if (dexData?.pairs?.[0]) {
      const pair = dexData.pairs[0];
      console.log('📊 DexScreener Data');
      console.log(`   Liquidity: ${formatNumber(pair.liquidity?.usd)}`);
      console.log(`   Buys 24h: ${pair.txns?.h24?.buys || 0}`);
      console.log(`   Sells 24h: ${pair.txns?.h24?.sells || 0}`);
      console.log();
    }

    // Calculate fees (80% of 1% trading fee)
    const volume24h = token.volume_24h || 0;
    const feesEarned = volume24h * 0.01 * 0.8;
    console.log('💰 Estimated Fees Earned (24h)');
    console.log(`   Volume: ${formatNumber(volume24h)}`);
    console.log(`   Your Cut (0.8%): ${formatNumber(feesEarned)}`);
    console.log();

  } else {
    console.log('⏳ Token not deployed yet');
    console.log('   Awaiting Clawnch bot processing...');
    console.log();
  }

  console.log('🔗 Links');
  console.log('   Clawnch: https://clawn.ch/');
  console.log('   Moltbook: https://www.moltbook.com/m/clawnch');
  console.log(`   Wallet: https://basescan.org/address/${WALLET}`);
  console.log();
}

main().catch(console.error);
