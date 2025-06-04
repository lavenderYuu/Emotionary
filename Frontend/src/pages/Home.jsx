import { Button } from "@mui/material";
import EntryCard from "../components/EntryCard"
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEntry, editEntry, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEntryModal from "../components/CreateEntryModal";
import EditEntryModal from "../components/EditEntryModal";

const Home = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenCard = (id) => {
    setIsViewModalOpen(true);
    dispatch(selectEntry(id));
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    dispatch(resetEntry());
  };

  const handleCreateModal = () => {
    setIsViewModalOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleCreateEntry = (entry) => {
    setIsCreateModalOpen(false);
    dispatch(createEntry(entry));
  }

  const handleEditEntry = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  }

  const handleSaveEntry = (entry) => {
    setIsEditModalOpen(false);
    dispatch(editEntry(entry));
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
        <Button onClick={handleCreateModal}>Create an entry</Button>
        <EntryCard onClick={handleOpenCard} onEdit={() => setIsEditModalOpen(true)}/>
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
        <CreateEntryModal isOpen={isCreateModalOpen} onClose={handleCloseModal} onSave={handleCreateEntry} />
        <EditEntryModal isOpen={isEditModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} />
      </>
  )
}

export default Home;