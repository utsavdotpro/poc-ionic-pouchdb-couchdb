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
        <div className="p-4">
          <div className="text-md mt-4 mb-10 text-center font-semibold">
            PouchDB + CouchDB Demo with Ionic App
          </div>

          <div className="mb-4 flex">
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              className="border py-2 rounded-full w-full me-4 px-4"
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
              className="bg-blue-500 rounded-full text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          <ul>
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center mb-2 border-t border-gray-200 pt-2.5 px-2"
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
                  className="bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full"
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
