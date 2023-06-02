<template>
    <div class="min-h-screen flex">
        <div class="relative flex-1 hidden w-0 lg:block">
            <img
                class="absolute inset-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1679061399645-f2d8eccd7328?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
            />
        </div>

        <div class="flex-1 lg:flex-none px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
            <div class="flex flex-col justify-center items-center pt-6 sm:pt-0 w-full h-full max-w-sm mx-auto lg:w-96">
                <div>
                    <slot name="logo" />
                </div>

                <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
