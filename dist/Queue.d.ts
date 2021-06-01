import { QueueItem } from "./types";
declare const Queue: (initialItems: QueueItem[]) => {
    add: (steps: QueueItem[]) => any;
    set: (index: number, item: QueueItem) => void;
    reset: () => void;
    getItems: () => QueueItem[];
    setMeta: (index: number, meta: any) => void;
};
export default Queue;
