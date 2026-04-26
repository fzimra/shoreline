import { useState } from "react";
import PlanDestinationCard from "@/components/my-plan/PlanDestinationCard";

export default function PlanDestinationsList({
  destinations,
  onReorder,
  onRemoveDestination,
}) {
  const [dragFrom, setDragFrom] = useState(null);

  return (
    <ol className="mt-8 space-y-4 sm:space-y-5">
      {destinations.map((destination, index) => (
        <PlanDestinationCard
          key={destination.id}
          destination={destination}
          index={index}
          showTravel={index < destinations.length - 1}
          onRemove={onRemoveDestination}
          onDragStart={(currentIndex) => setDragFrom(currentIndex)}
          onDragOver={() => {}}
          onDrop={(targetIndex) => {
            if (dragFrom === null) {
              return;
            }

            onReorder(dragFrom, targetIndex);
            setDragFrom(null);
          }}
        />
      ))}
    </ol>
  );
}
