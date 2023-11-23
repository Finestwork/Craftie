<template>
    <button
        class="group flex h-[25px] w-[25px] items-center rounded-md stroke-[#b8bccf] p-1 hover:bg-tab-hover focus:bg-tab-hover"
        type="button"
    >
        <span
            class="stroke-white group-hover:stroke-tab-foreground-hover group-focus:stroke-tab-foreground-hover"
        >
            <slot></slot>
        </span>
    </button>
</template>
