import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectEntry, resetEntry } from "../features/entries/entriesSlice";
import EntryCard from "../components/EntryCard";
import ViewEntryModal from "../components/ViewEntryModal";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import { filterEntriesByQuery } from "../utils/search";
import { decryptContent } from "../utils/crypto";

export default function SearchResults({ cryptoKey }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const entries = useSelector((state) => state.entries.entries);
  const dispatch = useDispatch();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [decryptedEntries, setDecryptedEntries] = useState([]);

  const activeEntryId = useSelector((state) => state.entries.activeEntry);
  const activeEntry = decryptedEntries.find(e => e._id === activeEntryId);

  useEffect(() => {
    async function decryptAndStore() {
      if (!cryptoKey || !entries.length) {
        setDecryptedEntries([]);
        return;
      }

      const decrypted = await Promise.all(
        entries.map(async (entry) => {
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
  }, [cryptoKey, entries]);

  const searchResults = filterEntriesByQuery(decryptedEntries, query);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  };

  const handleSaveEntry = async () => {
    setIsModalOpen(false);
    dispatch(resetEntry());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <h1>Search Results for "{query}"</h1>
      {searchResults.length === 0 ? (
        <p>No matching entries found.</p>
      ) : (
        <EntryCard
          entries={searchResults}
          onClick={handleOpenCard}
          onEdit={handleEditEntry}
        />
      )}
      <CreateButton onClick={handleCreateModal} />
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
    </div>
  );
}