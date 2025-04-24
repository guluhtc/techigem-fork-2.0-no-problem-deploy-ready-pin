#!/usr/bin/env node

import ngrok from 'ngrok';

async function startNgrok() {
  try {
    const url = await ngrok.connect({
      addr: 3000,
      region: 'in', // India region for better performance
    });
    
    console.log('\n=== Instagram Webhook Testing Setup ===');
    console.log('\nNgrok URL:', url);
    console.log('\nWebhook URL:', `${url}/api/webhooks/instagram`);
    console.log('Verify Token:', process.env.WEBHOOK_VERIFY_TOKEN || 'techigem_webhook_verify_token_2025');
    console.log('\nUse these values in your Instagram App Dashboard');
    console.log('==========================================\n');
  } catch (error) {
    console.error('Ngrok Error:', error);
    process.exit(1);
  }
}

startNgrok();