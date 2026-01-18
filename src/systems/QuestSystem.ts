export type QuestStatus = "inactive" | "active" | "completed" | "failed";

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  // simple example: objective key -> target value, could be extended into a full graph
  objectives: Record<string, any>;
}

export class QuestSystem {
  private quests: Map<string, Quest> = new Map();

  createQuest(q: Omit<Quest, "status">): Quest {
    const id = q.id || cryptoRandomUUID();
    const quest: Quest = { ...q, id, status: "inactive" };
    this.quests.set(id, quest);
    return quest;
  }

  activate(id: string) {
    const q = this.quests.get(id);
    if (q && q.status === "inactive") q.status = "active";
  }

  complete(id: string) {
    const q = this.quests.get(id);
    if (q && q.status === "active") q.status = "completed";
  }

  getActive(): Quest[] {
    return Array.from(this.quests.values()).filter((q) => q.status === "active");
  }
}

function cryptoRandomUUID() {
  try {
    return (crypto as any).randomUUID();
  } catch {
    return "q-" + Math.random().toString(36).slice(2, 9);
  }
}
