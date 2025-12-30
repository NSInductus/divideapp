import ParticipantsSelector from "./ParticipantsSelector";

export default function ItemCard({ item, index }) {
  return (
    <div className="item-card">
      <b>{item.name}</b> — {item.price}€
      <ParticipantsSelector itemIndex={index} />
    </div>
  );
}
