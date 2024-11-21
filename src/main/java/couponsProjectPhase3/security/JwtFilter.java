package couponsProjectPhase3.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import couponsProjectPhase3.beans.TokenProps;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
@Order(2) //run after CorsFilter
public class JwtFilter extends OncePerRequestFilter {
    private Map<String, TokenProps> activeTokens;

    //ctor - dependency injection
    public JwtFilter(Map<String, TokenProps> activeTokens) {
        this.activeTokens = activeTokens;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
            if (activeTokens.containsKey(token)) {
                DecodedJWT decoded = JWT.decode(token);
                // check info in token
                Date now = new Date();
                TokenProps tokenProps = activeTokens.get(token);
                if (decoded.getIssuer().equals("JohnCoupon") && decoded.getExpiresAt().after(now) && tokenProps.getLastTimeActive().getTime() + 1000*60*30 < now.getTime()) {
                   tokenProps.setLastTimeActive(now);
                    // all is well, move on
                    filterChain.doFilter(request, response); // move to next filter on the chain, if last filter send to dispatcher
                }
            } else {
                response.setStatus(401);
                response.getWriter().write("Unauthorized, please log in!");
            }
        } catch (Exception e) {
            // something is wrong with JWT - ERROR
            response.setStatus(401);
            response.getWriter().write("Unauthorized, please log in!");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !(request.getServletPath().startsWith("/admin") ||
                request.getServletPath().startsWith("/company") ||
                request.getServletPath().startsWith("/customer"));
        //return true;
    }
}
