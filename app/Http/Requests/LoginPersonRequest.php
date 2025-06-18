<?php

namespace App\Http\Requests;

use App\Services\API\API;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginPersonRequest extends FormRequest
{
    /** @var API */
    private $api;

    public function __construct(API $api)
    {
        $this->api = $api;
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /** @var array<string, string> */
    public function attributes(): array
    {
        return [
            'document' => 'CPF',
        ];
    }

    /** @var array<string, string> */
    public function messages(): array
    {
        return [
            'document.size' => 'O campo :attribute é inválido.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email'],
            'document' => ['required', 'string', 'size:11'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $person = $this->api->verifyAccount($this->email, $this->document);

        if (is_null($person)) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages(['email' => trans('auth.failed')]);
        }

        Auth::guard('person')->login($person);

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate('person|'.Str::lower($this->string('email')).'|'.$this->ip());
    }
}
