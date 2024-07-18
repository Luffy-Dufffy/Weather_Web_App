import { useEffect } from "react";
import { useState } from "react";

function useFetch({ url, options }) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  async function fetchDataFromApi() {
    try {
      setPending(true);
      const response = await fetch(url, { ...options });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setData(data);
    } catch (error) {

      setErrMsg(` Some Error Occurred.`);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchDataFromApi();
  }, [url]);

  return { data, pending, errMsg };
}

export default useFetch;
