import React from "react";
import { useEffect } from "react";
import useAxios from "../Hooks/useAxios";

const CareProducts = () => {
  const instance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(
          "/category-filtered-product/care-products"
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instance]);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};

export default CareProducts;
