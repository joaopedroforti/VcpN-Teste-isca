<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    protected $table = 'purchases';

    protected $primaryKey = 'id_purchase';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_purchase',
        'purchase_date',
        'person_id',
        'person_name',
        'person_email',
        'price',
        'product_id',
        'offer_id',
        'status',
    ];

    protected $casts = [
        'purchase_date' => 'datetime',
    ];
}
