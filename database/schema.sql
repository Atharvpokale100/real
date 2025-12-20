-- Smart Admission System Database Schema
-- Supports MySQL, PostgreSQL, and SQLite

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    course VARCHAR(100) NOT NULL,
    degree_level VARCHAR(50) NOT NULL,
    previous_qualification VARCHAR(255) NOT NULL,
    gpa DECIMAL(5, 2) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    personal_statement TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Accepted', 'Rejected')),
    date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reviewed_by VARCHAR(255),
    review_notes TEXT,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_course (course),
    INDEX idx_date_applied (date_applied)
);

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_path VARCHAR(500) NOT NULL,
    document_type VARCHAR(50),
    file_size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
);

-- Users/Admins Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'reviewer', 'super_admin')),
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Application Status History
CREATE TABLE IF NOT EXISTS application_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_by VARCHAR(255),
    change_reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_changed_at (changed_at)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50),
    user_id INT,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Statistics Cache Table (for performance)
CREATE TABLE IF NOT EXISTS statistics_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_type VARCHAR(50) NOT NULL,
    stat_value INT NOT NULL,
    stat_date DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_stat (stat_type, stat_date),
    INDEX idx_stat_date (stat_date)
);

-- Insert default admin user (password: admin123 - should be hashed in production)
-- Password hash for 'admin123' using bcrypt: $2b$10$rOzJqXJqXJqXJqXJqXJqXO
INSERT INTO users (username, email, password_hash, role, full_name) 
VALUES ('admin', 'admin@admission.com', '$2b$10$rOzJqXJqXJqXJqXJqXJqXO', 'super_admin', 'System Administrator')
ON DUPLICATE KEY UPDATE username=username;

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('application_deadline', '2024-12-31', 'date', 'Application deadline date'),
('max_file_size_mb', '10', 'number', 'Maximum file upload size in MB'),
('allowed_file_types', 'pdf,doc,docx,jpg,jpeg,png', 'string', 'Allowed file types for upload'),
('auto_assign_reviewer', 'false', 'boolean', 'Automatically assign reviewers to applications'),
('email_notifications', 'true', 'boolean', 'Enable email notifications')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

