package com.did.MyShop.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SendEmail {
    public void sendEmail(String to, String subject, String body) {
        log.info("Sending email to {}", to);
        System.out.println("Sending email to : " + to);
        System.out.println("Sending subject : " + subject);
        System.out.println("Sending body : " + body);
        //TODO : on doit envoyer un mail contenant le lien front avec le jeton en params
    }
}
