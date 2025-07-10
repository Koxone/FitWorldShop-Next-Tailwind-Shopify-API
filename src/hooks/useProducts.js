import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function useProducts() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
