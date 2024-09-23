<template>
    <v-list-item lines="three" class="">
        <template #prepend>
            <v-avatar rounded="sm" class="flex-0-0">
                <v-img :src="hardware.image" />
            </v-avatar>
        </template>
        <template #default>
            <div class="pr-4">
                <p class="text-caption opacity-70">
                    {{ hardware.manufacturer }}
                </p>
                <p class="text-body-2 opacity-100 text-white">
                    {{ hardware.title }}
                </p>
            </div>
        </template>
        <template #append>
            <div class="text-right">
                <p v-if="hasDiscount" class="text-caption text-grey-lighten-1">
                    De: <s>{{ hardware.priceFormatted }}</s>
                </p>
                <p class="text-body-2 text-blue-lighten-3">{{ price }}</p>
            </div>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
    import { Desktop } from '@/app/entities/desktop';
    import { HardwareModel } from '@/app/entities/hardware-model';
    import { computed } from 'vue';

    interface Props {
        hardware: Readonly<HardwareModel>;
        desktop?: Readonly<Desktop>;
    }

    const props = defineProps<Props>();

    const hasDiscount = computed(() => {
        const desktopHardware = props.desktop?.toObject()[props.hardware.type];

        if (!desktopHardware) {
            return false;
        }

        return props.hardware.price > desktopHardware.price;
    });

    const price = computed(() => {
        const desktopHardware = props.desktop?.toObject()[props.hardware.type];

        if (desktopHardware && hasDiscount.value) {
            return `Por: ${desktopHardware.priceFormatted}`;
        }

        return props.hardware.priceFormatted;
    });
</script>
