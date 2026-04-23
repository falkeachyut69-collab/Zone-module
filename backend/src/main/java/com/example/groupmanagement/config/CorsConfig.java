import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
        .allowedOrigins(
            "http://localhost:3000",
            "https://zone-module-frontend.netlify.app",
            "https://whimsical-granita-c5b83f.netlify.app" // ADD THIS
        )
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true); // ✅ CHANGE THIS
            }
        };
    }
}