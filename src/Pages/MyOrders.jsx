import React, { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instanceSecure.get(`/myOrders/${user?.email}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instanceSecure, user]);

  return (
    <div>
      <h1>HI</h1>
    </div>
  );
};

export default MyOrders;
