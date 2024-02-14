package com.app.jwt_utils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.app.service.CustomUserDetails;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

	@Value("${SECRET_KEY}")
	private String jwtSecret;

	@Value("${EXP_TIMEOUT}")
	private int jwtExpirationMs;

	@Value("${REFRESH_TOKEN_TIMEOUT}")
	private int refreshTokenExpriation;

	// will be invoked by REST Controller(authentication controller) , upon
	// successful authentication
	public String[] generateJwtToken(Authentication authentication) {
		log.info("generate jwt token " + authentication);
		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
		String[] tokens = new String[2];
//JWT : userName,issued at ,exp date,digital signature(does not typically contain password , can contain authorities
//		tokens[0] = Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
//				.setSubject((userPrincipal.getUsername())) // setting subject of the token(typically user name) :sets
//															// subject claim part of the token
//				.claim("roles",
//						userPrincipal.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()))
//				.setIssuedAt(new Date())// Sets the JWT Claims iat (issued at) value of current date
//				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))// Sets the JWT Claims exp
//																					// (expiration) value.
//				.setIssuer("pg_management_Backend").signWith(SignatureAlgorithm.HS512, jwtSecret) // Signs the
//																									// constructed JWT
//																									// using the
//																									// specified
//																									// algorithm with
//																									// the specified
//																									// key, producing a
//																									// JWS(Json web
//																									// signature=signed
//																									// JWT)
//
//				// Using token signing algo : HMAC using SHA-512
//				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
		tokens[0] = generateAccessToken(userPrincipal.getUsername(),
				userPrincipal.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()), userPrincipal.getUserId());
		tokens[1] = Jwts.builder().setSubject((userPrincipal.getUsername())).setIssuedAt(new Date()).claim("userId", userPrincipal.getUserId())
				.setExpiration(new Date((new Date()).getTime() + refreshTokenExpriation))
				.setIssuer("pg_management_Backend").signWith(SignatureAlgorithm.HS512, jwtSecret).compact();

		return tokens;
	}

	public String generateAccessToken(String username, List<String> authorities, Long userId) {
		
		return Jwts.builder().setSubject(username).claim("roles", authorities).claim("userId", userId).setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).setIssuer("pg_management_Backend")
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	// this method will be invoked by our custom filter
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}
	
	public Long getUserIdFromJwtToken(String token) {
		return (Long) Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("userId");
	}

	// this method will be invoked by our custom filter
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().// Returns a new JwtParser instance used to parse JWT strings.
					setSigningKey(jwtSecret).// Sets the signing key used to verify JWT digital signature.
					parseClaimsJws(authToken);// Parses the signed JWT returns the resulting Jws<Claims> instance
												// throws exc in case of failures in verification
			return true;
		} catch (Exception e) {
			log.error("Invalid JWT : " + e.getMessage());
		}

		return false;
	}
}
