import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import { UserGroupIcon, ArchiveBoxIcon, ArrowPathIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getActivePersonalCount } from "@/features/personal/services/personalService";
import { getTotalInventory } from '../../features/inventory/services/EnvanterService'
import { getTotalAssignment } from "@/features/InventoryAssignment/services/inventoryAssignmentService";
import { useAuth } from "@/context/useAuth";

export function Home() {
  const { user } = useAuth();
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => {
    const fetchActiveCount = async () => {
      try {
        const count = await getActivePersonalCount();
        setActiveCount(count);
      } catch (e) {
        console.warn("🛑 Aktif personel sayısı alınamadı:", e);
      }
    };

    fetchActiveCount();
  }, []);
  const [countInventory, setCountInventory] = useState(0);
  useEffect(() => {
    const fetchCountInventory = async () => {
      try {
        const count = await getTotalInventory();
        setCountInventory(count);
      } catch (e) {
        console.warn("🛑 EnvanteR Sayısı alınamadı:", e);

      }
    };
    fetchCountInventory();
  }, []);
  const [totalAssignment, setTotalAssignment] = useState(0);
  useEffect(() => {
    const fetchCountAssignment = async () => {
      try {
        const count = await getTotalAssignment();
        setTotalAssignment(count);
      } catch (e) {
        console.warn("🛑 Zimmet Sayısı alınamadı:", e)
      }
    };
    fetchCountAssignment();
  }, [])
  return (
    <div className="mt-8 p-6">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        İnsan Kaynakları Paneli
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<UsersIcon className="h-6 w-6 text-white" />}
          title="Aktif Çalışan"
          value={activeCount}
          bg="bg-purple-500"
        />
        <StatCard
          icon={<ArchiveBoxIcon className="h-6 w-6 text-white" />}
          title="Toplam Envanter"
          value={countInventory}
          bg="bg-green-500"
        />
        <StatCard
          icon={<ArrowPathIcon className="h-6 w-6 text-white" />}
          title="Zimmet İşlemleri"
          value={totalAssignment}
          bg="bg-orange-500"
        />

      </div>

      <Card className="mt-8 p-6 shadow-sm border border-blue-gray-100">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          Hoş Geldiniz, {user?.username}
        </Typography>
        <Typography variant="small" color="gray">
          Bu panel üzerinden personel, envanter ve zimmet işlemlerini kolayca takip edebilirsiniz. Güncel veriler yukarıda özetlenmiştir.
        </Typography>
        <div className="flex items-center gap-4 mt-6">
          <img
            src="/images/JforceIkon.png"
            alt="JForce Logo"
            className="h-14 object-contain"
          />
          <div>
            <Typography variant="h6" color="blue-gray">
              JForce Bilişim Teknolojileri
            </Typography>
            <Typography variant="small" color="gray">
              İnsan Kaynakları Paneli
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, bg }) {
  return (
    <Card className={`p-4 flex items-center gap-4 shadow-sm border-l-4 ${bg}`}>
      <div className="rounded-full bg-white/20 p-2">
        {icon}
      </div>
      <div>
        <Typography variant="small" color="white" className="mb-1">
          {title}
        </Typography>
        <Typography variant="h5" color="white">
          {value}
        </Typography>
      </div>
    </Card>
  );
}

export default Home;
