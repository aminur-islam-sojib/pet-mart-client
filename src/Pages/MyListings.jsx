/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import OptimizedImage from "../components/OptimizedImage";
import EmptyField from "../components/EpmtyTable";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [listings, setListings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await instanceSecure.get(`/myListings/${user?.email}`);
      setListings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await instanceSecure.delete(`/myListings/${id}`);
          fetchData();
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {" "}
      {listings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
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
                        <div className="font-bold">{listing?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>${listing?.price}</td>
                  <td>{listing?.location}</td>
                  <td>{new Date(listing.date).toLocaleDateString("en-GB")}</td>
                  <td>
                    <div className="flex gap-1.5">
                      <button className="btn btn-info text-white flex-1">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="btn btn-error text-white flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyField />
      )}
    </>
  );
};

export default MyListings;
