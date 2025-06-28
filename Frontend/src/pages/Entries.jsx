import EntryCard from "../components/EntryCard"
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEntries, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";

const Entries = () => {
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
        <h1>Journal Entries</h1>
        <CreateButton onClick={handleCreateModal} />
        <EntryCard onClick={handleOpenCard} onEdit={handleEditEntry} num={'all'}/>
        <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
        <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
      </>
  )
}

export default Entries;