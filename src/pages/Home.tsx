import { IonContent, IonPage } from "@ionic/react";
import { useDocuments } from "@lib/db";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { categoryDocument } = useDocuments();
  const [categories, setCategories] = useState<any[]>([]);

  const createCategory = async (name: string) => {
    const result = await categoryDocument.create({ name });
    const category = await categoryDocument.read(result.id);
    console.log("create", category);
    return result.id;
  };

  const updateCategory = async (id: string, name: string) => {
    const category = await categoryDocument.read(id);
    await categoryDocument.update(id, { ...category, name });
    console.log("update", await categoryDocument.read(id));
  };

  const listCategories = async () => {
    const categories = await categoryDocument.find({});
    console.log("list", categories);
    return categories.docs;
  };

  const deleteCategory = async (id: string) => {
    const category = await categoryDocument.read(id);
    await categoryDocument.delete(category);
    console.log("delete", id);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await listCategories();
      console.log("Fetched categories:", categories);
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <IonPage className="pt-safe">
      <IonContent fullscreen>
        <div className="p-4 font-bold">
          <div className="mb-4 flex">
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              className="border p-2 rounded w-full mr-2"
            />
            <button
              onClick={async () => {
                const categoryName = (
                  document.getElementById("categoryName") as HTMLInputElement
                ).value;
                if (categoryName) {
                  const id = await createCategory(categoryName);
                  console.log("Category added with ID:", id);
                  // Optionally, you can refresh the category list here
                  const categories = await listCategories();
                  setCategories(categories);
                }
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>

          <ul>
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center mb-2"
              >
                <span>{category.name}</span>
                <button
                  onClick={async () => {
                    await deleteCategory(category._id);
                    console.log("Category deleted with ID:", category._id);
                    // Refresh the category list after deletion
                    const updatedCategories = await listCategories();
                    setCategories(updatedCategories);
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
