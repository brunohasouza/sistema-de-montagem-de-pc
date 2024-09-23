<template>
    <v-app>
        <v-main>
            <v-toolbar title="Monte seu PC">
                <template #append>
                    <div class="pr-4">
                        <p class="text-right text-caption text-grey-lighten-1">
                            Valor total
                        </p>
                        <p class="text-right text-h6 text-blue-lighten-3">
                            {{ order.getPrice() }}
                        </p>
                    </div>
                </template>
            </v-toolbar>
            <v-stepper v-model="step" alt-labels>
                <v-stepper-header>
                    <template v-for="(e, index) in steps" :key="e.value">
                        <v-stepper-item
                            :title="e.title"
                            :value="e.value"
                            :complete="
                                index < steps.findIndex((s) => step === s.value)
                            "
                            color="primary"
                            icon="mdi-check"
                        />
                        <v-divider v-if="index < steps.length - 1" />
                    </template>
                </v-stepper-header>
                <v-stepper-window
                    style="height: calc(100vh - 268px); overflow-y: auto"
                >
                    <v-stepper-window-item
                        v-for="e in steps"
                        :key="e.value"
                        :value="e.value"
                    >
                        <transition name="fade">
                            <hardware-list
                                v-if="step === e.value"
                                :order="order"
                                :type="e.value"
                                @on-select="addHardware"
                            />
                        </transition>
                    </v-stepper-window-item>
                </v-stepper-window>
                <v-stepper-actions>
                    <template #prev>
                        <v-btn variant="outlined" @click="prev">Voltar</v-btn>
                    </template>
                    <template #next>
                        <v-btn
                            v-if="order.isFinalState()"
                            :disabled="!order.getHardware(step)"
                            variant="elevated"
                            color="primary"
                            @click="openModal"
                            >Concluir</v-btn
                        >
                        <v-btn
                            v-else
                            :disabled="!order.getHardware(step)"
                            variant="elevated"
                            color="primary"
                            @click="next"
                            >Avançar</v-btn
                        >
                    </template>
                </v-stepper-actions>
            </v-stepper>
        </v-main>
        <v-dialog v-model="dialog" width="auto">
            <order-list :order="order" />
        </v-dialog>
    </v-app>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
    import { Step } from '@/app/entities/step';
    import { HardwareModel } from '@/app/entities/hardware-model';
    import { DesktopOrder } from '@/app/entities/desktop-order';
    import HardwareList from '@/components/HardwareList.vue';

    const order = reactive(new DesktopOrder());
    const dialog = ref(false);

    const steps: Step[] = [
        { value: HARDWARE_TYPES.CPU, title: 'Processador' },
        { value: HARDWARE_TYPES.MOTHERBOARD, title: 'Placa-mãe' },
        { value: HARDWARE_TYPES.RAM, title: 'Memória' },
        { value: HARDWARE_TYPES.GPU, title: 'Placa de vídeo' },
        { value: HARDWARE_TYPES.STORAGE, title: 'Armazenamento' },
        { value: HARDWARE_TYPES.PSU, title: 'Armazenamento' },
        { value: HARDWARE_TYPES.CASE, title: 'Gabinete' },
    ];

    const step = ref(HARDWARE_TYPES.CPU);

    function addHardware(hardware: HardwareModel) {
        order.addHardware(hardware);
    }

    function next() {
        const currentStatus = order.getCurrentStatus();
        const nextStatus = order.nextState();

        if (currentStatus !== nextStatus) {
            step.value = nextStatus;
        }
    }

    function prev() {
        const currentStatus = order.getCurrentStatus();
        const prevStatus = order.prevState();

        if (currentStatus !== prevStatus) {
            step.value = prevStatus;
        }
    }

    function openModal() {
        dialog.value = true;
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
