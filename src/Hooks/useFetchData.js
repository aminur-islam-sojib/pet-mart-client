import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useFetchData = (category) => {
  const instance = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(
          `/category-filtered-product/${category}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instance, category]);

  return data;
};

export default useFetchData;
