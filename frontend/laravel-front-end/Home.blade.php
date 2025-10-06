<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Harvest - Referral Program</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        .bg-custom-green {
            background-color: #2E7D32;
        }

        .text-custom-green {
            color: #2E7D32;
        }

        .border-custom-green {
            border-color: #2E7D32;
        }
    </style>
</head>

<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <img src="https://placeholder-image-service.onrender.com/image/150x40?prompt=Daily Harvest logo with green leaf design&id=logo-1" alt="Daily Harvest logo with green leaf design" class="h-8">
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-600 hover:text-custom-green font-medium">Menu</a>
                    <a href="#" class="text-gray-600 hover:text-custom-green font-medium">How It Works</a>
                    <a href="#" class="text-gray-600 hover:text-custom-green font-medium">Our Food</a>
                    <a href="#" class="text-gray-600 hover:text-custom-green font-medium">Gift</a>
                    <a href="#" class="text-gray-600 hover:text-custom-green font-medium">Refer</a>
                </nav>
                <div class="flex items-center space-x-4">
                    <button class="text-gray-600 hover:text-custom-green">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button class="text-gray-600 hover:text-custom-green">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                    <button class="text-gray-600 hover:text-custom-green">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Banner -->
        <div class="bg-custom-green text-white rounded-lg p-6 mb-8">
            <h1 class="text-2xl font-bold mb-2">Eat better together</h1>
            <p class="text-lg mb-4">10% off subscription purchases of $100+!</p>
            <p class="text-sm">Reset in 3 Days: Real Food, Real Results.</p>
            <button class="mt-4 bg-white text-custom-green font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
                Shop the Detox Box
            </button>
        </div>

        <!-- Account Menu -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Menu</h2>
            <div class="flex flex-wrap gap-4">
                <a href="#" class="text-custom-green font-medium hover:underline">Account Details</a>
                <a href="#" class="text-custom-green font-medium hover:underline">Order History</a>
                <a href="#" class="text-custom-green font-medium hover:underline">Payment Methods</a>
                <a href="#" class="text-gray-800 font-medium">Refer & Earn</a>
                <a href="#" class="text-custom-green font-medium hover:underline">Subscriptions</a>
            </div>
        </div>

        <!-- Thanks Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-2">Thanks for the second chance</h2>
            <button class="text-custom-green font-medium hover:underline">View Box Plan settings</button>
        </div>

        <!-- Delivery Date Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4">Change Next Delivery Date</h2>
            <p class="text-gray-600 mb-4">When would you like your next delivery?</p>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p class="text-sm text-yellow-700">
                    <span class="font-medium">Note On Your Existing Order</span><br>
                    Order #{{ $orderNumber ?? '12345' }} for your most recent box has already been processed and is still scheduled to arrive {{ $deliveryDate ?? 'October 15, 2023' }}.
                </p>
            </div>

            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <input type="date" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="flex items-center space-x-4">
                    <button type="button" class="bg-custom-green text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition">
                        I understand
                    </button>
                    <button type="button" class="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-50 transition">
                        Save
                    </button>
                    <button type="button" class="text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

        <!-- Item Management Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">Your Box</h2>
            <p class="text-gray-600 mb-6">Receive your box in 2-4 days</p>

            <div class="border border-gray-200 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img src="https://placeholder-image-service.onrender.com/image/80x80?prompt=Daily Harvest smoothie cup with green contents&id=product-1" alt="Daily Harvest smoothie cup with green contents" class="h-16 w-16 object-cover rounded">
                        <div class="ml-4">
                            <h3 class="font-medium">Green Smoothie Pack</h3>
                            <p class="text-sm text-gray-500">6 servings</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="font-semibold">$35.94</span>
                        <button class="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Error Modal (hidden by default) -->
            <div id="errorModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 class="text-lg font-semibold mb-2">Item can't be removed</h3>
                    <p class="text-gray-600 mb-4">
                        Your subscription subtotal must be above $50 for the box to ship. Add your replacement item(s) first and then try deleting this again.
                    </p>
                    <div class="flex justify-end">
                        <button id="closeModal" class="bg-custom-green text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition">
                            Back to Box
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex justify-between items-center">
                <div>
                    <p class="text-gray-600">Subtotal</p>
                    <p class="text-xl font-semibold">$35.94</p>
                </div>
                <button class="bg-custom-green text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition">
                    Checkout
                </button>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 mt-12 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="font-semibold mb-4">Company</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">About Us</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">Careers</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">Press</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Help</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">FAQs</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">Contact Us</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-custom-green">Shipping & Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-600 hover:text-custom-green">
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-custom-green">
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-custom-green">
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Newsletter</h3>
                    <p class="text-gray-600 mb-4">Get the latest updates on new products and promotions</p>
                    <form class="flex">
                        <input type="email" placeholder="Your email" class="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent">
                        <button type="submit" class="bg-custom-green text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
                <p>© 2023 Daily Harvest. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple JavaScript for modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const deleteButtons = document.querySelectorAll('button.text-red-500');
            const errorModal = document.getElementById('errorModal');
            const closeModal = document.getElementById('closeModal');

            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    errorModal.classList.remove('hidden');
                });
            });

            closeModal.addEventListener('click', function() {
                errorModal.classList.add('hidden');
            });
        });
    </script>
</body>

</html>