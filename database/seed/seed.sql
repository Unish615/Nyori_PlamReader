-- Nyoria चिना Seed Data
-- 002_seed.sql

-- Example demo user and data for initial verification
INSERT INTO public.profiles (id, email, full_name, nwaranName, date_of_birth, time_of_birth, gender, country, district, city, birthplace, role, preferred_language)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'unish@nyoriachina.com', 'Unish Gautam', 'शिव प्रसाद', '1996-05-14', '06:30:00', 'male', 'Nepal', 'Kathmandu', 'Kathmandu', 'Pashupatinath, Kathmandu', 'user', 'ne'),
  ('00000000-0000-0000-0000-000000000002', 'admin@nyoriachina.com', 'Admin Jyotish', 'गुरुदेव', '1985-01-01', '12:00:00', 'other', 'Nepal', 'Kathmandu', 'Kathmandu', 'Kathmandu', 'admin', 'ne')
ON CONFLICT (id) DO NOTHING;

-- Seed Kundali Profile
INSERT INTO public.kundali_profiles (id, user_id, full_name, nwaran_name, date_of_birth, time_of_birth, gender, country, district, city, birthplace, latitude, longitude, timezone)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Unish Gautam', 'शिव प्रसाद', '1996-05-14', '06:30:00', 'male', 'Nepal', 'Kathmandu', 'Kathmandu', 'Pashupatinath, Kathmandu', 27.7172, 85.3240, 5.75)
ON CONFLICT (id) DO NOTHING;
