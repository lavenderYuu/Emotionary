import EntryCard from "../components/EntryCard"
import MoodChart from "../components/MoodChart";
import ViewEntryModal from "../components/ViewEntryModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries, resetEntry, selectEntry } from "../features/entries/entriesSlice";
import CreateEditEntryModal from "../components/CreateEditEntryModal";
import CreateButton from "../components/buttons/CreateButton";
import { useEffect } from "react";
import { decryptContent } from "../utils/crypto";

const Home = ({ cryptoKey }) => {
  const userName = useSelector((state) => state.auth.userName);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);

  const allEntries = useSelector((state) => state.entries.entries);
  const [decryptedEntries, setDecryptedEntries] = useState([]);
  const recentEntries = decryptedEntries.slice(0, 8);

  const activeEntryId = useSelector((state) => state.entries.activeEntry);
  const activeEntry = decryptedEntries.find(e => e._id === activeEntryId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
    window.scrollTo(0, 0);
  }, [dispatch]);

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
    dispatch(resetEntry());
  }

  return (
      <>
        <h1>Hello, {userName} 👋🏻</h1>
        <p>Welcome to your emotion diary.</p> 
        <CreateButton onClick={handleCreateModal} />
        <MoodChart />
        <h2>Recent Entries</h2>
        <EntryCard
          onClick={handleOpenCard}
          onEdit={handleEditEntry}
          num={8}
          entries={recentEntries}
        />
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
      </>
  )
}

export default Home;