import useFetchData from "../Hooks/useFetchData";
import ListingCard from "../components/Card";

const PetFoodCategoryPage = () => {
  const petFoods = useFetchData("pet-food");
  return (
    <>
      <div className="text-center my-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="text-rose-600">Pet Foods</span>
        </h2>
      </div>
      <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {petFoods.map((petFood) => (
          <div key={petFood._id}>
            {" "}
            <ListingCard listing={petFood} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PetFoodCategoryPage;
