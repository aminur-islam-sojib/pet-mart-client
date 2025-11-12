import useFetchData from "../Hooks/useFetchData";
import ListingCard from "../components/Card";

const CareProductsPage = () => {
  const careProducts = useFetchData("care-products");
  return (
    <>
      <div className="text-center my-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="text-rose-600">Care Products</span>
        </h2>
      </div>
      <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {careProducts.map((careProduct) => (
          <div key={careProduct._id}>
            {" "}
            <ListingCard listing={careProduct} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CareProductsPage;
