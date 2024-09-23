import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { DISCOUNTS } from '@/app/entities/discounts';

export interface Strategy {
    name?: DISCOUNTS;
    calculate(order: DesktopOrder): Desktop;
}
