import { Hardware } from '@/app/entities/hardware';
import { HardwareModel } from '@/app/entities/hardware-model';
import { HARDWARE_TYPES } from '@/app/entities/hardware-type';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { Adapter } from '@/app/adapter/adapter';
import { AxiosAdapter } from '@/app/adapter/axios-adapter';

export abstract class State {
    protected abstract name: HARDWARE_TYPES;
    protected order: DesktopOrder;
    protected hardwareList: HardwareModel[] = [];
    private client: Adapter;

    constructor(order: DesktopOrder) {
        this.order = order;
        this.client = new AxiosAdapter();
    }

    protected abstract filter(hardwareList: Hardware[]): void;

    public abstract nextState(): void;

    public abstract prevState(): void;

    public async fetchHardware(): Promise<void> {
        const response = await this.client.get<Hardware[]>(
            'database/hardware.json',
        );
        const hardwareList = Array.isArray(response.data) ? response.data : [];

        this.filter(hardwareList);
    }

    public getHardwareList(): HardwareModel[] {
        return this.hardwareList;
    }

    public getStatus(): HARDWARE_TYPES {
        return this.name;
    }
}
