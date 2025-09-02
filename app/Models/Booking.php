<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'customer_id', // Use customer_id as per migration
        'check_in_date',
        'check_out_date',
        'total_price',
        'status',
        'phone_no',
        'advance_payment_amount',
        'advance_payment_status',
        'coupon_id',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
}