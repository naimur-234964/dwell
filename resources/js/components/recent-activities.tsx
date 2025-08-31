import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Booking } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface RecentActivitiesProps {
    recentActivities: Booking[];
}

export function RecentActivities({ recentActivities }: RecentActivitiesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {recentActivities.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4">
                        {booking.customer && (
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={`/avatars/${booking.customer.name}.png`} alt="Avatar" />
                                <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {booking.customer ? booking.customer.name : 'A customer'} booked {booking.property ? booking.property.title : 'a property'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {dayjs(booking.created_at).fromNow()}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
