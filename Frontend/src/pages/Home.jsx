import { Button } from "@mui/material";
import EntryCard from "../components/EntryCard"
import MoodChart from "../components/MoodChart";
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEntry, editEntry, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";

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

  const handleSaveEntry = (entry) => {
    setIsModalOpen(false);
    if (mode === 'create') {
      dispatch(createEntry(entry));
    } else if (mode === 'edit') {
      dispatch(editEntry(entry));
    }
  }

  return (
      <>
        <img
          src="/images/emotionary.svg"
          alt="emotionary logo"
          width="300">
        </img>
        <h1>Hello 👋🏻</h1>
        <p>Welcome to your emotion diary.</p> 
        <MoodChart />
        <Button onClick={handleCreateModal}>Create an entry</Button>
        <EntryCard onClick={handleOpenCard} onEdit={handleEditEntry}/>
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
        <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
      </>
  )
}

export default Home;