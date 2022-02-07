import { LeftPanel, CenterSection, RightPanel } from "../components/HomePage";
import{Layout} from "../components/Layout";

export default function Home() {

  return (
    <Layout title="Coloseum">
      <main className="hidden lg:grid grid-cols-4 w-full">
        <LeftPanel />
        <CenterSection />
        <RightPanel />
      </main>

      <main className="flex flex-col p-4 space-y-4 lg:hidden">
        <CenterSection/>
        <LeftPanel/>
        <RightPanel/>
      </main>
    </Layout>
  );
}
