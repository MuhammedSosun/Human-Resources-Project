import React from "react";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Yetkisiz Erişim</h1>
            <p className="text-lg text-gray-600">Bu sayfaya erişim izniniz bulunmamaktadır.</p>
        </div>
    );
};

export default Unauthorized;
