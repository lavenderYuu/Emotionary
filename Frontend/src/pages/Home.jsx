import EntryCard from "../components/EntryCard"
import MoodChart from "../components/MoodChart";

const Home = () => {
    return (
        <>
          <img
            src="/images/emotion.svg"
            alt="emotionary logo"
            width="300">
          </img>
          <h1>Hello 👋🏻</h1>
          <p>Welcome to your emotion diary.</p> 
          <MoodChart />
          <EntryCard />
        </>
    )
}

export default Home;