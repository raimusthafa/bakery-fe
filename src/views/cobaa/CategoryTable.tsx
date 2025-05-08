type Props = {
    data: { id: number; name: string }[];
    onEdit: (item: { id: number; name: string }) => void;
    onDelete: (id: number) => void;
  };
  
  const CategoryTable = ({ data, onEdit, onDelete }: Props) => (
    <table className="min-w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Nama</th>
          <th className="p-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-3">{item.id}</td>
            <td className="p-3">{item.name}</td>
            <td className="p-3 text-center space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  export default CategoryTable;
  