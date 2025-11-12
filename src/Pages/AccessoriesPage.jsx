import useFetchData from "../Hooks/useFetchData";
import ListingCard from "../components/Card";

const AccessoriesPage = () => {
  const accessories = useFetchData("accessories");
  return (
    <>
      <div className="text-center my-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="text-rose-600">Accessories</span>
        </h2>
      </div>
      <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {accessories.map((accessory) => (
          <div key={accessory._id}>
            {" "}
            <ListingCard listing={accessory} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AccessoriesPage;
