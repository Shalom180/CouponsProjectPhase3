package couponsProjectPhase3.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
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

@Component
@Order(2) //run after CorsFilter
public class JwtFilter extends OncePerRequestFilter {
    private List<String> activeAdminTokens;
    private List<String> activeCompanyTokens;
    private List<String> activeCustomerTokens;

    //ctor - dependency injection
    public JwtFilter(List<String> activeAdminTokens, List<String> activeCompanyTokens, List<String> activeCustomerTokens) {
        this.activeAdminTokens = activeAdminTokens;
        this.activeCompanyTokens = activeCompanyTokens;
        this.activeCustomerTokens = activeCustomerTokens;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
            if (activeAdminTokens.contains(token) || activeCompanyTokens.contains(token) || activeCustomerTokens.contains(token)) {
                DecodedJWT decoded = JWT.decode(token);
                // check info in token
                if (decoded.getIssuer().equals("JohnCoupon") && decoded.getExpiresAt().after(new Date())) {
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
        return request.getServletPath().startsWith("/guest");
        //return true;
    }
}
