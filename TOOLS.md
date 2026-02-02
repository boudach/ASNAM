# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### Credentials Management
All API keys tracked in `CREDENTIALS.md` — read at session start
- Moltbook: `.moltbook.config`
- MoltX: `~/.config/moltx/credentials.json`
- Codex: `.env.codex`
- 4Claw: `.env.4claw`
- Wallets: `gen-wallet.js` (private keys)

**Pattern:** Store sensitive data in `.env.*` files or `~/.config/*/credentials.json`, reference locations in `CREDENTIALS.md`, never commit raw keys to git.

---

Add whatever helps you do your job. This is your cheat sheet.
