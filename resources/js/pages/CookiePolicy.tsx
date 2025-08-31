import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const CookiePolicy: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Cookie Policy</h1>
                <p className="text-lg mb-4">This Cookie Policy explains how Dream Dwell uses cookies and similar technologies on our website. By continuing to use our site, you consent to the use of cookies as described in this policy.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">1. What are Cookies?</h2>
                    <p className="mb-2">Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">2. How We Use Cookies</h2>
                    <p className="mb-2">We use cookies for various purposes, including:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>**Essential Cookies:** These are necessary for the website to function properly, enabling core functionalities like security, network management, and accessibility.</li>
                        <li>**Analytical/Performance Cookies:** These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.</li>
                        <li>**Functionality Cookies:** These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name, and remember your preferences.</li>
                        <li>**Targeting/Advertising Cookies:** These cookies record your visit to our website, the pages you have visited, and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">3. Third-Party Cookies</h2>
                    <p className="mb-2">In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">4. Your Choices Regarding Cookies</h2>
                    <p className="mb-2">You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.</p>
                    <p className="mt-2">To learn more about how to manage cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">allaboutcookies.org</a>.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default CookiePolicy;
