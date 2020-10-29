import Layout from "../components/layout";
import { StationCard } from "../components/stationCard";
import { getStations } from "../lib/client";
import { Station } from "../lib/station";
import styles from '../styles/Index.module.css';

type Props = {
  stations: Station[];
};
const Index: React.FC<Props> = ({ stations }) => {
  return (
    <Layout>
      <div className={styles.container}>
        {stations.map(station => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
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
