import EntryCard from "../components/EntryCard"
import MoodChart from "../components/MoodChart";
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import { useContext, useEffect } from "react";
import { ShepherdTourContext } from "../utils/tour/ShepherdContext";

const Home = () => {
  const userName = useSelector((state) => state.auth.userName);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.entries);
  const recentEntries = entries.slice(0,8);
  const tour = useContext(ShepherdTourContext);

  const handleOpenCard = (id) => {
    setIsViewModalOpen(true);
    dispatch(selectEntry(id));
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsModalOpen(false);
    dispatch(resetEntry());
  };

  const handleCreateModal = () => {
    setIsViewModalOpen(false);
    setIsModalOpen(true);
    setMode('create');

    if (tour?.isActive() && tour?.getCurrentStep()?.id === 'click-create-entry') {
      tour.next();
    }
  };

  const handleEditEntry = () => {
    setIsViewModalOpen(false);
    setIsModalOpen(true);
    setMode('edit');
  }

  const handleSaveEntry = async () => {
    setIsModalOpen(false);
    dispatch(fetchEntries());

    if (tour?.isActive() && tour?.getCurrentStep()?.id === 'click-save-entry') {
      tour.next();
    }
  }

  useEffect(() => {
    dispatch(fetchEntries());
    window.scrollTo(0, 0);
    tour.start();
  }, [dispatch, tour]);

  return (
      <>
        <h1>Hello, {userName} 👋🏻</h1>
        <p>Welcome to your emotion diary.</p> 
        <CreateButton onClick={handleCreateModal} />
        <MoodChart />
        <h2>Recent Entries</h2>
        <EntryCard entries={recentEntries} onClick={handleOpenCard} onEdit={handleEditEntry}/>
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
        <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
      </>
  )
}

export default Home;