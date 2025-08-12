import PersonalForm from "./PersonalForm";
import PersonelUpdateForm from "./PersonelUpdateForm";

function PersonalFormDialog({ open, onClose, onSave, personel }) {
    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader>
                {personel ? "Personel Güncelle" : "Yeni Personel Ekle"}
            </DialogHeader>
            <DialogBody>
                <PersonalForm personel={personel} onSave={(data) => {
                    onSave(data);
                    onClose();
                }} />
            </DialogBody>
            <DialogBody>
                <PersonelUpdateForm personel={editPersonel} onSave={onSave} />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="gray" onClick={onClose}>
                    Vazgeç
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default PersonalFormDialog;
