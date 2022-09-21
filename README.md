Raindrop Backup Tool
====================

A simple script for backup bookmarks and permanent copies from Raindrop.

## Usage

1. Register an app in [Raindrop Integrations](https://app.raindrop.io/settings/integrations)
2. Copy the *test token*
3. Run `export RAINDROP_TOKEN=YOUR_TEST_TOKEN` (Replace `YOUR_TEST_TOKEN` with your test token)
4. Run `pnpm start metadata` to backup metadata
5. Run `pnpm start cache` to backup permanent copies
6. Run `pnpm start cover` to backup covers

## License

[MIT](LICENSE)