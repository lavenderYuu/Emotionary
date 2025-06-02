import EntryCard from "../components/EntryCard"

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
          <EntryCard />
        </>
    )
}

export default Home;