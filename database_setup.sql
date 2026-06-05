-- PostgreSQL Database Setup (Neon)
-- Save this script as `database_setup.sql` and run it in your Neon Database SQL Editor.

-- 1. Create Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    seoTitle VARCHAR(255),
    seoDescription TEXT,
    keywords TEXT,
    featuredImage VARCHAR(255),
    site VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    description TEXT,
    seoTitle VARCHAR(255),
    seoDescription TEXT,
    keywords TEXT,
    site VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(255) PRIMARY KEY,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Analytics Table (optional metrics storage)
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    pageViews INT DEFAULT 0,
    uniqueVisitors INT DEFAULT 0,
    recordedAt DATE DEFAULT CURRENT_DATE UNIQUE
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_posts_site ON posts(site);
CREATE INDEX idx_products_site ON products(site);
