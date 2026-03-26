-- ============================================================
-- Version2.hr — MySQL Database Initialization
-- Creates databases and users for all PHP apps
-- This runs ONCE when the MySQL container first starts
-- ============================================================

-- app.version2.hr (Laravel — digital business cards)
CREATE DATABASE IF NOT EXISTS `app_v2cards`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'v2app'@'%' IDENTIFIED BY '${APP_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON `app_v2cards`.* TO 'v2app'@'%';

-- web.version2.hr (Laravel)
CREATE DATABASE IF NOT EXISTS `web_v2`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'v2web'@'%' IDENTIFIED BY '${WEB_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON `web_v2`.* TO 'v2web'@'%';

-- offer.version2.hr (Vanilla PHP)
CREATE DATABASE IF NOT EXISTS `offer_v2`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'v2offer'@'%' IDENTIFIED BY '${OFFER_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON `offer_v2`.* TO 'v2offer'@'%';

FLUSH PRIVILEGES;
