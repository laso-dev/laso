import { useEffect, useState } from "react";

type QueueInfo = {
  name: string;
  counts: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  };
};

export default function App() {
  const [queues, setQueues] = useState<QueueInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/queues")
      .then((res) => res.json())
      .then((data) => {
        setQueues(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch queues");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Laso</h1>
      <h2>Queues</h2>
      {queues.length === 0 ? (
        <p>No queues found</p>
      ) : (
        <ul>
          {queues.map((queue) => (
            <li key={queue.name}>
              <strong>{queue.name}</strong>
              <span> - </span>
              <span>waiting: {queue.counts.waiting}, </span>
              <span>active: {queue.counts.active}, </span>
              <span>completed: {queue.counts.completed}, </span>
              <span>failed: {queue.counts.failed}, </span>
              <span>delayed: {queue.counts.delayed}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
