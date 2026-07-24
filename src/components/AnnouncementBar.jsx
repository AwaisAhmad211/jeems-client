import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const AnnouncementBar = () => {
  const [data, setData] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axiosInstance.get("/api/announcement/get");
        if (response.data.success && response.data.announcement) {
          setData(response.data.announcement);
        }
      } catch (error) {
        console.error("Failed to fetch announcement", error);
      }
    };
    fetchAnnouncement();
  }, []);

  if (!data || !data.isActive || !data.text || dismissed) return null;

  // External vs Internal link handler
  const isExternal = data.link?.startsWith("http");

  const ContentText = () => (
    <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-center py-2.5 px-8 transition-all">
      {data.text}
    </p>
  );

  return (
    <div
      style={{
        backgroundColor: data.bgColor || "#00311F",
        color: data.textColor || "#FFFFFF",
      }}
      className="relative w-full z-[60] flex items-center justify-center transition-all duration-300 shadow-sm"
    >
      {data.link ? (
        isExternal ? (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex-1 block"
          >
            <ContentText />
          </a>
        ) : (
          <Link to={data.link} className="hover:underline flex-1 block">
            <ContentText />
          </Link>
        )
      ) : (
        <div className="flex-1">
          <ContentText />
        </div>
      )}

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-opacity p-1"
        aria-label="Close Announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;