USE snipbox;

ALTER TABLE snippets
  ADD COLUMN pinned TINYINT(1) NOT NULL DEFAULT 0 AFTER code;

ALTER TABLE snippets
  ADD INDEX idx_snippets_user_pinned (user_id, pinned);
