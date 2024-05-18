import { useState, useEffect } from "react";
import {
    getServerStatus,
    getAPIStatus,
    getAuthAPIStatus,
    getPaymentAPIStatus,
    getNotificationAPIStatus
} from "../../services/healthcheck.services";

function Healthcheck() {
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    serverRes, apiRes, authRes,
                    paymentRes, notificationRes
                ] = await Promise.all([
                    getServerStatus(),
                    getAPIStatus(),
                    getAuthAPIStatus(),
                    getPaymentAPIStatus(),
                    getNotificationAPIStatus()
                ]);

                const statusData = [
                    { title: "Server Status", data: serverRes.data, statusCode: serverRes.status },
                    { title: "API Server Status", data: apiRes.data, statusCode: apiRes.status },
                    { title: "Auth API Status", data: authRes.data, statusCode: authRes.status },
                    { title: "Payment API Status", data: paymentRes.data, statusCode: paymentRes.status },
                    { title: "Notification API Status", data: notificationRes.data, statusCode: notificationRes.status }
                ];

                setStatuses(statusData);
            } catch (error) {
                console.error("Error fetching statuses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <header className="bg-blue-600 text-white w-full py-6 shadow-md flex flex-col items-center">
                <h1 className="text-3xl font-bold">System Status</h1>
                <div className="mt-2">
                    <p className="text-xl">{currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}</p>
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-center items-center py-8 w-full">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <table className="table-auto border border-collapse border-gray-200 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Sl. No.</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statuses.map((status, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{status.title}</td>
                                    <td className="border px-4 py-2">{status.data.message}</td>
                                    <td className="border px-4 py-2">
                                        <span className={status.data.success ? "text-green-600" : "text-red-600"}>
                                            {status.data.success ? "Ready to use" : "Not yet ready to use"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>

            <footer className="bg-blue-600 text-white w-full py-4 text-center">
                <p>&copy; 2024 Track Your Payment</p>
            </footer>
        </div>
    );
}

export default Healthcheck;
