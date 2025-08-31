<?php

namespace App\Http\Requests\Host;

use Illuminate\Foundation\Http\FormRequest;

class HostCouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'code' => 'required|string|unique:coupons,code,' . ($this->route('coupon') ? $this->route('coupon')->id : 'NULL') . ',id,user_id,' . auth()->id(),
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'starts_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after_or_equal:starts_at',
            'usage_limit' => 'nullable|integer|min:1',
            'min_cart_value' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,inactive',
        ];
    }
}
