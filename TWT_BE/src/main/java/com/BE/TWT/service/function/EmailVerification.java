package com.BE.TWT.service.function;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailVerification{
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "trsoo24@naver.com";
    private String code;


    public String sendMail(String mail){

        MimeMessage message = CreateMail(mail);

        javaMailSender.send(message);

        return code;
    }

    public MimeMessage CreateMail(String mail){
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("TWT 회원가입 이메일 인증");
            String body = "";
            body += "<h3>" + "TWT 인증 번호입니다." + "</h3>";
            body += "<h1> verificationCode: " + code + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    public void createNumber() {
        code = String.valueOf((int)(Math.random() * (90000)) + 100000);
    }
}
