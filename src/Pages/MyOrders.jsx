import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import EmptyField from "../components/EpmtyTable";
import OptimizedImage from "../components/OptimizedImage";

const MyOrders = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [listings, setListings] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instanceSecure.get(`/myOrders/${user?.email}`);
        setListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instanceSecure, user]);

  return (
    <div>
      {listings && listings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className=" bg-rose-400 text-white">
              <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>Buyer Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Address</th>

                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            {/* ✅ Single tbody */}
            <tbody>
              {listings.map((listing, index) => (
                <tr key={listing._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <OptimizedImage
                            src={listing?.image}
                            alt={listing?.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{listing?.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{listing?.buyerName}</td>
                  <td>{listing?.quantity}</td>
                  <td className=" font-medium">
                    ${listing?.price * listing?.quantity}
                  </td>
                  <td>{listing?.address}</td>
                  <td>{new Date(listing.date).toLocaleDateString("en-GB")}</td>
                  <td>{listing?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyField />
      )}
    </div>
  );
};

export default MyOrders;
