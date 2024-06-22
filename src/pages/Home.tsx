import { IonContent, IonPage } from "@ionic/react";
import { useDocuments } from "@lib/db";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { categoryDocument } = useDocuments();

  const op = async () => {
    const result = await categoryDocument.create({
      name: "Category 1",
    });

    const category = await categoryDocument.read(result.id);

    console.log("create", category);

    await categoryDocument.update(result.id, {
      ...category,
      name: "Category 1 updated",
    });

    console.log("update", await categoryDocument.read(result.id));
  };

  useEffect(() => {
    op();
  }, []);

  return (
    // INFO: pt-safe (from tailwindcss-safe-area) plugin adds padding to the top of the page to avoid the status bar
    <IonPage className="pt-safe">
      {/* TODO: Uncomment for page header, or clean */}
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent fullscreen>
        <div className="p-4 font-bold">Hello from Tailwind!</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
