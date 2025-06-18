<?php

namespace App\Services\API;

use App\Models\Person;
use Illuminate\Support\Facades\Http;

class VerifyAccount
{
    public function __invoke(string $email, string $document): ?Person
    {
        $response = Http::acceptJson()
            ->asJson()
            ->post(
                'https://vocenoproximonivel.com.br/routes/verifyaccount.php',
                ['email' => $email, 'document' => $document],
            )->collect();

        return $response->has('person_id')
            ? Person::find($response->get('person_id'))
            : null;
    }
}
