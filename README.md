# Project: 8bit-Epic — Starter Framework

Overview
- A minimal, extensible starter for an 8-bit-styled open-world adventure.
- Built with TypeScript + Phaser 3 + Vite for fast iteration.
- Includes a procedural overworld generator, player movement, camera follow, and a skeleton quest system.

Quick start
1. Install:
   - Node 18+ recommended
   - npm install

2. Run dev server:
   - npm run dev
   - Open http://localhost:5173

3. Build:
   - npm run build
   - npm run preview

Project layout
- index.html — app entry
- src/main.ts — bootstrap
- src/game/ — Game bootstrap + scenes
- src/systems/ — world generator, quest system
- src/entities/ — Player, base Entity
- DESIGN.md — architecture and roadmap

Goals
- Keep the code modular: engine, world generation, systems (quests/NPCs/inventory), and content tools.
- Scaleable architecture to support massive worlds (streaming, procedural generation + authored content).
- 8-bit aesthetic but deep systems like Skyrim: quests, NPC schedules, factions, economy, emergent interactions.

Next steps
- Add tile atlas and editor tools
- NPC system, pathfinding, behavior trees
- Dialogue graph editor and quest graph persistence
- Region streaming + LOD + save system

Enjoy exploring the scaffold and tell me which system you want to flesh out next (e.g., NPC schedules, the dialogue system, persistent save, or world streaming).
