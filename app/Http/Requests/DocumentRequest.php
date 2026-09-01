<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class DocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'origin_type' => ['required', 'string', 'max:255'],
            'last_transaction' => ['nullable', 'string', 'max:255'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'fullname' => ['nullable', 'string', 'max:255'],
            'division_code' => ['nullable', 'string', 'max:100'],
            'division' => ['nullable', 'string', 'max:255'],
            'date_received' => ['required', 'date'],
            'status' => ['required', 'string', 'max:50'],
            'urgency' => ['required', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'assigned_to' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string'],
            'recipients' => ['required', 'array', 'min:1'],
            'recipients.*.name' => ['required', 'string', 'max:255'],
            'recipients.*.email' => ['required', 'email', 'max:255'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,jpg,jpeg,png'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'document_id.exists' => 'The selected document does not exist.',
            'email.email' => 'Please enter a valid email address.',
            'status.in' => 'The status must be one of: pending, sent, read, delivered, failed.',
            'read_at.after' => 'The read date must be after the sent date.',
            'sent_at.before_or_equal' => 'The sent date cannot be in the future.',
            'read_at.before_or_equal' => 'The read date cannot be in the future.',
        ];
    }
}
