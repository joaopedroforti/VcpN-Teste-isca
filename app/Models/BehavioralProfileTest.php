<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BehavioralProfileTest extends Model
{
    use HasFactory;

    /** @var array<string> */
    protected $fillable = [
        'uuid',
        'person_id',
        'accuracy',
        'collaboration',
        'decision',
        'initiative',
        'profile',
        'skills',
    ];

    /** @var string */
    protected $table = 'behavioral_profile_tests';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'skills' => 'array',
        ];
    }
}
