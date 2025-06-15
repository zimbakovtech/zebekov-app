interface Props { id: string; name: string; phone: string; photoUrl: string }
export default function DoctorCard({ id, name, phone, photoUrl }: Props) {
  return (
    <div className="border rounded p-4 flex items-center space-x-4">
      <img src={photoUrl} alt={name} className="w-16 h-16 rounded-full" />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{phone}</p>
      </div>
      <button className="btn-primary">Schedule</button>
    </div>
  )
}