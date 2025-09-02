import { type SharedData, type Booking } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import React, { useState } from 'react';
import { Visa, Mastercard, Amex, Paypal } from 'react-payment-logos/dist/flat';

interface PaymentPageProps extends SharedData {
    booking: Booking;
}

export default function Payment() {
    const { booking } = usePage<PaymentPageProps>().props;

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    const { post, processing } = useForm({});

    const handleSimulatePayment = () => {
        post(route('customer.bookings.process-payment', booking.id));
    };

    return (
        <StorefrontLayout>
            <Head title="Complete Your Payment" />
            <div className="container max-w-4xl mx-auto px-6 py-10 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
                    <p className="text-lg text-gray-700 mb-4">Your booking for property <strong>{booking.property?.title || 'N/A'}</strong> is almost complete!</p>
                    <p className="text-xl font-semibold text-primary mb-8">
                        Advance Payment Due: ${parseFloat(booking.advance_payment_amount).toFixed(2)}
                    </p>
                    <p className="text-md text-gray-600 mb-8">
                        In a real application, you would be redirected to a secure payment gateway here.
                        For demonstration purposes, click the button below to simulate the payment.
                    </p>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Choose your payment method</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${selectedPaymentMethod === 'visa' ? 'border-primary ring-2 ring-primary' : 'border-gray-300 hover:border-primary'}`}
                                onClick={() => setSelectedPaymentMethod('visa')}
                            >
                                <Visa className="h-8 mr-2" />
                                <span className="font-medium">Visa</span>
                            </div>
                            <div
                                className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${selectedPaymentMethod === 'mastercard' ? 'border-primary ring-2 ring-primary' : 'border-gray-300 hover:border-primary'}`}
                                onClick={() => setSelectedPaymentMethod('mastercard')}
                            >
                                <Mastercard className="h-8 mr-2" />
                                <span className="font-medium">MasterCard</span>
                            </div>
                            <div
                                className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${selectedPaymentMethod === 'amex' ? 'border-primary ring-2 ring-primary' : 'border-gray-300 hover:border-primary'}`}
                                onClick={() => setSelectedPaymentMethod('amex')}
                            >
                                <Amex className="h-8 mr-2" />
                                <span className="font-medium">American Express</span>
                            </div>
                            <div
                                className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${selectedPaymentMethod === 'paypal' ? 'border-primary ring-2 ring-primary' : 'border-gray-300 hover:border-primary'}`}
                                onClick={() => setSelectedPaymentMethod('paypal')}
                            >
                                <Paypal className="h-8 mr-2" />
                                <span className="font-medium">PayPal</span>
                            </div>
                            {/* Add more payment methods as needed */}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Select a method to proceed. (Demo only)</p>
                    </div>

                    {selectedPaymentMethod && selectedPaymentMethod !== 'paypal' && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                            <h3 className="text-xl font-semibold mb-4">Enter Card Details</h3>
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">SECURITY WARNING:</strong>
                                <span className="block sm:inline"> This form is for **DEMONSTRATION PURPOSES ONLY**. Never collect real credit card details (especially PIN and CVV) directly in your application. Always use a secure, PCI DSS compliant payment gateway.</span>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input type="text" id="cardNumber" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                                <div>
                                    <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">Card Holder's Name</label>
                                    <input type="text" id="cardHolderName" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="Full Name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN</label>
                                        <input type="password" id="pin" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="XXXX" maxLength={4} />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                        <input type="text" id="cvv" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="XXX" maxLength={3} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <button
                        onClick={handleSimulatePayment}
                        disabled={processing}
                        className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        {processing ? 'Processing...' : 'Simulate Payment'}
                    </button>
                </div>
            </div>
        </StorefrontLayout>
    );
}
