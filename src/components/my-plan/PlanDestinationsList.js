import PlanDestinationCard from "@/components/my-plan/PlanDestinationCard";

export default function PlanDestinationsList({ destinations }) {
  return (
    <ol className="mt-8 space-y-4 sm:space-y-5">
      {destinations.map((destination, index) => (
        <PlanDestinationCard
          key={destination.id}
          destination={destination}
          showTravel={index < destinations.length - 1}
        />
      ))}
    </ol>
  );
}
