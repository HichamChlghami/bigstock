-- Create a table for application settings (Admin Credentials)
CREATE TABLE IF NOT EXISTS public.app_settings (
    key text PRIMARY KEY,
    value text NOT NULL
);

-- Insert default credentials (only if they don't exist)
INSERT INTO public.app_settings (key, value) VALUES
('admin_email', 'admin@luxe.com'),
('admin_password', 'admin123')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (Required for Login page to verify credentials)
-- Note: In a high-security env, we would use RPC, but this fits the current architecture.
CREATE POLICY "Allow public read access" ON public.app_settings
FOR SELECT USING (true);

-- Allow public update access (Required for Settings page to update credentials)
CREATE POLICY "Allow public update access" ON public.app_settings
FOR UPDATE USING (true);

CREATE POLICY "Allow public insert access" ON public.app_settings
FOR INSERT WITH CHECK (true);
