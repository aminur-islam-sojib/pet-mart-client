/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import OptimizedImage from "../components/OptimizedImage";
import EmptyField from "../components/EpmtyTable";
import Swal from "sweetalert2";
import EditDataModal from "../components/EditDataModal";
import useDynamicTitle from "../Hooks/useDynamicTitle";

const MyListings = () => {
  const { user } = useAuth();
  const dialogRef = useRef();
  const instanceSecure = useAxiosSecure();
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState([]);
  useDynamicTitle("My Listings");
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

  const handleEdit = (listing) => {
    setListing(listing);
    dialogRef.current.showModal();
  };

  return (
    <section className=" min-h-screen">
      {" "}
      {listings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className=" bg-rose-400 text-white">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
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
                  <td>{listing?.category}</td>
                  <td>{listing?.location}</td>
                  <td>{new Date(listing.date).toLocaleDateString("en-GB")}</td>
                  <td>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleEdit(listing)}
                        className="btn btn-info text-white flex-1"
                      >
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
      {/* Modal  */}
      <dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
        <div className="modal-box ">
          <EditDataModal
            dialogRef={dialogRef}
            listing={listing}
            fetchData={fetchData}
          />
        </div>
      </dialog>
    </section>
  );
};

export default MyListings;
