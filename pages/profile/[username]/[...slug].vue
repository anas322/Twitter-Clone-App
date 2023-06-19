<template>
    <div>
        <MainSection withoutHeader profile title="profile">
            <ProfileHeader :userNotFound="true" />

            <div class="flex flex-col justify-center items-center h-24 mt-16">
                <div class="dark:text-white text-2xl font-bold">This account doesn’t exist 😢🍌</div>
                <div class="text-gray-500 text-sm pt-4">Try searching for another. 😢🍌</div>
            </div>
        </MainSection>
    </div>
</template>
