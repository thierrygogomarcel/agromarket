-- Enable RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create buckets
INSERT INTO storage.buckets (id, name)
VALUES 
  ('avatars', 'User Avatars'),
  ('products', 'Product Images');

-- Avatars bucket policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Product images bucket policies
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "Sellers can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'products' AND
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE (raw_user_meta_data->>'userType')::text = 'producer'
    )
  );

CREATE POLICY "Sellers can update their product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'products' AND
    auth.uid() = owner
  );

CREATE POLICY "Sellers can delete their product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'products' AND
    auth.uid() = owner
  );