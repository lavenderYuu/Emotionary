import EntryCard from "../components/EntryCard"
import ViewEntryModal from "../components/ViewEntryModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries, filterEntries, resetEntry, selectEntry, setPage } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import FilterRow from "../components/FilterRow";
import Pagination from "@mui/material/Pagination";

const Entries = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.entries.pagination);
  
  const allEntries = useSelector((state) => state.entries.entries);

  useEffect(() => {
    dispatch(filterEntries());
  }, [dispatch]);

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

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
    dispatch(filterEntries());
  };

  return (
    <>
      <h1>Journal Entries</h1>
      <FilterRow/>
      <CreateButton onClick={handleCreateModal} />
      <EntryCard entries={allEntries} onClick={handleOpenCard} onEdit={handleEditEntry} />
      <ViewEntryModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditEntry}
      />
      <CreateEditEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        mode={mode}
      />
      {pagination.totalPages > 1 && (
        
      <Pagination count={pagination.totalPages}
      page={pagination.currentPage}
      onChange={handlePageChange}
      style={{marginLeft:'auto'}} />)
      }
    </>
  );
}

export default Entries;