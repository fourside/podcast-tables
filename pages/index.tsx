import Layout from "../components/layout";
import { getStations } from "../lib/client";
import { Station } from "../lib/station";

type Props = {
  stations: Station[];
};
const Index: React.FC<Props> = ({ stations }) => {
  return (
    <Layout>
      {stations.map(station => (
        <div key={station.id}>
          {station.id}: {station.name}
          </div>
      ))}
    </Layout>
  )
};

export default Index;

export async function getStaticProps() {
  const stations = await getStations()
  return {
    props: {
      stations,
    }
  }
}
