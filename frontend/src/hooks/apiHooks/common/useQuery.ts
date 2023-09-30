import { useEffect, useState } from "react";

export default function useQuery<Variables, Data>(
  variables: Variables,
  getApi: (variables: Variables) => Promise<Data>,
) {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  async function fetch() {
    setLoading(true);
    try {
      setData(await getApi(variables));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
}
