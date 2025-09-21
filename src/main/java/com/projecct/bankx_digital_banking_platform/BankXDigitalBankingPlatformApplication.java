package com.projecct.bankx_digital_banking_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {RedisRepositoriesAutoConfiguration.class})
@EnableScheduling
@EnableCaching
@EnableJpaRepositories
public class BankXDigitalBankingPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankXDigitalBankingPlatformApplication.class, args);
    }

}
