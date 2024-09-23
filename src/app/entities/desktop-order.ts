import { State } from '@/app/state/state';
import { CpuState } from '@/app/state/cpu-state';
import { Strategy } from '@/app/strategy/strategy';
import { DiscountStrategyFactory } from '@/app/factory/discount-strategy-factory';
import { Desktop } from './desktop';
import { HardwareModel } from './hardware-model';
import { HARDWARE_TYPES } from './hardware-type';
import { DISCOUNTS } from './discounts';

export class DesktopOrder {
    private state: State;
    private desktop: Desktop;
    private discountStrategy: Strategy;

    constructor() {
        this.state = new CpuState(this);
        this.desktop = new Desktop();

        const factoryStrategy = new DiscountStrategyFactory();
        this.discountStrategy = factoryStrategy.getStrategy();
    }

    // Manipulação da estratégias de desconto

    public setDiscountStrategy(strategy: Strategy): void {
        this.discountStrategy = strategy;
    }

    public applyDiscountStrategy(): Desktop {
        return this.discountStrategy.calculate(this);
    }

    public getStrategyName(): DISCOUNTS | undefined {
        return this.discountStrategy.name;
    }

    // Manipulação do computador

    public getDesktop(): Desktop {
        return this.desktop;
    }

    public getHardware(type: HARDWARE_TYPES): HardwareModel | undefined {
        return this.desktop.toObject()[type];
    }

    public getHardwareList(): HardwareModel[] {
        return this.desktop
            .toList()
            .filter((hardware) => hardware !== undefined);
    }

    public addHardware(hardware: HardwareModel): Desktop {
        this.desktop.addHardware(hardware);
        return this.desktop;
    }

    public getPrice(): string {
        return this.desktop.getPriceFormatted();
    }

    // Manipulações de estado

    public async fetchHardware(): Promise<HardwareModel[]> {
        await this.state.fetchHardware();
        return this.state.getHardwareList();
    }

    public setState(state: State): void {
        this.state = state;
    }

    public nextState(): HARDWARE_TYPES {
        this.state.nextState();
        return this.getCurrentStatus();
    }

    public prevState(): HARDWARE_TYPES {
        this.state.prevState();
        return this.getCurrentStatus();
    }

    public getCurrentStatus(): HARDWARE_TYPES {
        return this.state.getStatus();
    }

    public isFinalState(): boolean {
        return this.getCurrentStatus() === HARDWARE_TYPES.CASE;
    }
}
