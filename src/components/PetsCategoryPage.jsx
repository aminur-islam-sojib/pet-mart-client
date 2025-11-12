import useFetchData from "../Hooks/useFetchData";
import ListingCard from "./Card";

const PetsCategoryPage = () => {
  const pets = useFetchData("pets");
  return (
    <div className=" w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {pets.map((pet) => (
        <div key={pet._id}>
          {" "}
          <ListingCard listing={pet} />
        </div>
      ))}
    </div>
  );
};

export default PetsCategoryPage;
