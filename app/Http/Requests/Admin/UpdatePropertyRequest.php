<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Admin authorization logic here
        return true; // Assuming admin is always authorized for now
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price_per_night', // Added discount_price validation
            'number_of_guests' => 'required|integer|min:1',
            'number_of_bedrooms' => 'required|integer|min:0',
            'number_of_beds' => 'required|integer|min:0',
            'number_of_bathrooms' => 'required|integer|min:0',
            'is_available' => 'boolean',
            'user_id' => 'required|exists:users,id', // Admin can assign to any user

            // Address fields
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',

            // Amenities field
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',

            // Image fields
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'integer|exists:property_images,id',
            'existing_images' => 'nullable|array',
        ];
    }
}
