
-- First, let's update the profiles table to set the specific email as admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'vanshichoudhary40@gmail.com';

-- If the profile doesn't exist yet, we'll insert it when the user signs up
-- The trigger will handle this automatically when they register
