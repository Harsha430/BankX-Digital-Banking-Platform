package com.projecct.bankx_digital_banking_platform.security;

import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.UserAuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@Primary
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    UserAuthRepo userAuthRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuth user =userAuthRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserPrincipal(user);
    }
}
