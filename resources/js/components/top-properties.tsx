import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Property } from '@/types';

interface TopPropertiesProps {
    topProperties: Property[];
}

export function TopProperties({ topProperties }: TopPropertiesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Properties</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {topProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            {/* Assuming property has an image, if not, fallback */}
                            <AvatarImage src={`/images/properties/${property.id}.png`} alt={property.title} />
                            <AvatarFallback>{property.title.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {property.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {property.bookings_count} bookings
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
