CREATE DATABASE IF NOT EXISTS snipbox
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE snipbox;

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS snippets (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('code', 'notes') NOT NULL DEFAULT 'code',
  language VARCHAR(50) NOT NULL DEFAULT 'javascript',
  code LONGTEXT NOT NULL,
  pinned TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_snippets_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  INDEX idx_snippets_user_id (user_id),
  INDEX idx_snippets_user_pinned (user_id, pinned)
);