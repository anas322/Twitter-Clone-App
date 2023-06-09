<template>
    <div id="twitter-animation">
        <svg
            id="heart-svg"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="h-9 w-9 p-2 stroke-2 text-gray-500 hover:text-[#f91880] hover:bg-red-500/20 cursor-pointer rounded-full transition duration-300"
        >
            <g id="Group" fill="none" fill-rule="evenodd">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
                <circle id="main-circ" fill="#E2264D" opacity="0" cx="12" cy="12" r="1" transform="translate(0)" />
                <g id="grp7" opacity="0" transform="translate(8, 2)">
                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"></circle>
                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"></circle>
                </g>
                <g id="grp6" opacity="0" transform="translate(2, 5)">
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"></circle>
                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"></circle>
                </g>
                <g id="grp3" opacity="0" transform="translate(-1, 14)">
                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"></circle>
                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"></circle>
                </g>
                <g id="grp2" opacity="0" transform="translate(7, 18)">
                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"></circle>
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"></circle>
                </g>
                <g id="grp5" opacity="0" transform="translate(15, 15)">
                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"></circle>
                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"></circle>
                </g>
                <g id="grp4" opacity="0" transform="translate(10, -6)">
                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"></circle>
                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"></circle>
                </g>
                <g id="grp1" opacity="0" transform="translate(18 5)">
                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"></circle>
                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"></circle>
                </g>
            </g>
        </svg>
    </div>
</template>
<style lang="scss">
svg {
    cursor: pointer;
    overflow: visible;
    #heart {
        transform-origin: center;
        animation: animateHeartOut 0.3s linear forwards;
    }
    #main-circ {
        transform-origin: 12px 12px;
    }
}

#twitter-animation:hover svg {
    #heart {
        transform: scale(0.2);
        fill: #e2264d;
        animation: animateHeart 0.3s linear forwards 0.25s;
    }
    #main-circ {
        transition: all 2s;
        animation: animateCircle 0.3s linear forwards;
        opacity: 1;
    }
    #grp1 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(0, -30px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(10px, -50px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp2 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(30px, -15px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(60px, -15px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp3 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(30px, 0px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(60px, 10px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp4 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(30px, 15px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(40px, 50px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp5 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(-10px, 20px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(-60px, 30px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp6 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(-30px, 0px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(-60px, -5px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp7 {
        opacity: 1;
        transition: 0.1s all 0.3s;
        #oval1 {
            transform: scale(0) translate(-30px, -15px);
            transform-origin: 0 0 0;
            transition: 0.5s transform 0.3s;
        }
        #oval2 {
            transform: scale(0) translate(-55px, -30px);
            transform-origin: 0 0 0;
            transition: 1.5s transform 0.3s;
        }
    }
    #grp2 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
    #grp3 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
    #grp4 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
    #grp5 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
    #grp6 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
    #grp7 {
        opacity: 1;
        transition: 0.1s opacity 0.3s;
    }
}

@keyframes animateCircle {
    40% {
        transform: scale(10);
        opacity: 1;
        fill: #dd4688;
    }
    55% {
        transform: scale(11);
        opacity: 1;
        fill: #d46abf;
    }
    65% {
        transform: scale(12);
        opacity: 1;
        fill: #cc8ef5;
    }
    75% {
        transform: scale(13);
        opacity: 1;
        fill: transparent;
        stroke: #cc8ef5;
        stroke-width: 0.5;
    }
    85% {
        transform: scale(17);
        opacity: 1;
        fill: transparent;
        stroke: #cc8ef5;
        stroke-width: 0.2;
    }
    95% {
        transform: scale(18);
        opacity: 1;
        fill: transparent;
        stroke: #cc8ef5;
        stroke-width: 0.1;
    }
    100% {
        transform: scale(19);
        opacity: 1;
        fill: transparent;
        stroke: #cc8ef5;
        stroke-width: 0;
    }
}

@keyframes animateHeart {
    0% {
        transform: scale(0.2);
    }
    40% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes animateHeartOut {
    0% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1);
    }
}
</style>
