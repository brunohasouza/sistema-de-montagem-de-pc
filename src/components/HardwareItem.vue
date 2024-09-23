<template>
    <v-card color="grey-darken-3" :variant="selected ? 'flat' : 'outlined'">
        <div class="d-flex">
            <v-avatar rounded="0" class="flex-0-0" size="125">
                <v-img :src="hardware.image" />
            </v-avatar>
            <div class="flex-fill">
                <v-card-text class="pb-0 pt-3">
                    <p class="text-caption text-grey-lighten-1">
                        {{ hardware.manufacturer }}
                    </p>
                    <p
                        class="text-body-2 opacity-100 text-white"
                        style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            line-clamp: 2;
                        "
                    >
                        {{ hardware.title }}
                    </p>
                </v-card-text>
                <v-card-actions class="justify-space-between">
                    <p class="text-h6 font-weight-medium pl-2 text-white">
                        {{ hardware.priceFormatted }}
                    </p>
                    <v-btn
                        class="ms-2"
                        size="small"
                        :variant="selected ? 'flat' : 'outlined'"
                        color="primary"
                        @click="$emit('on-select', hardware.id)"
                        >Escolher</v-btn
                    >
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
    import { HardwareModel } from '@/app/entities/hardware-model';

    type Emits = {
        (e: 'on-select', value: number): void;
    };

    type Props = {
        hardware: Readonly<HardwareModel>;
        selected: boolean;
    };

    defineEmits<Emits>();
    defineProps<Props>();
</script>
