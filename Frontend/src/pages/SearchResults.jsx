import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectEntry, resetEntry } from "../features/entries/entriesSlice";
import EntryCard from "../components/EntryCard";
import ViewEntryModal from "../components/ViewEntryModal";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import { filterEntriesByQuery } from "../utils/search";
import { fetchEntries } from "../features/entries/entriesSlice";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  useDispatch(fetchEntries());
  const entries = useSelector((state) => state.entries.entries);
  const dispatch = useDispatch();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view");

  const searchResults = filterEntriesByQuery(entries, query);

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
      <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
      <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
    </div>
  );
}