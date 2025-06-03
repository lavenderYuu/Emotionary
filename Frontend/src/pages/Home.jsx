import { Button } from "@mui/material";
import EntryCard from "../components/EntryCard"
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEntryModal from "../components/CreateEntryModal";

const Home = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenCard = (id) => {
    dispatch(selectEntry(id));
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsCreateModalOpen(false);
    dispatch(resetEntry());
  };

  const handleCreateModal = () => {
    setIsViewModalOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleEdit = () => {
    // TODO
  };

  const handleSave = () => {
    // TODO: dispatch(createEntry)
  };

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
        <EntryCard onClick={handleOpenCard} />
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} />
        <CreateEntryModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />
      </>
  )
}

export default Home;