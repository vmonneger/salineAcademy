DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'saline_academy') THEN 
        CREATE DATABASE saline_academy; 
    END IF; 
END
$$;
