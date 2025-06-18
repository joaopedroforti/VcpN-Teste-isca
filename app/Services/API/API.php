<?php

namespace App\Services\API;

use BadMethodCallException;

/**
 * @method \App\Services\API\CalculateBehavioralProfile\CalculatedBehavioralProfileDTO calculateBehavioralProfile(array $groups)
 * @method ?\App\Models\Person verifyAccount(string $email, string $document)
 */
class API
{
    public function __call(string $method, array $parameters)
    {
        $classes = [
            __NAMESPACE__.'\\'.ucfirst($method),
            __NAMESPACE__.'\\'.ucfirst($method).'\\'.ucfirst($method),
        ];

        foreach ($classes as $class) {
            if (class_exists($class)) {
                return (new $class($this))->__invoke(...$parameters);
            }
        }

        throw new BadMethodCallException("Method {$method} not found!");
    }
}
