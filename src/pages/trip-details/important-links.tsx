import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { NewLink } from "./new-link-modal";

interface Links {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [importantLinks, setImportantLinks] = useState<Links[]>([]);

  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false)

  function openNewLinkModal() {
    setIsNewLinkModalOpen(true)
  }

  function closeNewLinkModal() {
    setIsNewLinkModalOpen(false)
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setImportantLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {importantLinks.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href="#"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <Button onClick={openNewLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isNewLinkModalOpen && (
        <NewLink closeCreateNewLinkModal={closeNewLinkModal} />
      )}
    </div>
  );
}
