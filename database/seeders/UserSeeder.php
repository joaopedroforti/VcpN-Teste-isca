<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'guilherme',
            'email' => 'guilherme.favere@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
