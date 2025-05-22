type Props = {
  totalUsers: number;
};

export default function UserCard({ totalUsers }: Props) {
  return (
    <div
      className="p-4 bg-light rounded shadow-sm"
      style={{ width: "fit-content", minWidth: "200px" }}
    >
      <h6>Total registered users</h6>
      <h1>{totalUsers}</h1>
    </div>
  );
}
