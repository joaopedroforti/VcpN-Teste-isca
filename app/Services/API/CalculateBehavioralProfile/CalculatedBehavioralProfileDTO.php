<?php

namespace App\Services\API\CalculateBehavioralProfile;

class CalculatedBehavioralProfileDTO
{
    public function __construct(
        public readonly float $accuracy,
        public readonly float $collaboration,
        public readonly float $decision,
        public readonly float $initiative,
        public readonly string $profile,
        public readonly array $skills,
    ) {}
}
