<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Person extends Model
{
    use HasFactory;

    protected $table = 'persons';

    protected $fillable = [
        'reference',
        'origin',
        'guru_id',
        'working',
        'name',
        'email',
        'document',
        'phone',
        'address_zip_code',
        'address_number',
        'purchase_date',
        'product_id',
        'offer_id',
        'payment_value',
        'status',
    ];

    protected $casts = [
        'purchase_date' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function behavioralProfileTest()
    {
        return $this->hasOne(BehavioralProfileTest::class, 'person_id');
    }
}
