import { Dialog, Typography } from '@material-tailwind/react';
import { CalendarDays, Cpu, ShieldCheck, Hash, PackageCheck, Tag, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

function InventoryDetailDialog({ open, onClose, inventory }) {
    if (!inventory) {
        console.log("📦 Detay gösteriliyor:", inventory);
        return null;
    }

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'aktif':
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pasif':
            case 'inactive':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'bakım':
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    const fieldItems = [
        { icon: <Hash className="w-4 h-4 text-gray-600" />, label: "ID", value: inventory.id },
        { icon: <CalendarDays className="w-4 h-4 text-blue-600" />, label: "Oluşturulma Tarihi", value: new Date(inventory.createTime).toLocaleString() },
        { icon: <CalendarDays className="w-4 h-4 text-green-600" />, label: "Giriş Tarihi", value: new Date(inventory.entryDate).toLocaleString() },
        { icon: <Tag className="w-4 h-4 text-purple-600" />, label: "Marka", value: inventory.brand },
        { icon: <Cpu className="w-4 h-4 text-indigo-600" />, label: "Model", value: inventory.model },
        { icon: <ShieldCheck className="w-4 h-4 text-orange-600" />, label: "Seri Numarası", value: inventory.serialNumber },
        { icon: <Info className="w-4 h-4 text-teal-600" />, label: "Envanter Tip", value: inventory.typeName },
        { icon: <PackageCheck className="w-4 h-4 text-gray-600" />, label: "Envanter Tip No", value: inventory.typeId },
    ];

    return (
        <Dialog open={open} handler={onClose} size='lg' className="bg-transparent shadow-none">
            <div className="relative bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <PackageCheck className="w-6 h-6 text-white/80" />
                        <Typography variant='h4' className="text-white font-bold">Envanter Detayları</Typography>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Kapat"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center mt-4">
                    <span className={clsx(
                        "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border",
                        getStatusStyle(inventory.status)
                    )}>
                        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                        {inventory.status || 'Belirsiz'}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                    {fieldItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                        >
                            <div className="p-2 bg-white shadow-sm rounded-md">{item.icon}</div>
                            <div>
                                <p className="text-gray-600 font-medium">{item.label}</p>
                                <p className="text-gray-900 font-semibold break-all">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t p-4 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default InventoryDetailDialog;
