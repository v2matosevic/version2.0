# Scheduled Tasks (Cron Jobs)

> All recurring tasks managed via PM2 ecosystem file or Node.js cron library.

## Jobs

| Job | Schedule | Description | Sprint |
|-----|----------|-------------|--------|
| Database backup | Daily 2:00 AM CET | Copy SQLite file to backups/ with 30-day retention | 5.1 |
| Booking reminders | Every hour | Send 24h reminder emails for upcoming bookings | 5.3 |
| Chat conversation purge | Daily 3:00 AM CET | Delete conversations older than 90 days | 5.5 |
| Parcel tracking refresh | Every 30 min | Re-scrape carrier pages for active (non-delivered) orders | 5.7 |
| Analytics aggregation | Daily 1:00 AM CET | Aggregate raw events into daily summaries | 5.6 |
| Stale session cleanup | Daily 4:00 AM CET | Remove expired admin sessions | 5.1 |

## Implementation

Use `node-cron` package within the Next.js standalone server (runs as long as PM2 keeps the process alive). All jobs run in the same Node.js process — no separate cron daemon needed.

Alternative: PM2 cron restart patterns for simple tasks, `node-cron` for complex ones.

## Monitoring

Each job logs start/end times. Failed jobs trigger Sentry alert. Health check endpoint reports last-run timestamps.
