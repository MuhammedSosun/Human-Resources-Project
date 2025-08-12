import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { updatePersonal, uploadPhoto } from '../services/personalService';
import { Gender, Mezuniyet, Units, TaskTitles } from '../enums/enums';
import { useState } from "react";
import { toast } from "react-toastify";

function PersonelUpdateForm({ personel, onSave, onCancel }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: personel.firstName || "",
            lastName: personel.lastName || "",
            tckn: personel.tckn || "",
            gender: personel.gender || "",
            birthDate: personel.birthDate || "",
            maritalStatus: personel.maritalStatus || "",
            educationLevel: personel.educationLevel || "",
            unit: personel.unit || "",
            taskTitle: personel.taskTitle || "",
            working: personel.working,
            startDate: personel.startDate || "",
            startingPosition: personel.startingPosition || "",
            startingTitle: personel.startingTitle || "",
            resignationDate: personel.resignationDate || "",
            resignationReason: personel.resignationReason || "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await updatePersonal(personel.id, values);

                if (selectedFile) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const base64Content = reader.result.split(",")[1];
                        try {
                            await uploadPhoto({
                                personalId: personel.id,
                                fileName: selectedFile.name,
                                base64Content,
                            });
                            toast.success("Fotoğraf güncellendi.");
                        } catch (e) {
                            toast.warning("Personel güncellendi, ancak fotoğraf yüklenemedi.");
                        }
                        onSave(); // işlem başarıyla tamamlandı
                    };
                    reader.readAsDataURL(selectedFile);
                } else {
                    onSave(); // sadece güncelleme yapıldı
                }
            } catch (error) {
                console.error("Personel güncelleme hatası:", error);
                toast.error("Personel güncellenemedi.");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FOTOĞRAF YÜKLEME ALANI */}
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 mb-4">
                <label htmlFor="photo-upload" className="w-40 h-52 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition">
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Seçilen fotoğraf"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-sm text-gray-600 text-center px-2">Yeni Fotoğraf Seç</span>
                    )}
                </label>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="hidden"
                />
                {selectedFile && (
                    <p className="text-sm text-green-600 font-medium">Seçilen: {selectedFile.name}</p>
                )}
            </div>

            {/* FORM ALANLARI */}
            <Input label="Ad" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
            <Input label="Soyad" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
            <Input label="TCKN" name="tckn" value={formik.values.tckn} onChange={formik.handleChange} />
            <Input type="date" label="Doğum Tarihi" name="birthDate" value={formik.values.birthDate} onChange={formik.handleChange} />

            <Select label="Cinsiyet" name="gender" value={formik.values.gender} onChange={(val) => formik.setFieldValue("gender", val)}>
                {Gender.map((g) => (
                    <Option key={g.value} value={g.value}>{g.label}</Option>
                ))}
            </Select>

            <Input label="Medeni Durum" name="maritalStatus" value={formik.values.maritalStatus} onChange={formik.handleChange} />

            <Select label="Mezuniyet" name="educationLevel" value={formik.values.educationLevel} onChange={(val) => formik.setFieldValue("educationLevel", val)}>
                {Mezuniyet.map((e) => (
                    <Option key={e.value} value={e.value}>{e.label}</Option>
                ))}
            </Select>

            <Select label="Birim" name="unit" value={formik.values.unit} onChange={(val) => formik.setFieldValue("unit", val)}>
                {Units.map((u) => (
                    <Option key={u.value} value={u.value}>{u.label}</Option>
                ))}
            </Select>

            <Select label="Görev Unvanı" name="taskTitle" value={formik.values.taskTitle} onChange={(val) => formik.setFieldValue("taskTitle", val)}>
                {TaskTitles.map((t) => (
                    <Option key={t.value} value={t.value}>{t.label}</Option>
                ))}
            </Select>

            <Select
                label="Çalışıyor mu?"
                name="working"
                value={formik.values.working?.toString()} // boolean → string
                onChange={(val) => formik.setFieldValue("working", val === "true")}
            >
                <Option value="true">Evet</Option>
                <Option value="false">Hayır</Option>
            </Select>

            <Input type="date" label="İşe Başlama Tarihi" name="startDate" value={formik.values.startDate} onChange={formik.handleChange} />
            <Input label="Başlangıç Pozisyonu" name="startingPosition" value={formik.values.startingPosition} onChange={formik.handleChange} />
            <Input label="Başlangıç Unvanı" name="startingTitle" value={formik.values.startingTitle} onChange={formik.handleChange} />
            <Input type="date" label="Ayrılış Tarihi" name="resignationDate" value={formik.values.resignationDate} onChange={formik.handleChange} />
            <Input label="Ayrılma Nedeni" name="resignationReason" value={formik.values.resignationReason} onChange={formik.handleChange} />

            <div className="col-span-2 flex justify-end mt-4 gap-2">
                <Button variant="outlined" color="red" onClick={onCancel}>İptal</Button>
                <Button type="submit" color="blue">Güncelle</Button>
            </div>
        </form>
    );
}

export default PersonelUpdateForm;
