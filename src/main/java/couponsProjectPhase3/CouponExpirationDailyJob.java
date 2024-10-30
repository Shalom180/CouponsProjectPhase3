package couponsProjectPhase3;


import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.repositories.CouponsRepository;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
public class CouponExpirationDailyJob implements Runnable {
    private CouponsRepository couponsRepository;
    private boolean quit;

    public CouponExpirationDailyJob(CouponsRepository couponsRepository) {
        this.couponsRepository = couponsRepository;
    }

    @Override
    public void run() {
        while (!quit) {
            try {
                for (Coupon coupon : couponsRepository.findAllCouponsExpireBefore(Date.valueOf(LocalDate.now()))) {
                    couponsRepository.deleteCouponsPurchaseHistory(coupon.getId());
                    couponsRepository.deleteById(coupon.getId());
                }
            } finally {
                try {
                    Thread.sleep(1000 * 60 * 60 * 24);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        }
    }

    public void stop() {
        quit = true;
    }
}
