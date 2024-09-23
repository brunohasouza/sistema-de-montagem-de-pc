<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="search"
                    label="Procure por marca ou nome"
                    variant="outlined"
                    clearable
                    @click:clear="search = ''"
                />
            </v-col>
            <template v-if="loading">
                <v-col cols="12" md="6">
                    <hardware-skeleton />
                </v-col>
            </template>
            <template v-else-if="filteredItems.length === 0">
                <v-col cols="12">
                    <v-alert
                        title="Nenhuma peça encontrada."
                        color="grey-darken-2"
                        variant="outlined"
                    />
                </v-col>
            </template>
            <template v-else>
                <v-col
                    v-for="item in filteredItems"
                    :key="item.id"
                    cols="12"
                    md="6"
                >
                    <hardware-item
                        :hardware="item"
                        :selected="
                            item.id === order.getHardware(props.type)?.id
                        "
                        @on-select="selectHardware"
                    />
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
    import { HardwareModel } from '@/app/entities/hardware-model';
    import { DesktopOrder } from '@/app/entities/desktop-order';
    import HardwareItem from './HardwareItem.vue';
    import HardwareSkeleton from './HardwareSkeleton.vue';

    interface Emits {
        (e: 'on-select', value: HardwareModel): void;
    }

    interface Props {
        type: HARDWARE_TYPES;
        order: Readonly<DesktopOrder>;
    }

    const emits = defineEmits<Emits>();
    const props = defineProps<Props>();

    const items = ref<HardwareModel[]>([]);
    const loading = ref(false);
    const search = ref('');

    function selectHardware(id: number) {
        const hardware = items.value.find((item) => item.id === id);
        emits('on-select', hardware as HardwareModel);
    }

    const filteredItems = computed(() => {
        return items.value.filter((item) => {
            const includeInTitle = item.title
                .toLowerCase()
                .includes(search.value.toLowerCase());
            const includesInManufacturer = item.manufacturer
                .toLowerCase()
                .includes(search.value.toLowerCase());

            return includeInTitle || includesInManufacturer;
        });
    });

    onMounted(async () => {
        loading.value = true;
        items.value = await props.order.fetchHardware();
        loading.value = false;
    });
</script>
