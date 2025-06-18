<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PDFTemplate extends Authenticatable
{
    use HasFactory;

    /** @var bool */
    public $timestamps = false;

    /** @var array<string> */
    protected $fillable = [
        'description',
        'value',
    ];

    /** @var string */
    protected $table = 'pdf_templates';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value' => 'array',
        ];
    }
}
