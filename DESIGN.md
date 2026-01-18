# DESIGN: 8bit-Epic — Architecture & Roadmap

High-level vision
- 8-bit visuals (pixel art, limited palettes) with deep underlying systems: quests, NPCs, factions, itemization, dialogue — designed to scale to a "Skyrim-like" scope.
- Hybrid world model: authored regions + procedurally generated connectors. Streaming at region granularity.

Core systems & responsibilities
1. Engine layer
   - Phaser scene bootstrap, core loop, resource manager.
   - Basic physics (Arcade) for movement and collisions.

2. World model
   - Region: authored or procedurally generated tiles + metadata (points of interest, spawn tables).
   - World generator: procedural land, biomes, dungeon seeds.
   - Region streaming: load/unload region data and entities as the player moves.

3. Entity & NPCs
   - Entity base class, components (position, inventory, AI state).
   - NPC scheduler: daily routines, heuristics, and reactions to player actions.
   - Behavior tree / utility AI for emergent behavior.

4. Quest & Dialogue
   - Quest graph: nodes (objectives) and conditions, supports branching and global triggers.
   - Dialogue system: node-based, with variables, conditions, and side-effects that can alter world state.

5. Combat & Items
   - Item definitions, equipment, effects, and simple combat resolution.
   - Scaling difficulty and challenge designers can tune.

6. Persistence & Mods
   - Save system: chunked saves (region-based) to allow large worlds.
   - Content import/export format for mods and community content.

Scalability & performance
- Use region streaming (like Skyrim's cell system) to cap active entities and tile rendering.
- Procedural generation for filler content; author high-value content for handcrafted experiences.
- Level-of-detail: render only what’s visible; use render textures or static atlases for tiles.

Roadmap (first 12 months of iteration)
Phase 1 — Foundations (0–2 months)
- Scalable project structure, tilemap renderer, player and camera, basic world generator.
- Simple quest system and save/load.

Phase 2 — Core content systems (2–5 months)
- NPC systems with pathfinding and simple schedules.
- Dialogue graph + editor.
- Inventory, loot tables, combat basics.

Phase 3 — World scaling (5–9 months)
- Region streaming and LOD optimizations.
- Tools for region/quest authorship.
- Procedural dungeons and seeded world generation for consistency.

Phase 4 — Content pipelines (9–12 months)
- Modding APIs, content pack loaders.
- Performance profiling and optimization across platforms.

Notes on tooling
- Use JSON/YAML for content; provide editors/exporters for designers.
- Use TS/Phaser for fast iteration, then port to a dedicated engine (Godot/Unity/C++) if needed for performance.

Data-driven approach
- Entities, NPC schedules, quests, items, and dialogues should be data-first (JSON), so designers can iterate without changing core code.

Security & multiplayer (future)
- If multiplayer is desired, separate authoritative world server and client; use deterministic sim for some gameplay features.

This design prioritizes modular, testable subsystems with clear extension points. The scaffold in this repo is an initial step — from here we add NPCs, quest graphs, and streaming.
