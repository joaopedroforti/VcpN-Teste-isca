<?php

namespace App\Services\API\CalculateBehavioralProfile;

class SkillDTO
{
    public function __construct(
        public readonly string $description,
        public readonly float $value,
    ) {}
}
