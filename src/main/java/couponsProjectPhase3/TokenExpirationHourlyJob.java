package couponsProjectPhase3;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import couponsProjectPhase3.beans.TokenProps;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class TokenExpirationHourlyJob implements Runnable{
    private Map<String, TokenProps> activeTokens;
    private boolean quit;

    @Override
    public void run() {
        while(!quit) {
            try {
                Date now = new Date();
                for (String key: activeTokens.keySet()){
                    TokenProps value = activeTokens.get(key);
                    DecodedJWT decoded = JWT.decode(key);
                    if (decoded.getExpiresAt().after(now) && value.getLastTimeActive().getTime() >= now.getTime() - 1000*60*60)
                        activeTokens.remove(key);
                }
            } finally {
                try {
                    Thread.sleep(1000 * 60 * 60);
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
