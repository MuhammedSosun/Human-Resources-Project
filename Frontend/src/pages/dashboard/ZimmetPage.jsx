import React, { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
} from "@material-tailwind/react";

// Mock Personel verisi
const mockPersoneller = [
    { id: 1, firstName: "Ali", lastName: "Yılmaz", registrationNo: 1001, unit: "ARGE" },
    { id: 2, firstName: "Ayşe", lastName: "Kara", registrationNo: 1002, unit: "YAZILIM_GELISTIRME" },
];

// Mock Zimmetli Envanter verisi
const mockZimmetListesi = [
    {
        id: 1,
        typeName: "Bilgisayar",
        brand: "HP",
        model: "ProBook",
        serialNumber: "X123YZ",
        assignDate: "2025-01-01",
    },
];

// Mock Boştaki Envanterler
const bosEnvanterler = [
    { id: 11, typeName: "Mouse", brand: "Logitech", model: "MX Master 3" },
    { id: 12, typeName: "Disk", brand: "WD", model: "1TB SSD" },
];

export function ZimmetPage() {
    const [selectedPersonel, setSelectedPersonel] = useState(null);
    const [openYeniZimmet, setOpenYeniZimmet] = useState(false);
    const [openGeriAl, setOpenGeriAl] = useState(false);
    const [selectedEnvanter, setSelectedEnvanter] = useState(null);

    const [search, setSearch] = useState({ firstName: "", registrationNo: "" });

    const handleSearch = () => {
        const p = mockPersoneller.find(
            (x) =>
                x.firstName.toLowerCase().includes(search.firstName.toLowerCase()) ||
                x.registrationNo.toString() === search.registrationNo
        );
        setSelectedPersonel(p || null);
    };

    const handleOpenYeniZimmet = () => setOpenYeniZimmet(true);
    const handleOpenGeriAl = (envanter) => {
        setSelectedEnvanter(envanter);
        setOpenGeriAl(true);
    };

    return (
        <section className="p-6">
            <Typography variant="h4" className="mb-6 font-bold">Zimmet İşlemleri</Typography>

            {/* 🔍 Personel Arama */}
            <Card className="p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <Input
                    label="Ad"
                    value={search.firstName}
                    onChange={(e) => setSearch({ ...search, firstName: e.target.value })}
                />
                <Input
                    label="Sicil No"
                    value={search.registrationNo}
                    onChange={(e) => setSearch({ ...search, registrationNo: e.target.value })}
                />
                <Button onClick={handleSearch} color="blue">Ara</Button>
            </Card>

            {/* 📋 Zimmetli Liste */}
            {selectedPersonel && (
                <>
                    <Card className="p-4 mb-4">
                        <Typography className="font-medium">
                            Zimmetli Envanterler - {selectedPersonel.firstName} {selectedPersonel.lastName}
                        </Typography>
                    </Card>

                    <Card className="overflow-x-auto shadow-md mb-4">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b">Tip</th>
                                    <th className="p-4 border-b">Marka</th>
                                    <th className="p-4 border-b">Model</th>
                                    <th className="p-4 border-b">Seri No</th>
                                    <th className="p-4 border-b">Zimmet Tarihi</th>
                                    <th className="p-4 border-b text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockZimmetListesi.map((z, i) => (
                                    <tr key={i} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">{z.typeName}</td>
                                        <td className="p-4">{z.brand}</td>
                                        <td className="p-4">{z.model}</td>
                                        <td className="p-4">{z.serialNumber}</td>
                                        <td className="p-4">{z.assignDate}</td>
                                        <td className="p-4 text-right">
                                            <Button size="sm" color="red" onClick={() => handleOpenGeriAl(z)}>
                                                Zimmeti Geri Al
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    <Button color="green" onClick={handleOpenYeniZimmet}>
                        + Yeni Zimmet Ekle
                    </Button>
                </>
            )}

            {/* ➕ Yeni Zimmet Modal */}
            <Dialog open={openYeniZimmet} handler={() => setOpenYeniZimmet(false)}>
                <DialogHeader>Yeni Zimmet Ekle</DialogHeader>
                <DialogBody>
                    <Typography className="mb-4">Boşta Olan Envanterler</Typography>
                    {bosEnvanterler.map((env) => (
                        <div key={env.id} className="mb-2 border-b py-2 flex justify-between">
                            <span>{env.typeName} - {env.brand} {env.model}</span>
                            <Button size="sm" color="blue">Zimmetle</Button>
                        </div>
                    ))}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" onClick={() => setOpenYeniZimmet(false)}>Kapat</Button>
                </DialogFooter>
            </Dialog>

            {/* 🔁 Zimmet Geri Alma Modal */}
            <Dialog open={openGeriAl} handler={() => setOpenGeriAl(false)}>
                <DialogHeader>Zimmeti Geri Al</DialogHeader>
                <DialogBody>
                    <Typography className="mb-4">
                        {selectedEnvanter?.brand} {selectedEnvanter?.model} adlı envanteri teslim aldığınız tarihi seçin:
                    </Typography>
                    <Input type="date" label="Teslim Alınan Tarih" />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" onClick={() => setOpenGeriAl(false)}>İptal</Button>
                    <Button variant="gradient" color="red">Onayla</Button>
                </DialogFooter>
            </Dialog>
        </section>
    );
}
