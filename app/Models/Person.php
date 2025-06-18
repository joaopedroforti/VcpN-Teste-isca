<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Person extends Authenticatable
{
    use HasFactory;

    /** @var bool */
    public $timestamps = false;

    /** @var array<string> */
    protected $fillable = [
        'name',
        'email',
        'document',
        'working',
        'origin'
    ];

    /** @var string */
    protected $table = 'persons';

    public function behavioralProfileTest(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(BehavioralProfileTest::class);
    }
}
