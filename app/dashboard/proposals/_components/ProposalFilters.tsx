interface ProposalFiltersProps {
  currentFilter: "sent" | "received";
  onFilterChange: (filter: "sent" | "received") => void;
}

export default function ProposalFilters({ currentFilter, onFilterChange }: ProposalFiltersProps) {
  return (
    <div className="flex gap-2">
      {(["sent", "received"] as const).map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === f
              ? "bg-c5 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {f === "sent" ? "Sent" : "Received"}
        </button>
      ))}
    </div>
  );
}
