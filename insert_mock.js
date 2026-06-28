import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('classifications').insert([
    {
      image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
      result: 'Bacterial Spot (Bercak Daun Bakteri)',
      confidence: 0.942,
      species: 'Capsicum annuum L.',
      status: 'Kritis'
    }
  ]).select();
  
  if (error) {
    console.error('Error inserting mock data:', error);
  } else {
    console.log('Successfully inserted mock classification:');
    console.log(JSON.stringify(data, null, 2));
  }
}

run();
