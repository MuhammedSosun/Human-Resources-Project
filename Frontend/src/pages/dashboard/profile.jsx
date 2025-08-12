import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../features/personal/services/personalService";
import { getMyAssignments } from "@/features/InventoryAssignment/services/inventoryAssignmentService";
import PhotoViewer from "@/features/personal/PersonelComponents/PhotoViewer";

export function Profile() {
  const [personel, setpersonel] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("💣 Token yok, giriş sayfasına atılıyor.");
      navigate("/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const [personelData, assignmentData] = await Promise.all([
          getMyProfile(),
          getMyAssignments(),
        ]);

        setpersonel(personelData);
        setAssignments(assignmentData);
      } catch (error) {
        console.error("❌ Hata:", error);
        if (error.response?.status === 401) {
          navigate("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading || !personel) return <p className="p-4">Yükleniyor...</p>;

  return (
    <div className="w-full">
      <div className="relative h-64 w-full bg-cover bg-center rounded-b-xl bg-[url('/img/background-image.png')]">
        <div className="absolute inset-0 bg-gray-900/75" />
      </div>

      <Card className="relative mx-auto -mt-20 w-[95%] max-w-6xl p-6 shadow-xl">
        <div className="flex items-center gap-6 mb-8">
          <PhotoViewer personelId={personel?.id} size="medium" className="" />
          <div>

            <Typography variant="h4" color="blue-gray">
              {personel.firstName} {personel.lastName}
            </Typography>
            <Typography variant="small" color="gray" className="uppercase font-medium">
              {personel.taskTitle.replaceAll("_", " ")}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <ProfileField label="Cinsiyet" value={personel.gender} />
          <ProfileField label="Doğum Tarihi" value={personel.birthDate} />
          <ProfileField label="Medeni Durum" value={personel.maritalStatus} />
          <ProfileField label="TCKN" value={personel.tckn} />
          <ProfileField label="Sicil No" value={personel.registrationNo} />
          <ProfileField label="Mezuniyet" value={personel.educationLevel} />
          <ProfileField label="Birim" value={personel.unit.replaceAll("_", " ")} />
          <ProfileField label="Çalışıyor mu" value={personel.working ? "Evet" : "Hayır"} />
          <ProfileField label="İşe Başlama" value={personel.startDate} />
          <ProfileField label="Başlangıç Pozisyonu" value={personel.startingPosition || "-"} />
          <ProfileField label="Başlangıç Ünvanı" value={personel.startingTitle || "-"} />
          <ProfileField label="Ayrılma Tarihi" value={personel.resignationDate || "-"} />
          <ProfileField label="Ayrılma Nedeni" value={personel.resignationReason || "-"} />
          <ProfileField label="Aktif mi" value={personel.isActive ? "Evet" : "Hayır"} />
        </div>

        <Typography variant="h5" className="mb-4 text-blue-gray-700">
          Zimmetli Envanterler
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <Typography variant="h6" color="blue-gray">
                  {assignment.inventory.brand} {assignment.inventory.model}
                </Typography>
                <Typography variant="small" color="gray">
                  Tip: {assignment.inventory.typeName}
                </Typography>
                <Typography variant="small" color="gray">
                  Seri No: {assignment.inventory.serialNumber}
                </Typography>
                <Typography variant="small" color="gray">
                  Durum: {assignment.inventory.status}
                </Typography>
                <Typography variant="small" color="gray">
                  Zimmet Tarihi: {assignment.assignDate}
                </Typography>
              </div>
            ))
          ) : (
            <Typography color="gray">Zimmetli ürün bulunmamaktadır.</Typography>
          )}
        </div>
      </Card>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
      <Typography variant="small" color="blue-gray" className="font-semibold mb-1">
        {label}
      </Typography>
      <Typography variant="paragraph" color="gray" className="text-sm">
        {value}
      </Typography>
    </div>
  );
}

export default Profile;
