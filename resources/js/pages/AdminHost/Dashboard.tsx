import { RecentActivities } from '@/components/recent-activities';
import { TopProperties } from '@/components/top-properties';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react'; // Added usePage
import { useEffect, useState } from 'react'; // Added useEffect, useState
import * as Recharts from 'recharts'; // Recharts components
import PropertiesMap from '@/components/PropertiesMap'; // Import the new map component
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } = Recharts;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Helper function to format month/year for charts
const formatMonthYear = (year: number, month: number) => {
    const date = new Date(year, month - 1); // month - 1 because month is 0-indexed in Date
    return date.toLocaleString('default', { month: 'short', year: '2-digit' });
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Colors for Pie Chart

export default function Dashboard() {
    const { auth } = usePage().props;
    const userRole = auth.userRole;

    const [adminData, setAdminData] = useState({
        paymentsMonthly: [],
        bookingsTrend: [],
        customersCount: 0,
        revenuesMonthly: [],
        bookingStatuses: [], // Added
        recentActivities: [], // Added
        topProperties: [], // Added
        occupancyRate: 0, // Added
    });

    const [hostData, setHostData] = useState({
        bookings: [],
        payments: [],
        totalEarnings: 0,
        pendingPayouts: 0,
        payoutHistory: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (userRole === 'admin') {
                    const [paymentsRes, bookingsRes, customersRes, revenuesRes, bookingStatusesRes, recentActivitiesRes, topPropertiesRes, occupancyRateRes] = await Promise.all([ // Added bookingStatusesRes
                        fetch(window.route('admin.dashboard.payments-monthly')),
                        fetch(window.route('admin.dashboard.bookings-trend')),
                        fetch(window.route('admin.dashboard.customers-count')),
                        fetch(window.route('admin.dashboard.revenues-monthly')),
                        fetch(window.route('admin.dashboard.booking-statuses')), // Added booking-statuses fetch
                        fetch(window.route('admin.dashboard.recent-activities')), // Added recent-activities fetch
                        fetch(window.route('admin.dashboard.top-properties')), // Added top-properties fetch
                        fetch(window.route('admin.dashboard.occupancy-rate')), // Added occupancy-rate fetch
                    ]);

                    const [paymentsData, bookingsData, customersData, revenuesData, bookingStatusesData, recentActivitiesData, topPropertiesData, occupancyRateData] = await Promise.all([ // Added bookingStatusesData
                        paymentsRes.json(),
                        bookingsRes.json(),
                        customersRes.json(),
                        revenuesRes.json(),
                        bookingStatusesRes.json(), // Added bookingStatusesRes.json()
                        recentActivitiesRes.json(), // Added recentActivitiesRes.json()
                        topPropertiesRes.json(), // Added topPropertiesRes.json()
                        occupancyRateRes.json(), // Added occupancyRateRes.json()
                    ]);

                    setAdminData({
                        paymentsMonthly: paymentsData.map((d: any) => ({
                            name: formatMonthYear(d.year, d.month),
                            amount: d.total_amount,
                        })),
                        bookingsTrend: bookingsData.map((d: any) => ({
                            name: formatMonthYear(d.year, d.month),
                            bookings: d.total_bookings,
                        })),
                        customersCount: customersData.total_customers,
                        revenuesMonthly: revenuesData.map((d: any) => ({
                            name: formatMonthYear(d.year, d.month),
                            revenue: d.total_revenue,
                        })),
                        bookingStatuses: bookingStatusesData, // Added
                        recentActivities: recentActivitiesData, // Added
                        topProperties: topPropertiesData, // Added
                        occupancyRate: occupancyRateData.occupancy_rate, // Added
                    });
                } else if (userRole === 'host') {
                    const [bookingsRes, paymentsRes, totalEarningsRes, pendingPayoutsRes, payoutHistoryRes] = await Promise.all([
                        fetch(window.route('host.dashboard.bookings')),
                        fetch(window.route('host.dashboard.payments')),
                        fetch(window.route('host.dashboard.total-earnings')),
                        fetch(window.route('host.dashboard.pending-payouts')),
                        fetch(window.route('host.dashboard.payout-history')),
                    ]);

                    const [bookingsData, paymentsData, totalEarningsData, pendingPayoutsData, payoutHistoryData] = await Promise.all([
                        bookingsRes.json(),
                        paymentsRes.json(),
                        totalEarningsRes.json(),
                        pendingPayoutsRes.json(),
                        payoutHistoryRes.json(),
                    ]);

                    setHostData({
                        bookings: bookingsData.data, // Assuming paginated data has a 'data' key
                        payments: paymentsData.data, // Assuming paginated data has a 'data' key
                        totalEarnings: Number(totalEarningsData.total_earnings) || 0,
                        pendingPayouts: Number(pendingPayoutsData.pending_payouts) || 0,
                        payoutHistory: payoutHistoryData.data, // Assuming paginated data has a 'data' key
                    });
                }
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userRole]); // Re-fetch data if userRole changes

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="p-4 text-center">Loading dashboard data...</div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="p-4 text-center text-red-500">{error}</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {userRole === 'admin' && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <RecentActivities recentActivities={adminData.recentActivities} />
                        </div>
                        <div className="lg:col-span-1">
                            <TopProperties topProperties={adminData.topProperties} />
                        </div>
                        {/* Occupancy Rate */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-semibold">Occupancy Rate</h2>
                            <p className="text-5xl font-bold text-green-600">{adminData.occupancyRate}%</p>
                        </div>
                        {/* Total Customers */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-semibold">Total Customers</h2>
                            <p className="text-5xl font-bold text-blue-600">{adminData.customersCount}</p>
                        </div>

                        {/* Monthly Payments Bar Chart */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                            <h2 className="text-xl font-semibold mb-2">Monthly Payments</h2>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={adminData.paymentsMonthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="amount" fill="#8884d8" name="Amount" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bookings Trend Line Chart */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                            <h2 className="text-xl font-semibold mb-2">Bookings Trend</h2>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart data={adminData.bookingsTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="bookings" stroke="#82ca9d" name="Bookings" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Monthly Revenues Bar Chart */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                            <h2 className="text-xl font-semibold mb-2">Monthly Revenues</h2>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={adminData.revenuesMonthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#ffc658" name="Revenue" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Booking Statuses Pie Chart */}
                        {adminData.bookingStatuses && adminData.bookingStatuses.length > 0 && ( // Added conditional rendering
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                                <h2 className="text-xl font-semibold mb-2">Booking Statuses</h2>
                                <ResponsiveContainer width="100%" height="80%">
                                    <PieChart>
                                        <Pie
                                            data={adminData.bookingStatuses}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="count"
                                            nameKey="status"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {adminData.bookingStatuses.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {adminData.bookingStatuses && adminData.bookingStatuses.length === 0 && !loading && ( // Added message for no data
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex items-center justify-center">
                                <p className="text-gray-500">No booking status data available.</p>
                            </div>
                        )}
                        {/* <div className="lg:col-span-3 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                            <h2 className="text-xl font-semibold mb-2">Properties Map</h2>
                            <PropertiesMap />
                        </div> */}
                    </div>
                )}

                {userRole === 'host' && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <h2 className="text-2xl font-bold mt-8">Earnings Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center">
                                <h3 className="text-xl font-semibold">Total Earnings</h3>
                                <p className="text-5xl font-bold text-green-600">${hostData.totalEarnings.toFixed(2)}</p>
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center">
                                <h3 className="text-xl font-semibold">Pending Payouts</h3>
                                <p className="text-5xl font-bold text-orange-600">${hostData.pendingPayouts.toFixed(2)}</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8">Payout History</h2>
                        {hostData.payoutHistory.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Payment ID</th>
                                            <th className="py-2 px-4 border-b">Property</th>
                                            <th className="py-2 px-4 border-b">Customer</th>
                                            <th className="py-2 px-4 border-b">Amount</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                            <th className="py-2 px-4 border-b">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hostData.payoutHistory.map((payment: any) => (
                                            <tr key={payment.id}>
                                                <td className="py-2 px-4 border-b">{payment.id}</td>
                                                <td className="py-2 px-4 border-b">{payment.booking?.property?.title}</td>
                                                <td className="py-2 px-4 border-b">{payment.booking?.customer?.name}</td>
                                                <td className="py-2 px-4 border-b">{payment.amount}</td>
                                                <td className="py-2 px-4 border-b">{payment.status}</td>
                                                <td className="py-2 px-4 border-b">{new Date(payment.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No payout history found.</p>
                        )}
                    </div>
                )}

                </div>
        </AppLayout>
    );
}
