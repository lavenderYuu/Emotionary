import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectEntry, resetEntry } from "../features/entries/entriesSlice";
import EntryCard from "../components/EntryCard";
import ViewEntryModal from "../components/ViewEntryModal";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const entries = useSelector((state) => state.entries.entries);
  const dispatch = useDispatch();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view");

  // Filter entries based on search query, then sort by date (newest first)
  const searchResults = entries.filter(entry => {
    // Split the query into individual terms
    const terms = query.toLowerCase().split(" ").filter(term => term.trim() !== "");

    // Check if each query term is present in each entry's title, content, or tags
    return terms.every(term =>
      entry.title?.toLowerCase().includes(term) ||
      entry.content?.toLowerCase().includes(term) ||
      (Array.isArray(entry.tags) && entry.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  }).sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

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
      <h2>Search Results for "{query}"</h2>
      {searchResults.length === 0 ? (
        <p>No matching entries found.</p>
      ) : (
        <EntryCard
          entries={searchResults}
          onClick={handleOpenCard}
          onEdit={handleEditEntry}
          displayAll={true}
        />
      )}
      <CreateButton onClick={handleCreateModal} />
      <ViewEntryModal isOpen={isViewModalOpen} onClose={handleCloseModal} onEdit={handleEditEntry} />
      <CreateEditEntryModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveEntry} mode={mode}/>
    </div>
  );
}