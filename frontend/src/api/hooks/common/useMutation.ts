import { useState } from "react";

export default function useMutation<Variables, Data>(
  mutateApi: ({ variables }: { variables: Variables }) => Promise<Data>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  async function mutate({ variables: variables }: { variables: Variables }) {
    let data: Data;
    setLoading(true);
    try {
      data = await mutateApi({ variables: variables });
    } catch (error) {
      setError(error);
      throw error;
    }
    setLoading(false);
    return data;
  }

  return { mutate, loading, error };
}
