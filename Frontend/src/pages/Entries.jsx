import EntryCard from "../components/EntryCard";
import ViewEntryModal from "../components/ViewEntryModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEntries,
  filterEntries,
  resetEntry,
  selectEntry,
  setPage,
} from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import FilterRow from "../components/FilterRow";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { decryptContent } from "../utils/crypto";

const Entries = ({ cryptoKey }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.entries.pagination);
  const entries = useSelector((state) => state.entries.entries);
  const allEntries = useSelector((state) => state.entries.filteredEntries || entries);
  const filters = useSelector((state) => state.entries.filters);
  const [decryptedEntries, setDecryptedEntries] = useState([]);

  const activeEntryId = useSelector((state) => state.entries.activeEntry);
  const activeEntry = decryptedEntries.find(e => e._id === activeEntryId);

  useEffect(() => {
    dispatch(filterEntries());
    window.scrollTo(0, 0);
  }, [dispatch, filters]);

  useEffect(() => {
    async function decryptAndStore() {
      if (!cryptoKey || !allEntries.length) {
        setDecryptedEntries([]);
        return;
      }

      const decrypted = await Promise.all(
        allEntries.map(async (entry) => {
          try {
            const content = await decryptContent(entry.content, entry.content_iv, cryptoKey);
            return { ...entry, content };
          } catch {
            return { ...entry, content: "[Unable to decrypt]" };
          }
        })
      );
      
      setDecryptedEntries(decrypted);
    }
    decryptAndStore();
  }, [cryptoKey, allEntries, dispatch]);

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
    setMode("create");
  };

  const handleEditEntry = () => {
    setIsViewModalOpen(false);
    setIsModalOpen(true);
    setMode("edit");
  };

  const handleSaveEntry = async () => {
    setIsModalOpen(false);
    dispatch(fetchEntries());
    dispatch(resetEntry());
  };

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
    dispatch(filterEntries());
  };

  return (
    <>
      <h1>Journal Entries</h1>
      <FilterRow />
      <CreateButton onClick={handleCreateModal} />
      {pagination.totalEntries === 0 ?
        <Box sx={{ margin: 4 }}>Whoops, that filter returned no results! Please try again.</Box> :
        <EntryCard
          entries={decryptedEntries}
          onClick={handleOpenCard}
          onEdit={handleEditEntry}
          isDeletedView={filters.deleted === true}
        />
      }
      <ViewEntryModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditEntry}
        entry={activeEntry}
      />
      <CreateEditEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        mode={mode}
        cryptoKey={cryptoKey}
        entry={activeEntry}
      />
      <div>
        {" "}
        {pagination.totalPages > 1 && (
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            style={{ marginLeft: "auto" }}
            sx={{
              width: "fit-content",
              borderRadius: "15px",
              padding: "8px 16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              margin: "16px auto 50px", 
            }}
          />
        )}
      </div>
    </>
  );
};

export default Entries;
