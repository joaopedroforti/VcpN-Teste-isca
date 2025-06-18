<?php

use App\Models\BehavioralProfileTest;
use App\Models\Person;

test('a person has a behavioral profile test', function () {
    $person = Person::factory()->create();

    $behavioralProfileTest = BehavioralProfileTest::factory()->create(['person_id' => $person->id]);

    expect($person->behavioralProfileTest->is($behavioralProfileTest))->toBeTrue();
});
