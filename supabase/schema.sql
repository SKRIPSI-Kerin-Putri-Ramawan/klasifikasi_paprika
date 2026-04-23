-- schema.sql
-- Run this in the Supabase SQL Editor

-- 1. Create a table for disease categories
CREATE TABLE diseases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  scientific_name TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create a table for symptoms
CREATE TABLE symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  disease_id UUID REFERENCES diseases(id) ON DELETE CASCADE,
  content TEXT NOT NULL
);

-- 3. Create a table for treatments
CREATE TABLE treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  disease_id UUID REFERENCES diseases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 4. Create a table for classification results (history)
CREATE TABLE classifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- Link to auth.users.id if using Supabase Auth
  image_url TEXT NOT NULL,
  result TEXT NOT NULL,
  confidence FLOAT NOT NULL,
  species TEXT DEFAULT 'Capsicum annuum',
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create a table for leaf anatomy
CREATE TABLE anatomy (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  image_url TEXT
);

-- 6. Create a table for nutrition info
CREATE TABLE nutrition (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  benefit TEXT NOT NULL
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE anatomy ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition ENABLE ROW LEVEL SECURITY;

-- Simple public read access
CREATE POLICY "Allow public read-only access" ON diseases FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON symptoms FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON treatments FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON anatomy FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON nutrition FOR SELECT USING (true);

-- Classification history: anyone can insert, but only authenticated can view theirs (adjust based on needs)
CREATE POLICY "Allow anyone to insert classifications" ON classifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anyone to view classifications" ON classifications FOR SELECT USING (true);

-- Storage Policies for 'scans' bucket
-- These policies allow public read access and authenticated upload access to the 'scans' bucket.
CREATE POLICY "Allow public read access to scans" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'scans');

CREATE POLICY "Allow authenticated users to upload to scans" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'scans' 
  AND auth.role() = 'authenticated'
);
