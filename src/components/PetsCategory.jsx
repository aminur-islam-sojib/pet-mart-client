import { useEffect } from "react";
import useAxios from "../Hooks/useAxios";

const PetsCategory = () => {
  const instance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/category-filtered-product/pets");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instance]);

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default PetsCategory;
