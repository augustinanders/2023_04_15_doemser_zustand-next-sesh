import { useStore } from "@/store/index.js";

export default function Home() {
  const count = useStore((state) => state.count);
  const addCount = useStore((state) => state.addCount);
  return (
    <button
      style={{ fontSize: "x-large" }}
      onClick={() => {
        addCount();
      }}
    >
      {count}
    </button>
  );
}
