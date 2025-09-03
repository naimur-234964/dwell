<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Added

class Property extends Model
{
    use HasFactory, SoftDeletes; // Added SoftDeletes

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'short_description', // Added short_description
        'price_per_night',
        'discount_price',
        'number_of_guests',
        'number_of_bedrooms',
        'number_of_beds',
        'number_of_bathrooms',
        'is_available',
        // 'address', // We'll handle address creation/update explicitly, not via mass assignment
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'property_amenities');
    }

    public function propertyImages()
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
