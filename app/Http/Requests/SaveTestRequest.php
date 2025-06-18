<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveTestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.

     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'groups' => ['required', 'array'],
            'groups.*.id' => ['required', 'integer', 'distinct'],
            'groups.*.points' => ['required', 'integer', Rule::in([1, 2, 3, 4])],
        ];
    }
}
