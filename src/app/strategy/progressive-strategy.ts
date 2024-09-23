import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { Hardware } from '@/app/entities/hardware';
import { HardwareModel } from '@/app/entities/hardware-model';
import { DISCOUNTS } from '@/app/entities/discounts';
import { Strategy } from './strategy';

export class ProgressiveStrategy implements Strategy {
    name: DISCOUNTS = DISCOUNTS.PROGRESSIVE;

    calculate(order: DesktopOrder): Desktop {
        const desktop = order.getDesktop();
        const discountDesktop = new Desktop();
        const total = order.getDesktop().getTotalPrice();

        let discount = 1;

        if (total >= 1200000) {
            // R$12.000,00 - 30% OFF
            discount = 0.7;
        } else if (total >= 900000) {
            // R$9.000,00 - 20% OFF
            discount = 0.8;
        } else if (total > 600000) {
            //R$6.000,00 - 10% OFF
            discount = 0.9;
        }

        desktop.toList().forEach((hardware) => {
            if (hardware !== undefined) {
                const rawHardware: Hardware = {
                    type: hardware.type,
                    title: hardware.title,
                    id: hardware.id,
                    image: hardware.image,
                    manufacturer: hardware.manufacturer,
                    price: hardware.price * discount,
                };

                discountDesktop.addHardware(new HardwareModel(rawHardware));
            }
        });

        return discountDesktop;
    }
}
