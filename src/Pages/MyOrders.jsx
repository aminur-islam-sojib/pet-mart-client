import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import EmptyField from "../components/EpmtyTable";
import OptimizedImage from "../components/OptimizedImage";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useDynamicTitle from "../Hooks/useDynamicTitle";

const MyOrders = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [listings, setListings] = useState([]);
  useDynamicTitle("My Orders");
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

  const generatePDF = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.setFontSize(16);
    doc.text("My Orders Report", 40, 40);

    // here code changes: define table columns and rows
    const columns = [
      "No.",
      "Product Name",
      "Buyer Name",
      "Quantity",
      "Price",
      "Address",
      "Date",
      "Status",
    ];

    const rows = listings.map((listing, index) => [
      index + 1,
      listing.productName,
      listing.buyerName,
      listing.quantity,
      `$${listing.price * listing.quantity}`,
      listing.address,
      new Date(listing.date).toLocaleDateString("en-GB"),
      listing.status,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [columns],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [244, 63, 94] },
      styles: { fontSize: 10 },
    });

    // Save the PDF file
    doc.save("MyOrders_Report.pdf");
  };

  return (
    <div className="p-5 min-h-screen">
      {/* here code changes: added download button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        {listings?.length > 0 && (
          <button
            onClick={generatePDF}
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg"
          >
            Download PDF
          </button>
        )}
      </div>

      {listings && listings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-rose-400 text-white">
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

            {/* Table Body */}
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
                  <td className="font-medium">
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
