import EntryCard from "../components/EntryCard"
import MoodChart from "../components/MoodChart";
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEntries, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";

const Home = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();

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
  };

  const handleEditEntry = () => {
    setIsViewModalOpen(false);
    setIsModalOpen(true);
    setMode('edit');
  }

  const handleSaveEntry = async () => {
    setIsModalOpen(false);
    dispatch(fetchEntries());
  }

  return (
      <>
        <h1>Hello 👋🏻</h1>
        <p>Welcome to your emotion diary.</p> 
        <CreateButton onClick={handleCreateModal} />
        <MoodChart />
        <h2>Recent Entries</h2>
        <EntryCard onClick={handleOpenCard} onEdit={handleEditEntry}/>
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
        <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
      </>
  )
}

export default Home;